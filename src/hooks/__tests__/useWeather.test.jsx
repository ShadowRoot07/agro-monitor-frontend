import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi } from 'vitest';
import { useLocationWeather } from '../useWeather';
import api from '../../api';

// Mock de la API
vi.mock('../../api');

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useLocationWeather Hook', () => {
  it('should return loading state initially', () => {
    api.get.mockResolvedValue({ data: [] });
    const { result } = renderHook(() => useLocationWeather(1), {
      wrapper: createWrapper()
    });
    expect(result.current.isLoading).toBe(true);
  });
});

