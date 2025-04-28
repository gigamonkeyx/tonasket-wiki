# Tonasket Wiki Business Directory Enrichment

This document provides instructions for using and maintaining the Business Data Enrichment System in the Tonasket Wiki.

## Overview

The Business Data Enrichment System enhances the wiki's business directory by aggregating and merging business data from multiple sources:

1. **Washington State Business Lookup API** - Official business records
2. **Google Places API** - Business details, hours, photos, and reviews
3. **Yelp Fusion API** - Categories, attributes, and additional reviews
4. **Web scraping** - Information from business websites

## Setup Instructions

### 1. Install Dependencies

The system requires the following dependencies:

```bash
npm install axios cheerio dotenv
```

### 2. Configure API Keys

Create or update your `.env` file with the following API keys:

```
# Washington State Business Lookup (Socrata)
SOCRATA_APP_TOKEN=your_socrata_app_token

# Google Places API
GOOGLE_PLACES_API_KEY=your_google_places_api_key

# Yelp Fusion API
YELP_API_KEY=your_yelp_api_key
```

You can obtain these API keys from:
- Socrata: https://dev.socrata.com/
- Google Places: https://developers.google.com/maps/documentation/places/web-service
- Yelp Fusion: https://www.yelp.com/developers/documentation/v3

### 3. Run the Enrichment Process

To enrich the business data, run:

```bash
node scripts/enrich-business-data.js 98855 100
```

This will:
1. Fetch businesses in Tonasket (ZIP code 98855)
2. Enrich each business with data from multiple sources
3. Save the enriched data to `src/data/enriched-businesses.json` and `src/data/enriched-businesses.ts`

## Using Enriched Business Data

The system provides several ways to access and display the enriched business data:

### 1. API Endpoints

- `GET /api/businesses/enriched` - Fetches all enriched businesses
  - Query parameters:
    - `zipCode` - Filter by ZIP code (default: 98855)
    - `limit` - Maximum number of businesses to return (default: 50)
    - `refresh` - Whether to refresh the data from external sources (default: false)

- `GET /api/businesses/[id]` - Fetches a specific business by ID

### 2. Service Functions

Import the service functions to fetch enriched business data:

```typescript
import { 
  fetchEnrichedBusinesses, 
  fetchEnrichedBusinessById,
  refreshEnrichedBusinesses 
} from '@/services/enrichedBusinessService';

// Fetch all businesses
const { businesses, source, timestamp } = await fetchEnrichedBusinesses();

// Fetch a specific business
const business = await fetchEnrichedBusinessById('business-id');

// Refresh data from external sources
const refreshedData = await refreshEnrichedBusinesses();
```

### 3. Components

The system includes an `EnrichedBusinessCard` component for displaying the enriched business data:

```tsx
import EnrichedBusinessCard from '@/components/EnrichedBusinessCard';

// In your component
<EnrichedBusinessCard business={business} featured={true} />
```

## Data Sources and Prioritization

The system uses a sophisticated data merging strategy:

1. **Core Identity**: Legal name and business type from WA State records
2. **Contact Details**: Phone and website from Google Places, then Yelp
3. **Rich Content**: Description from website, then Yelp; photos from Google Places, then Yelp
4. **Hours**: From Google Places (primary) or Yelp (secondary)
5. **Categories**: Combined from all sources with mapping to our application categories
6. **Location**: Coordinates from Google Places (primary) or Yelp (secondary)

## Maintenance

### Scheduling Updates

For production, set up a scheduled task to run the enrichment process periodically:

```bash
# Example cron job to run weekly on Sunday at 2 AM
0 2 * * 0 cd /path/to/tonasket-wiki && node scripts/enrich-business-data.js 98855 100
```

### Monitoring

Monitor the enrichment process by checking:
- The console output for errors and warnings
- The generated `enriched-businesses.json` file for data quality
- API rate limits for each external service

### Troubleshooting

Common issues:
1. **API Rate Limits**: Implement backoff strategies or reduce the number of businesses processed at once
2. **Missing Data**: Check if API keys are valid and services are available
3. **Entity Matching Issues**: Improve the matching algorithms in the data merger

## Future Enhancements

Planned improvements:
1. Add more data sources (Yellow Pages, Chamber of Commerce)
2. Implement machine learning for better entity matching
3. Create a business submission form for local businesses
4. Add data verification workflows
5. Expand to neighboring communities

## File Structure

```
src/
  services/
    businessEnrichment/
      index.ts                 # Main enrichment service
      sources/
        waStateBusiness.ts     # WA State Business Lookup API client
        googlePlaces.ts        # Google Places API client
        yelpFusion.ts          # Yelp Fusion API client
        webScraper.ts          # Web scraping module
      utils/
        dataMerger.ts          # Data merging utilities
        dataNormalizer.ts      # Data normalization utilities
        idGenerator.ts         # ID generation utilities
  components/
    EnrichedBusinessCard.tsx   # Component for displaying enriched business data
  app/
    api/
      businesses/
        enriched/
          route.ts             # API endpoint for enriched businesses
scripts/
  enrich-business-data.js      # Script to run the enrichment process
```
