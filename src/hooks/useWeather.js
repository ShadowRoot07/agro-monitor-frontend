import { useQuery } from '@tanstack/react-query';
import api from '../api';

export const useLocationWeather = (locationId) => {
  return useQuery({
    queryKey: ['weather', locationId],
    queryFn: async () => {
      // 1. Pedimos el clima actual (esto dispara la lógica en tu Backend)
      await api.get(`/locations/${locationId}/current-weather/`);
      
      // 2. Pedimos el historial para la gráfica
      // Nota: Asegúrate de que tu backend filtre por esta locationId
      const { data } = await api.get(`/history/`); 
      
      // 3. Formateamos los datos para Recharts
      return data
        .filter(item => item.location === locationId) // Filtro simple por ahora
        .map(item => ({
          time: new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          temp: item.temperature,
          humidity: item.humidity
        })).slice(-10); // Solo los últimos 10 registros
    },
    refetchInterval: 1000 * 60 * 5, // Auto-actualizar cada 5 minutos
  });
};

