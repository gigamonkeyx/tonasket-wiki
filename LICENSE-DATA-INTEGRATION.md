# License Data Integration

This document describes how the Tonasket Wiki integrates business license data from the Washington State Department of Revenue into the business directory.

## Overview

The Tonasket Wiki enriches its business directory with official license data from the Washington State Department of Revenue's business license dataset. This integration provides users with accurate and up-to-date information about local businesses, including their license status, type, and history.

## Data Source

The license data is sourced from the Washington State Department of Revenue's Business License dataset, accessed via the Socrata Open Data API:

- **Dataset ID**: `ucdg-xgbj`
- **API Endpoint**: `https://data.wa.gov/resource/ucdg-xgbj.json`
- **Documentation**: [Washington State Business License Dataset](https://data.wa.gov/Business/Business-Licenses/7xux-kdpf)

## Integration Process

The license data integration follows these steps:

1. **Data Retrieval**: The system queries the Socrata API to fetch business license data for businesses in the Tonasket area (ZIP code 98855).

2. **Entity Resolution**: The system matches license records with existing business records in the directory using business name, UBI number, and address similarity.

3. **Data Enrichment**: The matched license data is used to enrich the business records with additional information:
   - License status (active, inactive, etc.)
   - License type
   - License number (UBI)
   - First issue date
   - Business name and location name (DBA)
   - Business and location addresses

4. **Data Merging**: The enriched data is merged with other data sources (Google Places, Yelp, etc.) to create comprehensive business profiles.

5. **Display**: The license information is displayed in the business directory and on business detail pages.

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

## Running the Enrichment Process

To enrich the business directory with license data, run the following command:

```bash
node scripts/enrich-business-with-license-data.js [zipCode] [limit]
```

Example:
```bash
node scripts/enrich-business-with-license-data.js 98855 50
```

This will:
1. Fetch businesses in the specified ZIP code
2. Enrich each business with license data
3. Save the enriched data to `src/data/enriched-businesses.json` and `src/data/enriched-businesses.ts`

## API Key

The integration requires a Socrata API key (App Token) for optimal performance. Set the `SOCRATA_APP_TOKEN` environment variable in your `.env` file:

```
SOCRATA_APP_TOKEN=your_socrata_app_token
```

You can obtain a Socrata App Token by registering at [https://evergreen.data.socrata.com/profile/edit/developer_settings](https://evergreen.data.socrata.com/profile/edit/developer_settings).

## Benefits

Integrating license data provides several benefits:

1. **Accuracy**: Users can verify that businesses are properly licensed and active.
2. **Transparency**: Users can see the official business information as registered with the state.
3. **Completeness**: The business directory includes comprehensive information from multiple sources.
4. **Trust**: Users can trust that the information is sourced from official government records.

## Future Improvements

Planned improvements to the license data integration:

1. **Real-time Updates**: Implement a scheduled job to regularly update license data.
2. **Advanced Filtering**: Allow users to filter businesses by license status and type.
3. **License Expiration Alerts**: Notify business owners when their licenses are approaching expiration.
4. **Cross-referencing**: Cross-reference license data with other government datasets for additional insights.
