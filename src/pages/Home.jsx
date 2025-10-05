import { Link } from 'react-router-dom';
import { ArrowRight, Satellite, TrendingUp, MapPin, Database, Droplets, Mountain, Sprout, Building2, Trees, CloudRain, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

function Home() {
  const [expandedProblem, setExpandedProblem] = useState(null);

  const problems = [
    {
      id: 'agriculture',
      icon: <Sprout size={48} color="#10b981" />,
      title: 'Agriculture & Food Security',
      subtitle: 'Protecting 45,000 ha of agricultural land',
      area: '45,000 ha',
      status: 'active',
      color: '#10b981',
      description: 'Climate extremes threaten potato and quinoa crops. ML models predict frost events, detect drought stress, and optimize planting calendars based on 25 years of MODIS data.',
      objectives: [
        'Predict frost events 48h in advance with 85% precision',
        'Detect drought stress from NDVI drops >15%',
        'Optimize planting calendars by crop type and elevation',
        'Alert 12,000+ farmers via SMS/WhatsApp'
      ],
      metrics: [
        { value: '12,000+', label: 'Farmers Alerted' },
        { value: '85%', label: 'Frost Precision' },
        { value: '48h', label: 'Lead Time' }
      ],
      models: [
        { name: 'Frost Prediction', version: 'v2.1', status: 'PRODUCTION' },
        { name: 'Drought Detector', version: 'v1.3', status: 'PRODUCTION' },
        { name: 'Planting Calendar', version: 'v1.0', status: 'STAGING' }
      ]
    },
    {
      id: 'soil',
      icon: <Mountain size={48} color="#f59e0b" />,
      title: 'Soil Degradation & Erosion',
      subtitle: 'Mapping 12,000 ha of critical erosion zones',
      area: '12,000 ha',
      status: 'active',
      color: '#f59e0b',
      description: 'Overgrazing and deforestation have degraded slopes. Models map erosion risk from NDVI trends + topography, prioritize 5,000 ha for reforestation.',
      objectives: [
        'Map 5-level erosion risk with 89% accuracy',
        'Prioritize 5,000 ha for native species reforestation',
        'Estimate soil carbon stocks for REDD+ MRV'
      ],
      metrics: [
        { value: '12,000 ha', label: 'Mapped' },
        { value: '89%', label: 'Accuracy' },
        { value: '5,000 ha', label: 'Priority Zones' }
      ],
      models: [
        { name: 'Erosion Risk Mapper', version: 'v1.2', status: 'PRODUCTION' },
        { name: 'Reforestation Optimizer', version: 'v1.0', status: 'PRODUCTION' },
        { name: 'Carbon Stock Estimator', version: 'v1.0', status: 'DEVELOPMENT' }
      ]
    },
    {
      id: 'wetlands',
      icon: <Droplets size={48} color="#3b82f6" />,
      title: 'Wetlands Health Monitoring',
      subtitle: 'Monitoring 18,000 ha of high-altitude wetlands',
      area: '18,000 ha',
      status: 'active',
      color: '#3b82f6',
      description: 'Wetlands sustain 280 herding communities. Models track health via NDVI+SWIR, optimize rotational grazing to increase carrying capacity by 25%.',
      objectives: [
        'Real-time health semaphore (Green/Yellow/Red)',
        'Optimize grazing rotation for 280 communities',
        'Increase carrying capacity by 25%'
      ],
      metrics: [
        { value: '18,000 ha', label: 'Monitored' },
        { value: '280', label: 'Communities' },
        { value: '+25%', label: 'Capacity Gain' }
      ],
      models: [
        { name: 'Health Semaphore', version: 'v1.1', status: 'PRODUCTION' },
        { name: 'Rotation Optimizer', version: 'v1.0', status: 'STAGING' }
      ]
    },
    {
      id: 'urban',
      icon: <Building2 size={48} color="#ef4444" />,
      title: 'Urban Encroachment Detection',
      subtitle: 'Detecting informal construction on 2,500 ha',
      area: '2,500 ha',
      status: 'warning',
      color: '#ef4444',
      description: 'Cities expand onto productive farmland. U-Net detects new buildings from ASTER 15m imagery, informs zoning policies.',
      objectives: [
        'Detect new construction with 91% accuracy',
        'Map 4-zone suitability (Protected/Restricted/Allowed)',
        'Support urban master plan enforcement'
      ],
      metrics: [
        { value: '2,500 ha', label: 'Monitored' },
        { value: '91%', label: 'Detection Accuracy' },
        { value: '156', label: 'Violations Found' }
      ],
      models: [
        { name: 'Construction Detector', version: 'v2.0', status: 'PRODUCTION' },
        { name: 'Zoning Suitability', version: 'v1.0', status: 'PRODUCTION' }
      ]
    },
    {
      id: 'forest',
      icon: <Trees size={48} color="#059669" />,
      title: 'Cloud Forest Deforestation',
      subtitle: 'Protecting 35,000 ha of cloud forest',
      area: '35,000 ha',
      status: 'active',
      color: '#059669',
      description: 'Illegal logging threatens biodiversity hotspot. Models detect deforestation within 48h, analyze fragmentation for wildlife corridors.',
      objectives: [
        'Detect deforestation within 48h of acquisition',
        'Alert environmental prosecutor',
        'Map wildlife corridors for connectivity'
      ],
      metrics: [
        { value: '35,000 ha', label: 'Protected' },
        { value: '48h', label: 'Detection Time' },
        { value: '18', label: 'Alerts Sent' }
      ],
      models: [
        { name: 'Deforestation Alert', version: 'v3.1', status: 'PRODUCTION' },
        { name: 'Fragmentation Analyzer', version: 'v1.0', status: 'STAGING' }
      ]
    },
    {
      id: 'climate',
      icon: <CloudRain size={48} color="#8b5cf6" />,
      title: 'Climate Change Adaptation',
      subtitle: 'Modeling crop shifts to 2035',
      area: '60,000 ha',
      status: 'active',
      color: '#8b5cf6',
      description: 'Rising temperatures shift optimal crop zones +200m upward. Models project 2035 suitability for potato/quinoa/maize, guide farmer education.',
      objectives: [
        'Project altitudinal shift +200m by 2035',
        'Map future crop suitability per species',
        'Educate 5,000 farmers on adaptation'
      ],
      metrics: [
        { value: '+200m', label: 'Shift by 2035' },
        { value: '3', label: 'Crops Modeled' },
        { value: '5,000', label: 'Farmers Educated' }
      ],
      models: [
        { name: 'Altitudinal Shift', version: 'v1.0', status: 'PRODUCTION' },
        { name: 'Future Suitability', version: 'v1.0', status: 'DEVELOPMENT' }
      ]
    },
    {
      id: 'landslide',
      icon: <AlertTriangle size={48} color="#dc2626" />,
      title: 'Landslide Risk Mapping',
      subtitle: 'Protecting 2,500 vulnerable slopes',
      area: '2,500 sites',
      status: 'active',
      color: '#dc2626',
      description: 'Heavy rains trigger landslides on deforested slopes. Model maps susceptibility, sends early warnings 12h ahead during storms.',
      objectives: [
        'Map 5-level susceptibility with AUC 0.91',
        'Early warning 12h before heavy rain',
        'Alert communities via SMS'
      ],
      metrics: [
        { value: '2,500', label: 'Sites Mapped' },
        { value: '0.91', label: 'Model AUC' },
        { value: '12h', label: 'Warning Time' }
      ],
      models: [
        { name: 'Susceptibility Map', version: 'v2.0', status: 'PRODUCTION' },
        { name: 'Early Warning System', version: 'v1.0', status: 'STAGING' }
      ]
    }
  ];

  const features = [
    {
      icon: <Satellite size={48} color="#60a5fa" />,
      title: "Multi-Sensor Integration",
      description: "MODIS, ASTER, MISR & MOPITT data fusion for complete Earth observation"
    },
    {
      icon: <Mountain size={48} color="#10b981" />,
      title: "Glacier Monitoring",
      description: "Real-time tracking of mountain glaciers with ASTER DEM analysis"
    },
    {
      icon: <Droplets size={48} color="#3b82f6" />,
      title: "Water Resources",
      description: "Comprehensive monitoring of water bodies and supply systems"
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

  const toggleProblem = (problemId) => {
    setExpandedProblem(expandedProblem === problemId ? null : problemId);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="hero-title-gradient">TerraVision</span>
              <br />
              Multi-Sensor Earth Observation System
            </h1>
            
            <p className="hero-subtitle">
              Integrating <strong>25 years of NASA Terra satellite data</strong> (MODIS, ASTER, MISR, MOPITT) 
              to transform environmental monitoring and decision-making worldwide.
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
                <div className="stat-value">18</div>
                <div className="stat-label">Active Models</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">7</div>
                <div className="stat-label">Problems</div>
              </div>
              <div className="stat-card">
                <div className="stat-value">175K ha</div>
                <div className="stat-label">Total Coverage</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section - Expandable Cards */}
      <section className="solutions-main-section">
        <div className="container">
          <div className="solutions-header">
            <h2 className="section-title">7 Environmental Problems × Specialized ML Models</h2>
            <p className="solutions-subtitle">
              Click on each problem to explore the specialized machine learning models addressing it
            </p>
          </div>

          <div className="solutions-list">
            {problems.map((problem) => (
              <div 
                key={problem.id} 
                className={`solution-item ${expandedProblem === problem.id ? 'expanded' : ''}`}
                style={{ borderLeftColor: problem.color }}
              >
                <div 
                  className="solution-header"
                  onClick={() => toggleProblem(problem.id)}
                >
                  <div className="solution-icon-wrapper" style={{ backgroundColor: `${problem.color}20` }}>
                    {problem.icon}
                  </div>
                  <div className="solution-title-section">
                    <h3 className="solution-title">{problem.title}</h3>
                    <p className="solution-subtitle">{problem.subtitle}</p>
                  </div>
                  <div className="solution-meta">
                    <span 
                      className="solution-status"
                      style={{ 
                        backgroundColor: problem.status === 'active' ? '#10b98120' : '#f59e0b20',
                        color: problem.status === 'active' ? '#10b981' : '#f59e0b'
                      }}
                    >
                      {problem.status.toUpperCase()}
                    </span>
                    <span className="solution-area" style={{ color: problem.color }}>
                      {problem.area}
                    </span>
                    <div className="solution-toggle">
                      {expandedProblem === problem.id ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                    </div>
                  </div>
                </div>

                {expandedProblem === problem.id && (
                  <div className="solution-details">
                    <p className="solution-description">{problem.description}</p>
                    
                    <div className="solution-objectives">
                      <h4>🎯 Objectives</h4>
                      <ul>
                        {problem.objectives.map((obj, idx) => (
                          <li key={idx}>{obj}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="solution-metrics">
                      {problem.metrics.map((metric, idx) => (
                        <div key={idx} className="metric-box">
                          <div className="metric-value" style={{ color: problem.color }}>{metric.value}</div>
                          <div className="metric-label">{metric.label}</div>
                        </div>
                      ))}
                    </div>

                    <div className="solution-models">
                      <h4>🤖 ML Models</h4>
                      <div className="models-grid">
                        {problem.models.map((model, idx) => (
                          <div key={idx} className="model-card">
                            <div className="model-name">{model.name}</div>
                            <div className="model-meta">
                              <span className="model-version">{model.version}</span>
                              <span 
                                className="model-status"
                                style={{
                                  backgroundColor: model.status === 'PRODUCTION' ? '#10b98120' : 
                                                  model.status === 'STAGING' ? '#f59e0b20' : '#3b82f620',
                                  color: model.status === 'PRODUCTION' ? '#10b981' : 
                                        model.status === 'STAGING' ? '#f59e0b' : '#3b82f6'
                                }}
                              >
                                {model.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="case-study-highlight">
            <h3>🌟 Pilot Case: Peruvian Andes</h3>
            <p>
              TerraVision's first deployment demonstrated real-world impact: 
              <strong> 12,000+ farmers</strong> receiving frost alerts, <strong>35% glacier loss</strong> documented, 
              and <strong>$50M</strong> in economic losses prevented through early drought detection.
            </p>
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