# License Data Integration

This document describes how the Tonasket Wiki integrates business license data from the Washington State Department of Revenue into the business directory.

## Overview

The Tonasket Wiki enriches its business directory with official license data from the Washington State Department of Revenue's business license dataset. This integration provides users with accurate and up-to-date information about local businesses, including their license status, type, and history.

## Data Source

The license data is sourced from the Washington State Department of Revenue's Business License dataset, accessed via the Socrata Open Data API:

- **Dataset ID**: `ucdg-xgbj`
- **API Endpoint**: `https://data.wa.gov/resource/ucdg-xgbj.json`
- **Documentation**: [Washington State Business License Dataset](https://data.wa.gov/Business/Business-Licenses/7xux-kdpf)

## Integration Architecture

The license data integration follows a cache-based architecture:

1. **Data Retrieval**: The system queries the Socrata API to fetch business license data for businesses in the Tonasket area (ZIP code 98855).

2. **Entity Resolution**: The system matches license records with existing business records in the directory using business name, UBI number, and address similarity.

3. **Data Enrichment**: The matched license data is used to enrich the business records with additional information.

4. **Cache Storage**: The enriched data is stored in a cache file for quick access.

5. **API Layer**: A dedicated API endpoint provides access to the cached license data.

6. **Admin Interface**: An admin interface allows manual refresh of the license data cache.

7. **Scheduled Updates**: A scheduled job script can be configured to automatically refresh the cache at regular intervals.

## API Endpoints

The following API endpoints are available for license data integration:

### GET /api/license-data/refresh

Returns the status of the license data cache.

**Response:**
```json
{
  "exists": true,
  "timestamp": "2023-06-01T12:00:00Z",
  "cacheAge": {
    "ms": 86400000,
    "hours": 24,
    "days": 1
  },
  "businessCount": 50,
  "zipCode": "98855",
  "limit": 100
}
```

### POST /api/license-data/refresh

Refreshes the license data cache.

**Query Parameters:**
- `apiKey` (required): Admin API key for authentication
- `zipCode` (optional): ZIP code to filter businesses (default: 98855)
- `limit` (optional): Maximum number of businesses to process (default: 100)

**Response:**
```json
{
  "success": true,
  "message": "License data refresh completed. Processed 50 businesses.",
  "stats": {
    "total": 50,
    "success": 48,
    "error": 2
  },
  "timestamp": "2023-06-01T12:00:00Z"
}
```

### GET /api/license-data/businesses

Returns businesses from the license data cache.

**Query Parameters:**
- `id` (optional): Filter by business ID
- `name` (optional): Filter by business name
- `category` (optional): Filter by business category
- `limit` (optional): Maximum number of businesses to return (default: 100)

**Response:**
```json
{
  "businesses": [...],
  "count": 50,
  "timestamp": "2023-06-01T12:00:00Z",
  "filters": {
    "id": null,
    "name": null,
    "category": null,
    "limit": 100
  }
}
```

## Admin Interface

The license data integration includes an admin interface for managing the license data cache. The interface is available at `/admin/api-keys` and provides the following features:

- View cache status (age, size, etc.)
- Manually refresh the license data cache
- Configure refresh parameters (ZIP code, limit)

## Scheduled Updates

A scheduled job script is provided for automated updates of the license data cache. The script can be configured to run at regular intervals using a task scheduler like cron or Windows Task Scheduler.

**Script:** `scripts/scheduled-license-refresh.js`

**Usage:**
```bash
node scripts/scheduled-license-refresh.js
```

**Environment Variables:**
- `ADMIN_API_KEY` (required): Admin API key for authentication
- `ZIP_CODE` (optional): ZIP code to filter businesses (default: 98855)
- `LIMIT` (optional): Maximum number of businesses to process (default: 100)
- `BASE_URL` (optional): Base URL of the application (default: http://localhost:3000)

**Example Cron Job (daily at 2 AM):**
```
0 2 * * * cd /path/to/tonasket-wiki && node scripts/scheduled-license-refresh.js >> /var/log/tonasket-wiki/license-refresh.log 2>&1
```

## License Data Fields

The following license data fields are integrated into the business directory:

| Field | Description |
|-------|-------------|
| `licenseStatus` | Current status of the business license (e.g., "Active", "Inactive") |
| `licenseType` | Type of business license |
| `licenseNumber` | Unified Business Identifier (UBI) number |
| `firstIssueDate` | Date when the license was first issued |
| `businessName` | Legal name of the business |
| `locationName` | "Doing Business As" (DBA) name |
| `businessAddress` | Address of the business headquarters |
| `locationAddress` | Address of the business location (if different) |

## Benefits

Integrating license data provides several benefits:

1. **Accuracy**: Users can verify that businesses are properly licensed and active.
2. **Transparency**: Users can see the official business information as registered with the state.
3. **Completeness**: The business directory includes comprehensive information from multiple sources.
4. **Trust**: Users can trust that the information is sourced from official government records.
5. **Updateability**: The cache-based architecture allows for regular updates to keep the data current.

## Future Improvements

Planned improvements to the license data integration:

1. **Real-time Updates**: Implement webhooks to receive real-time updates from the Socrata API.
2. **Advanced Filtering**: Allow users to filter businesses by license status and type.
3. **License Expiration Alerts**: Notify business owners when their licenses are approaching expiration.
4. **Cross-referencing**: Cross-reference license data with other government datasets for additional insights.
