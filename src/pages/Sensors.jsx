import { Satellite, Eye, Mountain, Droplets, Wind, Flame } from 'lucide-react';
import { sensorData } from '../lib/mockData';

function Sensors() {
  const sensors = [
    {
      name: 'MODIS',
      fullName: 'Moderate Resolution Imaging Spectroradiometer',
      icon: <Eye size={48} color="#3b82f6" />,
      resolution: '250m - 1km',
      coverage: 'Daily (Terra: 10:30 AM)',
      bands: '36 spectral bands',
      cuscoUse: [
        'Daily vegetation monitoring (NDVI/EVI) across all 13 provinces',
        'Land Surface Temperature for frost prediction in Sacred Valley',
        'Snow cover tracking on Salkantay and Ausangate glaciers',
        'Fire detection during dry season (May-October)',
        'Cloud-free day statistics for agriculture planning'
      ],
      impact: 'Enables real-time crop monitoring for 50,000+ farming families',
      color: '#3b82f6'
    },
    {
      name: 'ASTER',
      fullName: 'Advanced Spaceborne Thermal Emission and Reflection Radiometer',
      icon: <Mountain size={48} color="#10b981" />,
      resolution: '15m - 90m',
      coverage: 'On-demand (every 16 days)',
      bands: '14 spectral bands (VNIR, SWIR, TIR)',
      cuscoUse: [
        'High-resolution DEM for glacier volume estimation (Salkantay: -35% since 2000)',
        'Urban expansion detection in Cusco city (15m resolution)',
        'Thermal mapping of Piuray lagoon for water management',
        'Archaeological site monitoring (Machu Picchu, Sacsayhuamán)',
        'Landslide detection on roads to Machu Picchu'
      ],
      impact: 'Critical for water supply planning and disaster prevention',
      color: '#10b981'
    },
    {
      name: 'MISR',
      fullName: 'Multi-angle Imaging SpectroRadiometer',
      icon: <Wind size={48} color="#a78bfa" />,
      resolution: '275m - 1.1km',
      coverage: 'Weekly (9 camera angles)',
      bands: '4 spectral bands, 9 viewing angles',
      cuscoUse: [
        'Aerosol monitoring for tourism visibility (affects 1.5M annual visitors)',
        'Cloud height analysis for precipitation prediction',
        '3D vegetation structure in cloud forests',
        'Air quality assessment in Cusco urban area',
        'Smoke detection from agricultural burning'
      ],
      impact: 'Protects tourism economy and public health monitoring',
      color: '#a78bfa'
    },
    {
      name: 'MOPITT',
      fullName: 'Measurements of Pollution in the Troposphere',
      icon: <Wind size={48} color="#f59e0b" />,
      resolution: '22km x 22km',
      coverage: 'Every 3 days',
      bands: 'CO concentration profiles',
      cuscoUse: [
        'Carbon monoxide tracking from vehicle emissions',
        'Biomass burning impact assessment',
        'Air quality trends in tourist high season',
        'Long-range pollution transport analysis',
        'Climate change impact on air composition'
      ],
      impact: 'Ensures air quality for residents and visitors',
      color: '#f59e0b'
    },
    {
      name: 'CERES',
      fullName: 'Clouds and Earth\'s Radiant Energy System',
      icon: <Flame size={48} color="#ef4444" />,
      resolution: '20km',
      coverage: 'Daily',
      bands: 'Shortwave, longwave, window channels',
      cuscoUse: [
        'Solar radiation measurement for solar energy projects',
        'Cloud radiative effect on glacier melting',
        'Energy budget analysis for climate studies',
        'Heat island effect in Cusco city',
        'Climate change attribution in the Andes'
      ],
      impact: 'Renewable energy planning and climate research',
      color: '#ef4444'
    }
  ];

  return (
    <div className="sensors-page">
      <div className="container">
        {/* Header */}
        <div className="sensors-header">
          <div className="header-content">
            <h1 className="page-title">Terra's Five Eyes on Cusco</h1>
            <p className="sensors-subtitle">
              How NASA's Terra satellite instruments monitor the Peruvian Andes
            </p>
          </div>
          <div className="terra-info">
            <Satellite size={64} color="#3b82f6" />
            <div>
              <h3>Terra Satellite</h3>
              <p>Launched: December 1999</p>
              <p>Orbit: Sun-synchronous (10:30 AM)</p>
              <p>Mission: 25+ years active</p>
            </div>
          </div>
        </div>

        {/* Sensors Grid */}
        <div className="sensors-grid">
          {sensors.map((sensor, index) => (
            <div key={index} className="sensor-card" style={{ borderLeftColor: sensor.color }}>
              <div className="sensor-header">
                <div className="sensor-icon" style={{ backgroundColor: `${sensor.color}20` }}>
                  {sensor.icon}
                </div>
                <div className="sensor-title-section">
                  <h2 className="sensor-name">{sensor.name}</h2>
                  <p className="sensor-full-name">{sensor.fullName}</p>
                </div>
              </div>

              <div className="sensor-specs">
                <div className="spec-item">
                  <span className="spec-label">Resolution</span>
                  <span className="spec-value">{sensor.resolution}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Coverage</span>
                  <span className="spec-value">{sensor.coverage}</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Bands</span>
                  <span className="spec-value">{sensor.bands}</span>
                </div>
              </div>

              <div className="sensor-cusco">
                <h3>Applications in Cusco:</h3>
                <ul>
                  {sensor.cuscoUse.map((use, i) => (
                    <li key={i}>{use}</li>
                  ))}
                </ul>
              </div>

              <div className="sensor-impact" style={{ borderLeftColor: sensor.color }}>
                <strong>Real Impact:</strong> {sensor.impact}
              </div>
            </div>
          ))}
        </div>

        {/* Integration Section */}
        <div className="integration-section">
          <h2 className="section-title">Multi-Sensor Data Fusion</h2>
          <div className="integration-content">
            <div className="integration-card">
              <h3>🔗 Complementary Coverage</h3>
              <p>
                <strong>MODIS</strong> provides daily overview (250m) → <strong>ASTER</strong> zooms to details (15m) → 
                <strong>MISR</strong> adds 3D perspective → <strong>MOPITT</strong> measures air quality → 
                <strong>CERES</strong> tracks energy balance
              </p>
            </div>

            <div className="integration-card">
              <h3>🌊 Water Crisis Example (2016)</h3>
              <p>
                <strong>MODIS:</strong> Detected declining snow cover 3 months early<br/>
                <strong>ASTER:</strong> Measured 40% reduction in Piuray lagoon volume<br/>
                <strong>Result:</strong> Early warning enabled water rationing plan, preventing complete shortage
              </p>
            </div>

            <div className="integration-card">
              <h3>🏔️ Glacier Monitoring Pipeline</h3>
              <p>
                <strong>Step 1:</strong> MODIS tracks daily snow extent<br/>
                <strong>Step 2:</strong> ASTER generates high-res DEM every 2 years<br/>
                <strong>Step 3:</strong> ML model fills gaps during cloud cover<br/>
                <strong>Output:</strong> Complete 25-year glacier retreat atlas
              </p>
            </div>
          </div>
        </div>

        {/* Data Availability */}
        <div className="data-section">
          <h2 className="section-title">Data Access for Cusco</h2>
          <div className="data-grid">
            <div className="data-card">
              <h3>📡 NASA Earthdata</h3>
              <p>Free access to all Terra products</p>
              <a href="https://earthdata.nasa.gov" target="_blank" rel="noopener noreferrer" className="data-link">
                earthdata.nasa.gov →
              </a>
            </div>
            <div className="data-card">
              <h3>🗺️ AppEEARS</h3>
              <p>Extract data for Cusco coordinates</p>
              <a href="https://appeears.earthdatacloud.nasa.gov" target="_blank" rel="noopener noreferrer" className="data-link">
                appeears.earthdatacloud.nasa.gov →
              </a>
            </div>
            <div className="data-card">
              <h3>💾 Our Processing</h3>
              <p>25 years pre-processed for Cusco</p>
              <a href="/data" className="data-link">
                Download Datasets →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sensors;