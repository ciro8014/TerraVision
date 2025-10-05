import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, WMSTileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';
import { Satellite, Calendar, Layers, RefreshCw, AlertTriangle, TrendingUp } from 'lucide-react';

// Fix para los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const InteractiveMap = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedLayer, setSelectedLayer] = useState('NDVI');
  const [date, setDate] = useState('2025-10-01');
  const [error, setError] = useState(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const cuscoCenter = [-13.5319, -71.9675];

  const layers = {
    NDVI: {
      name: 'MODIS_Terra_NDVI_8Day',
      title: 'NDVI',
      subtitle: 'Vegetación',
      description: 'Índice de Vegetación (MOD13Q1.061)',
      weight: '50%',
      icon: '🌱',
      color: 'green'
    },
    LST: {
      name: 'MODIS_Terra_Land_Surface_Temp_Day',
      title: 'LST',
      subtitle: 'Temperatura',
      description: 'Temperatura Superficial (MOD11A2.061)',
      weight: '25%',
      icon: '🌡️',
      color: 'orange'
    }
  };

  const fetchSatelliteData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get('http://localhost:5000/api/satellite-data', {
        params: {
          layer: selectedLayer,
          date: date
        }
      });
      
      const filledRes = await axios.post('http://localhost:5000/api/gap-fill', { 
        data: res.data 
      });
      
      setData(filledRes.data);
    } catch (err) {
      console.error('Error al cargar datos:', err);
      setError(
        err.response 
          ? `Error del servidor: ${err.response.data.message || err.response.statusText}`
          : 'Error al conectar con el backend. Usando datos de ejemplo.'
      );
      
      const mockData = generateMockData();
      setData(mockData);
    } finally {
      setLoading(false);
    }
  };

  const generateMockData = () => {
    const points = [];
    for (let i = 0; i < 20; i++) {
      points.push({
        lat: -13.5319 + (Math.random() - 0.5) * 0.1,
        lon: -71.9675 + (Math.random() - 0.5) * 0.1,
        ndvi: Math.random() * 0.8 + 0.2,
        lst: Math.random() * 15 + 10,
        dem: Math.random() * 2000 + 3000
      });
    }
    return points;
  };

  const getRiskLevel = (ndvi) => {
    if (ndvi < 0.3) return { level: 'Crítico', color: '#ef4444', emoji: '🔴' };
    if (ndvi < 0.4) return { level: 'Alto', color: '#f97316', emoji: '🟠' };
    if (ndvi < 0.5) return { level: 'Medio', color: '#eab308', emoji: '🟡' };
    return { level: 'Bajo', color: '#22c55e', emoji: '🟢' };
  };

  const stats = {
    total: data.length,
    avgNdvi: data.length > 0 ? (data.reduce((acc, p) => acc + p.ndvi, 0) / data.length).toFixed(3) : '--',
    atRisk: data.filter(p => p.ndvi < 0.4).length,
    critical: data.filter(p => p.ndvi < 0.3).length
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: 'calc(100vh - 80px)',
      width: '100%',
      overflow: 'hidden',
      backgroundColor: '#f9fafb'
    }}>
      {/* Sidebar Vertical */}
      <div style={{
        width: sidebarCollapsed ? '64px' : '320px',
        backgroundColor: 'white',
        boxShadow: '2px 0 10px rgba(0,0,0,0.1)',
        transition: 'width 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 1000
      }}>
        {/* Header del Sidebar */}
        <div style={{
          padding: '24px',
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          color: 'white',
          flexShrink: 0
        }}>
          {!sidebarCollapsed ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <Satellite size={32} />
                <h1 style={{ fontSize: '24px', fontWeight: 'bold', margin: 0 }}>Mapa Satelital</h1>
              </div>
              <p style={{ fontSize: '14px', color: '#d1fae5', margin: 0 }}>Cusco, Perú</p>
            </>
          ) : (
            <Satellite size={24} style={{ margin: '0 auto', display: 'block' }} />
          )}
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          style={{
            position: 'absolute',
            top: '24px',
            right: sidebarCollapsed ? '8px' : '16px',
            zIndex: 10,
            backgroundColor: 'white',
            color: '#059669',
            padding: '8px',
            borderRadius: '8px',
            border: 'none',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          {sidebarCollapsed ? '→' : '←'}
        </button>

        {!sidebarCollapsed && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '24px' }}>
            {/* Selector de Capa */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Layers size={20} />
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Capa Satelital</label>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {Object.entries(layers).map(([key, layer]) => (
                  <button
                    key={key}
                    onClick={() => setSelectedLayer(key)}
                    style={{
                      width: '100%',
                      padding: '16px',
                      borderRadius: '8px',
                      border: selectedLayer === key ? '2px solid #10b981' : '2px solid #e5e7eb',
                      backgroundColor: selectedLayer === key ? '#d1fae5' : 'white',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                      <span style={{ fontSize: '24px' }}>{layer.icon}</span>
                      <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        backgroundColor: selectedLayer === key ? '#10b981' : '#f3f4f6',
                        color: selectedLayer === key ? 'white' : '#6b7280'
                      }}>
                        {layer.weight}
                      </span>
                    </div>
                    <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{layer.title}</div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>{layer.subtitle}</div>
                  </button>
                ))}
              </div>
              <div style={{ marginTop: '12px', padding: '12px', backgroundColor: '#dbeafe', borderRadius: '8px' }}>
                <p style={{ fontSize: '12px', color: '#1e40af', margin: 0 }}>
                  {layers[selectedLayer].description}
                </p>
              </div>
            </div>

            {/* Selector de Fecha */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <Calendar size={20} />
                <label style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>Fecha</label>
              </div>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px',
                  border: '2px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '14px'
                }}
              />
            </div>

            {/* Botón de Carga */}
            <button
              onClick={fetchSatelliteData}
              disabled={loading}
              style={{
                width: '100%',
                padding: '16px',
                background: loading ? '#9ca3af' : 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginBottom: '24px',
                fontSize: '14px'
              }}
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
              <span>{loading ? 'Cargando...' : 'Cargar Datos'}</span>
            </button>

            {/* Error Message */}
            {error && (
              <div style={{ 
                padding: '12px', 
                backgroundColor: '#fef2f2', 
                borderLeft: '4px solid #ef4444', 
                borderRadius: '4px',
                marginBottom: '24px'
              }}>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <AlertTriangle size={20} color="#ef4444" />
                  <p style={{ fontSize: '12px', color: '#991b1b', margin: 0 }}>{error}</p>
                </div>
              </div>
            )}

            {/* Estadísticas */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <TrendingUp size={20} />
                <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#374151', margin: 0 }}>Estadísticas</h3>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ padding: '16px', background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', borderRadius: '8px', border: '1px solid #10b981' }}>
                  <p style={{ fontSize: '12px', color: '#065f46', margin: '0 0 4px 0' }}>Puntos Analizados</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#047857', margin: 0 }}>{stats.total}</p>
                </div>
                
                <div style={{ padding: '16px', background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', borderRadius: '8px', border: '1px solid #3b82f6' }}>
                  <p style={{ fontSize: '12px', color: '#1e3a8a', margin: '0 0 4px 0' }}>NDVI Promedio</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#1d4ed8', margin: 0 }}>{stats.avgNdvi}</p>
                </div>
                
                <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', borderRadius: '8px', border: '1px solid #f59e0b' }}>
                  <p style={{ fontSize: '12px', color: '#78350f', margin: '0 0 4px 0' }}>Puntos en Riesgo</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#b45309', margin: 0 }}>{stats.atRisk}</p>
                </div>
                
                <div style={{ padding: '16px', background: 'linear-gradient(135deg, #fee2e2 0%, #fecaca 100%)', borderRadius: '8px', border: '1px solid #ef4444' }}>
                  <p style={{ fontSize: '12px', color: '#7f1d1d', margin: '0 0 4px 0' }}>Alertas Críticas</p>
                  <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#b91c1c', margin: 0 }}>{stats.critical}</p>
                </div>
              </div>

              {/* Leyenda */}
              <div style={{ marginTop: '24px' }}>
                <h4 style={{ fontSize: '12px', fontWeight: '600', color: '#374151', marginBottom: '12px' }}>Leyenda de Riesgo</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#ef4444' }}></div>
                    <span style={{ color: '#6b7280' }}>{'<'} 0.3 - Crítico</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#f97316' }}></div>
                    <span style={{ color: '#6b7280' }}>0.3-0.4 - Alto</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#eab308' }}></div>
                    <span style={{ color: '#6b7280' }}>0.4-0.5 - Medio</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                    <div style={{ width: '12px', height: '12px', borderRadius: '50%', backgroundColor: '#22c55e' }}></div>
                    <span style={{ color: '#6b7280' }}>{'>'} 0.5 - Bajo</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {sidebarCollapsed && (
          <div style={{ 
            flex: 1, 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            padding: '32px 0',
            gap: '24px'
          }}>
            <div style={{ textAlign: 'center' }}>
              <Layers size={24} color="#9ca3af" />
              <div style={{ fontSize: '24px', marginTop: '8px' }}>{layers[selectedLayer].icon}</div>
            </div>
            
            <button
              onClick={fetchSatelliteData}
              disabled={loading}
              style={{
                padding: '12px',
                backgroundColor: loading ? '#9ca3af' : '#10b981',
                color: 'white',
                borderRadius: '8px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer'
              }}
            >
              <RefreshCw size={20} className={loading ? 'animate-spin' : ''} />
            </button>

            <div style={{ textAlign: 'center', marginTop: '32px' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#10b981' }}>{stats.total}</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Puntos</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ef4444' }}>{stats.critical}</div>
              <div style={{ fontSize: '10px', color: '#6b7280' }}>Críticos</div>
            </div>
          </div>
        )}
      </div>

      {/* Mapa Principal */}
      <div style={{ flex: 1, position: 'relative', height: '100%' }}>
        <MapContainer
          center={cuscoCenter}
          zoom={11}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          />

          <WMSTileLayer
            url="https://gibs.earthdata.nasa.gov/wms/epsg4326/best/wms.cgi"
            layers={layers[selectedLayer].name}
            format="image/png"
            transparent={true}
            time={date}
            version="1.3.0"
            attribution="NASA GIBS"
            opacity={0.7}
          />

          {data.map((point, idx) => {
            const risk = getRiskLevel(point.ndvi);
            return (
              <Marker key={idx} position={[point.lat, point.lon]}>
                <Popup>
                  <div style={{ padding: '8px', minWidth: '200px' }}>
                    <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginBottom: '8px', color: '#1f2937', borderBottom: '2px solid #e5e7eb', paddingBottom: '8px' }}>
                      Punto #{idx + 1}
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', fontSize: '14px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>NDVI:</strong> 
                        <span style={{ fontFamily: 'monospace' }}>{point.ndvi.toFixed(3)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Riesgo:</strong> 
                        <span style={{ color: risk.color, fontWeight: '600' }}>
                          {risk.emoji} {risk.level}
                        </span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>LST:</strong> 
                        <span>{point.lst.toFixed(1)}°C</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <strong>Elevación:</strong> 
                        <span>{point.dem.toFixed(0)} m</span>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '12px', paddingTop: '8px', borderTop: '1px solid #e5e7eb' }}>
                      <p style={{ margin: '2px 0' }}>Lat: {point.lat.toFixed(4)}</p>
                      <p style={{ margin: '2px 0' }}>Lon: {point.lon.toFixed(4)}</p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>

        {/* Indicador de capa activa */}
        <div style={{
          position: 'absolute',
          top: '16px',
          right: '16px',
          zIndex: 1000,
          backgroundColor: 'white',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
          padding: '16px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '28px' }}>{layers[selectedLayer].icon}</span>
            <div>
              <div style={{ fontWeight: 'bold', color: '#1f2937' }}>{layers[selectedLayer].title}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>{layers[selectedLayer].subtitle}</div>
            </div>
          </div>
        </div>

        {/* Marca de agua NASA */}
        <div style={{
          position: 'absolute',
          bottom: '16px',
          right: '16px',
          zIndex: 1000,
          backgroundColor: 'rgba(0,0,0,0.7)',
          color: 'white',
          fontSize: '12px',
          padding: '8px 12px',
          borderRadius: '8px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Satellite size={16} />
            <span>NASA GIBS • {date}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;