/**
 * Business Data Enrichment Script
 * 
 * This script runs the business data enrichment process to fetch and merge
 * business data from multiple sources.
 * 
 * Usage: node scripts/enrich-business-data.js [zipCode] [limit]
 * 
 * Example: node scripts/enrich-business-data.js 98855 50
 */

require('dotenv').config();
const { enrichBusinessData } = require('../src/services/businessEnrichment');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const zipCode = process.argv[2] || '98855'; // Default to Tonasket ZIP code
const limit = parseInt(process.argv[3] || '50', 10); // Default to 50 businesses

async function main() {
  try {
    console.log(`Starting business data enrichment for ZIP code ${zipCode} with limit ${limit}...`);
    
    // Run the enrichment process
    const enrichedBusinesses = await enrichBusinessData(zipCode, limit);
    
    console.log(`Successfully enriched ${enrichedBusinesses.length} businesses.`);
    
    // Save the enriched data to a JSON file
    const outputPath = path.join(__dirname, '../src/data/enriched-businesses.json');
    fs.writeFileSync(outputPath, JSON.stringify(enrichedBusinesses, null, 2));
    
    console.log(`Saved enriched business data to ${outputPath}`);
    
    // Generate TypeScript file with the enriched data
    const tsOutputPath = path.join(__dirname, '../src/data/enriched-businesses.ts');
    const tsContent = `/**
 * Enriched Business Data
 * 
 * This file contains business data enriched from multiple sources:
 * - Washington State Business Lookup
 * - Google Places API
 * - Yelp Fusion API
 * - Business websites
 * 
 * Generated on: ${new Date().toISOString()}
 */

import { Business } from './businesses';

export const enrichedBusinesses: Business[] = ${JSON.stringify(enrichedBusinesses, null, 2)};
`;
    
    fs.writeFileSync(tsOutputPath, tsContent);
    console.log(`Generated TypeScript file at ${tsOutputPath}`);
    
    // Print summary of enriched data
    console.log('\nEnrichment Summary:');
    console.log(`- Total businesses: ${enrichedBusinesses.length}`);
    console.log(`- Businesses with images: ${enrichedBusinesses.filter(b => b.image).length}`);
    console.log(`- Businesses with websites: ${enrichedBusinesses.filter(b => b.website).length}`);
    console.log(`- Businesses with hours: ${enrichedBusinesses.filter(b => b.hours).length}`);
    console.log(`- Businesses with services: ${enrichedBusinesses.filter(b => b.services && b.services.length > 0).length}`);
    console.log(`- Featured businesses: ${enrichedBusinesses.filter(b => b.featured).length}`);
    
    // Print category breakdown
    const categories = {};
    enrichedBusinesses.forEach(business => {
      categories[business.category] = (categories[business.category] || 0) + 1;
    });
    
    console.log('\nCategory Breakdown:');
    Object.entries(categories).forEach(([category, count]) => {
      console.log(`- ${category}: ${count}`);
    });
    
  } catch (error) {
    console.error('Error running business data enrichment:', error);
    process.exit(1);
  }
}

main();
