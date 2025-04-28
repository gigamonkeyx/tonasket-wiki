/**
 * Enriched business data for the Tonasket area
 * This file serves as a static data source for enriched business information
 */

export interface EnrichedBusiness {
  id: string;
  name: string;
  description?: string;
  category?: string;
  subcategory?: string;
  address?: string;
  phone?: string;
  email?: string;
  website?: string;
  hours?: string;
  founded?: string;
  employees?: string;
  featured: boolean;
  image?: string;
  services?: string[];
  products?: string[];
  tags?: string[];
  socialMedia?: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

// Sample enriched business data
const enrichedBusinesses: EnrichedBusiness[] = [
  {
    id: "1",
    name: "Mountain View Bakery",
    description: "Artisan bakery specializing in sourdough bread and pastries made with locally sourced ingredients.",
    category: "Food & Dining",
    subcategory: "Bakery",
    address: "123 Main St, Tonasket, WA 98855",
    phone: "(509) 555-1234",
    email: "info@mountainviewbakery.com",
    website: "https://www.mountainviewbakery.com",
    hours: "Tue-Sat: 7am-3pm, Sun-Mon: Closed",
    founded: "2015",
    employees: "5-10",
    featured: true,
    image: "/images/businesses/bakery.jpg",
    services: ["Custom Cakes", "Catering", "Coffee Bar"],
    products: ["Sourdough Bread", "Pastries", "Cookies", "Cakes"],
    tags: ["Organic", "Local", "Artisan"],
    socialMedia: {
      facebook: "https://facebook.com/mountainviewbakery",
      instagram: "https://instagram.com/mountainviewbakery"
    },
    coordinates: {
      lat: 48.705,
      lng: -119.439
    }
  },
  {
    id: "2",
    name: "Okanogan Valley Farm Supply",
    description: "Agricultural supplies and equipment for local farmers and gardeners.",
    category: "Agriculture",
    subcategory: "Farm Supply",
    address: "456 Farm Rd, Tonasket, WA 98855",
    phone: "(509) 555-5678",
    website: "https://www.okvalleyfarm.com",
    hours: "Mon-Fri: 8am-6pm, Sat: 9am-5pm, Sun: Closed",
    founded: "1978",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/farm-supply.jpg",
    services: ["Equipment Rental", "Soil Testing", "Delivery"],
    products: ["Seeds", "Fertilizers", "Tools", "Irrigation Supplies"],
    tags: ["Agriculture", "Gardening", "Local"],
    coordinates: {
      lat: 48.708,
      lng: -119.442
    }
  },
  {
    id: "3",
    name: "Riverside Wellness Center",
    description: "Holistic health and wellness services including massage, acupuncture, and naturopathy.",
    category: "Healthcare",
    subcategory: "Wellness",
    address: "789 River Dr, Tonasket, WA 98855",
    phone: "(509) 555-9012",
    email: "appointments@riversidewellness.com",
    website: "https://www.riversidewellness.com",
    hours: "Mon-Fri: 9am-7pm, Sat: 10am-4pm, Sun: Closed",
    founded: "2010",
    employees: "5-10",
    featured: true,
    image: "/images/businesses/wellness.jpg",
    services: ["Massage Therapy", "Acupuncture", "Naturopathy", "Yoga Classes"],
    tags: ["Health", "Wellness", "Holistic"],
    socialMedia: {
      facebook: "https://facebook.com/riversidewellness",
      instagram: "https://instagram.com/riversidewellness"
    },
    coordinates: {
      lat: 48.703,
      lng: -119.437
    }
  },
  {
    id: "4",
    name: "North Country Auto Repair",
    description: "Full-service auto repair and maintenance for all makes and models.",
    category: "Services",
    subcategory: "Auto Repair",
    address: "321 Mechanic Way, Tonasket, WA 98855",
    phone: "(509) 555-3456",
    email: "service@northcountryauto.com",
    website: "https://www.northcountryauto.com",
    hours: "Mon-Fri: 8am-5:30pm, Sat-Sun: Closed",
    founded: "1995",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/auto-repair.jpg",
    services: ["Oil Changes", "Brake Service", "Engine Repair", "Diagnostics"],
    tags: ["Automotive", "Repair", "Maintenance"],
    socialMedia: {
      facebook: "https://facebook.com/northcountryauto"
    },
    coordinates: {
      lat: 48.706,
      lng: -119.441
    }
  },
  {
    id: "5",
    name: "Okanogan Valley Winery",
    description: "Family-owned winery producing award-winning wines from locally grown grapes.",
    category: "Food & Dining",
    subcategory: "Winery",
    address: "555 Vineyard Ln, Tonasket, WA 98855",
    phone: "(509) 555-7890",
    email: "tastings@okvalleywinery.com",
    website: "https://www.okvalleywinery.com",
    hours: "Thu-Sun: 12pm-6pm, Mon-Wed: By Appointment",
    founded: "2005",
    employees: "5-10",
    featured: true,
    image: "/images/businesses/winery.jpg",
    services: ["Wine Tastings", "Vineyard Tours", "Event Hosting"],
    products: ["Red Wines", "White Wines", "Rosé", "Dessert Wines"],
    tags: ["Wine", "Local", "Organic"],
    socialMedia: {
      facebook: "https://facebook.com/okvalleywinery",
      instagram: "https://instagram.com/okvalleywinery"
    },
    coordinates: {
      lat: 48.710,
      lng: -119.445
    }
  }
];

export default enrichedBusinesses;
