function StatCard({ icon, title, value, trend, color = 'blue' }) {
  const colorClasses = {
    blue: 'stat-card-blue',
    green: 'stat-card-green',
    purple: 'stat-card-purple',
    orange: 'stat-card-orange'
  };

  return (
    <div className={`stat-card-dashboard ${colorClasses[color]}`}>
      <div className="stat-card-icon">
        {icon}
      </div>
      <div className="stat-card-content">
        <div className="stat-card-title">{title}</div>
        <div className="stat-card-value">{value}</div>
        {trend && (
          <div className="stat-card-trend">
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}

export default StatCard;