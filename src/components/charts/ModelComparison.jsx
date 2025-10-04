import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function ModelComparison() {
  const modelData = [
    { modelo: 'Random Forest', precision: 87, rmse: 0.08 },
    { modelo: 'Neural Network', precision: 92, rmse: 0.05 },
    { modelo: 'Promedio Ensemble', precision: 90, rmse: 0.06 }
  ];

  return (
    <div className="chart-container">
      <h3 className="chart-title">Comparison of ML Models</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={modelData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
          <XAxis 
            dataKey="modelo" 
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0' }}
          />
          <YAxis 
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a24', 
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              color: '#fff'
            }}
          />
          <Legend wrapperStyle={{ color: '#a0a0b0' }} />
          <Bar 
            dataKey="precision" 
            fill="#10b981" 
            radius={[8, 8, 0, 0]}
            name="Precisión (%)"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ModelComparison;