# Tonasket Wiki Business Directory Technical Reference

This document provides technical details for developers who want to extend or modify the business directory system.

## Architecture Overview

The business directory system follows a modular architecture with clear separation of concerns:

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Data Sources   │────▶│  Data Processing│────▶│   Data Storage  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
        ▲                                               │
        │                                               ▼
┌─────────────────┐                           ┌─────────────────┐
│  External APIs  │                           │   API Endpoints │
└─────────────────┘                           └─────────────────┘
                                                      │
                                                      ▼
                                              ┌─────────────────┐
                                              │  UI Components  │
                                              └─────────────────┘
```

### Key Components

1. **Data Sources**
   - External API clients
   - Web scrapers
   - User submissions

2. **Data Processing**
   - Entity resolution
   - Data normalization
   - Field prioritization
   - Data merging

3. **Data Storage**
   - PostgreSQL database
   - Prisma ORM
   - Static files (for development)

4. **API Endpoints**
   - RESTful API for business data
   - Submission and claim endpoints

5. **UI Components**
   - React components
   - Next.js pages
   - Google Maps integration

## Code Structure

### Business Enrichment Service

```
src/services/businessEnrichment/
├── index.ts                 # Main enrichment service
├── README.md                # Service documentation
├── sources/                 # Data source adapters
│   ├── waStateBusiness.ts   # WA State Business Lookup API
│   ├── googlePlaces.ts      # Google Places API
│   ├── yelpFusion.ts        # Yelp Fusion API
│   └── webScraper.ts        # Web scraping module
└── utils/                   # Utility functions
    ├── dataMerger.ts        # Data merging utilities
    ├── dataNormalizer.ts    # Data normalization utilities
    └── idGenerator.ts       # ID generation utilities
```

### API Endpoints

```
src/app/api/businesses/
├── route.ts                 # Main businesses API
├── [id]/                    # Business by ID
│   └── route.ts             # Get specific business
├── enriched/                # Enriched business data
│   └── route.ts             # Get enriched businesses
├── submit/                  # Business submission
│   └── route.ts             # Submit business
└── claim/                   # Business claim
    └── route.ts             # Claim business
```

### UI Components

```
src/components/
├── BusinessCard.tsx         # Basic business card
├── EnrichedBusinessCard.tsx # Enhanced business card
├── BusinessList.tsx         # Business list with toggle
├── BusinessFilter.tsx       # Search and filter
├── BusinessMap.tsx          # Interactive map
└── BusinessSubmissionForm.tsx # Submission form
```

### Pages

```
src/app/businesses/
├── page.tsx                 # Main directory page
├── [id]/                    # Business detail
│   └── page.tsx             # Business detail page
├── map/                     # Map view
│   └── page.tsx             # Map page
├── submit/                  # Submission
│   └── page.tsx             # Submission page
└── claim/                   # Claim
    └── page.tsx             # Claim page
