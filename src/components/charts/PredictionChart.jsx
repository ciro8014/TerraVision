import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

function PredictionChart({ data }) {
  // Normalizar los datos para asegurar que tengan las propiedades correctas
  const normalizedData = data.map(item => ({
    date: item.date,
    ndvi_pred: item.ndvi_pred || item.evi_pred || item.ndvi || 0,
    ndvi_upper: item.ndvi_upper || item.evi_upper || (item.evi_pred ? item.evi_pred + 0.12 : 0),
    ndvi_lower: item.ndvi_lower || item.evi_lower || (item.evi_pred ? item.evi_pred - 0.12 : 0)
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <AreaChart data={normalizedData} margin={{ top: 5, right: 30, left: 20, bottom: 60 }}>
        <defs>
          <linearGradient id="colorConfidence" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3a" />
        <XAxis 
          dataKey="date" 
          stroke="#a0a0b0"
          tick={{ fill: '#a0a0b0', fontSize: 11 }}
          angle={-45}
          textAnchor="end"
          height={80}
        />
        <YAxis 
          stroke="#a0a0b0"
          tick={{ fill: '#a0a0b0', fontSize: 12 }}
          domain={[0, 1]}
          label={{ value: 'NDVI', angle: -90, position: 'insideLeft', fill: '#a0a0b0' }}
        />
        <Tooltip 
          contentStyle={{ 
            backgroundColor: '#1a1a24', 
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            color: '#fff'
          }}
          labelStyle={{ color: '#3b82f6', fontWeight: 'bold' }}
          formatter={(value) => value.toFixed(3)}
        />
        <Legend wrapperStyle={{ color: '#a0a0b0' }} />
        
        {/* Área de confianza superior */}
        <Area
          type="monotone"
          dataKey="ndvi_upper"
          stroke="none"
          fill="url(#colorConfidence)"
          fillOpacity={1}
          name="Upper Bound"
        />
        
        {/* Área de confianza inferior - con fill oscuro para crear el efecto */}
        <Area
          type="monotone"
          dataKey="ndvi_lower"
          stroke="none"
          fill="#0a0a0f"
          fillOpacity={1}
          name="Lower Bound"
        />
        
        {/* Línea de predicción principal */}
        <Line 
          type="monotone" 
          dataKey="ndvi_pred" 
          stroke="#10b981" 
          strokeWidth={3}
          dot={{ fill: '#10b981', r: 3 }}
          activeDot={{ r: 6 }}
          name="NDVI Prediction"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default PredictionChart;