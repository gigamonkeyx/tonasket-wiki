export interface Business {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  address: string;
  phone: string;
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
  // License data fields
  licenseStatus?: string;
  licenseType?: string;
  licenseNumber?: string;
  firstIssueDate?: string;
  locationName?: string;
  businessName?: string;
  locationAddress?: string;
  businessAddress?: string;
  // Source data for tracking
  sourceData?: Record<string, any>;
}

export const businesses: Business[] = [
  {
    id: "b001",
    name: "Tonasket Natural Foods Co-op",
    description: "A community-owned grocery store offering organic and locally-sourced products. The co-op focuses on sustainable food options and supports local farmers and producers.",
    category: "Food & Dining",
    subcategory: "Grocery",
    address: "21 W 4th St, Tonasket, WA 98855",
    phone: "(509) 486-4188",
    email: "info@tonasketcoop.com",
    website: "https://www.tonasketcoop.com",
    hours: "Mon-Sat: 9:00 AM - 6:00 PM, Sun: 10:00 AM - 4:00 PM",
    founded: "1976",
    employees: "10-20",
    featured: true,
    image: "/images/businesses/tonasket-coop.jpg",
    services: ["Grocery", "Bulk Foods", "Local Produce", "Health Products"],
    products: ["Organic Produce", "Local Meats", "Bulk Grains", "Natural Health Products"],
    tags: ["organic", "local", "sustainable", "community-owned"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketCoop/",
      instagram: "https://www.instagram.com/tonasketcoop/"
    },
    coordinates: {
      lat: 48.7054,
      lng: -119.4395
    }
  },
  {
    id: "b002",
    name: "Okanogan Valley Farmers Market",
    description: "A vibrant farmers market featuring local produce, crafts, and prepared foods from Okanogan County producers. The market operates seasonally and provides a venue for local farmers to sell directly to consumers.",
    category: "Agriculture",
    subcategory: "Farmers Market",
    address: "Tonasket Visitor Center, Tonasket, WA 98855",
    phone: "(509) 486-1103",
    email: "info@okanoganfarmersmarket.org",
    website: "https://www.okanoganfarmersmarket.org",
    hours: "Saturdays: 9:00 AM - 1:00 PM (May-October)",
    founded: "1998",
    employees: "5-10",
    featured: true,
    image: "/images/businesses/farmers-market.jpg",
    services: ["Fresh Produce", "Local Crafts", "Prepared Foods"],
    products: ["Seasonal Produce", "Artisan Crafts", "Baked Goods", "Local Honey"],
    tags: ["local", "seasonal", "community", "fresh"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyFarmersMarket/",
      instagram: "https://www.instagram.com/okanoganfarmersmarket/"
    },
    coordinates: {
      lat: 48.7042,
      lng: -119.4387
    }
  },
  {
    id: "b003",
    name: "North Valley Hospital",
    description: "A critical access hospital serving the healthcare needs of North Okanogan County. The hospital provides emergency services, primary care, and specialty care to the local community.",
    category: "Healthcare",
    subcategory: "Hospital",
    address: "203 S Western Ave, Tonasket, WA 98855",
    phone: "(509) 486-2151",
    email: "info@nvhospital.org",
    website: "https://www.nvhospital.org",
    hours: "24/7 Emergency Services",
    founded: "1952",
    employees: "100+",
    featured: true,
    image: "/images/businesses/north-valley-hospital.jpg",
    services: ["Emergency Care", "Primary Care", "Laboratory Services", "Radiology", "Physical Therapy"],
    tags: ["healthcare", "emergency", "medical", "community"],
    socialMedia: {
      facebook: "https://www.facebook.com/NorthValleyHospital/",
      twitter: "https://twitter.com/NVHospital"
    },
    coordinates: {
      lat: 48.7039,
      lng: -119.4412
    }
  },
  {
    id: "b004",
    name: "Tonasket Brewing Company",
    description: "A local craft brewery offering a variety of handcrafted beers in a friendly taproom atmosphere. The brewery uses locally-sourced ingredients when possible and hosts community events.",
    category: "Food & Dining",
    subcategory: "Brewery",
    address: "515 Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2337",
    email: "info@tonasketbrewing.com",
    website: "https://www.tonasketbrewing.com",
    hours: "Wed-Sat: 3:00 PM - 9:00 PM, Sun: 12:00 PM - 6:00 PM",
    founded: "2015",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/tonasket-brewing.jpg",
    services: ["Craft Beer", "Taproom", "Events"],
    products: ["IPA", "Stout", "Lager", "Seasonal Brews"],
    tags: ["craft beer", "local", "taproom", "entertainment"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketBrewing/",
      instagram: "https://www.instagram.com/tonasketbrewing/"
    },
    coordinates: {
      lat: 48.7062,
      lng: -119.4401
    }
  },
  {
    id: "b005",
    name: "Okanogan Conservation District",
    description: "A non-regulatory agency that works with landowners to implement conservation practices. The district provides technical assistance, education, and cost-share programs for agricultural and natural resource conservation.",
    category: "Agriculture",
    subcategory: "Conservation",
    address: "1251 S 2nd Ave, Okanogan, WA 98840",
    phone: "(509) 422-0855",
    email: "info@okanogancd.org",
    website: "https://www.okanogancd.org",
    hours: "Mon-Fri: 8:00 AM - 4:30 PM",
    founded: "1940",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/conservation-district.jpg",
    services: ["Technical Assistance", "Conservation Planning", "Education", "Cost-Share Programs"],
    tags: ["conservation", "agriculture", "natural resources", "education"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganCD/",
      twitter: "https://twitter.com/OkanoganCD"
    },
    coordinates: {
      lat: 48.3615,
      lng: -119.5833
    }
  },
  {
    id: "b006",
    name: "Tonasket Community Cultural Center",
    description: "A community center that hosts cultural events, art exhibitions, and educational programs. The center serves as a gathering place for the community and promotes local arts and culture.",
    category: "Services",
    subcategory: "Community Center",
    address: "411 S Western Ave, Tonasket, WA 98855",
    phone: "(509) 486-1328",
    email: "info@communityculturalcenter.org",
    website: "https://www.communityculturalcenter.org",
    hours: "Tue-Sat: 10:00 AM - 5:00 PM",
    founded: "1995",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/cultural-center.jpg",
    services: ["Art Exhibitions", "Cultural Events", "Educational Programs", "Community Space"],
    tags: ["arts", "culture", "community", "education"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketCCC/",
      instagram: "https://www.instagram.com/tonasketccc/"
    },
    coordinates: {
      lat: 48.7025,
      lng: -119.4405
    }
  },
  {
    id: "b007",
    name: "Tonasket Hardware & Lumber",
    description: "A family-owned hardware store providing building materials, tools, and home improvement supplies. The store has served the Tonasket community for decades with personalized service and expertise.",
    category: "Retail",
    subcategory: "Hardware",
    address: "5 Tonasket Shop Rd, Tonasket, WA 98855",
    phone: "(509) 486-4532",
    email: "info@tonaskethardware.com",
    website: "https://www.tonaskethardware.com",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM, Sun: 10:00 AM - 4:00 PM",
    founded: "1972",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/hardware-store.jpg",
    services: ["Hardware", "Lumber", "Tools", "Home Improvement"],
    products: ["Building Materials", "Tools", "Plumbing Supplies", "Electrical Supplies"],
    tags: ["hardware", "lumber", "tools", "home improvement"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketHardware/"
    },
    coordinates: {
      lat: 48.7058,
      lng: -119.4423
    }
  },
  {
    id: "b008",
    name: "Okanogan Family Dental",
    description: "A comprehensive dental practice offering preventive, restorative, and cosmetic dental services. The practice focuses on family-friendly care and uses modern dental technology.",
    category: "Healthcare",
    subcategory: "Dental",
    address: "101 N Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2622",
    email: "info@okanogandental.com",
    website: "https://www.okanogandental.com",
    hours: "Mon-Thu: 8:00 AM - 5:00 PM, Fri: 8:00 AM - 12:00 PM",
    founded: "1998",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/dental-office.jpg",
    services: ["Preventive Dentistry", "Restorative Dentistry", "Cosmetic Dentistry", "Emergency Dental Care"],
    tags: ["dental", "healthcare", "family", "preventive"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganFamilyDental/"
    },
    coordinates: {
      lat: 48.7047,
      lng: -119.4398
    }
  },
  {
    id: "b009",
    name: "Tonasket Visitor Center",
    description: "The official visitor center for Tonasket, providing information about local attractions, events, and businesses. The center helps promote tourism and serves as a resource for visitors to the area.",
    category: "Services",
    subcategory: "Tourism",
    address: "215 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-4429",
    email: "info@tonasketvisitor.org",
    website: "https://www.tonasketvisitor.org",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM, Sat: 10:00 AM - 4:00 PM (Summer)",
    founded: "1985",
    employees: "1-5",
    featured: false,
    image: "/images/businesses/visitor-center.jpg",
    services: ["Visitor Information", "Local Maps", "Event Information", "Business Referrals"],
    tags: ["tourism", "information", "community", "events"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketVisitorCenter/"
    },
    coordinates: {
      lat: 48.7036,
      lng: -119.4392
    }
  },
  {
    id: "b010",
    name: "Okanogan Valley Transportation",
    description: "A local transportation service providing rides within Okanogan County. The service offers scheduled routes and on-demand transportation for residents and visitors.",
    category: "Services",
    subcategory: "Transportation",
    address: "310 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-5555",
    email: "info@okvalleytransport.com",
    website: "https://www.okvalleytransport.com",
    hours: "Mon-Fri: 7:00 AM - 6:00 PM",
    founded: "2005",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/transportation.jpg",
    services: ["Scheduled Routes", "On-Demand Transportation", "Airport Shuttles"],
    tags: ["transportation", "public transit", "shuttle", "community service"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkValleyTransport/"
    },
    coordinates: {
      lat: 48.7033,
      lng: -119.4397
    }
  },
  {
    id: "b011",
    name: "Tonasket Public Library",
    description: "The public library serving Tonasket and surrounding areas. The library offers books, digital resources, public computers, and community programs for all ages.",
    category: "Services",
    subcategory: "Library",
    address: "209 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2366",
    email: "info@tonasketlibrary.org",
    website: "https://www.tonasketlibrary.org",
    hours: "Tue-Sat: 10:00 AM - 6:00 PM",
    founded: "1945",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/library.jpg",
    services: ["Book Lending", "Digital Resources", "Public Computers", "Community Programs"],
    tags: ["library", "education", "community", "resources"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketLibrary/"
    },
    coordinates: {
      lat: 48.7038,
      lng: -119.4391
    }
  },
  {
    id: "b012",
    name: "Okanogan Valley Gazette-Tribune",
    description: "The local newspaper covering news and events in Tonasket and the Okanogan Valley. The paper has been serving the community for over a century with local news, features, and advertising.",
    category: "Services",
    subcategory: "Media",
    address: "39 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-0432",
    email: "info@gazette-tribune.com",
    website: "https://www.gazette-tribune.com",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM",
    founded: "1905",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/newspaper.jpg",
    services: ["Local News", "Advertising", "Community Information"],
    tags: ["news", "media", "community", "information"],
    socialMedia: {
      facebook: "https://www.facebook.com/GazetteTribune/",
      twitter: "https://twitter.com/GazetteTribune"
    },
    coordinates: {
      lat: 48.7044,
      lng: -119.4389
    }
  },
  {
    id: "b013",
    name: "Tonasket School District",
    description: "The public school district serving Tonasket and surrounding areas. The district includes elementary, middle, and high schools and is committed to providing quality education to all students.",
    category: "Services",
    subcategory: "Education",
    address: "35 HS Highway 20 E, Tonasket, WA 98855",
    phone: "(509) 486-2126",
    email: "info@tonasketsd.org",
    website: "https://www.tonasketsd.org",
    hours: "Mon-Fri: 7:30 AM - 4:00 PM (during school year)",
    founded: "1900",
    employees: "100+",
    featured: false,
    image: "/images/businesses/school-district.jpg",
    services: ["K-12 Education", "Special Education", "Athletics", "Extracurricular Activities"],
    tags: ["education", "schools", "community", "youth"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketSD/",
      twitter: "https://twitter.com/TonasketSD"
    },
    coordinates: {
      lat: 48.7067,
      lng: -119.4356
    }
  },
  {
    id: "b014",
    name: "Tonasket Riverside Park",
    description: "A public park along the Okanogan River offering recreational opportunities for residents and visitors. The park features walking trails, picnic areas, and river access.",
    category: "Services",
    subcategory: "Recreation",
    address: "15 Tonasket Park Rd, Tonasket, WA 98855",
    phone: "(509) 486-2132",
    email: "parks@tonasket.gov",
    website: "https://www.tonasket.gov/parks",
    hours: "Dawn to Dusk",
    founded: "1965",
    employees: "1-5",
    featured: false,
    image: "/images/businesses/riverside-park.jpg",
    services: ["Walking Trails", "Picnic Areas", "River Access", "Playground"],
    tags: ["recreation", "outdoors", "park", "river"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketParks/"
    },
    coordinates: {
      lat: 48.7075,
      lng: -119.4425
    }
  },
  {
    id: "b015",
    name: "Tonasket Community Garden",
    description: "A community garden providing space for residents to grow their own food. The garden promotes sustainable agriculture, food security, and community building.",
    category: "Agriculture",
    subcategory: "Community Garden",
    address: "400 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-1234",
    email: "info@tonasketgarden.org",
    website: "https://www.tonasketgarden.org",
    hours: "Dawn to Dusk (April-October)",
    founded: "2010",
    employees: "1-5",
    featured: false,
    image: "/images/businesses/community-garden.jpg",
    services: ["Garden Plots", "Gardening Education", "Seed Exchange", "Community Events"],
    tags: ["gardening", "community", "food", "sustainability"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketCommunityGarden/",
      instagram: "https://www.instagram.com/tonasketgarden/"
    },
    coordinates: {
      lat: 48.7028,
      lng: -119.4396
    }
  },
  {
    id: "b016",
    name: "Okanogan Valley Winery",
    description: "A boutique winery producing award-winning wines from locally grown grapes. The winery offers tastings, tours, and special events in a picturesque setting overlooking the Okanogan Valley.",
    category: "Food & Dining",
    subcategory: "Restaurant",
    address: "125 Orchard Rd, Tonasket, WA 98855",
    phone: "(509) 486-7788",
    email: "info@okanoganwinery.com",
    website: "https://www.okanoganwinery.com",
    hours: "Thu-Sun: 11:00 AM - 6:00 PM",
    founded: "2008",
    employees: "5-10",
    featured: true,
    image: "/images/businesses/winery.jpg",
    services: ["Wine Tastings", "Vineyard Tours", "Special Events", "Wine Club"],
    products: ["Red Wines", "White Wines", "Rosé", "Dessert Wines"],
    tags: ["wine", "vineyard", "local", "tourism"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyWinery/",
      instagram: "https://www.instagram.com/okanoganwinery/"
    },
    coordinates: {
      lat: 48.7112,
      lng: -119.4356
    }
  },
  {
    id: "b017",
    name: "Tonasket Outdoor Adventures",
    description: "An outdoor recreation company offering guided tours, equipment rentals, and outdoor education programs. The company specializes in hiking, fishing, and river activities in the Okanogan Valley.",
    category: "Services",
    subcategory: "Recreation",
    address: "512 Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-9090",
    email: "info@tonasketoutdoors.com",
    website: "https://www.tonasketoutdoors.com",
    hours: "Mon-Sat: 8:00 AM - 6:00 PM, Sun: 9:00 AM - 4:00 PM",
    founded: "2012",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/outdoor-adventures.jpg",
    services: ["Guided Tours", "Equipment Rentals", "Outdoor Education", "Custom Adventures"],
    products: ["Fishing Gear", "Camping Equipment", "Outdoor Apparel", "Maps & Guides"],
    tags: ["outdoor", "recreation", "adventure", "tourism"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketOutdoors/",
      instagram: "https://www.instagram.com/tonasketoutdoors/",
      twitter: "https://twitter.com/TonasketOutdoor"
    },
    coordinates: {
      lat: 48.7061,
      lng: -119.4399
    }
  },
  {
    id: "b018",
    name: "Okanogan Valley Veterinary Clinic",
    description: "A full-service veterinary clinic providing medical care for pets and livestock. The clinic offers preventive care, surgery, dental services, and emergency treatment for animals in the Tonasket area.",
    category: "Healthcare",
    subcategory: "Clinic",
    address: "723 E 4th St, Tonasket, WA 98855",
    phone: "(509) 486-2000",
    email: "info@okanoganvetclinic.com",
    website: "https://www.okanoganvetclinic.com",
    hours: "Mon-Fri: 8:00 AM - 5:30 PM, Sat: 9:00 AM - 1:00 PM",
    founded: "1985",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/vet-clinic.jpg",
    services: ["Preventive Care", "Surgery", "Dental Services", "Emergency Treatment", "Farm Calls"],
    tags: ["veterinary", "pets", "livestock", "animal care"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyVet/"
    },
    coordinates: {
      lat: 48.7057,
      lng: -119.4350
    }
  },
  {
    id: "b019",
    name: "Tonasket Bakery & Cafe",
    description: "A charming bakery and cafe offering fresh-baked goods, coffee, and light meals. The bakery specializes in artisan breads, pastries, and custom cakes using locally sourced ingredients when possible.",
    category: "Food & Dining",
    subcategory: "Bakery",
    address: "315 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-3300",
    email: "info@tonasketbakery.com",
    website: "https://www.tonasketbakery.com",
    hours: "Tue-Sat: 7:00 AM - 3:00 PM, Sun: 8:00 AM - 2:00 PM",
    founded: "2005",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/bakery.jpg",
    services: ["Bakery", "Cafe", "Custom Cakes", "Catering"],
    products: ["Artisan Breads", "Pastries", "Coffee & Tea", "Sandwiches & Soups"],
    tags: ["bakery", "cafe", "local", "fresh"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketBakery/",
      instagram: "https://www.instagram.com/tonasketbakery/"
    },
    coordinates: {
      lat: 48.7032,
      lng: -119.4392
    }
  },
  {
    id: "b020",
    name: "Okanogan Valley Bookstore",
    description: "An independent bookstore offering a curated selection of books, gifts, and stationery. The store hosts author events, book clubs, and community gatherings to promote literacy and local culture.",
    category: "Retail",
    subcategory: "Books",
    address: "118 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-4545",
    email: "info@okanoganbooks.com",
    website: "https://www.okanoganbooks.com",
    hours: "Mon-Sat: 10:00 AM - 6:00 PM, Sun: 12:00 PM - 4:00 PM",
    founded: "1998",
    employees: "1-5",
    featured: false,
    image: "/images/businesses/bookstore.jpg",
    services: ["Book Sales", "Special Orders", "Author Events", "Book Clubs"],
    products: ["Books", "Journals", "Cards", "Gifts"],
    tags: ["books", "reading", "community", "local"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyBooks/",
      instagram: "https://www.instagram.com/okanoganbooks/"
    },
    coordinates: {
      lat: 48.7041,
      lng: -119.4389
    }
  },
  {
    id: "b021",
    name: "Tonasket Family Pharmacy",
    description: "A locally owned pharmacy providing prescription medications, over-the-counter products, and personalized healthcare advice. The pharmacy offers medication management services, immunizations, and home delivery.",
    category: "Healthcare",
    subcategory: "Pharmacy",
    address: "16 N Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2149",
    email: "info@tonasketpharmacy.com",
    website: "https://www.tonasketpharmacy.com",
    hours: "Mon-Fri: 9:00 AM - 6:00 PM, Sat: 9:00 AM - 1:00 PM",
    founded: "1978",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/pharmacy.jpg",
    services: ["Prescription Filling", "Medication Management", "Immunizations", "Home Delivery"],
    products: ["Prescription Medications", "Over-the-Counter Products", "Medical Supplies", "Health & Beauty"],
    tags: ["pharmacy", "healthcare", "medications", "local"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketPharmacy/"
    },
    coordinates: {
      lat: 48.7046,
      lng: -119.4389
    }
  },
  {
    id: "b022",
    name: "Okanogan Valley Auto Repair",
    description: "A full-service auto repair shop specializing in domestic and foreign vehicle maintenance and repair. The shop offers diagnostics, repairs, and preventive maintenance with certified technicians.",
    category: "Services",
    subcategory: "Automotive",
    address: "732 E 4th St, Tonasket, WA 98855",
    phone: "(509) 486-3232",
    email: "info@okanoganvalleyauto.com",
    website: "https://www.okanoganvalleyauto.com",
    hours: "Mon-Fri: 8:00 AM - 5:30 PM",
    founded: "1992",
    employees: "5-10",
    featured: false,
    image: "/images/businesses/auto-repair.jpg",
    services: ["Diagnostics", "Repairs", "Preventive Maintenance", "Tire Services"],
    tags: ["automotive", "repairs", "maintenance", "local"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyAuto/"
    },
    coordinates: {
      lat: 48.7057,
      lng: -119.4345
    }
  },
  {
    id: "b023",
    name: "Tonasket Farmers Supply",
    description: "A comprehensive agricultural supply store serving farmers, ranchers, and gardeners in the Okanogan Valley. The store offers seeds, fertilizers, equipment, and expert advice for agricultural operations of all sizes.",
    category: "Agriculture",
    subcategory: "Farm",
    address: "626 Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2127",
    email: "info@tonasketfarmerssupply.com",
    website: "https://www.tonasketfarmerssupply.com",
    hours: "Mon-Sat: 8:00 AM - 5:30 PM, Sun: 10:00 AM - 3:00 PM",
    founded: "1962",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/farmers-supply.jpg",
    services: ["Agricultural Supplies", "Equipment Sales", "Consulting", "Delivery"],
    products: ["Seeds", "Fertilizers", "Farm Equipment", "Irrigation Supplies"],
    tags: ["agriculture", "farming", "supplies", "local"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketFarmersSupply/"
    },
    coordinates: {
      lat: 48.7068,
      lng: -119.4402
    }
  },
  {
    id: "b024",
    name: "Okanogan Valley Credit Union",
    description: "A member-owned financial cooperative providing banking services to the Tonasket community. The credit union offers checking and savings accounts, loans, and financial education with a focus on local needs.",
    category: "Services",
    subcategory: "Financial",
    address: "307 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2711",
    email: "info@okanogancu.org",
    website: "https://www.okanogancu.org",
    hours: "Mon-Fri: 9:00 AM - 5:00 PM, Sat: 9:00 AM - 12:00 PM",
    founded: "1954",
    employees: "10-20",
    featured: false,
    image: "/images/businesses/credit-union.jpg",
    services: ["Checking Accounts", "Savings Accounts", "Loans", "Financial Education"],
    tags: ["banking", "financial", "community", "local"],
    socialMedia: {
      facebook: "https://www.facebook.com/OkanoganValleyCU/"
    },
    coordinates: {
      lat: 48.7033,
      lng: -119.4392
    }
  },
  {
    id: "b025",
    name: "Tonasket Thrift Store",
    description: "A community thrift store offering gently used clothing, furniture, and household items at affordable prices. The store supports local charitable initiatives and promotes sustainable consumption.",
    category: "Retail",
    subcategory: "Clothing",
    address: "210 S Whitcomb Ave, Tonasket, WA 98855",
    phone: "(509) 486-2611",
    email: "info@tonasketthrift.org",
    website: "https://www.tonasketthrift.org",
    hours: "Tue-Sat: 10:00 AM - 4:00 PM",
    founded: "1995",
    employees: "1-5",
    featured: false,
    image: "/images/businesses/thrift-store.jpg",
    services: ["Clothing Sales", "Furniture Sales", "Household Items", "Donations"],
    tags: ["thrift", "secondhand", "community", "affordable"],
    socialMedia: {
      facebook: "https://www.facebook.com/TonasketThrift/"
    },
    coordinates: {
      lat: 48.7037,
      lng: -119.4391
    }
  }
];

export const categories = [
  "All Categories",
  "Retail",
  "Food & Dining",
  "Services",
  "Agriculture",
  "Healthcare"
];

export const subcategories = {
  "Retail": ["Hardware", "Clothing", "Gifts", "Books", "Home Goods", "Specialty"],
  "Food & Dining": ["Restaurant", "Cafe", "Bakery", "Brewery", "Grocery", "Winery"],
  "Services": ["Community Center", "Tourism", "Transportation", "Library", "Media", "Education", "Recreation", "Financial", "Automotive", "Professional"],
  "Agriculture": ["Farmers Market", "Farm", "Orchard", "Conservation", "Community Garden", "Agricultural Supplies"],
  "Healthcare": ["Hospital", "Clinic", "Dental", "Pharmacy", "Mental Health", "Veterinary"]
};
