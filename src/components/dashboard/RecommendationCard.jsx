import { CheckCircle, AlertTriangle, XCircle } from 'lucide-react';

function RecommendationCard({ prediction }) {
  const getRecommendation = (eviValue) => {
    if (eviValue >= 0.55) {
      return {
        status: 'optimo',
        icon: <CheckCircle size={40} />,
        title: 'Condiciones Óptimas',
        message: 'Excelente momento para siembra de cultivos principales',
        action: 'Recomendado: Maíz, Papa, Quinua'
      };
    } else if (eviValue >= 0.45) {
      return {
        status: 'moderado',
        icon: <AlertTriangle size={40} />,
        title: 'Condiciones Moderadas',
        message: 'Período aceptable con precauciones',
        action: 'Considerar: Riego adicional y monitoreo constante'
      };
    } else {
      return {
        status: 'riesgo',
        icon: <XCircle size={40} />,
        title: 'Condiciones Desfavorables',
        message: 'Se recomienda posponer siembra',
        action: 'Esperar mejores condiciones climáticas'
      };
    }
  };

  const rec = getRecommendation(prediction.evi_pred);

  return (
    <div className={`recommendation-card recommendation-${rec.status}`}>
      <div className="recommendation-icon">
        {rec.icon}
      </div>
      <div className="recommendation-content">
        <h3 className="recommendation-title">{rec.title}</h3>
        <p className="recommendation-message">{rec.message}</p>
        <div className="recommendation-action">
          <strong>Acción recomendada:</strong> {rec.action}
        </div>
        <div className="recommendation-meta">
          <span>Período: {prediction.date}</span>
          <span>EVI Predicho: {prediction.evi_pred.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}

export default RecommendationCard;