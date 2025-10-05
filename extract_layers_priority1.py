# extract_layers_priority1.py

import requests
import json
from typing import Dict, List

class TerraLayerExtractor:
    """Extrae solo capas Priority 1 de productos Terra"""
    
    PRIORITY_CONFIG = {
        "MOD13Q1.061": ["_250m_16_days_NDVI", 
                        "_250m_16_days_pixel_reliability",
                        "_250m_16_days_VI_Quality"],
        
        "MOD11A2.061": ["LST_Day_1km", 
                        "QC_Day"],
        
        "MOD10A1.061": ["NDSI_Snow_Cover",
                        "NDSI_Snow_Cover_Basic_QA"],
        
        "MOD09Q1.061": ["sur_refl_b01",
                        "sur_refl_b02", 
                        "sur_refl_state_250m"],
        
        "MOD44W.006": ["water_mask"],
    }
    
    def extract_priority_layers(self, product_id: str) -> Dict:
        """
        Extrae SOLO las capas Priority 1 de un producto
        
        Args:
            product_id: Ej: "MOD13Q1.061"
            
        Returns:
            Dict con solo capas prioritarias
        """
        # Obtener todas las capas del producto
        url = f'https://appeears.earthdatacloud.nasa.gov/api/product/{product_id}'
        response = requests.get(url)
        
        if not response.ok:
            raise Exception(f"Error {response.status_code}: {response.text}")
        
        all_layers = response.json()
        
        # Filtrar solo Priority 1
        priority_layers = {}
        if product_id in self.PRIORITY_CONFIG:
            for layer_name in self.PRIORITY_CONFIG[product_id]:
                if layer_name in all_layers:
                    priority_layers[layer_name] = all_layers[layer_name]
                else:
                    print(f"⚠️  {layer_name} no encontrado en {product_id}")
        
        return priority_layers
    
    def generate_frontend_config(self, product_id: str) -> Dict:
        """
        Genera config para el frontend JSX
        """
        layers = self.extract_priority_layers(product_id)
        
        frontend_config = {
            "product": product_id,
            "layers": []
        }
        
        for layer_name, layer_info in layers.items():
            # Solo capas de visualización (no QA)
            if not layer_info.get("IsQA", False):
                frontend_config["layers"].append({
                    "id": layer_name,
                    "title": layer_info.get("Description", layer_name),
                    "dataType": layer_info.get("DataType"),
                    "validRange": [
                        layer_info.get("ValidMin"),
                        layer_info.get("ValidMax")
                    ],
                    "units": layer_info.get("Units", ""),
                    "colormap": self._get_colormap(layer_name),
                    "opacity": 0.7,
                    "visible": True if "NDVI" in layer_name or "LST" in layer_name else False
                })
        
        return frontend_config
    
    def generate_ml_config(self, product_id: str) -> Dict:
        """
        Genera config para modelos ML
        """
        layers = self.extract_priority_layers(product_id)
        
        ml_config = {
            "product": product_id,
            "data_layers": [],
            "qa_layers": []
        }
        
        for layer_name, layer_info in layers.items():
            layer_config = {
                "name": layer_name,
                "dtype": layer_info.get("OrigDataType"),
                "scale_factor": layer_info.get("ScaleFactor"),
                "add_offset": layer_info.get("AddOffset"),
                "fill_value": layer_info.get("FillValue"),
                "valid_range": [
                    layer_info.get("OrigValidMin"),
                    layer_info.get("OrigValidMax")
                ]
            }
            
            if layer_info.get("IsQA", False):
                ml_config["qa_layers"].append(layer_config)
            else:
                ml_config["data_layers"].append(layer_config)
        
        return ml_config
    
    def _get_colormap(self, layer_name: str) -> str:
        """Retorna colormap apropiado según tipo de capa"""
        colormaps = {
            "NDVI": "RdYlGn",
            "EVI": "Greens",
            "LST": "RdYlBu_r",
            "Snow": "Blues",
            "water": "Blues",
        }
        
        for key, cmap in colormaps.items():
            if key.lower() in layer_name.lower():
                return cmap
        
        return "viridis"  # Default
    
    def save_configs(self, product_id: str):
        """Guarda configs para frontend y ML"""
        
        # Config completo Priority 1
        priority_layers = self.extract_priority_layers(product_id)
        with open(f"config/{product_id}_priority1.json", 'w') as f:
            json.dump(priority_layers, f, indent=2)
        
        # Config para Frontend
        frontend_config = self.generate_frontend_config(product_id)
        with open(f"config/{product_id}_frontend.json", 'w') as f:
            json.dump(frontend_config, f, indent=2)
        
        # Config para ML
        ml_config = self.generate_ml_config(product_id)
        with open(f"config/{product_id}_ml.json", 'w') as f:
            json.dump(ml_config, f, indent=2)
        
        print(f"✅ Configs generados para {product_id}")
        print(f"   - {len(priority_layers)} capas priority 1")
        print(f"   - {len(frontend_config['layers'])} capas frontend")
        print(f"   - {len(ml_config['data_layers'])} capas data ML")
        print(f"   - {len(ml_config['qa_layers'])} capas QA ML")


# ═══════════════════════════════════════════════════════
# USO
# ═══════════════════════════════════════════════════════

if __name__ == "__main__":
    extractor = TerraLayerExtractor()
    
    # Productos Priority 1
    productos = [
        "MOD13Q1.061",
        "MOD11A2.061", 
        "MOD10A1.061",
        "ASTGTM.002"
    ]
    
    for producto in productos:
        print(f"\n{'='*50}")
        print(f"Procesando: {producto}")
        print(f"{'='*50}")
        extractor.save_configs(producto)
    
    print("\n✅ Todos los configs Priority 1 generados!")