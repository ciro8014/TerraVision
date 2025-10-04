import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

function PredictionChart({ data }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">EVI Predictions 2026-2030 with Confidence Intervals</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <defs>
            <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
            </linearGradient>
          </defs>
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
          <Legend wrapperStyle={{ color: '#a0a0b0' }} />
          
          {/* Intervalo de confianza (área sombreada) */}
          <Area
            type="monotone"
            dataKey="evi_upper"
            stroke="none"
            fill="url(#colorConfidence)"
            name="Intervalo Superior"
          />
          <Area
            type="monotone"
            dataKey="evi_lower"
            stroke="none"
            fill="url(#colorConfidence)"
            name="Intervalo Inferior"
          />
          
          {/* Línea de predicción principal */}
          <Line 
            type="monotone" 
            dataKey="evi_pred" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 5 }}
            activeDot={{ r: 7 }}
            name="Predicción EVI"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PredictionChart;