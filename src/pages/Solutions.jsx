import { useState } from 'react';
import ProblemSection from '../components/models/ProblemSection';

export default function Solutions() {
  const [expandedProblems, setExpandedProblems] = useState({
    agriculture: true,
    soil: false,
    wetlands: false,
    urban: false,
    forest: false,
    climate: false,
    landslide: false,
  });

  const toggleProblem = (problemType) => {
    setExpandedProblems(prev => ({
      ...prev,
      [problemType]: !prev[problemType]
    }));
  };

  // Data for all 7 problems
  const problemsData = [
    {
      type: 'agriculture',
      title: 'Agriculture & Food Security',
      subtitle: 'Protecting 45,000 ha of agricultural land in Valle Sagrado',
      description: 'Climate extremes threaten potato and quinoa crops. ML models predict frost events, detect drought stress, and optimize planting calendars based on 25 years of MODIS data.',
      status: 'active',
      area: '45,000 ha',
      objectives: [
        'Predict frost events 48h in advance with 85% precision',
        'Detect drought stress from NDVI drops >15%',
        'Optimize planting calendars by crop type and elevation',
        'Alert 12,000+ farmers via SMS/WhatsApp'
      ],
      impacts: [
        { value: '12,000+', label: 'Farmers Alerted' },
        { value: '85%', label: 'Frost Precision' },
        { value: '48h', label: 'Lead Time' },
        { value: '34%', label: 'User Adoption' }
      ],
      models: [
        {
          problem: 'agriculture',
          name: 'Frost Prediction',
          version: '2.1',
          status: 'production',
          icon: '❄️',
          description: 'LSTM+Attention model predicting frost probability from LST time series. Alerts sent when P(frost) > 70% and LST < 5°C.',
          metrics: [
            { label: 'Precision', value: '87%' },
            { label: 'Recall', value: '82%' },
            { label: 'F1-Score', value: '0.84' }
          ],
          tags: ['LSTM', 'Time-Series', 'Real-time'],
          inputs: ['MOD11A2 LST_Day_1km', 'MOD11A2 LST_Night_1km', 'DEM Elevation', 'Day of Year'],
          output: 'Frost probability map (0-1) + binary alert zones',
          useCase: 'Alert farmers 48h before frost to activate night irrigation',
          latency: '3.2s',
          size: '52MB',
          lastUpdated: '2024-09-15'
        },
        {
          problem: 'agriculture',
          name: 'Drought Detector',
          version: '1.3',
          status: 'production',
          icon: '🌵',
          description: 'CNN-based change detection identifying NDVI drops sustained over 2+ composites. Triggers irrigation recommendations.',
          metrics: [
            { label: 'Accuracy', value: '91%' },
            { label: 'F1-Score', value: '0.91' },
            { label: 'AUC', value: '0.94' }
          ],
          tags: ['CNN', 'Change Detection', 'Alerts'],
          inputs: ['MOD13Q1 NDVI', 'MOD13Q1 EVI', 'Precipitation GPM'],
          output: 'Drought stress index (0-10) + risk zones',
          useCase: 'Trigger community water allocation during dry spells',
          latency: '2.8s',
          size: '38MB',
          lastUpdated: '2024-08-22'
        },
        {
          problem: 'agriculture',
          name: 'Planting Calendar',
          version: '1.0',
          status: 'staging',
          icon: '📅',
          description: 'Transformer model analyzing 25-year phenology curves to recommend optimal planting windows per crop and elevation band.',
          metrics: [
            { label: 'Adoption', value: '34%' },
            { label: 'Feedback', value: '4.2★' },
            { label: 'Accuracy', value: '±7 days' }
          ],
          tags: ['Transformer', 'Phenology', 'Optimization'],
          inputs: ['Historical NDVI curves', 'Crop type', 'Elevation', 'Climate projections'],
          output: 'Planting window recommendations (start/end dates)',
          useCase: 'Educational materials for agricultural extension',
          latency: '1.5s',
          size: '45MB',
          lastUpdated: '2024-10-01'
        }
      ]
    },
    {
      type: 'soil',
      title: 'Soil Degradation & Erosion',
      subtitle: 'Mapping 12,000 ha of critical erosion zones',
      description: 'Overgrazing and deforestation have degraded Andean slopes. Models map erosion risk from NDVI trends + topography, prioritize 5,000 ha for reforestation.',
      status: 'active',
      area: '12,000 ha',
      objectives: [
        'Map 5-level erosion risk with 89% accuracy',
        'Prioritize 5,000 ha for native species reforestation',
        'Estimate soil carbon stocks for REDD+ MRV',
        'Monitor revegetation success over time'
      ],
      impacts: [
        { value: '12,000 ha', label: 'Mapped' },
        { value: '5,000 ha', label: 'Priority Zones' },
        { value: '89%', label: 'Model Accuracy' },
        { value: '12', label: 'Active Sites' }
      ],
      models: [
        {
          problem: 'soil',
          name: 'Erosion Risk Mapper',
          version: '1.2',
          status: 'production',
          icon: '🏔️',
          description: 'Random Forest combining NDVI loss, slope, rainfall, and land use to classify erosion susceptibility into 5 levels.',
          metrics: [
            { label: 'Accuracy', value: '89%' },
            { label: 'AUC', value: '0.93' },
            { label: 'Kappa', value: '0.86' }
          ],
          tags: ['Random Forest', 'Multi-criteria', 'GIS'],
          inputs: ['NDVI trend 2000-2025', 'DEM Slope', 'Rainfall', 'Land Use'],
          output: '5-level risk classification (Very Low to Critical)',
          useCase: 'Prioritize conservation interventions by municipalities',
          latency: '4.1s',
          size: '67MB',
          lastUpdated: '2024-09-08'
        },
        {
          problem: 'soil',
          name: 'Reforestation Optimizer',
          version: '1.0',
          status: 'production',
          icon: '🌱',
          description: 'Multi-criteria decision analysis ranking parcels by degradation + slope + accessibility. Recommends native species (queñua, polylepis).',
          metrics: [
            { label: 'Sites Ranked', value: '5,000' },
            { label: 'Species', value: '4' },
            { label: 'Success Rate', value: '76%' }
          ],
          tags: ['MCDA', 'Optimization', 'Native Species'],
          inputs: ['Erosion risk map', 'Slope', 'Roads', 'Water sources'],
          output: 'Top 5,000 ha ranked by priority + species recommendations',
          useCase: 'Guide SERFOR reforestation programs',
          latency: '2.3s',
          size: '31MB',
          lastUpdated: '2024-08-15'
        },
        {
          problem: 'soil',
          name: 'Carbon Stock Estimator',
          version: '1.0',
          status: 'development',
          icon: '🌿',
          description: 'Regression model estimating soil carbon from vegetation cover for REDD+ MRV. Validated with field samples.',
          metrics: [
            { label: 'R²', value: '0.78' },
            { label: 'RMSE', value: '±5 tCO₂' },
            { label: 'Samples', value: '120' }
          ],
          tags: ['Regression', 'Carbon', 'MRV'],
          inputs: ['NDVI', 'EVI', 'Land Cover', 'Field samples'],
          output: 'Carbon stock (tCO₂/ha) + uncertainty',
          useCase: 'Report to UNFCCC for carbon credits',
          latency: '1.8s',
          size: '28MB',
          lastUpdated: '2024-09-20'
        }
      ]
    },
    {
      type: 'wetlands',
      title: 'Bofedales (Wetlands) Health',
      subtitle: 'Monitoring 18,000 ha of high-altitude wetlands',
      description: 'Bofedales sustain 280 herding communities. Models track health via NDVI+SWIR, optimize rotational grazing to increase carrying capacity by 25%.',
      status: 'active',
      area: '18,000 ha',
      objectives: [
        'Real-time health semaphore (Green/Yellow/Red)',
        'Optimize grazing rotation for 280 communities',
        'Detect over-exploitation before damage',
        'Increase carrying capacity by 25%'
      ],
      impacts: [
        { value: '18,000 ha', label: 'Monitored' },
        { value: '280', label: 'Communities' },
        { value: '+25%', label: 'Capacity Gain' },
        { value: '23', label: 'Alerts Sent' }
      ],
      models: [
        {
          problem: 'wetlands',
          name: 'Health Semaphore',
          version: '1.1',
          status: 'production',
          icon: '🚦',
          description: 'Rule-based model with calibrated thresholds: Green (NDVI>0.5), Yellow (0.3-0.5), Red (<0.3). Alerts herders via SMS.',
          metrics: [
            { label: 'Coverage', value: '18,000 ha' },
            { label: 'Alerts', value: '23/year' },
            { label: 'Response', value: '76%' }
          ],
          tags: ['Rule-based', 'Real-time', 'SMS'],
          inputs: ['MOD13Q1 NDVI', 'MOD09A1 SWIR', 'MOD10A1 Snow Cover'],
          output: 'Traffic light status per bofedal + SMS alerts',
          useCase: 'Early warning for overgrazing',
          latency: '1.2s',
          size: '15MB',
          lastUpdated: '2024-09-12'
        },
        {
          problem: 'wetlands',
          name: 'Rotation Optimizer',
          version: '1.0',
          status: 'staging',
          icon: '🔄',
          description: 'Linear programming model scheduling grazing rotation based on carrying capacity and 45-60 day recovery periods.',
          metrics: [
            { label: 'Communities', value: '15' },
            { label: 'Capacity', value: '+18%' },
            { label: 'Adoption', value: '54%' }
          ],
          tags: ['LP', 'Optimization', 'Community'],
          inputs: ['Bofedal health', 'Herd size', 'Recovery time', 'Access'],
          output: 'Monthly rotation schedule + capacity estimates',
          useCase: 'Sustainable pasture management plans',
          latency: '3.5s',
          size: '22MB',
          lastUpdated: '2024-09-25'
        }
      ]
    },
    {
      type: 'urban',
      title: 'Urban Encroachment',
      subtitle: 'Detecting informal construction on 2,500 ha',
      description: 'Cusco city expands onto productive farmland. U-Net detects new buildings from ASTER 15m imagery, informs zoning policies.',
      status: 'warning',
      area: '2,500 ha',
      objectives: [
        'Detect new construction with 91% accuracy',
        'Map 4-zone suitability (Protected/Restricted/Allowed)',
        'Support urban master plan enforcement',
        'Preserve prime agricultural soils'
      ],
      impacts: [
        { value: '2,500 ha', label: 'Monitored' },
        { value: '91%', label: 'Detection Accuracy' },
        { value: '156', label: 'Violations Found' },
        { value: '4', label: 'Zones Mapped' }
      ],
      models: [
        {
          problem: 'urban',
          name: 'Construction Detector',
          version: '2.0',
          status: 'production',
          icon: '🏗️',
          description: 'U-Net semantic segmentation on ASTER pairs (2015 vs 2025) classifying Agriculture/Urban/Bare. Generates violation polygons.',
          metrics: [
            { label: 'IoU', value: '0.87' },
            { label: 'Precision', value: '91%' },
            { label: 'Detections', value: '156' }
          ],
          tags: ['U-Net', 'Segmentation', 'Change Detection'],
          inputs: ['ASTER VNIR 15m (2015)', 'ASTER VNIR 15m (2025)', 'Zoning map'],
          output: 'Building footprint polygons + violation reports',
          useCase: 'Evidence for municipal inspection teams',
          latency: '8.7s',
          size: '94MB',
          lastUpdated: '2024-09-18'
        },
        {
          problem: 'urban',
          name: 'Zoning Suitability',
          version: '1.0',
          status: 'production',
          icon: '🗺️',
          description: 'Weighted overlay analysis combining soil quality, slope, flood risk to produce 4-zone suitability map for master plan.',
          metrics: [
            { label: 'Zones', value: '4' },
            { label: 'Validation', value: '88%' },
            { label: 'Coverage', value: '8,000 ha' }
          ],
          tags: ['GIS', 'Multi-criteria', 'Policy'],
          inputs: ['Soil quality', 'Slope', 'Flood zones', 'Infrastructure'],
          output: '4-zone map (Protected/Restricted/Conditional/Allowed)',
          useCase: 'Input for Cusco Urban Development Plan 2030',
          latency: '5.2s',
          size: '48MB',
          lastUpdated: '2024-08-30'
        }
      ]
    },
    {
      type: 'forest',
      title: 'Cloud Forest Deforestation',
      subtitle: 'Protecting 35,000 ha of cloud forest',
      description: 'Illegal logging threatens biodiversity hotspot. Models detect deforestation within 48h, analyze fragmentation for wildlife corridors (spectacled bear).',
      status: 'active',
      area: '35,000 ha',
      objectives: [
        'Detect deforestation within 48h of acquisition',
        'Alert environmental prosecutor (Fiscalía)',
        'Map wildlife corridors for connectivity',
        'Monitor spectacled bear habitat'
      ],
      impacts: [
        { value: '35,000 ha', label: 'Protected' },
        { value: '48h', label: 'Detection Time' },
        { value: '18', label: 'Alerts Sent' },
        { value: '12', label: 'Prosecutions' }
      ],
      models: [
        {
          problem: 'forest',
          name: 'Deforestation Alert',
          version: '3.1',
          status: 'production',
          icon: '🚨',
          description: 'Threshold-based change detection: NDVI drop 0.8→0.3 + MOD14 fire. Generates GeoTIFF evidence for legal proceedings.',
          metrics: [
            { label: 'Latency', value: '48h' },
            { label: 'Precision', value: '89%' },
            { label: 'Area/alert', value: '3.2 ha' }
          ],
          tags: ['Change Detection', 'Legal', 'Real-time'],
          inputs: ['MOD13Q1 NDVI', 'MOD14A1 Fire', 'Cloud mask'],
          output: 'Deforestation polygons + area (ha) + GeoTIFF',
          useCase: 'Evidence for environmental crimes prosecution',
          latency: '48h',
          size: '41MB',
          lastUpdated: '2024-09-28'
        },
        {
          problem: 'forest',
          name: 'Fragmentation Analyzer',
          version: '1.0',
          status: 'staging',
          icon: '🧩',
          description: 'Graph Neural Network modeling forest connectivity. Identifies critical corridors for wildlife movement (spectacled bear).',
          metrics: [
            { label: 'Patches', value: '347' },
            { label: 'Corridors', value: '28' },
            { label: 'Connectivity', value: '0.67' }
          ],
          tags: ['GNN', 'Connectivity', 'Wildlife'],
          inputs: ['Forest patches', 'DEM', 'Roads', 'Species data'],
          output: 'Corridor priority map + connectivity index',
          useCase: 'Conservation planning for protected areas',
          latency: '12.3s',
          size: '78MB',
          lastUpdated: '2024-09-10'
        }
      ]
    },
    {
      type: 'climate',
      title: 'Climate Change Adaptation',
      subtitle: 'Modeling crop shifts to 2035',
      description: 'Rising temperatures shift optimal crop zones +200m upward. Models project 2035 suitability for potato/quinoa/maize, guide farmer education.',
      status: 'active',
      area: '60,000 ha',
      objectives: [
        'Project altitudinal shift +200m by 2035',
        'Map future crop suitability per species',
        'Educate 5,000 farmers on adaptation',
        'Integrate CMIP6 climate projections'
      ],
      impacts: [
        { value: '+200m', label: 'Shift by 2035' },
        { value: '3', label: 'Crops Modeled' },
        { value: '5,000', label: 'Farmers Educated' },
        { value: '2035', label: 'Horizon' }
      ],
      models: [
        {
          problem: 'climate',
          name: 'Altitudinal Shift',
          version: '1.0',
          status: 'production',
          icon: '📈',
          description: 'Linear regression + trend extrapolation on 25-year LST+NDVI by elevation. Projects optimal zones moved +200m (3600→4200m).',
          metrics: [
            { label: 'R²', value: '0.82' },
            { label: 'Shift', value: '+200m' },
            { label: 'Confidence', value: '85%' }
          ],
          tags: ['Regression', 'Trend', 'Climate'],
          inputs: ['Historical LST', 'NDVI by elevation', 'Climate trends'],
          output: 'New optimal elevation ranges per crop',
          useCase: 'Agricultural extension educational materials',
          latency: '2.7s',
          size: '34MB',
          lastUpdated: '2024-08-25'
        },
        {
          problem: 'climate',
          name: 'Future Suitability',
          version: '1.0',
          status: 'development',
          icon: '🔮',
          description: 'MaxEnt Species Distribution Model using downscaled CMIP6 projections. Predicts 2035 probability maps for 3 crops.',
          metrics: [
            { label: 'AUC', value: '0.88' },
            { label: 'TSS', value: '0.76' },
            { label: 'Crops', value: '3' }
          ],
          tags: ['MaxEnt', 'SDM', 'CMIP6'],
          inputs: ['CMIP6 temperature', 'CMIP6 precipitation', 'Soil', 'Elevation'],
          output: 'Suitability probability maps (0-1) for 2035',
          useCase: 'Policy: long-term agricultural planning',
          latency: '6.4s',
          size: '56MB',
          lastUpdated: '2024-09-15'
        }
      ]
    },
    {
      type: 'landslide',
      title: 'Landslide Risk Mapping',
      subtitle: 'Protecting 2,500 vulnerable slopes',
      description: 'Heavy rains trigger landslides on deforested slopes. Model maps susceptibility, sends early warnings 12h ahead during storms.',
      status: 'active',
      area: '2,500 sites',
      objectives: [
        'Map 5-level susceptibility with AUC 0.91',
        'Early warning 12h before heavy rain',
        'Alert communities via SMS',
        'Integrate with civil defense'
      ],
      impacts: [
        { value: '2,500', label: 'Sites Mapped' },
        { value: '0.91', label: 'Model AUC' },
        { value: '12h', label: 'Warning Time' },
        { value: '8', label: 'Alerts Sent' }
      ],
      models: [
        {
          problem: 'landslide',
          name: 'Susceptibility Map',
          version: '2.0',
          status: 'production',
          icon: '⛰️',
          description: 'Logistic regression + spatial cross-validation on historical landslide inventory. 5-level risk classification.',
          metrics: [
            { label: 'AUC', value: '0.91' },
            { label: 'Sensitivity', value: '88%' },
            { label: 'Sites', value: '2,500' }
          ],
          tags: ['Logistic Reg', 'Spatial CV', 'Risk'],
          inputs: ['Slope', 'NDVI', 'Soil', 'Rainfall', 'Landslide inventory'],
          output: '5-level susceptibility map (Very Low to Very High)',
          useCase: 'Land use planning + hazard zoning',
          latency: '4.8s',
          size: '52MB',
          lastUpdated: '2024-09-05'
        },
        {
          problem: 'landslide',
          name: 'Early Warning System',
          version: '1.0',
          status: 'staging',
          icon: '🚨',
          description: 'Trigger-based system: Heavy rain (>50mm/day) + High risk zone → SMS to nearby communities 12h ahead.',
          metrics: [
            { label: 'Alerts', value: '8' },
            { label: 'False Alarms', value: '12%' },
            { label: 'Lead Time', value: '12h' }
          ],
          tags: ['Rule-based', 'SMS', 'Real-time'],
          inputs: ['Susceptibility map', 'GPM precipitation forecast', 'Community locations'],
          output: 'SMS alerts to at-risk communities',
          useCase: 'Civil defense emergency preparedness',
          latency: '0.8s',
          size: '18MB',
          lastUpdated: '2024-09-22'
        }
      ]
    }
  ];

  return (
    <div className="solutions-page">
      <div className="page-header">
        <div className="header-content">
          <h1 className="page-title">
            <span className="title-icon">🎯</span>
            Multi-Model Solutions
          </h1>
          <p className="page-subtitle">
            7 environmental problems × specialized ML models for Cusco region
          </p>
        </div>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-value">18</span>
            <span className="stat-label">Active Models</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">7</span>
            <span className="stat-label">Problems</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">175,000 ha</span>
            <span className="stat-label">Total Coverage</span>
          </div>
        </div>
      </div>

      <div className="problems-container">
        {problemsData.map((problem) => (
          <ProblemSection
            key={problem.type}
            problem={problem}
            models={problem.models}
            isExpanded={expandedProblems[problem.type]}
            onToggle={() => toggleProblem(problem.type)}
          />
        ))}
      </div>

      <style jsx>{`
        .solutions-page {
          min-height: 100vh;
          padding: var(--space-8) var(--space-6);
          padding-top: calc(80px + var(--space-8));
        }

        .page-header {
          max-width: 1400px;
          margin: 0 auto var(--space-12);
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: var(--space-8);
        }

        .header-content {
          flex: 1;
        }

        .page-title {
          font-size: var(--font-size-5xl);
          font-weight: var(--font-weight-extrabold);
          background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: var(--space-4);
          display: flex;
          align-items: center;
          gap: var(--space-4);
        }

        .title-icon {
          font-size: var(--font-size-5xl);
        }

        .page-subtitle {
          font-size: var(--font-size-xl);
          color: var(--color-text-secondary);
          margin: 0;
        }

        .header-stats {
          display: flex;
          gap: var(--space-4);
        }

        .stat-card {
          background: var(--color-bg-card);
          border: 1px solid var(--color-border-primary);
          border-radius: var(--radius-xl);
          padding: var(--space-5);
          min-width: 140px;
          text-align: center;
          transition: all var(--transition-base);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          border-color: var(--color-primary);
          box-shadow: 0 0 30px rgba(16, 185, 129, 0.3);
        }

        .stat-value {
          display: block;
          font-size: var(--font-size-3xl);
          font-weight: var(--font-weight-extrabold);
          color: var(--color-primary);
          margin-bottom: var(--space-2);
        }

        .stat-label {
          display: block;
          font-size: var(--font-size-sm);
          color: var(--color-text-tertiary);
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .problems-container {
          max-width: 1400px;
          margin: 0 auto;
        }

        @media (max-width: 1024px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .header-stats {
            width: 100%;
            justify-content: space-between;
          }
        }

        @media (max-width: 768px) {
          .solutions-page {
            padding: var(--space-6) var(--space-4);
            padding-top: calc(80px + var(--space-6));
          }
          .page-title {
            font-size: var(--font-size-3xl);
          }
          .header-stats {
            flex-direction: column;
          }
          .stat-card {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
}
