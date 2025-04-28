# Tonasket Wiki Business Directory

## Overview

The Tonasket Wiki Business Directory is a comprehensive resource for finding local businesses, services, and organizations in the Tonasket area. The directory features enriched business data from multiple sources, interactive maps, and community contribution capabilities.

## Features

### Multi-Source Data Enrichment

The business directory combines data from multiple sources to create comprehensive business profiles:

1. **Washington State Business Lookup API**
   - Official business registrations from the Washington Department of Revenue
   - Accessed via Socrata API: https://data.wa.gov/resource/7xux-kdpf.json
   - Provides legal business information, addresses, and business types

2. **Google Places API**
   - Rich business details including hours, photos, ratings, and reviews
   - Interactive maps and location data
   - Contact information and website links

3. **Yelp Fusion API**
   - Detailed business categories and attributes
   - Customer reviews and ratings
   - Additional photos and business details

4. **Web Scraping**
   - Extracts information directly from business websites
   - Gathers descriptions, services, products, and social media links
   - Supplements official data with business-provided information

### Interactive Map

The business directory includes an interactive map that allows users to:

- Explore businesses by location
- Filter businesses by category
- View business details directly from the map
- Get directions to businesses

### Business Submission and Claim

The directory allows community contributions through:

1. **Business Submission Form**
   - Businesses can submit their information for inclusion in the directory
   - Comprehensive form captures all relevant business details
   - Submissions are reviewed before being added to the directory

2. **Business Claim Process**
   - Business owners can claim existing listings
   - Verification process ensures legitimate ownership
   - Claimed businesses can be updated by their owners

### Enhanced User Interface

The directory features a modern, user-friendly interface:

- Toggle between list and card views
- Detailed business cards with comprehensive information
- Responsive design for all device sizes
- Accessibility features for all users

## Technical Implementation

### Data Flow Architecture

1. **Data Collection**
   - External API clients fetch data from multiple sources
   - Web scrapers extract data from business websites
   - User submissions provide additional business information

2. **Data Processing**
   - Entity resolution matches businesses across different sources
   - Data normalization standardizes formats and values
   - Field prioritization selects the best data from each source
   - Data merging combines information into comprehensive profiles

3. **Data Storage**
   - PostgreSQL database stores enriched business data
   - Prisma ORM manages database operations
   - Submission and claim data tracked separately

4. **Data Presentation**
   - API endpoints provide access to enriched business data
   - React components render business information
   - Google Maps integration displays business locations

### Key Components

1. **Business Enrichment Service**
   - `src/services/businessEnrichment/index.ts`: Main enrichment service
   - `src/services/businessEnrichment/sources/`: Data source adapters
   - `src/services/businessEnrichment/utils/`: Data processing utilities

2. **API Endpoints**
   - `src/app/api/businesses/enriched/route.ts`: Enriched business data API
   - `src/app/api/businesses/submit/route.ts`: Business submission API

3. **UI Components**
   - `src/components/EnrichedBusinessCard.tsx`: Enhanced business card
   - `src/components/BusinessMap.tsx`: Interactive map component
   - `src/components/BusinessSubmissionForm.tsx`: Submission form

4. **Pages**
   - `src/app/businesses/page.tsx`: Main business directory
   - `src/app/businesses/[id]/page.tsx`: Business detail page
   - `src/app/businesses/map/page.tsx`: Map view
   - `src/app/businesses/submit/page.tsx`: Submission page
   - `src/app/businesses/claim/page.tsx`: Claim page

## Setup and Configuration

### Environment Variables

Create a `.env` file with the following variables:

```
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/tonasket"

# API Keys
SOCRATA_APP_TOKEN=your_socrata_app_token
GOOGLE_PLACES_API_KEY=your_google_places_api_key
YELP_API_KEY=your_yelp_api_key
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### API Keys

1. **Socrata API**
   - Register at https://dev.socrata.com/
   - Create an app token for the Washington State Business Lookup dataset

2. **Google Places API**
   - Create a project in Google Cloud Console
   - Enable Places API and Maps JavaScript API
   - Create API keys with appropriate restrictions

3. **Yelp Fusion API**
   - Register at https://www.yelp.com/developers
   - Create an app and get an API key

### Database Setup

1. Run database migrations:
   ```
   npx prisma migrate dev
   ```

2. Seed the database with initial data:
   ```
   npx prisma db seed
   ```

## Usage

### Enriching Business Data

Run the business data enrichment script:

```
node scripts/enrich-business-data.js 98855 100
```

This will:
1. Fetch businesses in ZIP code 98855 (Tonasket)
2. Enrich each business with data from multiple sources
3. Save the enriched data to the database and static files

### Testing the Enrichment Process

Test the enrichment process with a single business:

```
node scripts/test-business-enrichment.js "Business Name"
```

### Viewing the Business Directory

1. Start the development server:
   ```
   npm run dev
   ```

2. Open your browser to:
   - Business Directory: http://localhost:3000/businesses
   - Map View: http://localhost:3000/businesses/map
   - Submit Business: http://localhost:3000/businesses/submit
   - Claim Business: http://localhost:3000/businesses/claim

## Maintenance

### Scheduled Updates

Set up a scheduled task to run the enrichment process periodically:

```
# Example cron job to run weekly on Sunday at 2 AM
0 2 * * 0 cd /path/to/tonasket-wiki && node scripts/enrich-business-data.js 98855 100
```

### Monitoring

Monitor the enrichment process by checking:
- Console output for errors and warnings
- Database for data quality and completeness
- API rate limits for external services

### Troubleshooting

Common issues:
1. **API Rate Limits**: Implement backoff strategies or reduce the number of businesses processed at once
2. **Missing Data**: Check if API keys are valid and services are available
3. **Entity Matching Issues**: Improve the matching algorithms in the data merger

## Future Enhancements

Planned improvements:
1. Add more data sources (Yellow Pages, Chamber of Commerce)
2. Implement machine learning for better entity matching
3. Add review and rating system for community feedback
4. Expand to neighboring communities
5. Add business analytics dashboard for owners

## Contributors

- Tonasket Wiki Development Team

## License

This project is licensed under the MIT License - see the LICENSE file for details.
