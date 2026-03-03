import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AgroAlert } from '../AgroAlert';

describe('AgroAlert Component', () => {
  // Happy Pass
  it('renders optimal conditions message when temp is normal', () => {
    render(<AgroAlert temp={20} humidity={50} />);
    expect(screen.getByText(/Condiciones Óptimas/i)).toBeInTheDocument();
  });

  // Bad Pass / Alert Trigger
  it('renders frost risk alert when temperature is below 4°C', () => {
    render(<AgroAlert temp={2} humidity={50} />);
    expect(screen.getByText(/Riesgo de Helada/i)).toBeInTheDocument();
  });
});

