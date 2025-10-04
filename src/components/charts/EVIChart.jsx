import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function EVIChart({ data }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">Vegetation Index (EVI) - Historical Data</h3>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
          <XAxis 
            dataKey="date" 
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
          <Legend 
            wrapperStyle={{ color: '#a0a0b0' }}
          />
          <Line 
            type="monotone" 
            dataKey="evi" 
            stroke="#3b82f6" 
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
            name="EVI"
          />
          <Line 
            type="monotone" 
            dataKey="temperatura" 
            stroke="#10b981" 
            strokeWidth={2}
            dot={{ fill: '#10b981', r: 3 }}
            name="Temperatura (°C)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default EVIChart;