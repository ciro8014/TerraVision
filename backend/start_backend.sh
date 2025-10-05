#!/bin/bash

# Script para iniciar el backend de TerraVision

echo "🚀 Iniciando TerraVision Backend..."

# Verificar si existe el entorno virtual
if [ ! -d "venv" ]; then
    echo "📦 Creando entorno virtual..."
    python3 -m venv venv
fi

# Activar entorno virtual
echo "🔧 Activando entorno virtual..."
source venv/bin/activate

# Instalar/actualizar dependencias
echo "📥 Instalando dependencias..."
pip install -r requirements.txt --quiet

# Iniciar servidor
echo "✅ Backend listo! Iniciando servidor en http://localhost:5000"
echo "   Presiona Ctrl+C para detener"
echo ""
python app.py