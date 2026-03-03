import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import App from '../App';
import api from '../api';

// 1. Simulamos la API para no hacer peticiones reales
vi.mock('../api');

// 2. Configuramos un QueryClient limpio para cada test
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

describe('App Integration Tests', () => {
  let queryClient;

  beforeEach(() => {
    queryClient = createTestQueryClient();
    vi.clearAllMocks();
  });

  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );

  // --- CASO 1: HAPPY PASS (DATOS VACÍOS) ---
  it('should show empty state when no locations are found', async () => {
    // Simulamos que el backend responde con una lista vacía []
    api.get.mockResolvedValue({ data: [] });

    render(<App />, { wrapper });

    // Esperamos a que el texto configurado en tu App.jsx aparezca
    await waitFor(() => {
      expect(screen.getByText(/No hay huertos registrados/i)).toBeInTheDocument();
    });
  });

  // --- CASO 2: BAD PASS (ERROR DE SERVIDOR) ---
  it('should show error message when API fails', async () => {
    // Simulamos un error 500 o fallo de red
    api.get.mockRejectedValue(new Error('Network Error'));

    render(<App />, { wrapper });

    await waitFor(() => {
      expect(screen.getByText(/\[ERROR_SISTEMA\]/i)).toBeInTheDocument();
    });
  });
});

