/**
 * Mock Prisma Client for development
 * 
 * This file provides mock implementations of Prisma client functions
 * to allow development without a real database connection.
 */

// Mock economic data
const mockEconomicData = [
  {
    id: '1',
    date: new Date('2023-01-01'),
    unemployment_rate: 4.5,
    median_income: 52000,
    gdp_growth: 2.1,
    inflation_rate: 3.2,
    housing_price_index: 185.3,
    consumer_confidence: 98.7,
    retail_sales_growth: 1.8,
    manufacturing_index: 54.2,
    source: 'Bureau of Labor Statistics',
    notes: 'Q1 2023 data'
  },
  {
    id: '2',
    date: new Date('2023-04-01'),
    unemployment_rate: 4.3,
    median_income: 52500,
    gdp_growth: 2.4,
    inflation_rate: 3.0,
    housing_price_index: 187.1,
    consumer_confidence: 99.2,
    retail_sales_growth: 2.0,
    manufacturing_index: 55.1,
    source: 'Bureau of Labor Statistics',
    notes: 'Q2 2023 data'
  },
  {
    id: '3',
    date: new Date('2023-07-01'),
    unemployment_rate: 4.2,
    median_income: 53000,
    gdp_growth: 2.6,
    inflation_rate: 2.8,
    housing_price_index: 189.5,
    consumer_confidence: 100.5,
    retail_sales_growth: 2.2,
    manufacturing_index: 55.8,
    source: 'Bureau of Labor Statistics',
    notes: 'Q3 2023 data'
  }
];

// Mock business data
const mockBusinesses = [
  {
    id: '1',
    name: 'Mountain View Bakery',
    description: 'Artisan bakery specializing in sourdough bread and pastries.',
    address: '123 Main St, Tonasket, WA 98855',
    phone: '(509) 555-1234',
    email: 'info@mountainviewbakery.com',
    website: 'https://www.mountainviewbakery.com',
    category: 'Food & Dining',
    subcategory: 'Bakery',
    featured: true,
    latitude: 48.705,
    longitude: -119.439,
    hours: 'Tue-Sat: 7am-3pm, Sun-Mon: Closed',
    founded: '2015',
    employees: '5-10',
    image: '/images/businesses/bakery.jpg',
    services: ['Custom Cakes', 'Catering', 'Coffee Bar'],
    products: ['Sourdough Bread', 'Pastries', 'Cookies', 'Cakes'],
    tags: ['Organic', 'Local', 'Artisan'],
    socialMedia: {
      facebook: 'https://facebook.com/mountainviewbakery',
      instagram: 'https://instagram.com/mountainviewbakery'
    },
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-06-15')
  },
  {
    id: '2',
    name: 'Okanogan Valley Farm Supply',
    description: 'Agricultural supplies and equipment for local farmers and gardeners.',
    address: '456 Farm Rd, Tonasket, WA 98855',
    phone: '(509) 555-5678',
    website: 'https://www.okvalleyfarm.com',
    category: 'Agriculture',
    subcategory: 'Farm Supply',
    featured: false,
    latitude: 48.708,
    longitude: -119.442,
    hours: 'Mon-Fri: 8am-6pm, Sat: 9am-5pm, Sun: Closed',
    founded: '1978',
    employees: '10-20',
    image: '/images/businesses/farm-supply.jpg',
    services: ['Equipment Rental', 'Soil Testing', 'Delivery'],
    products: ['Seeds', 'Fertilizers', 'Tools', 'Irrigation Supplies'],
    tags: ['Agriculture', 'Gardening', 'Local'],
    createdAt: new Date('2023-01-01'),
    updatedAt: new Date('2023-05-20')
  }
];

// Mock Prisma client
const mockPrisma = {
  economicData: {
    findMany: async () => {
      return mockEconomicData;
    },
    findUnique: async ({ where }) => {
      return mockEconomicData.find(data => data.id === where.id);
    },
    create: async ({ data }) => {
      return { ...data, id: String(mockEconomicData.length + 1) };
    },
    update: async ({ where, data }) => {
      return { ...data, id: where.id };
    },
    delete: async ({ where }) => {
      return { id: where.id };
    }
  },
  business: {
    findMany: async ({ where, take } = {}) => {
      let results = [...mockBusinesses];
      
      if (where?.address?.contains) {
        results = results.filter(b => b.address.includes(where.address.contains));
      }
      
      if (take) {
        results = results.slice(0, take);
      }
      
      return results;
    },
    findFirst: async ({ where }) => {
      if (where.OR) {
        // Handle OR condition
        for (const condition of where.OR) {
          if (condition.name) {
            const business = mockBusinesses.find(b => b.name === condition.name);
            if (business) return business;
          } else if (condition.AND) {
            // Handle AND condition within OR
            const businesses = mockBusinesses.filter(b => {
              return condition.AND.every(c => {
                if (c.address && c.phone) {
                  return b.address === c.address && b.phone === c.phone;
                }
                return false;
              });
            });
            if (businesses.length > 0) return businesses[0];
          }
        }
      }
      return null;
    },
    create: async ({ data }) => {
      return { ...data, id: String(mockBusinesses.length + 1) };
    },
    update: async ({ where, data }) => {
      return { ...data, id: where.id };
    }
  }
};

export { mockPrisma as prisma };
export default mockPrisma;
