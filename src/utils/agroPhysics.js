/**
 * Calcula el VPD (Déficit de Presión de Vapor) en kPa
 * @param {number} temp - Temperatura en Celsius
 * @param {number} humidity - Humedad relativa en %
 */
export const calculateVPD = (temp, humidity) => {
  // 1. Calcular Presión de Vapor de Saturación (es)
  const es = 0.61078 * Math.exp((17.27 * temp) / (temp + 237.3));
  
  // 2. Calcular Presión de Vapor Real (ea)
  const ea = es * (humidity / 100);
  
  // 3. El VPD es la diferencia
  const vpd = es - ea;
  
  return {
    value: vpd.toFixed(2),
    status: getVPDStatus(vpd)
  };
};

const getVPDStatus = (vpd) => {
  if (vpd < 0.4) return { label: 'Too Humid', color: 'text-blue-400' };
  if (vpd >= 0.4 && vpd <= 1.2) return { label: 'Optimal', color: 'text-emerald-400' };
  if (vpd > 1.2 && vpd <= 1.6) return { label: 'High Transpiration', color: 'text-amber-400' };
  return { label: 'Danger/Stress', color: 'text-red-500' };
};

