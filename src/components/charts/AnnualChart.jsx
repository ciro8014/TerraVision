import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function AnnualChart({ data }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Tendencia Anual - Media EVI</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
          <XAxis 
            dataKey="year" 
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0' }}
          />
          <YAxis 
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0' }}
            domain={[0, 1]}
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
            dataKey="mean" 
            fill="#3b82f6" 
            radius={[8, 8, 0, 0]}
            name="EVI Promedio"
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default AnnualChart;