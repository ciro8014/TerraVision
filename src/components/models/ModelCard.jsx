/**
 * ModelCard Component
 * Displays detailed information about a specific ML model
 */
export default function ModelCard({ model }) {
  return (
    <div className="model-card">
      <div className="model-header">
        <div className="model-title-section">
          <div className="model-name-row">
            <span className="model-icon">{model.icon}</span>
            <h4 className="model-name">{model.name}</h4>
          </div>
        </div>
        <div className="model-version">
          <span className="version-badge">v{model.version}</span>
          <span className={`status-badge status-${model.status}`}>
            {model.status}
          </span>
        </div>
      </div>

      <p className="model-description">{model.description}</p>

      {model.metrics && (
        <div className="model-metrics">
          {model.metrics.map((metric, index) => (
            <div key={index} className="metric-box">
              <div className="metric-label">{metric.label}</div>
              <div className="metric-value">{metric.value}</div>
            </div>
          ))}
        </div>
      )}

      {model.tags && (
        <div className="model-tags">
          {model.tags.map((tag, index) => (
            <span key={index} className="model-tag">{tag}</span>
          ))}
        </div>
      )}

      <div className="model-details">
        {model.inputs && (
          <div className="detail-row">
            <strong>Inputs:</strong>
            <span className="detail-code">{model.inputs}</span>
          </div>
        )}
        {model.output && (
          <div className="detail-row">
            <strong>Output:</strong>
            <span className="detail-code">{model.output}</span>
          </div>
        )}
        {model.useCase && (
          <div className="detail-row">
            <strong>Use Case:</strong>
            <span>{model.useCase}</span>
          </div>
        )}
      </div>

      <div className="model-footer">
        <div className="model-size">
          <span>💾</span>
          <span>{model.size}</span>
        </div>
        <div className="model-updated">
          <span>🕒</span>
          <span>Updated: {model.lastUpdated}</span>
        </div>
      </div>
    </div>
  );
}
