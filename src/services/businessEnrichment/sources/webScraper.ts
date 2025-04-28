/**
 * Business Website Scraper
 * 
 * This module scrapes business websites to extract additional information
 * such as descriptions, services, products, and contact details.
 */

import axios from 'axios';
import * as cheerio from 'cheerio';

// Define the structure of scraped website data
export interface ScrapedWebsiteData {
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  hours?: Record<string, string>;
  services?: string[];
  products?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  images?: string[];
}

/**
 * Scrape a business website to extract relevant information
 * @param url - URL of the business website
 * @returns Scraped data or null if scraping fails
 */
export async function scrapeBusinessWebsites(url: string): Promise<ScrapedWebsiteData | null> {
  if (!url) return null;
  
  try {
    // Ensure URL has protocol
    const formattedUrl = url.startsWith('http') ? url : `https://${url}`;
    
    // Fetch the website content
    const response = await axios.get(formattedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
        'Referer': 'https://www.google.com/'
      },
      timeout: 10000 // 10 second timeout
    });
    
    // Parse the HTML content
    const $ = cheerio.load(response.data);
    
    // Initialize scraped data object
    const scrapedData: ScrapedWebsiteData = {
      socialMedia: {}
    };
    
    // Extract description
    scrapedData.description = extractDescription($);
    
    // Extract contact information
    const contactInfo = extractContactInfo($);
    scrapedData.email = contactInfo.email;
    scrapedData.phone = contactInfo.phone;
    scrapedData.address = contactInfo.address;
    
    // Extract business hours
    scrapedData.hours = extractBusinessHours($);
    
    // Extract services and products
    scrapedData.services = extractServices($);
    scrapedData.products = extractProducts($);
    
    // Extract social media links
    scrapedData.socialMedia = extractSocialMedia($);
    
    // Extract images
    scrapedData.images = extractImages($, formattedUrl);
    
    return scrapedData;
  } catch (error) {
    console.error(`Error scraping website ${url}:`, error);
    return null;
  }
}

/**
 * Extract business description from website
 */
function extractDescription($: cheerio.CheerioAPI): string | undefined {
  // Try to find description in meta tags first
  const metaDescription = $('meta[name="description"]').attr('content') ||
                          $('meta[property="og:description"]').attr('content');
  
  if (metaDescription && metaDescription.length > 20) {
    return metaDescription;
  }
  
  // Look for about section or main content
  let description = '';
  
  // Common selectors for about sections
  const aboutSelectors = [
    '#about', '.about', 'section.about', 'div.about-us',
    'h1:contains("About") + p', 'h2:contains("About") + p',
    'h3:contains("About") + p', 'h1:contains("About Us") + p',
    'h2:contains("About Us") + p', 'h3:contains("About Us") + p'
  ];
  
  // Try each selector
  for (const selector of aboutSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      description = element.text().trim();
      if (description.length > 50) break;
    }
  }
  
  // If no about section found, try to get the first substantial paragraph
  if (description.length < 50) {
    $('p').each((i, el) => {
      const text = $(el).text().trim();
      if (text.length > 100 && text.length < 1000 && !description) {
        description = text;
      }
    });
  }
  
  return description.length > 0 ? description : undefined;
}

/**
 * Extract contact information from website
 */
function extractContactInfo($: cheerio.CheerioAPI): {
  email?: string;
  phone?: string;
  address?: string;
} {
  const contactInfo = {
    email: undefined as string | undefined,
    phone: undefined as string | undefined,
    address: undefined as string | undefined
  };
  
  // Extract email
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const emailLinks = $('a[href^="mailto:"]');
  
  if (emailLinks.length > 0) {
    const href = emailLinks.first().attr('href');
    if (href) {
      const email = href.replace('mailto:', '').trim();
      contactInfo.email = email;
    }
  } else {
    // Try to find email in text
    const bodyText = $('body').text();
    const emailMatch = bodyText.match(emailRegex);
    if (emailMatch) {
      contactInfo.email = emailMatch[0];
    }
  }
  
  // Extract phone number
  const phoneRegex = /(\+?1[-\s.]?)?\(?([0-9]{3})\)?[-\s.]?([0-9]{3})[-\s.]?([0-9]{4})/;
  const phoneLinks = $('a[href^="tel:"]');
  
  if (phoneLinks.length > 0) {
    const href = phoneLinks.first().attr('href');
    if (href) {
      const phone = href.replace('tel:', '').trim();
      contactInfo.phone = phone;
    }
  } else {
    // Try to find phone in text
    const bodyText = $('body').text();
    const phoneMatch = bodyText.match(phoneRegex);
    if (phoneMatch) {
      contactInfo.phone = phoneMatch[0];
    }
  }
  
  // Extract address
  const addressSelectors = [
    '.address', 'address', '.contact-address',
    'div:contains("Address:") + div', 'span:contains("Address:") + span',
    'p:contains("Address:")', 'div:contains("Location:") + div'
  ];
  
  for (const selector of addressSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      const address = element.text().trim();
      if (address.length > 10 && address.includes(' ')) {
        contactInfo.address = address;
        break;
      }
    }
  }
  
  return contactInfo;
}

