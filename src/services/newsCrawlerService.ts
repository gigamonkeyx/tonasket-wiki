import axios from 'axios';
import * as cheerio from 'cheerio';
import { v4 as uuidv4 } from 'uuid';
import { NewsArticle, newsSources } from '@/data/news';

interface CrawlResult {
  success: boolean;
  message: string;
  articles?: NewsArticle[];
}

/**
 * News crawler service for fetching and parsing news from various sources
 */
class NewsCrawlerService {
  /**
   * Crawl all configured news sources
   */
  async crawlAllSources(): Promise<CrawlResult> {
    try {
      let allArticles: NewsArticle[] = [];
      
      for (const source of newsSources) {
        try {
          console.log(`Crawling news from ${source.name}...`);
          const result = await this.crawlSource(source.id);
          
          if (result.success && result.articles) {
            allArticles = [...allArticles, ...result.articles];
          } else {
            console.warn(`Failed to crawl ${source.name}: ${result.message}`);
          }
        } catch (error) {
          console.error(`Error crawling ${source.name}:`, error);
        }
      }
      
      return {
        success: true,
        message: `Successfully crawled ${allArticles.length} articles from ${newsSources.length} sources`,
        articles: allArticles
      };
    } catch (error) {
      console.error('Error crawling all sources:', error);
      return {
        success: false,
        message: `Failed to crawl news sources: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Crawl a specific news source
   */
  async crawlSource(sourceId: string): Promise<CrawlResult> {
    const source = newsSources.find(s => s.id === sourceId);
    
    if (!source) {
      return {
        success: false,
        message: `Source with ID ${sourceId} not found`
      };
    }
    
    try {
      // Different crawling strategies based on the source
      switch (sourceId) {
        case 'omak-chronicle':
          return await this.crawlOmakChronicle(source.url);
        case 'okanogan-valley-gazette':
          return await this.crawlGazetteTribune(source.url);
        case 'wenatchee-world':
          return await this.crawlWenatcheeWorld(source.url);
        case 'spokesman-review':
          return await this.crawlSpokesmanReview(source.url);
        case 'seattle-times':
          return await this.crawlSeattleTimes(source.url);
        default:
          return {
            success: false,
            message: `No crawling strategy defined for source ${sourceId}`
          };
      }
    } catch (error) {
      console.error(`Error crawling ${source.name}:`, error);
      return {
        success: false,
        message: `Failed to crawl ${source.name}: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Crawl the Omak Chronicle website
   */
  private async crawlOmakChronicle(url: string): Promise<CrawlResult> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const articles: NewsArticle[] = [];
      
      // Example selector pattern - adjust based on actual site structure
      $('.article, .story, .news-item').each((i, element) => {
        const title = $(element).find('.headline, .title, h2, h3').first().text().trim();
        const summary = $(element).find('.summary, .excerpt, .description, p').first().text().trim();
        const link = $(element).find('a').attr('href');
        const imageUrl = $(element).find('img').attr('src');
        const publishedText = $(element).find('.date, .published, .timestamp').first().text().trim();
        const categoryText = $(element).find('.category, .section, .topic').first().text().trim();
        
        // Skip if essential data is missing
        if (!title || !link) return;
        
        // Normalize URL if it's relative
        const sourceUrl = link.startsWith('http') ? link : `${url}${link.startsWith('/') ? '' : '/'}${link}`;
        
        // Determine category
        let category = 'Local News';
        if (categoryText) {
          if (categoryText.toLowerCase().includes('business')) category = 'Business';
          else if (categoryText.toLowerCase().includes('agriculture')) category = 'Agriculture';
          else if (categoryText.toLowerCase().includes('community')) category = 'Community';
          else if (categoryText.toLowerCase().includes('education')) category = 'Education';
          else if (categoryText.toLowerCase().includes('government')) category = 'Government';
          else if (categoryText.toLowerCase().includes('health')) category = 'Health';
          else if (categoryText.toLowerCase().includes('environment')) category = 'Environment';
          else if (categoryText.toLowerCase().includes('event')) category = 'Events';
          else if (categoryText.toLowerCase().includes('sport')) category = 'Sports';
        }
        
        // Parse date or use current date
        let publishedAt = new Date().toISOString();
        if (publishedText) {
          try {
            publishedAt = new Date(publishedText).toISOString();
          } catch (e) {
            // Keep default date if parsing fails
          }
        }
        
        articles.push({
          id: uuidv4(),
          title,
          summary: summary || title,
          source: 'Omak Chronicle',
          sourceUrl,
          imageUrl: imageUrl || undefined,
          publishedAt,
          category,
          featured: i < 2, // Feature the first two articles
          tags: []
        });
      });
      
      return {
        success: true,
        message: `Successfully crawled ${articles.length} articles from Omak Chronicle`,
        articles
      };
    } catch (error) {
      console.error('Error crawling Omak Chronicle:', error);
      return {
        success: false,
        message: `Failed to crawl Omak Chronicle: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Crawl the Okanogan Valley Gazette-Tribune website
   */
  private async crawlGazetteTribune(url: string): Promise<CrawlResult> {
    try {
      const response = await axios.get(url);
      const $ = cheerio.load(response.data);
      const articles: NewsArticle[] = [];
      
      // Example selector pattern - adjust based on actual site structure
      $('.post, .article, .entry').each((i, element) => {
        const title = $(element).find('.entry-title, h2, h3').first().text().trim();
        const summary = $(element).find('.entry-summary, .excerpt, p').first().text().trim();
        const link = $(element).find('a').attr('href');
        const imageUrl = $(element).find('img').attr('src');
        const publishedText = $(element).find('.entry-date, .date, .published').first().text().trim();
        const categoryText = $(element).find('.category, .entry-category').first().text().trim();
        
        // Skip if essential data is missing
        if (!title || !link) return;
        
        // Normalize URL if it's relative
        const sourceUrl = link.startsWith('http') ? link : `${url}${link.startsWith('/') ? '' : '/'}${link}`;
        
        // Determine category
        let category = 'Local News';
        if (categoryText) {
          if (categoryText.toLowerCase().includes('business')) category = 'Business';
          else if (categoryText.toLowerCase().includes('agriculture')) category = 'Agriculture';
          else if (categoryText.toLowerCase().includes('community')) category = 'Community';
          else if (categoryText.toLowerCase().includes('education')) category = 'Education';
          else if (categoryText.toLowerCase().includes('government')) category = 'Government';
          else if (categoryText.toLowerCase().includes('health')) category = 'Health';
          else if (categoryText.toLowerCase().includes('environment')) category = 'Environment';
          else if (categoryText.toLowerCase().includes('event')) category = 'Events';
          else if (categoryText.toLowerCase().includes('sport')) category = 'Sports';
        }
        
        // Parse date or use current date
        let publishedAt = new Date().toISOString();
        if (publishedText) {
          try {
            publishedAt = new Date(publishedText).toISOString();
          } catch (e) {
            // Keep default date if parsing fails
          }
        }
        
        articles.push({
          id: uuidv4(),
          title,
          summary: summary || title,
          source: 'Okanogan Valley Gazette-Tribune',
          sourceUrl,
          imageUrl: imageUrl || undefined,
          publishedAt,
          category,
          featured: i < 2, // Feature the first two articles
          tags: []
        });
      });
      
      return {
        success: true,
        message: `Successfully crawled ${articles.length} articles from Okanogan Valley Gazette-Tribune`,
        articles
      };
    } catch (error) {
      console.error('Error crawling Okanogan Valley Gazette-Tribune:', error);
      return {
        success: false,
        message: `Failed to crawl Okanogan Valley Gazette-Tribune: ${error instanceof Error ? error.message : String(error)}`
      };
    }
  }
  
  /**
   * Crawl the Wenatchee World website
   */
  private async crawlWenatcheeWorld(url: string): Promise<CrawlResult> {
    // Implementation similar to other crawlers
    // Customize selectors based on the website structure
    return {
      success: false,
      message: 'Wenatchee World crawler not yet implemented'
    };
  }
  
  /**
   * Crawl the Spokesman-Review website
   */
  private async crawlSpokesmanReview(url: string): Promise<CrawlResult> {
    // Implementation similar to other crawlers
    // Customize selectors based on the website structure
    return {
      success: false,
      message: 'Spokesman-Review crawler not yet implemented'
    };
  }
  
  /**
   * Crawl the Seattle Times website
   */
  private async crawlSeattleTimes(url: string): Promise<CrawlResult> {
    // Implementation similar to other crawlers
    // Customize selectors based on the website structure
    return {
      success: false,
      message: 'Seattle Times crawler not yet implemented'
    };
  }
  
  /**
   * Get sample news articles for development and testing
   */
  getSampleArticles(): NewsArticle[] {
    // Import sample articles from data file
    const { newsArticles } = require('@/data/news');
    return newsArticles;
  }
}

export default new NewsCrawlerService();
