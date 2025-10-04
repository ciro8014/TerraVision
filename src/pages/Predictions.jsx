import { Calendar, TrendingUp, Brain, Download } from 'lucide-react';
import PredictionChart from '../components/charts/PredictionChart';
import ModelComparison from '../components/charts/ModelComparison';
import RecommendationCard from '../components/dashboard/RecommendationCard';
import { predictions } from '../lib/mockData';

function Predictions() {
  // Get next 3 predictions
  const upcomingPredictions = predictions.slice(0, 3);
  
  // Calculate general trend
  const avgPrediction = predictions.reduce((sum, p) => sum + p.evi_pred, 0) / predictions.length;
  const trend = avgPrediction > 0.5 ? 'Positive' : 'Monitor';

  return (
    <div className="predictions-page">
      <div className="container">
        {/* Header */}
        <div className="predictions-header">
          <div>
            <h1 className="page-title">Predictions 2026-2030</h1>
            <p className="predictions-subtitle">
              Vegetation Index forecast using Machine Learning
            </p>
          </div>
          <button className="btn btn-primary">
            <Download size={20} />
            Export Report
          </button>
        </div>

        {/* Summary Cards */}
        <div className="prediction-summary">
          <div className="summary-card">
            <div className="summary-icon">
              <Calendar size={32} />
            </div>
            <div className="summary-content">
              <h3>Analysis Period</h3>
              <p className="summary-value">2026 - 2030</p>
              <span className="summary-label">5 years of predictions</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <TrendingUp size={32} />
            </div>
            <div className="summary-content">
              <h3>General Trend</h3>
              <p className="summary-value">{trend}</p>
              <span className="summary-label">Average EVI: {avgPrediction.toFixed(2)}</span>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Brain size={32} />
            </div>
            <div className="summary-content">
              <h3>Model Used</h3>
              <p className="summary-value">Neural Network</p>
              <span className="summary-label">Accuracy: 92%</span>
            </div>
          </div>
        </div>

        {/* Main Prediction Chart */}
        <div className="chart-section">
          <PredictionChart data={predictions} />
        </div>

        {/* Model Comparison */}
        <div className="chart-section">
          <ModelComparison />
        </div>

        {/* Recommendations */}
        <div className="recommendations-section">
          <h2 className="section-title-small">Upcoming Recommendations</h2>
          <div className="recommendations-grid">
            {upcomingPredictions.map((pred, index) => (
              <RecommendationCard key={index} prediction={pred} />
            ))}
          </div>
        </div>

        {/* Info Section */}
        <div className="info-section">
          <div className="info-card">
            <h3>📊 About Predictions</h3>
            <p>
              Predictions are generated using a Neural Network trained with 25 years of NASA MODIS 
              satellite data. The model achieves an R² of 0.92, indicating 92% accuracy in predictions.
            </p>
          </div>

          <div className="info-card">
            <h3>🔬 Methodology</h3>
            <ul>
              <li>Data: 150+ satellite images MOD13Q1 and MOD11A2</li>
              <li>Training period: 2000-2025</li>
              <li>Variables: EVI, temperature, clear sky days</li>
              <li>Models compared: Random Forest vs Neural Network</li>
            </ul>
          </div>

          <div className="info-card">
            <h3>⚠️ Considerations</h3>
            <p>
              Confidence intervals (shaded area) represent model uncertainty. Predictions should 
              be used as guidance and complemented with local observations and technical 
              agricultural advice.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Predictions;