import axios from 'axios';

// Obtenemos la URL de la variable de entorno
const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Interceptor para debug (opcional, ayuda mucho en desarrollo)
api.interceptors.request.use((config) => {
  console.log(`🚀 Llamando a: ${config.baseURL}${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;

