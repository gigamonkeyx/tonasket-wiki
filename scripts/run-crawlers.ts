import { 
  crawlEconomicData, 
  crawlBusinessData, 
  crawlNewsData, 
  fetchWeatherData, 
  crawlTradeImpactData 
} from '../src/utils/webCrawlers';

async function runCrawlers() {
  console.log('Starting data crawlers...');
  
  try {
    console.log('Crawling economic data...');
    const economicResult = await crawlEconomicData();
    console.log(economicResult.message);
    
    console.log('Crawling business data...');
    const businessResult = await crawlBusinessData();
    console.log(businessResult.message);
    
    console.log('Crawling news data...');
    const newsResult = await crawlNewsData();
    console.log(newsResult.message);
    
    console.log('Fetching weather data...');
    const weatherResult = await fetchWeatherData();
    console.log(weatherResult.message);
    
    console.log('Crawling trade impact data...');
    const tradeResult = await crawlTradeImpactData();
    console.log(tradeResult.message);
    
    console.log('All crawlers completed successfully!');
  } catch (error) {
    console.error('Error running crawlers:', error);
  }
}

runCrawlers()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Fatal error running crawlers:', error);
    process.exit(1);
  });
