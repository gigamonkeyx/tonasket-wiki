import axios from 'axios';
import * as cheerio from 'cheerio';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Function to crawl economic data from various sources
export async function crawlEconomicData() {
  try {
    // Example: Crawl data from Data USA for Tonasket
    const response = await axios.get('https://datausa.io/profile/geo/tonasket-wa');
    const $ = cheerio.load(response.data);
    
    // Extract median household income
    const medianIncome = $('.topic-subtitle:contains("Median Household Income")').next().text().trim();
    
    if (medianIncome) {
      await prisma.economicData.create({
        data: {
          category: 'Income',
          title: 'Median Household Income',
          value: medianIncome,
          date: new Date(),
          source: 'Data USA'
        }
      });
    }
    
    // Extract population data
    const population = $('.topic-subtitle:contains("Population")').next().text().trim();
    
    if (population) {
      await prisma.economicData.create({
        data: {
          category: 'Demographics',
          title: 'Population',
          value: population,
          date: new Date(),
          source: 'Data USA'
        }
      });
    }
    
    return { success: true, message: 'Economic data crawled successfully' };
  } catch (error) {
    console.error('Error crawling economic data:', error);
    return { success: false, message: 'Failed to crawl economic data' };
  }
}

// Function to crawl business data
export async function crawlBusinessData() {
  try {
    // Example: Crawl business data from Okanogan County website
    const response = await axios.get('https://www.okanogancounty.org/business/index.php');
    const $ = cheerio.load(response.data);
    
    // Extract business listings
    const businesses = [];
    
    $('.business-listing').each((i, element) => {
      const name = $(element).find('.business-name').text().trim();
      const description = $(element).find('.business-description').text().trim();
      const address = $(element).find('.business-address').text().trim();
      const phone = $(element).find('.business-phone').text().trim();
      const website = $(element).find('.business-website a').attr('href');
      const category = $(element).find('.business-category').text().trim();
      
      if (name) {
        businesses.push({
          name,
          description,
          address,
          phone,
          website,
          category
        });
      }
    });
    
    // Save businesses to database
    for (const business of businesses) {
      await prisma.business.create({
        data: business
      });
    }
    
    return { success: true, message: 'Business data crawled successfully' };
  } catch (error) {
    console.error('Error crawling business data:', error);
    return { success: false, message: 'Failed to crawl business data' };
  }
}

// Function to crawl news data
export async function crawlNewsData() {
  try {
    // Example: Crawl news from local news sources
    const response = await axios.get('https://www.omakchronicle.com/');
    const $ = cheerio.load(response.data);
    
    const newsArticles = [];
    
    $('.article').each((i, element) => {
      const title = $(element).find('.article-title').text().trim();
      const content = $(element).find('.article-content').text().trim();
      const url = $(element).find('.article-title a').attr('href');
      const imageUrl = $(element).find('.article-image img').attr('src');
      const publishedAt = $(element).find('.article-date').text().trim();
      
      if (title && content && url) {
        newsArticles.push({
          title,
          content,
          source: 'Omak Chronicle',
          url,
          imageUrl,
          publishedAt: new Date(publishedAt || Date.now())
        });
      }
    });
    
    // Save news articles to database
    for (const article of newsArticles) {
      await prisma.newsArticle.create({
        data: article
      });
    }
    
    return { success: true, message: 'News data crawled successfully' };
  } catch (error) {
    console.error('Error crawling news data:', error);
    return { success: false, message: 'Failed to crawl news data' };
  }
}

// Function to fetch weather data from Weather.gov API
export async function fetchWeatherData() {
  try {
    // Tonasket coordinates
    const lat = 48.7049;
    const lon = -119.4414;
    
    // Get forecast from Weather.gov API
    const response = await axios.get(`https://api.weather.gov/points/${lat},${lon}`);
    const forecastUrl = response.data.properties.forecast;
    
    const forecastResponse = await axios.get(forecastUrl);
    const periods = forecastResponse.data.properties.periods;
    
    // Save weather data to database
    for (const period of periods) {
      await prisma.weatherData.create({
        data: {
          date: new Date(period.startTime),
          temperature: period.temperature,
          conditions: period.shortForecast,
          humidity: period.relativeHumidity?.value || null,
          windSpeed: parseFloat(period.windSpeed.replace(/[^0-9.]/g, '')),
          source: 'Weather.gov'
        }
      });
    }
    
    return { success: true, message: 'Weather data fetched successfully' };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return { success: false, message: 'Failed to fetch weather data' };
  }
}

// Function to crawl trade impact data
export async function crawlTradeImpactData() {
  try {
    // Example: Crawl trade impact data from government sources
    const response = await axios.get('https://www.census.gov/foreign-trade/statistics/state/data/wa.html');
    const $ = cheerio.load(response.data);
    
    const tradeData = [];
    
    $('.trade-data-row').each((i, element) => {
      const category = $(element).find('.trade-category').text().trim();
      const title = $(element).find('.trade-title').text().trim();
      const description = $(element).find('.trade-description').text().trim();
      const value = $(element).find('.trade-value').text().trim();
      const date = $(element).find('.trade-date').text().trim();
      
      if (category && title && description) {
        tradeData.push({
          category,
          title,
          description,
          value,
          date: new Date(date || Date.now()),
          source: 'U.S. Census Bureau'
        });
      }
    });
    
    // Save trade impact data to database
    for (const data of tradeData) {
      await prisma.tradeImpactData.create({
        data
      });
    }
    
    return { success: true, message: 'Trade impact data crawled successfully' };
  } catch (error) {
    console.error('Error crawling trade impact data:', error);
    return { success: false, message: 'Failed to crawl trade impact data' };
  }
}
