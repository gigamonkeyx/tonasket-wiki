import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    name: 'Tonasket Resource Wiki API',
    version: '1.0.0',
    endpoints: [
      '/api/economic-data',
      '/api/businesses',
      '/api/news',
      '/api/weather',
      '/api/trade-impact'
    ]
  });
}
