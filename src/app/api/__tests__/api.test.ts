import { NextRequest } from 'next/server';
import { GET } from '../route';

describe('API Root Endpoint', () => {
  it('should return API information', async () => {
    const response = await GET();
    const data = await response.json();
    
    expect(response.status).toBe(200);
    expect(data).toHaveProperty('name', 'Tonasket Resource Wiki API');
    expect(data).toHaveProperty('version', '1.0.0');
    expect(data).toHaveProperty('endpoints');
    expect(Array.isArray(data.endpoints)).toBe(true);
    expect(data.endpoints.length).toBeGreaterThan(0);
  });
});
