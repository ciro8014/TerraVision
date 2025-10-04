import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, TrendingUp, MapPin, Database, Droplets, Mountain } from 'lucide-react';

function Home() {
  const features = [
    {
      icon: <Satellite size={48} color="#60a5fa" />,
      title: "Multi-Sensor Integration",
      description: "MODIS, ASTER, MISR & MOPITT data fusion for complete Earth observation"
    },
    {
      icon: <Mountain size={48} color="#10b981" />,
      title: "Glacier Monitoring",
      description: "Real-time tracking of Andean glaciers with ASTER DEM analysis"
    },
    {
      icon: <Droplets size={48} color="#3b82f6" />,
      title: "Water Resources",
      description: "Comprehensive monitoring of lagoons and water supply systems"
    },
    {
      icon: <TrendingUp size={48} color="#a78bfa" />,
      title: "ML Predictions",
      description: "Neural Network forecasting with 92% accuracy (2026-2030)"
    },
    {
      icon: <MapPin size={48} color="#f59e0b" />,
      title: "Urban Planning",
      description: "Track urban expansion and green space loss with 15m resolution"
    },
    {
      icon: <Database size={48} color="#ec4899" />,
      title: "Open Data",
      description: "Free access to 25 years of processed satellite datasets"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-gradient">TerraVision</span>
              <br />
              Multi-Sensor Earth Observation for Cusco
            </h1>
            
            <p className="hero-subtitle">
              Integrating <strong>25 years of NASA Terra satellite data</strong> (MODIS, ASTER, MISR, MOPITT) 
              to transform environmental monitoring and decision-making in the Peruvian Andes.
            </p>

            <div className="buttons-container">
              <Link to="/dashboard" className="btn btn-primary">
                Explore Dashboard
                <ArrowRight size={20} />
              </Link>
              
              <Link to="/sensors" className="btn btn-secondary">
                Terra Instruments
              </Link>
            </div>

            {/* Stats */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-value">25</div>
                <div className="stat-label">Years of Data</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">4</div>
                <div className="stat-label">Terra Sensors</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">92%</div>
                <div className="stat-label">ML Accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">System Capabilities</h2>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="features-section" style={{ background: 'var(--color-bg-card)', paddingTop: '4rem', paddingBottom: '4rem' }}>
        <div className="container">
          <h2 className="section-title">Real-World Impact</h2>
          
          <div className="impact-grid">
            <div className="impact-card">
              <h3>💧 Water Security</h3>
              <p>Early drought warnings with 2-3 months advance notice using multi-sensor water body tracking</p>
              <span className="impact-value">~$50M USD/year</span>
              <span className="impact-label">Economic losses prevented</span>
            </div>

            <div className="impact-card">
              <h3>🏔️ Glacier Monitoring</h3>
              <p>Real-time atlas of Andean glaciers (Salkantay, Ausangate) with GLOF early warning system</p>
              <span className="impact-value">Lives Saved</span>
              <span className="impact-label">Disaster prevention</span>
            </div>

            <div className="impact-card">
              <h3>🌾 Agriculture</h3>
              <p>Frost alerts 3-5 days in advance, crop health monitoring for 50,000 farming families</p>
              <span className="impact-value">20-30%</span>
              <span className="impact-label">Reduction in crop losses</span>
            </div>

            <div className="impact-card">
              <h3>🏙️ Urban Planning</h3>
              <p>Track illegal construction, identify reforestation priorities with 15m ASTER resolution</p>
              <span className="impact-value">45 ha</span>
              <span className="impact-label">Green space monitoring</span>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <h2 className="section-title">Ready to Explore?</h2>
          <p className="hero-subtitle">
            Access 25 years of satellite data, ML predictions, and interactive maps
          </p>
          <Link to="/dashboard" className="btn">
            Launch TerraVision
            <ArrowRight size={20} />
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;