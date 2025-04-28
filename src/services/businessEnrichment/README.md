# Business Data Enrichment System

This system enhances the Tonasket Wiki's business directory by aggregating and merging business data from multiple sources to create comprehensive business profiles.

## Overview

The Business Data Enrichment System fetches data from various sources, resolves entity matches, merges the data according to field prioritization rules, and produces enriched business records for the wiki's business directory.

## Data Sources

1. **Washington State Business Lookup** (Primary Source)
   - Official business registrations from the Washington Department of Revenue
   - Accessed via Socrata API: https://data.wa.gov/resource/7xux-kdpf.json
   - Provides: Business name, UBI number, address, business type, NAICS code

2. **Google Places API** (Enrichment Source)
   - Rich business details from Google's database
   - Provides: Hours, photos, ratings, reviews, phone numbers, website, coordinates

3. **Yelp Fusion API** (Enrichment Source)
   - Detailed business information and customer reviews
   - Provides: Categories, attributes, ratings, reviews, photos, hours

4. **Web Scraping** (Supplementary Source)
   - Extracts information directly from business websites
   - Provides: Descriptions, services, products, social media links, additional contact info

## System Components

### Data Source Adapters

- `waStateBusiness.ts` - Fetches and transforms data from WA State Business Lookup
- `googlePlaces.ts` - Fetches and transforms data from Google Places API
- `yelpFusion.ts` - Fetches and transforms data from Yelp Fusion API
- `webScraper.ts` - Scrapes and extracts data from business websites

### Data Processing Utilities

- `dataMerger.ts` - Merges data from multiple sources with field prioritization
- `dataNormalizer.ts` - Normalizes addresses, phone numbers, and other fields
- `idGenerator.ts` - Generates unique IDs for business records

### Main Service

- `index.ts` - Coordinates the data enrichment process

## Usage

### Environment Setup

Create a `.env` file with the following API keys:

```
SOCRATA_APP_TOKEN=your_socrata_app_token
GOOGLE_PLACES_API_KEY=your_google_places_api_key
YELP_API_KEY=your_yelp_api_key
```

### Running the Enrichment Process

Use the provided script to run the enrichment process:

```bash
node scripts/enrich-business-data.js [zipCode] [limit]
```

Example:
```bash
node scripts/enrich-business-data.js 98855 50
```

This will:
1. Fetch businesses in the specified ZIP code from WA State Business Lookup
2. Enrich each business with data from Google Places, Yelp, and web scraping
3. Merge the data into comprehensive business records
4. Save the enriched data to `src/data/enriched-businesses.json` and `src/data/enriched-businesses.ts`

### Integration with the Wiki

To use the enriched business data in the wiki:

1. Import the enriched businesses in your components:
   ```typescript
   import { enrichedBusinesses } from '@/data/enriched-businesses';
   ```

2. Use the `EnrichedBusinessCard` component to display the enriched data:
   ```typescript
   <EnrichedBusinessCard business={business} />
   ```

## Data Merging Strategy

The system uses a sophisticated merging strategy:

1. **Entity Resolution**: Matches businesses across sources using name and address
2. **Field Prioritization**:
   - Legal information (name, UBI) from WA State
   - Contact details from Google Places and Yelp
   - Rich content (descriptions, photos) from websites and Yelp
   - Hours from Google Places (primary) or Yelp (secondary)
   - Categories from a combination of sources
3. **Conflict Resolution**: Uses source reliability hierarchy to resolve conflicts

## Maintenance

The enrichment process should be run periodically to keep the data fresh. Consider:

1. Setting up a scheduled task to run weekly or monthly
2. Monitoring API rate limits and usage
3. Updating the data merging rules as needed

## Future Enhancements

1. Add more data sources (Yellow Pages, Chamber of Commerce)
2. Implement machine learning for better entity matching
3. Create a business submission form for local businesses
4. Add data verification workflows
5. Expand to neighboring communities
