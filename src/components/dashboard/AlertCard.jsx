import { AlertCircle, CheckCircle, Info } from 'lucide-react';

function AlertCard({ alert }) {
  const icons = {
    success: <CheckCircle size={24} />,
    warning: <AlertCircle size={24} />,
    info: <Info size={24} />
  };

  return (
    <div className={`alert-card alert-${alert.severidad}`}>
      <div className="alert-icon">
        {icons[alert.severidad]}
      </div>
      <div className="alert-content">
        <h4 className="alert-title">{alert.titulo}</h4>
        <p className="alert-message">{alert.mensaje}</p>
        <span className="alert-date">{alert.fecha}</span>
      </div>
    </div>
  );
}

export default AlertCard;