```

## Data Models

### Business Model

```typescript
// Prisma schema
model Business {
  id          String   @id @default(uuid())
  name        String
  description String?
  address     String?
  phone       String?
  email       String?
  website     String?
  category    String?
  subcategory String?
  hours       String?
  founded     String?
  employees   String?
  featured    Boolean  @default(false)
  image       String?
  services    String[]
  products    String[]
  tags        String[]
  socialMedia Json?
  latitude    Float?
  longitude   Float?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

### Business Submission Model

```typescript
// Prisma schema
model BusinessSubmission {
  id            String   @id @default(uuid())
  name          String
  description   String
  address       String
  phone         String
  email         String?
  website       String?
  category      String
  subcategory   String?
  hours         String?
  founded       String?
  services      String[]
  products      String[]
  socialMedia   Json?
  status        String   @default("PENDING") // PENDING, APPROVED, REJECTED, NEEDS_INFO
  submittedAt   DateTime @default(now())
  reviewedAt    DateTime?
  reviewedBy    String?
  reviewNotes   String?
  businessId    String?  // Reference to the created business if approved
}
```

## API Reference

### GET /api/businesses/enriched

Fetches enriched business data from multiple sources.

**Query Parameters:**
- `zipCode`: Filter by ZIP code (default: 98855)
- `limit`: Maximum number of businesses to return (default: 50)
- `refresh`: Whether to refresh the data from external sources (default: false)

**Response:**
```json
{
  "businesses": [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "category": "string",
      "subcategory": "string",
      "address": "string",
      "phone": "string",
      "email": "string",
      "website": "string",
      "hours": "string",
      "founded": "string",
      "featured": boolean,
      "image": "string",
      "services": ["string"],
      "products": ["string"],
      "tags": ["string"],
      "socialMedia": {
        "facebook": "string",
        "instagram": "string",
        "twitter": "string",
        "linkedin": "string"
      },
      "coordinates": {
        "lat": number,
        "lng": number
      }
    }
  ],
  "source": "string",
  "timestamp": "string"
}
```

### GET /api/businesses/{id}

Fetches a specific business by ID.

**Response:**
```json
{
  "id": "string",
  "name": "string",
  "description": "string",
  "category": "string",
  "subcategory": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "website": "string",
  "hours": "string",
  "founded": "string",
  "featured": boolean,
  "image": "string",
  "services": ["string"],
  "products": ["string"],
  "tags": ["string"],
  "socialMedia": {
    "facebook": "string",
    "instagram": "string",
    "twitter": "string",
    "linkedin": "string"
  },
  "coordinates": {
    "lat": number,
    "lng": number
  }
}
```

### POST /api/businesses/submit

Submits a new business for review.

**Request Body:**
```json
{
  "name": "string",
  "description": "string",
  "category": "string",
  "subcategory": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "website": "string",
  "hours": "string",
  "founded": "string",
  "services": ["string"],
  "products": ["string"],
  "socialMedia": {
    "facebook": "string",
    "instagram": "string",
    "twitter": "string",
    "linkedin": "string"
  }
}
```

**Response:**
```json
{
  "success": boolean,
  "message": "string",
  "submissionId": "string"
}
```

## External API Integration

### Washington State Business Lookup API

**Endpoint:** https://data.wa.gov/resource/7xux-kdpf.json

**Query Parameters:**
- `$where`: SoQL query (e.g., `zip_code='98855'`)
- `$limit`: Maximum number of records
- `$order`: Sort order
- `$$app_token`: Socrata app token

**Example:**
```typescript
const params = new URLSearchParams({
  '$where': `zip_code='98855' AND (close_date IS NULL OR close_date > '${new Date().toISOString().split('T')[0]}')`,
  '$limit': '100',
  '$order': 'business_name ASC'
});

const response = await axios.get(`${API_ENDPOINT}?${params.toString()}`);
```

### Google Places API

**Endpoints:**
- Place Search: https://maps.googleapis.com/maps/api/place/findplacefromtext/json
- Place Details: https://maps.googleapis.com/maps/api/place/details/json
- Place Photos: https://maps.googleapis.com/maps/api/place/photo

**Example:**
```typescript
// Search for a place
const searchParams = new URLSearchParams({
  input: `${businessName} ${address}`,
  inputtype: 'textquery',
  fields: 'place_id,name,formatted_address',
  key: API_KEY
});

const searchResponse = await axios.get(
  `${PLACES_API_ENDPOINT}/findplacefromtext/json?${searchParams.toString()}`
);

// Get place details
const placeId = searchResponse.data.candidates[0].place_id;
const detailsParams = new URLSearchParams({
  place_id: placeId,
  fields: 'name,formatted_address,formatted_phone_number,website,rating,opening_hours,photos,types',
  key: API_KEY
});

const detailsResponse = await axios.get(
  `${PLACES_API_ENDPOINT}/details/json?${detailsParams.toString()}`
);
```

### Yelp Fusion API

**Endpoints:**
- Business Search: https://api.yelp.com/v3/businesses/search
- Business Details: https://api.yelp.com/v3/businesses/{id}
- Business Reviews: https://api.yelp.com/v3/businesses/{id}/reviews

**Example:**
```typescript
// Search for a business
const searchParams = new URLSearchParams({
  term: businessName,
  location: `${city}, WA`,
  limit: '1'
});

const searchResponse = await axios.get(
  `${YELP_API_ENDPOINT}/businesses/search?${searchParams.toString()}`,
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  }
);

// Get business details
const businessId = searchResponse.data.businesses[0].id;
const detailsResponse = await axios.get(
  `${YELP_API_ENDPOINT}/businesses/${businessId}`,
  {
    headers: {
      Authorization: `Bearer ${API_KEY}`
    }
  }
);
```

## Data Merging Strategy

The system uses a sophisticated merging strategy to combine data from multiple sources:

1. **Entity Resolution**
   - Match businesses across sources using name and address
   - Use fuzzy matching for inexact matches
   - Calculate confidence scores for matches

2. **Field Prioritization**
   - Legal information (name, UBI) from WA State
   - Contact details from Google Places and Yelp
   - Rich content (descriptions, photos) from websites and Yelp
   - Hours from Google Places (primary) or Yelp (secondary)
   - Categories from a combination of sources

3. **Data Normalization**
   - Standardize address formats
   - Normalize phone numbers to (XXX) XXX-XXXX format
   - Ensure URLs have proper protocols
   - Map categories to a standard taxonomy

4. **Conflict Resolution**
   - Use source reliability hierarchy to resolve conflicts
   - Prefer more complete data when available
   - Keep track of data provenance

## Extending the System

### Adding a New Data Source

1. Create a new adapter in `src/services/businessEnrichment/sources/`
2. Implement the data fetching and transformation logic
3. Update the `mergeBusinessRecords` function in `src/services/businessEnrichment/utils/dataMerger.ts`
4. Add the new source to the main enrichment process in `src/services/businessEnrichment/index.ts`

### Adding New Business Fields

1. Update the Business model in `prisma/schema.prisma`
2. Run `npx prisma migrate dev` to update the database
3. Update the business type in `src/data/businesses.ts`
4. Update the `mergeBusinessRecords` function to handle the new fields
5. Update the UI components to display the new fields

### Customizing the Map

1. Modify the `BusinessMap` component in `src/components/BusinessMap.tsx`
2. Update the Google Maps API key in `.env`
3. Customize the map styles, markers, and info windows

### Adding New Features

1. **Business Reviews**
   - Create a review model in the database
   - Add API endpoints for submitting and fetching reviews
   - Create UI components for displaying and submitting reviews

2. **Business Analytics**
   - Implement tracking for business page views
   - Create analytics dashboard for business owners
   - Add reporting features for administrators

3. **Enhanced Search**
   - Implement full-text search in the database
   - Add advanced filtering options
   - Create a search results page with relevance ranking

## Performance Considerations

1. **API Rate Limits**
   - Implement caching for external API responses
   - Use batch processing for large datasets
   - Implement exponential backoff for rate limit errors

2. **Database Optimization**
   - Add indexes for frequently queried fields
   - Use pagination for large result sets
   - Implement query optimization

3. **Frontend Performance**
   - Implement lazy loading for images
   - Use pagination for business listings
   - Optimize map rendering for mobile devices

## Security Considerations

1. **API Keys**
   - Store API keys in environment variables
   - Use API key restrictions (IP, referrer, etc.)
   - Implement server-side proxies for client-side API calls

2. **User Submissions**
   - Validate and sanitize all user input
   - Implement rate limiting for submissions
   - Require verification for business claims

3. **Data Privacy**
   - Only store and display publicly available information
   - Provide opt-out mechanisms for business owners
   - Comply with relevant privacy regulations

## Troubleshooting

### Common Errors

1. **API Connection Issues**
   - Check API keys and credentials
   - Verify network connectivity
   - Check for rate limiting or IP blocking

2. **Data Quality Issues**
   - Review data normalization functions
   - Check entity matching algorithms
   - Verify field prioritization rules

3. **Map Rendering Problems**
   - Check Google Maps API key and restrictions
   - Verify coordinates are valid
   - Check for JavaScript errors in the console

### Debugging Tools

1. **Enrichment Testing**
   - Use `scripts/test-business-enrichment.js` to test with a single business
   - Check the output JSON for data quality issues
   - Verify each data source is returning expected data

2. **API Testing**
   - Use the browser's Network tab to inspect API requests
   - Check response status codes and payloads
   - Verify request parameters are correct

3. **Component Testing**
   - Use React Developer Tools to inspect component state
   - Check for rendering issues in different browsers
   - Verify props are passed correctly between components

## Deployment

1. **Environment Variables**
   - Set up all required API keys
   - Configure database connection string
   - Set NODE_ENV to production

2. **Database Migration**
   - Run `npx prisma migrate deploy` to apply migrations
   - Verify database schema is correct
   - Seed initial data if needed

3. **Build and Start**
   - Run `npm run build` to build the application
   - Use `npm start` to start the production server
   - Verify the application is running correctly

## Maintenance

1. **Regular Updates**
   - Run the enrichment process weekly
   - Update API clients when external APIs change
   - Keep dependencies up to date

2. **Monitoring**
   - Check for API errors and rate limiting
   - Monitor database performance
   - Track user engagement metrics

3. **Backup and Recovery**
   - Regularly backup the database
   - Test recovery procedures
   - Document disaster recovery plans
