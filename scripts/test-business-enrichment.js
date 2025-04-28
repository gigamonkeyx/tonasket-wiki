/**
 * Test Script for Business Data Enrichment
 * 
 * This script tests the business data enrichment process with a single business
 * to verify that the system is working correctly.
 * 
 * Usage: node scripts/test-business-enrichment.js [businessName]
 * 
 * Example: node scripts/test-business-enrichment.js "Tonasket Bakery"
 */

require('dotenv').config();
const { fetchWaStateBusinesses } = require('../src/services/businessEnrichment/sources/waStateBusiness');
const { fetchGooglePlacesData } = require('../src/services/businessEnrichment/sources/googlePlaces');
const { fetchYelpBusinessData } = require('../src/services/businessEnrichment/sources/yelpFusion');
const { scrapeBusinessWebsites } = require('../src/services/businessEnrichment/sources/webScraper');
const { mergeBusinessRecords } = require('../src/services/businessEnrichment/utils/dataMerger');
const fs = require('fs');
const path = require('path');

// Parse command line arguments
const businessName = process.argv[2] || 'Tonasket';

async function testEnrichment() {
  try {
    console.log(`Testing business data enrichment for "${businessName}"...`);
    
    // Step 1: Fetch from WA State Business Lookup
    console.log('\n1. Fetching from WA State Business Lookup...');
    const stateBusinesses = await fetchWaStateBusinesses('98855', 10);
    
    // Find a business that matches the name
    const stateBusiness = stateBusinesses.find(b => 
      b.name.toLowerCase().includes(businessName.toLowerCase())
    );
    
    if (!stateBusiness) {
      console.log(`No business found with name containing "${businessName}" in WA State records.`);
      console.log('Available businesses:');
      stateBusinesses.forEach(b => console.log(` - ${b.name}`));
      
      // Use the first business as a fallback
      console.log('\nUsing the first business as a fallback...');
      stateBusiness = stateBusinesses[0];
    }
    
    console.log(`Found business: ${stateBusiness.name}`);
    console.log('State business data:', JSON.stringify(stateBusiness, null, 2));
    
    // Step 2: Fetch from Google Places
    console.log('\n2. Fetching from Google Places API...');
    const googleData = await fetchGooglePlacesData(stateBusiness.name, stateBusiness.address);
    
    if (googleData) {
      console.log('Google Places data found!');
      console.log('Name:', googleData.name);
      console.log('Address:', googleData.formatted_address);
      console.log('Phone:', googleData.formatted_phone_number);
      console.log('Rating:', googleData.rating);
      console.log('Has photos:', googleData.photos ? googleData.photos.length : 0);
      console.log('Has hours:', googleData.opening_hours ? 'Yes' : 'No');
    } else {
      console.log('No Google Places data found.');
    }
    
    // Step 3: Fetch from Yelp
    console.log('\n3. Fetching from Yelp Fusion API...');
    const yelpData = await fetchYelpBusinessData(stateBusiness.name, stateBusiness.address);
    
    if (yelpData) {
      console.log('Yelp data found!');
      console.log('Name:', yelpData.name);
      console.log('Phone:', yelpData.display_phone);
      console.log('Rating:', yelpData.rating);
      console.log('Review count:', yelpData.review_count);
      console.log('Categories:', yelpData.categories.map(c => c.title).join(', '));
      console.log('Has photos:', yelpData.photos ? yelpData.photos.length : 0);
    } else {
      console.log('No Yelp data found.');
    }
    
    // Step 4: Scrape website
    console.log('\n4. Scraping business website...');
    const websiteUrl = googleData?.website || yelpData?.url || stateBusiness.website;
    
    if (websiteUrl) {
      console.log(`Scraping website: ${websiteUrl}`);
      const webData = await scrapeBusinessWebsites(websiteUrl);
      
      if (webData) {
        console.log('Website data found!');
        console.log('Description:', webData.description ? webData.description.substring(0, 100) + '...' : 'None');
        console.log('Email:', webData.email || 'None');
        console.log('Services:', webData.services ? webData.services.length : 0);
        console.log('Social media links:', Object.keys(webData.socialMedia || {}).filter(k => webData.socialMedia[k]).length);
      } else {
        console.log('No website data found.');
      }
      
      // Step 5: Merge all data
      console.log('\n5. Merging data from all sources...');
      const enrichedBusiness = mergeBusinessRecords(
        stateBusiness,
        googleData,
        yelpData,
        webData
      );
      
      console.log('Enriched business data:');
      console.log(JSON.stringify(enrichedBusiness, null, 2));
      
      // Save the result to a file
      const outputPath = path.join(__dirname, '../test-enriched-business.json');
      fs.writeFileSync(outputPath, JSON.stringify(enrichedBusiness, null, 2));
      console.log(`\nSaved test result to ${outputPath}`);
      
      // Summary
      console.log('\nEnrichment Summary:');
      console.log('- State data fields:', Object.keys(stateBusiness).filter(k => stateBusiness[k]).length);
      console.log('- Google data fields:', googleData ? Object.keys(googleData).filter(k => googleData[k]).length : 0);
      console.log('- Yelp data fields:', yelpData ? Object.keys(yelpData).filter(k => yelpData[k]).length : 0);
      console.log('- Web data fields:', webData ? Object.keys(webData).filter(k => webData[k]).length : 0);
      console.log('- Enriched data fields:', Object.keys(enrichedBusiness).filter(k => enrichedBusiness[k]).length);
      
      console.log('\nTest completed successfully!');
    } else {
      console.log('No website URL available for scraping.');
    }
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testEnrichment();
