import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

function PredictionChart({ data }) {
  return (
    <div className="chart-container">
      <h3 className="chart-title">NDVI Predictions with Confidence Intervals</h3>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
            tick={{ fill: '#a0a0b0' }}
            tickFormatter={(value) => {
              const date = new Date(value);
              return `${date.getMonth() + 1}/${date.getFullYear()}`;
            }}
          />
          <YAxis 
            stroke="#a0a0b0"
            tick={{ fill: '#a0a0b0' }}
            domain={[0, 1]}
            label={{ value: 'NDVI', angle: -90, position: 'insideLeft', fill: '#a0a0b0' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#1a1a24', 
              border: '1px solid #2a2a3a',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelFormatter={(label) => `Date: ${label}`}
            formatter={(value) => value.toFixed(3)}
          />
          <Legend wrapperStyle={{ color: '#a0a0b0' }} />
          
          {/* Intervalo de confianza (área sombreada) */}
          <Area
            type="monotone"
            dataKey="ndvi_upper"
            stroke="none"
            fill="url(#colorConfidence)"
            name="Upper Bound"
          />
          <Area
            type="monotone"
            dataKey="ndvi_lower"
            stroke="none"
            fill="url(#colorConfidence)"
            name="Lower Bound"
          />
          
          {/* Línea de predicción principal */}
          <Line 
            type="monotone" 
            dataKey="ndvi_pred" 
            stroke="#10b981" 
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 7 }}
            name="NDVI Prediction"
          />
        </AreaChart>
      </ResponsiveContainer>
      
      <div className="chart-legend-info">
        <p>
          <span className="legend-dot" style={{ backgroundColor: '#10b981' }}></span>
          Predicted NDVI from ConvLSTM model (16-day composites)
        </p>
        <p>
          <span className="legend-area" style={{ backgroundColor: '#10b981', opacity: 0.2 }}></span>
          95% confidence interval based on model uncertainty
        </p>
      </div>
    </div>
  );
}

export default PredictionChart;