/**
 * Data Normalization Utility
 * 
 * This module provides functions for normalizing business data fields
 * to ensure consistency across different data sources.
 */

/**
 * Normalize an address to a standard format
 * @param address - Address string to normalize
 * @returns Normalized address
 */
export function normalizeAddress(address?: string): string {
  if (!address) return '';
  
  // Remove extra whitespace
  let normalized = address.trim().replace(/\s+/g, ' ');
  
  // Standardize common abbreviations
  const abbreviations: Record<string, string> = {
    'St.': 'Street',
    'St': 'Street',
    'Rd.': 'Road',
    'Rd': 'Road',
    'Ave.': 'Avenue',
    'Ave': 'Avenue',
    'Blvd.': 'Boulevard',
    'Blvd': 'Boulevard',
    'Ln.': 'Lane',
    'Ln': 'Lane',
    'Dr.': 'Drive',
    'Dr': 'Drive',
    'Hwy.': 'Highway',
    'Hwy': 'Highway',
    'Apt.': 'Apartment',
    'Apt': 'Apartment',
    'Ste.': 'Suite',
    'Ste': 'Suite',
    'N.': 'North',
    'N': 'North',
    'S.': 'South',
    'S': 'South',
    'E.': 'East',
    'E': 'East',
    'W.': 'West',
    'W': 'West',
    'WA': 'Washington'
  };
  
  // Replace abbreviations with full words
  for (const [abbr, full] of Object.entries(abbreviations)) {
    // Use word boundaries to avoid replacing parts of words
    const regex = new RegExp(`\\b${abbr}\\b`, 'g');
    normalized = normalized.replace(regex, full);
  }
  
  // Ensure Tonasket, WA is included if not already present
  if (!normalized.includes('Tonasket') && !normalized.includes('tonasket')) {
    if (normalized.includes('WA') || normalized.includes('Washington')) {
      // Add Tonasket before the state
      normalized = normalized.replace(/,?\s*(WA|Washington)/, ', Tonasket, $1');
    } else {
      // Add Tonasket, WA at the end
      normalized = `${normalized}, Tonasket, Washington`;
    }
  }
  
  // Ensure ZIP code is included if not already present
  if (!normalized.includes('98855')) {
    normalized = `${normalized} 98855`;
  }
  
  return normalized;
}

/**
 * Normalize a phone number to a standard format
 * @param phone - Phone number string to normalize
 * @returns Normalized phone number in (XXX) XXX-XXXX format
 */
export function normalizePhone(phone?: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const digits = phone.replace(/\D/g, '');
  
  // Check if we have a valid US phone number
  if (digits.length === 10) {
    // Format as (XXX) XXX-XXXX
    return `(${digits.substring(0, 3)}) ${digits.substring(3, 6)}-${digits.substring(6)}`;
  } else if (digits.length === 11 && digits[0] === '1') {
    // Remove country code and format
    return `(${digits.substring(1, 4)}) ${digits.substring(4, 7)}-${digits.substring(7)}`;
  }
  
  // If we can't normalize, return the original
  return phone;
}

/**
 * Normalize a business name to a standard format
 * @param name - Business name to normalize
 * @returns Normalized business name
 */
export function normalizeBusinessName(name?: string): string {
  if (!name) return '';
  
  // Remove extra whitespace
  let normalized = name.trim().replace(/\s+/g, ' ');
  
  // Capitalize first letter of each word
  normalized = normalized
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
  
  // Fix common business entity abbreviations
  const entityTypes: Record<string, string> = {
    'Llc': 'LLC',
    'Inc': 'Inc.',
    'Corp': 'Corp.',
    'Ltd': 'Ltd.',
    'Llp': 'LLP',
    'Pllc': 'PLLC'
  };
  
  for (const [abbr, correct] of Object.entries(entityTypes)) {
    // Replace at the end of the string
    const regex = new RegExp(`\\b${abbr}\\b`, 'g');
    normalized = normalized.replace(regex, correct);
  }
  
  return normalized;
}

/**
 * Normalize a website URL to a standard format
 * @param url - Website URL to normalize
 * @returns Normalized URL
 */
export function normalizeWebsite(url?: string): string {
  if (!url) return '';
  
  // Remove extra whitespace
  let normalized = url.trim();
  
  // Ensure URL has a protocol
  if (!normalized.startsWith('http://') && !normalized.startsWith('https://')) {
    normalized = `https://${normalized}`;
  }
  
  // Remove trailing slash
  if (normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  
  return normalized;
}

/**
 * Normalize a business category to match our application's categories
 * @param category - Category to normalize
 * @returns Normalized category
 */
export function normalizeCategory(category?: string): string {
  if (!category) return 'Services';
  
  // Map of common categories to our application categories
  const categoryMap: Record<string, string> = {
    // Food & Dining variations
    'restaurant': 'Food & Dining',
    'cafe': 'Food & Dining',
    'bakery': 'Food & Dining',
    'coffee': 'Food & Dining',
    'brewery': 'Food & Dining',
    'bar': 'Food & Dining',
    'food': 'Food & Dining',
    'dining': 'Food & Dining',
    'grocery': 'Food & Dining',
    
    // Retail variations
    'shop': 'Retail',
    'store': 'Retail',
    'retail': 'Retail',
    'market': 'Retail',
    'clothing': 'Retail',
    'book': 'Retail',
    'hardware': 'Retail',
    
    // Services variations
    'service': 'Services',
    'bank': 'Services',
    'financial': 'Services',
    'insurance': 'Services',
    'real estate': 'Services',
    'education': 'Services',
    'school': 'Services',
    'library': 'Services',
    'auto': 'Services',
    'repair': 'Services',
    
    // Healthcare variations
    'health': 'Healthcare',
    'medical': 'Healthcare',
    'doctor': 'Healthcare',
    'dentist': 'Healthcare',
    'hospital': 'Healthcare',
    'clinic': 'Healthcare',
    'pharmacy': 'Healthcare',
    
    // Agriculture variations
    'farm': 'Agriculture',
    'agriculture': 'Agriculture',
    'garden': 'Agriculture',
    'nursery': 'Agriculture',
    'orchard': 'Agriculture'
  };
  
  // Check for matches in our category map
  const lowerCategory = category.toLowerCase();
  for (const [key, value] of Object.entries(categoryMap)) {
    if (lowerCategory.includes(key)) {
      return value;
    }
  }
  
  // If no match found, return the original category
  return category;
}
