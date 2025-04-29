# Tonasket Resource Wiki

A comprehensive web platform that aggregates data from various sources to provide a one-stop resource for Tonasket and Okanogan County. The platform includes economic data, business information, trade impact analysis, news, and weather.

## Features

- **Economic Data**: Comprehensive economic statistics, employment data, and growth indicators
- **Business Directory**: Local business listings with details and categories
- **Trade Impact Analysis**: Analysis of trade policies and their impact on the local economy
- **News Aggregator**: Latest news from local sources
- **Weather Information**: Current conditions and forecast for the area
- **Modern UI**: Responsive design with a sleek purple and teal color scheme that works on all devices
- **Dark/Light Mode**: Toggle between dark and light themes for comfortable viewing in any environment

## Technology Stack

- **Frontend**: React with Next.js
- **Backend**: Node.js with Express
- **Database**: PostgreSQL with Prisma ORM
- **Web Crawling**: Puppeteer/Cheerio for data extraction
- **Data Visualization**: D3.js and Chart.js
- **Containerization**: Docker for development and deployment

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- Docker and Docker Compose
- Git

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/gigamonkeyx/tonasket-wiki.git
   cd tonasket-wiki
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Set up Docker:

   See [DOCKER-SETUP.md](./DOCKER-SETUP.md) for detailed instructions on setting up Docker, including options for installing on the D: drive if you have limited space on your C: drive.

4. Start the development environment:
   ```
   # On Windows
   .\scripts\start-dev.ps1

   # On Linux/Mac
   chmod +x ./scripts/start-dev.sh
   ./scripts/start-dev.sh
   ```

5. Open your browser and navigate to `http://localhost:3000`

### Development Scripts

- `npm run dev`: Start the Next.js development server
- `npm run docker:up`: Start Docker containers
- `npm run docker:down`: Stop Docker containers
- `npm run db:migrate`: Run Prisma migrations
- `npm run db:seed`: Seed the database with initial data
- `npm run crawl`: Run web crawlers to fetch data
- `npm run test`: Run tests
- `npm run build`: Build the application for production

## Project Structure

- `src/app/`: Next.js pages and API routes
- `src/components/`: Reusable React components
- `src/utils/`: Utility functions and web crawlers
- `prisma/`: Database schema and migrations
- `scripts/`: Development and deployment scripts
- `docker-compose.yml`: Docker configuration

## Data Sources

- U.S. Census Bureau
- Bureau of Labor Statistics
- Okanogan County Economic Development Council
- Washington State Department of Commerce
- Local news outlets
- National Weather Service
- And more...

## Deployment

The project can be deployed to various hosting providers:

1. **Local Deployment**: Use the provided scripts to deploy on a local server
2. **Cloud Deployment**: Deploy to Vercel, Netlify, AWS, or other cloud providers

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Data USA for economic data
- Weather.gov for weather data
- Local news sources for news content
