import { describe, it, expect } from 'vitest';
import { calculateVPD } from '../agroPhysics';

describe('AgroPhysics Logic', () => {
  // Happy Pass
  it('should calculate correct VPD for optimal conditions (25°C, 50% Hum)', () => {
    const result = calculateVPD(25, 50);
    expect(result.value).toBe("1.58");
    expect(result.status.label).toBe("High Transpiration"); 
  });


  // Bad Pass / Edge Case
  it('should handle extreme humidity (100%) returning 0 VPD', () => {
    const result = calculateVPD(20, 100);
    expect(parseFloat(result.value)).toBe(0);
    expect(result.status.label).toBe("Too Humid");
  });
});

