/**
 * ID Generator Utility
 * 
 * This module provides functions for generating unique IDs for business records.
 */

/**
 * Generate a unique ID for a business record
 * @param name - Business name
 * @param address - Business address
 * @returns Unique ID
 */
export function generateUniqueId(name: string, address?: string): string {
  // Create a base string from name and address
  const baseString = `${name}${address || ''}`;
  
  // Convert to lowercase and remove special characters
  const normalized = baseString.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Generate a simple hash
  const hash = simpleHash(normalized);
  
  // Create a business ID with a prefix
  return `b${hash}`;
}

/**
 * Generate a simple hash from a string
 * @param str - String to hash
 * @returns Hash string
 */
function simpleHash(str: string): string {
  let hash = 0;
  
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  
  // Convert to a positive 6-digit number
  const positiveHash = Math.abs(hash) % 1000000;
  
  // Pad with zeros to ensure 6 digits
  return positiveHash.toString().padStart(6, '0');
}
