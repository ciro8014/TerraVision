import { Download, Database, Code, FileText, Book, ExternalLink, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

function Data() {
  const [copiedCode, setCopiedCode] = useState(null);

  const datasets = [
    {
      name: 'Historical EVI Data (2000-2025)',
      description: '25 years of Enhanced Vegetation Index for Cusco region',
      format: 'CSV',
      size: '12.5 MB',
      records: '~150 temporal records',
      variables: ['Date', 'EVI Mean', 'EVI Std', 'Temperature', 'Clear Sky Days'],
      license: 'CC BY 4.0',
      downloadUrl: '#'
    },
    {
      name: 'Future Predictions (2026-2030)',
      description: 'ML-generated forecasts with confidence intervals',
      format: 'CSV',
      size: '2.1 MB',
      records: '100 predictions',
      variables: ['Date', 'EVI Prediction', 'Lower CI', 'Upper CI', 'Model Type'],
      license: 'CC BY 4.0',
      downloadUrl: '#'
    },
    {
      name: 'Glacier Monitoring Dataset',
      description: 'Salkantay & Ausangate glacier metrics (2000-2025)',
      format: 'GeoJSON + CSV',
      size: '45 MB',
      records: '~500 measurements',
      variables: ['Year', 'Area (km²)', 'Volume (km³)', 'Coordinates', 'DEM Data'],
      license: 'CC BY 4.0',
      downloadUrl: '#'
    },
    {
      name: 'Water Resources Data',
      description: 'Piuray lagoon and water body monitoring',
      format: 'CSV',
      size: '8.3 MB',
      records: '300 measurements',
      variables: ['Date', 'Water Level (%)', 'Surface Area', 'Quality Index'],
      license: 'CC BY 4.0',
      downloadUrl: '#'
    },
    {
      name: 'MODIS Processed Images',
      description: 'Pre-processed MOD13Q1 and MOD11A2 for Cusco',
      format: 'GeoTIFF',
      size: '2.3 GB',
      records: '150+ images',
      variables: ['NDVI', 'EVI', 'LST Day', 'LST Night', 'QA Flags'],
      license: 'NASA Open Data',
      downloadUrl: '#'
    },
    {
      name: 'ASTER DEM Data',
      description: 'High-resolution Digital Elevation Model',
      format: 'GeoTIFF',
      size: '850 MB',
      records: '15m resolution',
      variables: ['Elevation', 'Slope', 'Aspect', 'Hillshade'],
      license: 'NASA Open Data',
      downloadUrl: '#'
    }
  ];

  const apiExamples = [
    {
      title: 'Get Historical EVI',
      language: 'Python',
      code: `import requests

# Get EVI data for specific date range
url = "https://api.terravision.app/v1/evi"
params = {
    "start_date": "2020-01-01",
    "end_date": "2025-01-01",
    "region": "cusco"
}

response = requests.get(url, params=params)
data = response.json()

print(f"Records found: {len(data['results'])}")
for record in data['results'][:5]:
    print(f"{record['date']}: EVI = {record['evi']}")`
    },
    {
      title: 'Get Predictions',
      language: 'JavaScript',
      code: `// Fetch future predictions
const getPredictions = async () => {
  const response = await fetch(
    'https://api.terravision.app/v1/predictions?year=2026'
  );
  
  const data = await response.json();
  
  data.predictions.forEach(pred => {
    console.log(\`\${pred.date}: \${pred.evi_pred} 
    (±\${pred.confidence_interval})\`);
  });
};

getPredictions();`
    },
    {
      title: 'Download Dataset',
      language: 'cURL',
      code: `# Download complete historical dataset
curl -X GET "https://api.terravision.app/v1/download/evi-historical" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o cusco_evi_2000_2025.csv

# Download with filters
curl -X GET "https://api.terravision.app/v1/download/evi-historical?format=geojson&year=2024" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -o cusco_evi_2024.geojson`
    },
    {
      title: 'Get Glacier Data',
      language: 'R',
      code: `library(httr)
library(jsonlite)

# Fetch glacier monitoring data
url <- "https://api.terravision.app/v1/glaciers/salkantay"
response <- GET(url)

data <- fromJSON(content(response, "text"))

# Plot glacier retreat
plot(data$year, data$area_km2, 
     type="l", col="blue",
     main="Salkantay Glacier Retreat",
     xlab="Year", ylab="Area (km²)")`
    }
  ];

  const copyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="data-page">
      <div className="container">
        {/* Header */}
        <div className="data-header">
          <div>
            <h1 className="page-title">Open Data & API</h1>
            <p className="data-subtitle">
              Free access to 25 years of processed NASA Terra satellite data for Cusco
            </p>
          </div>
          <div className="data-badge">
            <Database size={24} />
            <span>All datasets under CC BY 4.0</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="data-stats">
          <div className="data-stat-item">
            <div className="stat-number">3.2 GB</div>
            <div className="stat-label">Total Data Available</div>
          </div>
          <div className="data-stat-item">
            <div className="stat-number">25</div>
            <div className="stat-label">Years of Records</div>
          </div>
          <div className="data-stat-item">
            <div className="stat-number">150+</div>
            <div className="stat-label">Processed Images</div>
          </div>
          <div className="data-stat-item">
            <div className="stat-number">Free</div>
            <div className="stat-label">Open Access</div>
          </div>
        </div>

        {/* Datasets Grid */}
        <div className="datasets-section">
          <h2 className="section-title">Available Datasets</h2>
          <div className="datasets-grid">
            {datasets.map((dataset, index) => (
              <div key={index} className="dataset-card">
                <div className="dataset-header">
                  <FileText size={32} color="#3b82f6" />
                  <div className="dataset-meta">
                    <span className="dataset-format">{dataset.format}</span>
                    <span className="dataset-size">{dataset.size}</span>
                  </div>
                </div>

                <h3 className="dataset-name">{dataset.name}</h3>
                <p className="dataset-description">{dataset.description}</p>

                <div className="dataset-info">
                  <div className="info-item">
                    <strong>Records:</strong> {dataset.records}
                  </div>
                  <div className="info-item">
                    <strong>License:</strong> {dataset.license}
                  </div>
                </div>

                <div className="dataset-variables">
                  <strong>Variables:</strong>
                  <div className="variables-tags">
                    {dataset.variables.map((variable, i) => (
                      <span key={i} className="variable-tag">{variable}</span>
                    ))}
                  </div>
                </div>

                <button className="download-btn">
                  <Download size={20} />
                  Download Dataset
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Documentation */}
        <div className="api-section">
          <h2 className="section-title">API Documentation</h2>
          <p className="api-intro">
            Access TerraVision data programmatically via our RESTful API. Free for research and non-commercial use.
          </p>

          <div className="api-info-grid">
            <div className="api-info-card">
              <h3>Base URL</h3>
              <code>https://api.terravision.app/v1</code>
            </div>
            <div className="api-info-card">
              <h3>Authentication</h3>
              <code>Bearer Token (request at data@terravision.app)</code>
            </div>
            <div className="api-info-card">
              <h3>Rate Limit</h3>
              <code>1000 requests/hour</code>
            </div>
            <div className="api-info-card">
              <h3>Format</h3>
              <code>JSON, CSV, GeoJSON</code>
            </div>
          </div>

          {/* Code Examples */}
          <div className="code-examples">
            {apiExamples.map((example, index) => (
              <div key={index} className="code-example-card">
                <div className="code-header">
                  <div className="code-title">
                    <Code size={20} />
                    <h3>{example.title}</h3>
                  </div>
                  <div className="code-actions">
                    <span className="code-language">{example.language}</span>
                    <button 
                      className="copy-btn"
                      onClick={() => copyCode(example.code, index)}
                    >
                      {copiedCode === index ? (
                        <>
                          <CheckCircle size={16} />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy size={16} />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>
                <pre className="code-block">
                  <code>{example.code}</code>
                </pre>
              </div>
            ))}
          </div>
        </div>

        {/* External Resources */}
        <div className="resources-section">
          <h2 className="section-title">External Data Sources</h2>
          <div className="resources-grid">
            <div className="resource-card">
              <Book size={32} color="#3b82f6" />
              <h3>NASA Earthdata</h3>
              <p>Access raw Terra satellite data and products</p>
              <a href="https://earthdata.nasa.gov" target="_blank" rel="noopener noreferrer" className="resource-link">
                earthdata.nasa.gov
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="resource-card">
              <Database size={32} color="#10b981" />
              <h3>AppEEARS</h3>
              <p>Extract and visualize satellite data by location</p>
              <a href="https://appeears.earthdatacloud.nasa.gov" target="_blank" rel="noopener noreferrer" className="resource-link">
                appeears.earthdatacloud.nasa.gov
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="resource-card">
              <Code size={32} color="#a78bfa" />
              <h3>Google Earth Engine</h3>
              <p>Cloud platform for geospatial analysis</p>
              <a href="https://earthengine.google.com" target="_blank" rel="noopener noreferrer" className="resource-link">
                earthengine.google.com
                <ExternalLink size={16} />
              </a>
            </div>

            <div className="resource-card">
              <FileText size={32} color="#f59e0b" />
              <h3>Our GitHub</h3>
              <p>ML models, processing scripts, and documentation</p>
              <a href="https://github.com/terravision" target="_blank" rel="noopener noreferrer" className="resource-link">
                github.com/terravision
                <ExternalLink size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Citation */}
        <div className="citation-section">
          <h2 className="section-title">How to Cite</h2>
          <div className="citation-card">
            <h3>Academic Citation</h3>
            <div className="citation-box">
              <p>
                TerraVision Team (2025). <em>TerraVision: Multi-Sensor Earth Observation System for Cusco, Peru</em>. 
                NASA Space Apps Challenge 2025. Dataset available at: https://terravision.app/data
              </p>
            </div>
            <h3 className="bibtex-title">BibTeX</h3>
            <div className="citation-box">
              <pre>{`@misc{terravision2025,
  title={TerraVision: Multi-Sensor Earth Observation for Cusco},
  author={TerraVision Team},
  year={2025},
  publisher={NASA Space Apps Challenge},
  url={https://terravision.app}
}`}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Data;