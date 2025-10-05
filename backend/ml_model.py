import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestRegressor
from sklearn.model_selection import train_test_split
import logging

logger = logging.getLogger(__name__)


def gap_fill_ndvi(data_df):
    """
    Rellena gaps en NDVI usando Random Forest.
    
    Parameters:
    -----------
    data_df : pd.DataFrame
        DataFrame con columnas ['lat', 'lon', 'dem', 'lst', 'ndvi']
        donde 'ndvi' puede contener valores NaN (gaps por nubes).
    
    Returns:
    --------
    pd.DataFrame
        DataFrame con los valores NDVI rellenados
    """
    try:
        # Hacer una copia para no modificar el original
        df = data_df.copy()
        
        # Separar datos completos e incompletos
        complete = df.dropna(subset=['ndvi'])
        incomplete = df[df['ndvi'].isna()]
        
        # Si no hay gaps, retornar directamente
        if incomplete.empty:
            logger.info("No hay gaps para rellenar")
            return df
        
        # Si no hay suficientes datos completos para entrenar
        if len(complete) < 10:
            logger.warning("Datos insuficientes para entrenar modelo, usando promedio")
            mean_ndvi = complete['ndvi'].mean() if len(complete) > 0 else 0.5
            df.loc[df['ndvi'].isna(), 'ndvi'] = mean_ndvi
            return df
        
        # Features para el modelo
        features = ['lat', 'lon', 'dem', 'lst']
        
        # Preparar datos de entrenamiento
        X_train = complete[features]
        y_train = complete['ndvi']
        
        # Entrenar modelo Random Forest
        logger.info(f"Entrenando modelo con {len(complete)} puntos completos")
        model = RandomForestRegressor(
            n_estimators=50,
            max_depth=10,
            min_samples_split=5,
            random_state=42,
            n_jobs=-1
        )
        model.fit(X_train, y_train)
        
        # Predecir valores faltantes
        X_pred = incomplete[features]
        predicted_ndvi = model.predict(X_pred)
        
        # Limitar valores predichos al rango válido de NDVI [-1, 1]
        predicted_ndvi = np.clip(predicted_ndvi, -1.0, 1.0)
        
        # Rellenar gaps
        df.loc[df['ndvi'].isna(), 'ndvi'] = predicted_ndvi
        
        # Calcular métricas de calidad
        feature_importance = dict(zip(features, model.feature_importances_))
        logger.info(f"Gaps rellenados: {len(incomplete)}")
        logger.info(f"Feature importance: {feature_importance}")
        
        return df
    
    except Exception as e:
        logger.error(f"Error en gap_fill_ndvi: {str(e)}")
        # En caso de error, retornar datos originales
        return data_df


def validate_ndvi_data(df):
    """
    Valida que los datos NDVI estén en rangos aceptables
    
    Parameters:
    -----------
    df : pd.DataFrame
        DataFrame con columna 'ndvi'
    
    Returns:
    --------
    pd.DataFrame
        DataFrame con valores NDVI validados
    """
    df = df.copy()
    
    # NDVI debe estar entre -1 y 1
    df['ndvi'] = df['ndvi'].clip(-1.0, 1.0)
    
    # Marcar valores extremos como sospechosos
    df['ndvi_quality'] = 'good'
    df.loc[df['ndvi'] < -0.2, 'ndvi_quality'] = 'suspicious'
    df.loc[df['ndvi'] > 0.95, 'ndvi_quality'] = 'suspicious'
    
    return df


def calculate_vegetation_index(df):
    """
    Calcula índices adicionales de vegetación basados en NDVI
    
    Parameters:
    -----------
    df : pd.DataFrame
        DataFrame con columna 'ndvi'
    
    Returns:
    --------
    pd.DataFrame
        DataFrame con índices adicionales
    """
    df = df.copy()
    
    # Categorías de salud de vegetación
    conditions = [
        (df['ndvi'] < 0.2),
        (df['ndvi'] >= 0.2) & (df['ndvi'] < 0.4),
        (df['ndvi'] >= 0.4) & (df['ndvi'] < 0.6),
        (df['ndvi'] >= 0.6)
    ]
    categories = ['Suelo desnudo/Agua', 'Vegetación escasa', 'Vegetación moderada', 'Vegetación densa']
    df['vegetation_category'] = np.select(conditions, categories, default='Desconocido')
    
    # Riesgo de sequía basado en NDVI
    drought_conditions = [
        (df['ndvi'] < 0.3),
        (df['ndvi'] >= 0.3) & (df['ndvi'] < 0.4),
        (df['ndvi'] >= 0.4) & (df['ndvi'] < 0.5),
        (df['ndvi'] >= 0.5)
    ]
    drought_levels = ['Crítico', 'Alto', 'Medio', 'Bajo']
    df['drought_risk'] = np.select(drought_conditions, drought_levels, default='Desconocido')
    
    return df


# Función de prueba
if __name__ == "__main__":
    # Datos de ejemplo para testing
    np.random.seed(42)
    
    test_data = pd.DataFrame({
        'lat': np.repeat(-13.5, 50),
        'lon': np.repeat(-72.0, 50),
        'dem': np.random.uniform(3000, 5000, 50),
        'lst': np.random.uniform(10, 25, 50),
        'ndvi': np.random.uniform(0.2, 0.8, 50)
    })
    
    # Introducir algunos NaN
    test_data.loc[np.random.choice(50, 10, replace=False), 'ndvi'] = np.nan
    
    print("Datos originales:")
    print(f"Valores completos: {test_data['ndvi'].notna().sum()}")
    print(f"Valores NaN: {test_data['ndvi'].isna().sum()}")
    
    # Aplicar gap filling
    filled_data = gap_fill_ndvi(test_data)
    
    print("\nDatos después de gap filling:")
    print(f"Valores completos: {filled_data['ndvi'].notna().sum()}")
    print(f"Valores NaN: {filled_data['ndvi'].isna().sum()}")
    
    # Agregar índices
    final_data = calculate_vegetation_index(filled_data)
    print("\nCategorías de vegetación:")
    print(final_data['vegetation_category'].value_counts())