/**
 * Business Types
 *
 * This file defines the types related to businesses in the application.
 */

/**
 * Represents a business entity
 */
export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory: string;
  address: string;
  phone: string;
  phoneNumber?: string;
  licenseStatus?: string;
  licenseType?: string;
  licenseNumber?: string;
  firstIssueDate?: string;
  locationName?: string;
  businessName?: string;
  locationAddress?: string;
  businessAddress?: string;
  email: string;
  website: string;
  hours: string;
  founded: string;
  employees: string;
  featured: boolean;
  image: string;
  services: string[];
  products: string[];
  tags: string[];
  socialMedia: Record<string, string>;
  coordinates: Coordinates | null;
  sourceData: Record<string, any>;
}

/**
 * Represents geographic coordinates
 */
export interface Coordinates {
  latitude: number;
  longitude: number;
}

/**
 * Represents a business submission from a user
 */
export interface BusinessSubmission {
  id?: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  hours: string;
  founded: string;
  employees: string;
  services: string[];
  products: string[];
  tags: string[];
  socialMedia: Record<string, string>;
  submittedBy: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
}

/**
 * Represents a business claim request
 */
export interface BusinessClaim {
  id: string;
  businessId: string;
  claimantName: string;
  claimantEmail: string;
  claimantPhone: string;
  proofOfOwnership: string;
  submittedAt: Date;
  status: 'pending' | 'approved' | 'rejected';
  notes: string;
}

/**
 * Represents a business enrichment source
 */
export interface BusinessEnrichmentSource {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  priority: number;
  apiKey?: string;
  apiUrl?: string;
  lastUpdated: Date;
}

export default Business;
