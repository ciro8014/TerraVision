// TerraVision Multi-Sensor Data for Cusco, Peru
// Integrating MODIS, ASTER, MISR, and other Terra instruments

// Historical EVI and Temperature Data (2020-2025)
export const historicalEVI = [
  { date: '2020-01', evi: 0.45, temperature: 18, snowCover: 45 },
  { date: '2020-04', evi: 0.52, temperature: 16, snowCover: 35 },
  { date: '2020-07', evi: 0.38, temperature: 14, snowCover: 65 },
  { date: '2020-10', evi: 0.48, temperature: 17, snowCover: 40 },
  { date: '2021-01', evi: 0.47, temperature: 19, snowCover: 42 },
  { date: '2021-04', evi: 0.55, temperature: 17, snowCover: 30 },
  { date: '2021-07', evi: 0.41, temperature: 15, snowCover: 60 },
  { date: '2021-10', evi: 0.50, temperature: 18, snowCover: 38 },
  { date: '2022-01', evi: 0.46, temperature: 18, snowCover: 40 },
  { date: '2022-04', evi: 0.53, temperature: 16, snowCover: 32 },
  { date: '2022-07', evi: 0.40, temperature: 14, snowCover: 62 },
  { date: '2022-10', evi: 0.49, temperature: 17, snowCover: 39 },
  { date: '2023-01', evi: 0.48, temperature: 19, snowCover: 38 },
  { date: '2023-04', evi: 0.56, temperature: 17, snowCover: 28 },
  { date: '2023-07', evi: 0.42, temperature: 15, snowCover: 58 },
  { date: '2023-10', evi: 0.51, temperature: 18, snowCover: 36 },
  { date: '2024-01', evi: 0.49, temperature: 19, snowCover: 35 },
  { date: '2024-04', evi: 0.57, temperature: 17, snowCover: 25 },
  { date: '2024-07', evi: 0.43, temperature: 15, snowCover: 55 },
  { date: '2024-10', evi: 0.52, temperature: 18, snowCover: 33 },
  { date: '2025-01', evi: 0.50, temperature: 19, snowCover: 32 },
];

// Future Predictions (2026-2030)
export const predictions = [
  { date: '2026-01', evi_pred: 0.51, evi_lower: 0.48, evi_upper: 0.54 },
  { date: '2026-04', evi_pred: 0.58, evi_lower: 0.55, evi_upper: 0.61 },
  { date: '2026-07', evi_pred: 0.44, evi_lower: 0.41, evi_upper: 0.47 },
  { date: '2026-10', evi_pred: 0.53, evi_lower: 0.50, evi_upper: 0.56 },
  { date: '2027-01', evi_pred: 0.52, evi_lower: 0.49, evi_upper: 0.55 },
  { date: '2027-04', evi_pred: 0.59, evi_lower: 0.56, evi_upper: 0.62 },
  { date: '2027-07', evi_pred: 0.45, evi_lower: 0.42, evi_upper: 0.48 },
  { date: '2027-10', evi_pred: 0.54, evi_lower: 0.51, evi_upper: 0.57 },
  { date: '2028-01', evi_pred: 0.53, evi_lower: 0.50, evi_upper: 0.56 },
  { date: '2028-04', evi_pred: 0.60, evi_lower: 0.57, evi_upper: 0.63 },
  { date: '2028-07', evi_pred: 0.46, evi_lower: 0.43, evi_upper: 0.49 },
  { date: '2028-10', evi_pred: 0.55, evi_lower: 0.52, evi_upper: 0.58 },
  { date: '2029-01', evi_pred: 0.54, evi_lower: 0.51, evi_upper: 0.57 },
  { date: '2029-04', evi_pred: 0.61, evi_lower: 0.58, evi_upper: 0.64 },
  { date: '2029-07', evi_pred: 0.47, evi_lower: 0.44, evi_upper: 0.50 },
  { date: '2029-10', evi_pred: 0.56, evi_lower: 0.53, evi_upper: 0.59 },
  { date: '2030-01', evi_pred: 0.55, evi_lower: 0.52, evi_upper: 0.58 },
];

