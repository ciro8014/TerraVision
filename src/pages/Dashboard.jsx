import { Activity, CloudSun, Leaf, TrendingUp } from 'lucide-react';
import StatCard from '../components/dashboard/StatCard';
import AlertCard from '../components/dashboard/AlertCard';
import EVIChart from '../components/charts/EVIChart';
import AnnualChart from '../components/charts/AnnualChart';
import { historicalEVI, annualSummary, currentStats, alerts } from '../lib/mockData';

function Dashboard() {
  return (
    <div className="dashboard-page">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <div>
            <h1 className="page-title">Dashboard</h1>
            <p className="dashboard-subtitle">
              Real-time vegetation index monitoring in Cusco
            </p>
          </div>
          <div className="dashboard-date">
            Last updated: {currentStats.ultimaActualizacion}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid-dashboard">
          <StatCard
            icon={<Leaf size={32} />}
            title="Current EVI"
            value={currentStats.eviActual.toFixed(2)}
            trend={currentStats.eviTendencia}
            color="blue"
          />
          <StatCard
            icon={<CloudSun size={32} />}
            title="Clear Sky Days"
            value={currentStats.diasDespejados}
            trend="Last 30 days"
            color="green"
          />
          <StatCard
            icon={<Activity size={32} />}
            title="Avg Temperature"
            value={`${currentStats.temperaturaMedia}°C`}
            trend="Annual average"
            color="purple"
          />
          <StatCard
            icon={<TrendingUp size={32} />}
            title="ML Accuracy"
            value={`${currentStats.precision}%`}
            trend="R² Score"
            color="orange"
          />
        </div>

        {/* Charts Grid */}
        <div className="charts-grid">
          <div className="chart-full">
            <EVIChart data={historicalEVI} />
          </div>
          <div className="chart-half">
            <AnnualChart data={annualSummary} />
          </div>
        </div>

        {/* Alerts Section */}
        <div className="alerts-section">
          <h2 className="section-title-small">Alerts & Notifications</h2>
          <div className="alerts-grid">
            {alerts.map(alert => (
              <AlertCard key={alert.id} alert={alert} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;