/**
 * Extract business hours from website
 */
function extractBusinessHours($: cheerio.CheerioAPI): Record<string, string> | undefined {
  const hours: Record<string, string> = {};
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  // Common selectors for hours sections
  const hoursSelectors = [
    '.hours', '.business-hours', '.opening-hours',
    'div:contains("Hours:") + div', 'span:contains("Hours:") + span',
    'p:contains("Hours:")', 'div:contains("Opening Hours:") + div'
  ];
  
  let hoursElement = null;
  
  // Try each selector
  for (const selector of hoursSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      hoursElement = element;
      break;
    }
  }
  
  if (hoursElement) {
    const hoursText = hoursElement.text().trim();
    
    // Try to parse hours for each day
    daysOfWeek.forEach(day => {
      const dayRegex = new RegExp(`${day}[:\\s]+(\\d{1,2}(?::\\d{2})?\\s*(?:AM|PM|am|pm)\\s*-\\s*\\d{1,2}(?::\\d{2})?\\s*(?:AM|PM|am|pm))`, 'i');
      const match = hoursText.match(dayRegex);
      
      if (match && match[1]) {
        hours[day] = match[1].trim();
      }
    });
    
    // Check if we found any hours
    if (Object.keys(hours).length > 0) {
      return hours;
    }
  }
  
  return undefined;
}

/**
 * Extract services from website
 */
function extractServices($: cheerio.CheerioAPI): string[] {
  const services: string[] = [];
  
  // Common selectors for services sections
  const servicesSelectors = [
    '.services', '#services', 'section.services',
    'h2:contains("Services") + ul', 'h3:contains("Services") + ul',
    'h2:contains("Our Services") + ul', 'h3:contains("Our Services") + ul'
  ];
  
  // Try each selector
  for (const selector of servicesSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      // If it's a list, extract list items
      if (element.is('ul') || element.find('li').length > 0) {
        element.find('li').each((i, el) => {
          const service = $(el).text().trim();
          if (service.length > 0 && !services.includes(service)) {
            services.push(service);
          }
        });
      } else {
        // Otherwise, try to extract from paragraphs or divs
        element.find('p, div').each((i, el) => {
          const service = $(el).text().trim();
          if (service.length > 0 && service.length < 100 && !services.includes(service)) {
            services.push(service);
          }
        });
      }
      
      if (services.length > 0) break;
    }
  }
  
  return services;
}

/**
 * Extract products from website
 */
function extractProducts($: cheerio.CheerioAPI): string[] {
  const products: string[] = [];
  
  // Common selectors for products sections
  const productsSelectors = [
    '.products', '#products', 'section.products',
    'h2:contains("Products") + ul', 'h3:contains("Products") + ul',
    'h2:contains("Our Products") + ul', 'h3:contains("Our Products") + ul'
  ];
  
  // Try each selector
  for (const selector of productsSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      // If it's a list, extract list items
      if (element.is('ul') || element.find('li').length > 0) {
        element.find('li').each((i, el) => {
          const product = $(el).text().trim();
          if (product.length > 0 && !products.includes(product)) {
            products.push(product);
          }
        });
      } else {
        // Otherwise, try to extract from product cards or divs
        element.find('.product, .product-item, .product-card').each((i, el) => {
          const product = $(el).text().trim();
          if (product.length > 0 && product.length < 100 && !products.includes(product)) {
            products.push(product);
          }
        });
      }
      
      if (products.length > 0) break;
    }
  }
  
  return products;
}

/**
 * Extract social media links from website
 */
function extractSocialMedia($: cheerio.CheerioAPI): {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
} {
  const socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  } = {};
  
  // Find all links
  $('a').each((i, el) => {
    const href = $(el).attr('href');
    if (!href) return;
    
    // Check for Facebook
    if (href.includes('facebook.com') || href.includes('fb.com')) {
      socialMedia.facebook = href;
    }
    // Check for Instagram
    else if (href.includes('instagram.com')) {
      socialMedia.instagram = href;
    }
    // Check for Twitter
    else if (href.includes('twitter.com') || href.includes('x.com')) {
      socialMedia.twitter = href;
    }
    // Check for LinkedIn
    else if (href.includes('linkedin.com')) {
      socialMedia.linkedin = href;
    }
  });
  
  return socialMedia;
}

/**
 * Extract images from website
 */
function extractImages($: cheerio.CheerioAPI, baseUrl: string): string[] {
  const images: string[] = [];
  
  // Find all images
  $('img').each((i, el) => {
    const src = $(el).attr('src');
    if (!src || src.includes('logo') || src.includes('icon')) return;
    
    // Convert relative URLs to absolute
    const imageUrl = src.startsWith('http') ? src : new URL(src, baseUrl).href;
    
    // Only include images that are likely to be business photos
    if (imageUrl.includes('.jpg') || imageUrl.includes('.jpeg') || imageUrl.includes('.png')) {
      images.push(imageUrl);
    }
  });
  
  return images.slice(0, 5); // Limit to 5 images
}
