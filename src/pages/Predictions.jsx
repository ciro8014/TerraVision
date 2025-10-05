import { Calendar, TrendingUp, Brain, Download, CheckCircle, Satellite, Activity } from 'lucide-react';
import PredictionChart from '../components/charts/PredictionChart';
import ModelComparison from '../components/charts/ModelComparison';
import { predictions } from '../lib/mockData';

function Predictions() {
  const avgPrediction = predictions.reduce((sum, p) => sum + p.evi_pred, 0) / predictions.length;
  const trend = avgPrediction > 0.5 ? 'Favorable' : 'Monitor';

  const pipelinePhases = [
    { phase: 'PHASE 1: Multi-Sensor Acquisition', status: 'completed', detail: '3 products downloaded' },
    { phase: 'PHASE 2: Resolution Harmonization', status: 'completed', detail: '15m→250m→1km harmonized' },
    { phase: 'PHASE 3: Multi-Source Quality Check', status: 'completed', detail: 'Quality check: 82% (multi-sensor)' },
    { phase: 'PHASE 3.5: Spatial Fusion', status: 'completed', detail: 'Spatial fusion completed' },
    { phase: 'PHASE 4: ML Multi-Input Processing', status: 'completed', detail: 'Multi-sensor forecast completed' },
    { phase: 'PHASE 5: Spatiotemporal Storage', status: 'completed', detail: 'Data stored in PostGIS + TimescaleDB' }
  ];

  const sensorConfig = [
    {
      name: 'MOD13Q1.061',
      title: 'Temporal NDVI Baseline',
      icon: '🌿',
      resolution: '250m',
      temporal: '16 days',
      layer: '_250m_16_days_NDVI',
      scale: '0.0001',
      qa: '2 layers',
      role: 'Temporal NDVI baseline (2000-2025)',
      weight: '50% weight'
    },
    {
      name: 'MOD11A2.061',
      title: 'Land Surface Temperature',
      icon: '🌡',
      resolution: '1km',
      temporal: '8 days',
      layer: 'LST_Day_1km',
      scale: '0.02 K',
      role: 'Nighttime frost alerts',
      weight: '25% weight'
    },
    {
      name: 'ASTER L1B VNIR',
      title: 'Individual Parcels',
      icon: '📡',
      resolution: '15m',
      bands: '2, 3N',
      formula: '(NIR - Red) / (NIR + Red)',
      subsystem: 'VNIR (Bands 1, 2, 3N)',
      role: 'Individual parcels + High-resolution NDVI',
      weight: '15% weight'
    },
    {
      name: 'ASTER L1B SWIR',
      title: 'Water Stress',
      icon: '💧',
      resolution: '30m',
      bands: '4-9',
      range: '1.60-2.43 µm',
      role: 'Water stress / soil moisture',
      weight: '10% weight'
    }
  ];

  const mlModels = [
    {
      name: 'Model 1: U-Net Gap Filling',
      input: 'MOD13Q1 NDVI + pixel_reliability mask',
      output: 'Gap-free NDVI',
      accuracy: '94.0%',
      latency: '5.2s'
    },
    {
      name: 'Model 2: Spatial Fusion',
      input: 'ASTER 15m → MOD13Q1 250m',
      method: 'Deep Learning downscaling',
      r2: '0.91',
      latency: '8.5s'
    },
    {
      name: 'Model 3: ConvLSTM Forecast',
      input: 'NDVI + LST + SWIR (6 frames)',
      output: '+16 days prediction',
      r2: '0.87',
      latency: '12.3s'
    }
  ];

  const nextPredictions = [
    { date: '2026-01-01', ndvi: 0.574, confidence: '[0.454, 0.694]', frost: 'low', swir: 0.35, quality: 'medium', conf: '92.2%' },
    { date: '2026-01-17', ndvi: 0.653, confidence: '[0.533, 0.773]', frost: 'low', swir: 0.50, quality: 'high', conf: '90.4%' },
    { date: '2026-02-02', ndvi: 0.709, confidence: '[0.589, 0.829]', frost: 'low', swir: 0.65, quality: 'high', conf: '84.1%' },
    { date: '2026-02-18', ndvi: 0.732, confidence: '[0.612, 0.852]', frost: 'low', swir: 0.65, quality: 'medium', conf: '92.2%' },
    { date: '2026-03-06', ndvi: 0.788, confidence: '[0.668, 0.908]', frost: 'low', swir: 0.76, quality: 'high', conf: '90.8%' },
    { date: '2026-03-22', ndvi: 0.771, confidence: '[0.651, 0.891]', frost: 'low', swir: 0.76, quality: 'high', conf: '87.0%' }
  ];

  return (
    <div className="predictions-page">
      <div className="container">
        {/* Header */}
        <div className="predictions-header">
          <div>
            <h1 className="page-title">Multi-Sensor ML Pipeline</h1>
            <p className="predictions-subtitle">
              MOD13Q1 (250m) + ASTER L1B (15m) + MOD11A2 LST | ConvLSTM Multi-Input Forecasting
            </p>
          </div>
          <button className="btn btn-primary">
            <Download size={20} />
            Export Multi-Sensor Data
          </button>
        </div>

        {/* Pipeline Phases */}
        <div className="pipeline-section">
          <h2 className="section-title-small">Multi-Sensor ML Pipeline</h2>
          <div className="pipeline-phases">
            {pipelinePhases.map((phase, idx) => (
              <div key={idx} className="pipeline-phase">
                <div className="phase-header">
                  <CheckCircle size={20} color="#10b981" />
                  <span className="phase-status">{phase.status}</span>
                </div>
                <div className="phase-title">{phase.phase}</div>
                <div className="phase-detail">{phase.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Sensor Configuration */}
        <div className="sensor-config-section">
          <h2 className="section-title-small">Multi-Sensor Configuration for ML</h2>
          <div className="sensor-grid">
            {sensorConfig.map((sensor, idx) => (
              <div key={idx} className="sensor-config-card">
                <div className="sensor-header">
                  <span className="sensor-icon">{sensor.icon}</span>
                  <div>
                    <h3>{sensor.name}</h3>
                    <p>{sensor.title}</p>
                  </div>
                </div>
                <div className="sensor-specs">
                  <div className="spec-row">
                    <strong>RESOLUTION:</strong> {sensor.resolution}
                  </div>
                  <div className="spec-row">
                    <strong>TEMPORAL:</strong> {sensor.temporal}
                  </div>
                  {sensor.layer && (
                    <div className="spec-row">
                      <strong>MAIN LAYER:</strong> {sensor.layer}
                    </div>
                  )}
                  {sensor.bands && (
                    <div className="spec-row">
                      <strong>BANDS:</strong> {sensor.bands}
                    </div>
                  )}
                  {sensor.scale && (
                    <div className="spec-row">
                      <strong>SCALE FACTOR:</strong> {sensor.scale}
                    </div>
                  )}
                </div>
                <div className="sensor-role">
                  <strong>Role:</strong> {sensor.role}
                </div>
                <div className="sensor-weight">{sensor.weight}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ML Architecture */}
        <div className="ml-architecture-section">
          <h2 className="section-title-small">🤖 Multi-Sensor ML Architecture</h2>
          <div className="ml-models-grid">
            {mlModels.map((model, idx) => (
              <div key={idx} className="ml-model-card">
                <h3>{model.name}</h3>
                <div className="model-detail">
                  <strong>Input:</strong> {model.input}
                </div>
                <div className="model-detail">
                  <strong>Output:</strong> {model.output}
                </div>
                {model.method && (
                  <div className="model-detail">
                    <strong>Method:</strong> {model.method}
                  </div>
                )}
                {model.accuracy && (
                  <div className="model-metric">
                    <strong>Accuracy:</strong> <span className="metric-value">{model.accuracy}</span>
                  </div>
                )}
                {model.r2 && (
                  <div className="model-metric">
                    <strong>R²:</strong> <span className="metric-value">{model.r2}</span>
                  </div>
                )}
                <div className="model-metric">
                  <strong>Latency:</strong> {model.latency}
                </div>
              </div>
            ))}
          </div>
          <div className="forecast-period">
            <Calendar size={32} color="#3b82f6" />
            <div>
              <h3>FORECAST PERIOD</h3>
              <div className="period-value">90 composites</div>
              <div className="period-label">~3 years | Multi-sensor fusion</div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="prediction-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <TrendingUp size={32} />
            </div>
            <div className="summary-content">
              <h3>NDVI TREND</h3>
              <p className="summary-value" style={{ color: '#10b981' }}>{trend}</p>
              <span className="summary-label">Avg NDVI: {avgPrediction.toFixed(3)} (15m-250m fusion)</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Brain size={32} />
            </div>
            <div className="summary-content">
              <h3>MODEL PERFORMANCE</h3>
              <p className="summary-value" style={{ color: '#3b82f6' }}>R² = 0.87</p>
              <span className="summary-label">Multi-Sensor ConvLSTM | 4 inputs</span>
            </div>
          </div>
        </div>

        {/* Main Prediction Chart */}
        <div className="chart-section">
          <h3 className="chart-title">NDVI Predictions with Confidence Intervals</h3>
          <p className="chart-subtitle">
            Predicted NDVI from ConvLSTM model (16-day composites)<br/>
            95% confidence interval based on model uncertainty
          </p>
          <PredictionChart data={predictions} />
        </div>

        {/* Model Comparison */}
        <div className="chart-section">
          <h3 className="chart-title">Comparison of ML Models</h3>
          <ModelComparison />
        </div>

        {/* Predictions Table */}
        <div className="predictions-table-section">
          <h2 className="section-title-small">Next 6 Multi-Sensor Predictions (96 days)</h2>
          <div className="predictions-table">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>NDVI Fused</th>
                  <th>Confidence Interval</th>
                  <th>Frost Risk</th>
                  <th>SWIR Moisture</th>
                  <th>Quality</th>
                  <th>Confidence</th>
                </tr>
              </thead>
              <tbody>
                {nextPredictions.map((pred, idx) => (
                  <tr key={idx}>
                    <td>{pred.date}</td>
                    <td><strong>{pred.ndvi.toFixed(3)}</strong></td>
                    <td>{pred.confidence}</td>
                    <td><span className={`risk-badge risk-${pred.frost}`}>{pred.frost}</span></td>
                    <td>{pred.swir.toFixed(2)}</td>
                    <td>{pred.quality}</td>
                    <td><strong>{pred.conf}</strong></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Technical Info */}
        <div className="info-section">
          <div className="info-card">
            <h3>📊 Multi-Sensor Data Pipeline</h3>
            <ul>
              <li><strong>MOD13Q1.061:</strong> 250m NDVI temporal baseline (2000-2025, 575 composites)</li>
              <li><strong>ASTER L1B VNIR:</strong> 15m high-resolution NDVI for individual parcels</li>
              <li><strong>MOD11A2:</strong> 1km LST for nighttime frost alerts</li>
              <li><strong>ASTER SWIR:</strong> 30m water stress detection</li>
              <li><strong>Fusion:</strong> Spatial downscaling + Temporal harmonization</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>🔬 ML Multi-Input Methodology</h3>
            <ul>
              <li>▹ Spatial Fusion: ASTER 15m → MOD13Q1 250m deep learning downscaling</li>
              <li>▹ Gap Filling: U-Net with pixel_reliability + VI_Quality masks</li>
              <li>▹ Multi-Input Forecasting: ConvLSTM with NDVI + LST + SWIR + temporal features</li>
              <li>▹ Resolution Harmonization: Cubic convolution resampling (ASTER L1B)</li>
              <li>▹ Quality Weighting: Sensors weighted by temporal reliability</li>
              <li>▹ Validation: Multi-resolution cross-validation R² = 0.93</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>⚠️ Multi-Sensor Considerations</h3>
            <ul>
              <li><strong>ASTER Availability:</strong> On-demand, lower temporal frequency than MODIS</li>
              <li><strong>Resolution Trade-off:</strong> 15m detail vs 250m temporal continuity</li>
              <li><strong>Cloud Coverage:</strong> VNIR/SWIR affected, TIR partially penetrates clouds</li>
              <li><strong>Fusion Uncertainty:</strong> Confidence intervals include downscaling error</li>
              <li><strong>Computational Cost:</strong> ~26.0s total (3 models)</li>
              <li><strong>Calibration:</strong> ASTER L1B radiometric + geometric (UTM) applied</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predictions;