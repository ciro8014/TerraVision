from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import numpy as np
import requests
import rasterio
from io import BytesIO
from ml_model import gap_fill_ndvi
import logging

app = Flask(__name__)
CORS(app)  # Permitir peticiones desde el frontend

# Configuración de logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuración GIBS WMS para MODIS
WMS_URL = 'https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi'

# Configuración de capas
LAYERS_CONFIG = {
    'NDVI': {
        'name': 'MODIS_Terra_NDVI_8Day',
        'scale_factor': 0.0001,
        'valid_range': (-2000, 10000)
    },
    'LST': {
        'name': 'MODIS_Terra_Land_Surface_Temp_Day',
        'scale_factor': 0.02,
        'offset': 0,
        'valid_range': (7500, 65535)
    }
}

# Área de Cusco (bbox en formato lon/lat)
CUSCO_BBOX = (-72.1, -13.6, -71.9, -13.4)


@app.route('/api/health', methods=['GET'])
def health_check():
    """Endpoint para verificar que el servidor está funcionando"""
    return jsonify({
        'status': 'ok',
        'message': 'TerraVision Backend is running',
        'version': '1.0.0'
    })


@app.route('/api/satellite-data', methods=['GET'])
def get_satellite_data():
    """
    Obtiene datos satelitales de NASA GIBS
    Parámetros opcionales:
    - layer: 'NDVI' o 'LST' (default: 'NDVI')
    - date: fecha en formato YYYY-MM-DD (default: fecha reciente)
    """
    try:
        layer_type = request.args.get('layer', 'NDVI')
        date = request.args.get('date', '2025-10-01')
        
        if layer_type not in LAYERS_CONFIG:
            return jsonify({'error': 'Layer no válido'}), 400
        
        layer_config = LAYERS_CONFIG[layer_type]
        
        logger.info(f"Solicitando datos de {layer_type} para fecha {date}")
        
        # Parámetros WMS
        wms_params = {
            'service': 'WMS',
            'request': 'GetMap',
            'version': '1.3.0',
            'layers': layer_config['name'],
            'crs': 'EPSG:4326',
            'bbox': ','.join(map(str, CUSCO_BBOX)),
            'width': '256',
            'height': '256',
            'format': 'image/tiff',
            'time': date,
            'transparent': 'true'
        }
        
        # Realizar petición a NASA GIBS
        response = requests.get(WMS_URL, params=wms_params, timeout=30)
        
        if response.status_code != 200:
            logger.error(f"Error en petición WMS: {response.status_code}")
            return jsonify({
                'error': 'Error al obtener datos de NASA GIBS',
                'status_code': response.status_code
            }), 500
        
        # Leer TIFF con rasterio
        with rasterio.open(BytesIO(response.content)) as src:
            data = src.read(1)  # Primera banda
            transform = src.transform
            
            # Generar puntos de muestreo (simplificado)
            rows, cols = data.shape
            sample_points = []
            
            # Muestrear cada N píxeles para no sobrecargar
            step = max(1, min(rows, cols) // 20)  # ~20 puntos por lado
            
            for y in range(0, rows, step):
                for x in range(0, cols, step):
                    lon, lat = transform * (x, y)
                    value = float(data[y, x])
                    
                    # Aplicar escala y validación
                    if layer_config['valid_range'][0] <= value <= layer_config['valid_range'][1]:
                        scaled_value = value * layer_config['scale_factor']
                        
                        # Para LST, convertir de Kelvin a Celsius
                        if layer_type == 'LST':
                            scaled_value = scaled_value - 273.15
                        
                        sample_points.append({
                            'lat': lat,
                            'lon': lon,
                            'value': scaled_value,
                            'layer': layer_type
                        })
            
            # Crear DataFrame con datos adicionales
            df = pd.DataFrame(sample_points)
            
            if df.empty:
                return jsonify({
                    'error': 'No se encontraron datos válidos',
                    'message': 'Intenta con otra fecha o verifica la disponibilidad de datos'
                }), 404
            
            # Agregar datos complementarios (valores aproximados)
            df['dem'] = np.random.uniform(3000, 5000, len(df))  # Elevación aproximada Cusco
            df['lst'] = np.random.uniform(10, 25, len(df)) if layer_type == 'NDVI' else df['value']
            df['ndvi'] = df['value'] if layer_type == 'NDVI' else np.random.uniform(0.3, 0.8, len(df))
            
            # Introducir algunos valores NaN para simular gaps (nubes)
            mask = np.random.random(len(df)) < 0.15  # 15% de gaps
            df.loc[mask, 'ndvi'] = np.nan
            
            logger.info(f"Datos procesados: {len(df)} puntos, {mask.sum()} gaps")
            
            return jsonify(df.to_dict(orient='records'))
    
    except Exception as e:
        logger.error(f"Error en get_satellite_data: {str(e)}")
        return jsonify({
            'error': 'Error interno del servidor',
            'message': str(e)
        }), 500


@app.route('/api/gap-fill', methods=['POST'])
def gap_fill():
    """
    Rellena gaps en datos NDVI usando Random Forest
    Espera JSON con campo 'data' conteniendo array de objetos
    """
    try:
        input_data = request.json.get('data')
        
        if not input_data:
            return jsonify({'error': 'No se proporcionaron datos'}), 400
        
        df = pd.DataFrame(input_data)
        
        # Verificar columnas necesarias
        required_cols = ['lat', 'lon', 'dem', 'lst', 'ndvi']
        missing_cols = [col for col in required_cols if col not in df.columns]
        
        if missing_cols:
            return jsonify({
                'error': f'Faltan columnas requeridas: {missing_cols}'
            }), 400
        
        logger.info(f"Gap filling: {df['ndvi'].isna().sum()} gaps de {len(df)} puntos")
        
        # Aplicar modelo de gap-filling
        filled_df = gap_fill_ndvi(df)
        
        logger.info("Gap filling completado exitosamente")
        
        return jsonify(filled_df.to_dict(orient='records'))
    
    except Exception as e:
        logger.error(f"Error en gap_fill: {str(e)}")
        return jsonify({
            'error': 'Error al procesar gap filling',
            'message': str(e)
        }), 500


@app.route('/api/layers', methods=['GET'])
def get_available_layers():
    """Retorna las capas disponibles y su configuración"""
    return jsonify({
        'layers': {
            key: {
                'name': config['name'],
                'description': 'NDVI - Índice de Vegetación' if key == 'NDVI' else 'LST - Temperatura Superficial'
            }
            for key, config in LAYERS_CONFIG.items()
        }
    })


if __name__ == '__main__':
    app.run(debug=True, port=5000, host='0.0.0.0')