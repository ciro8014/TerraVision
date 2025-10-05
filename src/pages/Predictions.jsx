import { useState, useEffect } from 'react';
import { Calendar, TrendingUp, Brain, Download, Database, Cpu, CheckCircle, Layers, Thermometer, Satellite } from 'lucide-react';
import PredictionChart from '../components/charts/PredictionChart';
import ModelComparison from '../components/charts/ModelComparison';

// Import configuration for all sensors for ML
import MOD13Q1_ML_CONFIG from '../../config/MOD13Q1.061_ml.json';
import MOD11A2_ML_CONFIG from '../../config/MOD11A2.061_ml.json';
import ASTER_L1B_ML_CONFIG from '../../config/ASTER_L1B_ml.json';

function Predictions() {
  // State to simulate multi-sensor ML pipeline
  const [pipelineStatus, setPipelineStatus] = useState({
    acquisition: { 
      status: 'completed', 
      progress: 100, 
      message: '3 products downloaded',
      sensors: ['MOD13Q1', 'MOD11A2', 'ASTER L1B']
    },
    preprocessing: { 
      status: 'completed', 
      progress: 100, 
      message: 'Multi-resolution processed',
      details: '15m→250m→1km harmonized'
    },
    gapDetection: { 
      status: 'completed', 
      progress: 100, 
      message: 'Quality check: 82% (multi-sensor)',
      modis_quality: '75%',
      aster_quality: '89%'
    },
    fusion: {
      status: 'completed',
      progress: 100,
      message: 'Spatial fusion completed',
      method: 'ASTER 15m → MOD13Q1 250m downscaling'
    },
    mlProcessing: { 
      status: 'running', 
      progress: 68, 
      message: 'ConvLSTM multi-input forecasting...',
      models: ['U-Net Gap Fill', 'Spatial Fusion', 'ConvLSTM Forecast']
    },
    storage: { 
      status: 'pending', 
      progress: 0, 
      message: 'Waiting for multi-layer predictions'
    }
  });

  // Active sensors configuration
  const [sensorConfig] = useState({
    modis_ndvi: {
      product: MOD13Q1_ML_CONFIG.product,
      resolution: '250m',
      temporal: '16 days',
      layers: MOD13Q1_ML_CONFIG.data_layers[0],
      qa: MOD13Q1_ML_CONFIG.qa_layers,
      role: 'Temporal NDVI baseline (2000-2025)',
      weight: 0.5
    },
    modis_lst: {
      product: MOD11A2_ML_CONFIG.product,
      resolution: '1km',
      temporal: '8 days',
      layer: MOD11A2_ML_CONFIG.data_layers[0],
      qa: MOD11A2_ML_CONFIG.qa_layers[0],
      role: 'Nighttime frost alerts',
      weight: 0.25
    },
    aster_vnir: {
      product: ASTER_L1B_ML_CONFIG.product,
      resolution: '15m',
      temporal: 'On-demand',
      bands: ASTER_L1B_ML_CONFIG.data_layers.filter(l => l.subsystem === 'VNIR'),
      ndvi_calc: ASTER_L1B_ML_CONFIG.ndvi_calculation,
      role: 'Individual parcels + High-resolution NDVI',
      weight: 0.15
    },
    aster_swir: {
      product: 'ASTER L1B SWIR',
      resolution: '30m',
      bands: ASTER_L1B_ML_CONFIG.data_layers.find(l => l.subsystem === 'SWIR'),
      role: 'Water stress / soil moisture',
      weight: 0.10
    }
  });

  const [predictions, setPredictions] = useState([]);
  const [modelMetrics] = useState({
    gapFillingAccuracy: 0.94,
    spatialFusionR2: 0.91,
    forecastR2: 0.87,
    multiSensorCorrelation: 0.93,
    latency: { 
      gapFilling: 5.2, 
      spatialFusion: 8.5,
      forecast: 12.3 
    }
  });

  useEffect(() => {
    const loadPredictions = async () => {
      setTimeout(() => {
        const mockPredictions = generateMultiSensorPredictions();
        setPredictions(mockPredictions);
        
        setPipelineStatus(prev => ({
          ...prev,
          mlProcessing: { 
            status: 'completed', 
            progress: 100, 
            message: 'Multi-sensor forecast completed',
            models: ['U-Net ✓', 'Spatial Fusion ✓', 'ConvLSTM ✓']
          },
          storage: { 
            status: 'completed', 
            progress: 100, 
            message: 'Data stored in PostGIS + TimescaleDB'
          }
        }));
      }, 2500);
    };

    loadPredictions();
  }, []);

  const generateMultiSensorPredictions = () => {
    const baseDate = new Date('2026-01-01');
    const predictions = [];
    
    for (let i = 0; i < 90; i++) {
      const date = new Date(baseDate);
      date.setDate(date.getDate() + (i * 16));
      
      const month = date.getMonth();
      const seasonalFactor = Math.sin((month / 12) * Math.PI * 2) * 0.15 + 0.65;
      const frostRisk = (month >= 4 && month <= 7) ? -0.08 : 0;
      const noise = (Math.random() - 0.5) * 0.04;
      
      predictions.push({
        date: date.toISOString().split('T')[0],
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        ndvi_pred: Math.max(0.25, Math.min(0.95, seasonalFactor + frostRisk + noise)),
        ndvi_lower: Math.max(0.15, seasonalFactor + frostRisk + noise - 0.12),
        ndvi_upper: Math.min(1.0, seasonalFactor + frostRisk + noise + 0.12),
        modis_ndvi: seasonalFactor + noise * 0.8,
        aster_ndvi: seasonalFactor + noise * 1.2,
        lst_influence: frostRisk,
        swir_moisture: 0.5 + Math.sin((month / 12) * Math.PI * 2) * 0.3,
        quality: Math.random() > 0.12 ? 'high' : 'medium',
        confidence: 0.82 + Math.random() * 0.13,
        frost_risk: (month >= 4 && month <= 7) ? 'high' : 'low',
        effective_resolution: '15m-250m fusion'
      });
    }
    
    return predictions;
  };

  const upcomingPredictions = predictions.slice(0, 6);
  const avgNDVI = predictions.length > 0 
    ? predictions.reduce((sum, p) => sum + p.ndvi_pred, 0) / predictions.length 
    : 0;
  const trend = avgNDVI > 0.6 ? 'Favorable' : avgNDVI > 0.4 ? 'Moderate' : 'Alert';

  const renderMultiSensorPipeline = () => {
    const phases = [
      { key: 'acquisition', label: 'PHASE 1: Multi-Sensor Acquisition', icon: Satellite },
      { key: 'preprocessing', label: 'PHASE 2: Resolution Harmonization', icon: Layers },
      { key: 'gapDetection', label: 'PHASE 3: Multi-Source Quality Check', icon: CheckCircle },
      { key: 'fusion', label: 'PHASE 3.5: Spatial Fusion', icon: Cpu },
      { key: 'mlProcessing', label: 'PHASE 4: ML Multi-Input Processing', icon: Brain },
      { key: 'storage', label: 'PHASE 5: Spatiotemporal Storage', icon: Database }
    ];

    return (
      <div className="pipeline-status">
        <h3 className="section-title-small">Multi-Sensor ML Pipeline</h3>
        <div className="pipeline-phases">
          {phases.map(phase => {
            const status = pipelineStatus[phase.key];
            const Icon = phase.icon;
            
            return (
              <div key={phase.key} className={`pipeline-phase ${status.status}`}>
                <div className="phase-header">
                  <Icon size={20} />
                  <span className="phase-label">{phase.label}</span>
                  <span className={`phase-status status-${status.status}`}>
                    {status.status}
                  </span>
                </div>
                <div className="phase-progress">
                  <div 
                    className="phase-progress-bar" 
                    style={{ width: `${status.progress}%` }}
                  />
                </div>
                <p className="phase-message">{status.message}</p>
                {status.details && (
                  <p className="phase-detail">{status.details}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderSensorConfiguration = () => {
    return (
      <div className="layer-config">
        <h3 className="section-title-small">Multi-Sensor Configuration for ML</h3>
        <div className="sensor-architecture">
          
          <div className="sensor-block modis-ndvi">
            <div className="sensor-header">
              <Satellite size={24} />
              <h4>🌿 MOD13Q1.061 - Temporal NDVI Baseline</h4>
            </div>
            <div className="sensor-specs">
              <div className="spec-row">
                <span className="spec-label">Resolution:</span>
                <span className="spec-value">{sensorConfig.modis_ndvi.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Temporal:</span>
                <span className="spec-value">{sensorConfig.modis_ndvi.temporal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Main Layer:</span>
                <span className="spec-value">{sensorConfig.modis_ndvi.layers.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Scale Factor:</span>
                <span className="spec-value">{sensorConfig.modis_ndvi.layers.scale_factor}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">QA Layers:</span>
                <span className="spec-value">{sensorConfig.modis_ndvi.qa.length} layers</span>
              </div>
            </div>
            <div className="sensor-role">
              <strong>Role:</strong> {sensorConfig.modis_ndvi.role}
              <div className="weight-bar">
                <div className="weight-fill" style={{ width: `${sensorConfig.modis_ndvi.weight * 100}%` }}></div>
                <span className="weight-label">{(sensorConfig.modis_ndvi.weight * 100).toFixed(0)}% weight</span>
              </div>
            </div>
          </div>

          <div className="sensor-block modis-lst">
            <div className="sensor-header">
              <Thermometer size={24} />
              <h4>🌡️ MOD11A2.061 - Land Surface Temperature</h4>
            </div>
            <div className="sensor-specs">
              <div className="spec-row">
                <span className="spec-label">Resolution:</span>
                <span className="spec-value">{sensorConfig.modis_lst.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Temporal:</span>
                <span className="spec-value">{sensorConfig.modis_lst.temporal}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Layer:</span>
                <span className="spec-value">{sensorConfig.modis_lst.layer.name}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Scale Factor:</span>
                <span className="spec-value">{sensorConfig.modis_lst.layer.scale_factor} K</span>
              </div>
            </div>
            <div className="sensor-role">
              <strong>Role:</strong> {sensorConfig.modis_lst.role}
              <div className="weight-bar">
                <div className="weight-fill lst" style={{ width: `${sensorConfig.modis_lst.weight * 100}%` }}></div>
                <span className="weight-label">{(sensorConfig.modis_lst.weight * 100).toFixed(0)}% weight</span>
              </div>
            </div>
          </div>

          <div className="sensor-block aster-vnir">
            <div className="sensor-header">
              <Layers size={24} />
              <h4>📡 ASTER L1B VNIR - Individual Parcels</h4>
            </div>
            <div className="sensor-specs">
              <div className="spec-row">
                <span className="spec-label">Resolution:</span>
                <span className="spec-value highlight">{sensorConfig.aster_vnir.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">NDVI Bands:</span>
                <span className="spec-value">
                  {sensorConfig.aster_vnir.bands.filter(b => b.ndvi_component).map(b => b.band_number).join(', ')}
                </span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Formula:</span>
                <span className="spec-value formula">{sensorConfig.aster_vnir.ndvi_calc.formula}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Subsystem:</span>
                <span className="spec-value">VNIR (Bands 1, 2, 3N)</span>
              </div>
            </div>
            <div className="sensor-role">
              <strong>Role:</strong> {sensorConfig.aster_vnir.role}
              <div className="weight-bar">
                <div className="weight-fill aster" style={{ width: `${sensorConfig.aster_vnir.weight * 100}%` }}></div>
                <span className="weight-label">{(sensorConfig.aster_vnir.weight * 100).toFixed(0)}% weight</span>
              </div>
            </div>
          </div>

          <div className="sensor-block aster-swir">
            <div className="sensor-header">
              <Database size={24} />
              <h4>💧 ASTER L1B SWIR - Water Stress</h4>
            </div>
            <div className="sensor-specs">
              <div className="spec-row">
                <span className="spec-label">Resolution:</span>
                <span className="spec-value">{sensorConfig.aster_swir.resolution}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Bands:</span>
                <span className="spec-value">{sensorConfig.aster_swir.bands.band_range}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">Spectral Range:</span>
                <span className="spec-value">{sensorConfig.aster_swir.bands.spectral_range} µm</span>
              </div>
            </div>
            <div className="sensor-role">
              <strong>Role:</strong> {sensorConfig.aster_swir.role}
              <div className="weight-bar">
                <div className="weight-fill swir" style={{ width: `${sensorConfig.aster_swir.weight * 100}%` }}></div>
                <span className="weight-label">{(sensorConfig.aster_swir.weight * 100).toFixed(0)}% weight</span>
              </div>
            </div>
          </div>

        </div>

        <div className="ml-models-section">
          <h4>🤖 Multi-Sensor ML Architecture</h4>
          <div className="ml-models-grid">
            <div className="ml-model-card">
              <h5>Model 1: U-Net Gap Filling</h5>
              <p><strong>Input:</strong> MOD13Q1 NDVI + pixel_reliability mask</p>
              <p><strong>Output:</strong> Gap-free NDVI</p>
              <p><strong>Accuracy:</strong> {(modelMetrics.gapFillingAccuracy * 100).toFixed(1)}%</p>
              <p><strong>Latency:</strong> {modelMetrics.latency.gapFilling}s</p>
            </div>
            <div className="ml-model-card">
              <h5>Model 2: Spatial Fusion</h5>
              <p><strong>Input:</strong> ASTER 15m → MOD13Q1 250m</p>
              <p><strong>Method:</strong> Deep Learning downscaling</p>
              <p><strong>R²:</strong> {modelMetrics.spatialFusionR2.toFixed(2)}</p>
              <p><strong>Latency:</strong> {modelMetrics.latency.spatialFusion}s</p>
            </div>
            <div className="ml-model-card">
              <h5>Model 3: ConvLSTM Forecast</h5>
              <p><strong>Input:</strong> NDVI + LST + SWIR (6 frames)</p>
              <p><strong>Output:</strong> +16 days prediction</p>
              <p><strong>R²:</strong> {modelMetrics.forecastR2.toFixed(2)}</p>
              <p><strong>Latency:</strong> {modelMetrics.latency.forecast}s</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="predictions-page">
      <div className="container">
        <div className="predictions-header">
          <div>
            <h1 className="page-title">Multi-Sensor NDVI Predictions 2026-2030</h1>
            <p className="predictions-subtitle">
              MOD13Q1 (250m) + ASTER L1B (15m) + MOD11A2 LST | ConvLSTM Multi-Input Forecasting
            </p>
          </div>
          <button className="btn btn-primary">
            <Download size={20} />
            Export Multi-Sensor Data
          </button>
        </div>

        {renderMultiSensorPipeline()}
        {renderSensorConfiguration()}

        <div className="prediction-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <Calendar size={32} />
            </div>
            <div className="summary-content">
              <h3>Forecast Period</h3>
              <p className="summary-value">{predictions.length} composites</p>
              <span className="summary-label">~{Math.floor(predictions.length * 16 / 365)} years | Multi-sensor fusion</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <TrendingUp size={32} />
            </div>
            <div className="summary-content">
              <h3>NDVI Trend</h3>
              <p className="summary-value">{trend}</p>
              <span className="summary-label">Avg NDVI: {avgNDVI.toFixed(3)} (15m-250m fusion)</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Brain size={32} />
            </div>
            <div className="summary-content">
              <h3>Model Performance</h3>
              <p className="summary-value">R² = {modelMetrics.forecastR2}</p>
              <span className="summary-label">Multi-Sensor ConvLSTM | 4 inputs</span>
            </div>
          </div>
        </div>

        {predictions.length > 0 && (
          <div className="chart-section">
            <PredictionChart data={predictions} />
          </div>
        )}

        <div className="chart-section">
          <ModelComparison />
        </div>

        {upcomingPredictions.length > 0 && (
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
                  {upcomingPredictions.map((pred, idx) => (
                    <tr key={idx}>
                      <td>{pred.date}</td>
                      <td className="ndvi-value">{pred.ndvi_pred.toFixed(3)}</td>
                      <td>[{pred.ndvi_lower.toFixed(3)}, {pred.ndvi_upper.toFixed(3)}]</td>
                      <td>
                        <span className={`frost-badge frost-${pred.frost_risk}`}>
                          {pred.frost_risk}
                        </span>
                      </td>
                      <td>{pred.swir_moisture.toFixed(2)}</td>
                      <td>
                        <span className={`quality-badge quality-${pred.quality}`}>
                          {pred.quality}
                        </span>
                      </td>
                      <td>{(pred.confidence * 100).toFixed(1)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="info-section">
          <div className="info-card">
            <h3>📊 Multi-Sensor Data Pipeline</h3>
            <p>
              <strong>MOD13Q1.061:</strong> 250m NDVI temporal baseline (2000-2025, 575 composites)<br/>
              <strong>ASTER L1B VNIR:</strong> 15m high-resolution NDVI for individual parcels<br/>
              <strong>MOD11A2:</strong> 1km LST for nighttime frost alerts<br/>
              <strong>ASTER SWIR:</strong> 30m water stress detection<br/>
              <strong>Fusion:</strong> Spatial downscaling + Temporal harmonization
            </p>
          </div>

          <div className="info-card">
            <h3>🔬 ML Multi-Input Methodology</h3>
            <ul>
              <li><strong>Spatial Fusion:</strong> ASTER 15m → MOD13Q1 250m deep learning downscaling</li>
              <li><strong>Gap Filling:</strong> U-Net with pixel_reliability + VI_Quality masks</li>
              <li><strong>Multi-Input Forecasting:</strong> ConvLSTM with NDVI + LST + SWIR + temporal features</li>
              <li><strong>Resolution Harmonization:</strong> Cubic convolution resampling (ASTER L1B)</li>
              <li><strong>Quality Weighting:</strong> Sensors weighted by temporal reliability</li>
              <li><strong>Validation:</strong> Multi-resolution cross-validation R² = {modelMetrics.multiSensorCorrelation}</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>⚠️ Multi-Sensor Considerations</h3>
            <p>
              <strong>ASTER Availability:</strong> On-demand, lower temporal frequency than MODIS<br/>
              <strong>Resolution Trade-off:</strong> 15m detail vs 250m temporal continuity<br/>
              <strong>Cloud Coverage:</strong> VNIR/SWIR affected, TIR partially penetrates clouds<br/>
              <strong>Fusion Uncertainty:</strong> Confidence intervals include downscaling error<br/>
              <strong>Computational Cost:</strong> ~{(modelMetrics.latency.gapFilling + modelMetrics.latency.spatialFusion + modelMetrics.latency.forecast).toFixed(1)}s total (3 models)<br/>
              <strong>Calibration:</strong> ASTER L1B radiometric + geometric (UTM) applied
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predictions;