// Annual Summary
export const annualSummary = [
  { year: 2020, mean: 0.46, std: 0.06 },
  { year: 2021, mean: 0.48, std: 0.06 },
  { year: 2022, mean: 0.47, std: 0.05 },
  { year: 2023, mean: 0.49, std: 0.06 },
  { year: 2024, mean: 0.50, std: 0.06 },
  { year: 2025, mean: 0.50, std: 0.05 },
];

// Current Statistics
export const currentStats = {
  eviActual: 0.50,
  eviTendencia: '+4.2%',
  diasDespejados: 68,
  temperaturaMedia: 18.5,
  precision: 92,
  ultimaActualizacion: '2025-01-15'
};

// Multi-Sensor Data
export const sensorData = {
  modis: {
    name: 'MODIS',
    resolution: '250m - 1km',
    coverage: 'Daily',
    parameters: ['NDVI', 'EVI', 'LST', 'Snow Cover'],
    status: 'Active'
  },
  aster: {
    name: 'ASTER',
    resolution: '15m - 90m',
    coverage: 'On-demand',
    parameters: ['DEM', 'Surface Temp', 'Minerals'],
    status: 'Active'
  },
  misr: {
    name: 'MISR',
    resolution: '275m - 1.1km',
    coverage: 'Weekly',
    parameters: ['Aerosols', 'Cloud Height', 'Land Cover'],
    status: 'Active'
  },
  mopitt: {
    name: 'MOPITT',
    resolution: '22km',
    coverage: '3 days',
    parameters: ['CO Concentration', 'Air Quality'],
    status: 'Active'
  }
};

// Glacier Monitoring Data
export const glacierData = [
  { year: 2000, area: 450, volume: 125 },
  { year: 2005, area: 430, volume: 118 },
  { year: 2010, area: 410, volume: 110 },
  { year: 2015, area: 385, volume: 100 },
  { year: 2020, area: 355, volume: 88 },
  { year: 2025, area: 320, volume: 75 },
];

// Water Resources Data
export const waterData = [
  { month: 'Jan', level: 85, quality: 'Good' },
  { month: 'Feb', level: 92, quality: 'Good' },
  { month: 'Mar', level: 88, quality: 'Good' },
  { month: 'Apr', level: 75, quality: 'Fair' },
  { month: 'May', level: 65, quality: 'Fair' },
  { month: 'Jun', level: 58, quality: 'Poor' },
  { month: 'Jul', level: 52, quality: 'Poor' },
  { month: 'Aug', level: 48, quality: 'Critical' },
  { month: 'Sep', level: 55, quality: 'Poor' },
  { month: 'Oct', level: 68, quality: 'Fair' },
  { month: 'Nov', level: 78, quality: 'Good' },
  { month: 'Dec', level: 82, quality: 'Good' },
];

// Alerts
export const alerts = [
  {
    id: 1,
    tipo: 'glacier',
    titulo: 'Glacier Retreat Alert',
    mensaje: 'Salkantay glacier showing accelerated retreat - water supply at risk',
    fecha: '2025-01-15',
    severidad: 'warning'
  },
  {
    id: 2,
    tipo: 'urban',
    titulo: 'Urban Expansion Detected',
    mensaje: 'ASTER detected 12 ha of new construction in protected agricultural zone',
    fecha: '2025-01-14',
    severidad: 'warning'
  },
  {
    id: 3,
    tipo: 'water',
    titulo: 'Water Levels Normal',
    mensaje: 'Piuray lagoon at optimal levels - sufficient supply for next 3 months',
    fecha: '2025-01-13',
    severidad: 'success'
  },
  {
    id: 4,
    tipo: 'air',
    titulo: 'Air Quality Good',
    mensaje: 'MISR aerosol data shows excellent visibility for tourism',
    fecha: '2025-01-12',
    severidad: 'info'
  }
];