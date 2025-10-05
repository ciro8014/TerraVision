import ModelCard from './ModelCard';

/**
 * ProblemSection Component
 * Groups models by problem type (Agriculture, Soil, etc.)
 */
export default function ProblemSection({ problem, models, isExpanded, onToggle }) {
  const getProblemIcon = (problemType) => {
    const icons = {
      agriculture: '🌾',
      soil: '🏔️',
      wetlands: '💧',
      urban: '🏙️',
      forest: '🌲',
      climate: '🌡️',
      landslide: '⚠️',
    };
    return icons[problemType] || '🔬';
  };

  const getProblemColor = (problemType) => {
    const colors = {
      agriculture: 'var(--color-accent-agriculture)',
      soil: 'var(--color-accent-soil)',
      wetlands: 'var(--color-accent-wetlands)',
      urban: 'var(--color-accent-urban)',
      forest: 'var(--color-accent-forest)',
      climate: 'var(--color-accent-climate)',
      landslide: 'var(--color-accent-landslide)',
    };
    return colors[problemType] || 'var(--color-primary)';
  };

  return (
    <div 
      className={`problem-section ${problem.type}`}
      style={{
        '--problem-color': getProblemColor(problem.type)
      }}
    >
      <div className={`problem-header ${problem.type}`} onClick={onToggle}>
        <div className="problem-header-content">
          <div className="problem-title-row">
            <span className="problem-icon">{getProblemIcon(problem.type)}</span>
            <h2 className="problem-title">{problem.title}</h2>
          </div>
          <p className="problem-subtitle">{problem.subtitle}</p>
          <p className="problem-description">{problem.description}</p>
        </div>
        <div className="problem-meta">
          <div className={`problem-status status-${problem.status}`}>
            <span className={`status-dot ${problem.status}`}></span>
            <span>{problem.status}</span>
          </div>
          <div className="problem-area">
            <div className="problem-area-value">{problem.area}</div>
            <div className="problem-area-label">Coverage</div>
          </div>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>▼</span>
        </div>
      </div>

      <div className={`problem-content ${isExpanded ? 'expanded' : ''}`}>
        <div className="problem-inner">
          {/* Objectives */}
          <div className="problem-objectives">
            <h3>🎯 Objectives</h3>
            <ul className="objectives-list">
              {problem.objectives?.map((obj, index) => (
                <li key={index}>{obj}</li>
              ))}
            </ul>
          </div>

          {/* Impact Metrics */}
          <div className="impact-metrics">
            {problem.impacts?.map((impact, index) => (
              <div key={index} className="impact-metric">
                <div className="impact-metric-value">{impact.value}</div>
                <div className="impact-metric-label">{impact.label}</div>
              </div>
            ))}
          </div>

          {/* Models */}
          <div className="problem-models">
            <h3>🤖 ML Models</h3>
            <div className="models-grid">
              {models.map((model, index) => (
                <ModelCard key={index} model={model} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
