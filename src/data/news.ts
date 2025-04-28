export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  content?: string;
  source: string;
  sourceUrl: string;
  imageUrl?: string;
  publishedAt: string;
  category: string;
  author?: string;
  tags?: string[];
  featured: boolean;
}

export interface NewsSource {
  id: string;
  name: string;
  url: string;
  type: 'local' | 'regional' | 'state' | 'national';
  description: string;
  logo?: string;
}

export const newsCategories = [
  'Local News',
  'Business',
  'Agriculture',
  'Community',
  'Education',
  'Government',
  'Health',
  'Environment',
  'Events',
  'Sports'
];

export const newsSources: NewsSource[] = [
  {
    id: 'omak-chronicle',
    name: 'Omak Chronicle',
    url: 'https://www.omakchronicle.com/',
    type: 'local',
    description: 'Local newspaper covering Okanogan County news and events.',
    logo: '/images/news/omak-chronicle-logo.png'
  },
  {
    id: 'okanogan-valley-gazette',
    name: 'Okanogan Valley Gazette-Tribune',
    url: 'https://www.gazette-tribune.com/',
    type: 'local',
    description: 'Local newspaper serving the Okanogan Valley since 1905.',
    logo: '/images/news/gazette-tribune-logo.png'
  },
  {
    id: 'wenatchee-world',
    name: 'Wenatchee World',
    url: 'https://www.wenatcheeworld.com/',
    type: 'regional',
    description: 'Regional newspaper covering North Central Washington.',
    logo: '/images/news/wenatchee-world-logo.png'
  },
  {
    id: 'spokesman-review',
    name: 'The Spokesman-Review',
    url: 'https://www.spokesman.com/',
    type: 'regional',
    description: 'Regional newspaper covering Eastern Washington and North Idaho.',
    logo: '/images/news/spokesman-review-logo.png'
  },
  {
    id: 'seattle-times',
    name: 'The Seattle Times',
    url: 'https://www.seattletimes.com/',
    type: 'state',
    description: 'Major newspaper covering Washington state news.',
    logo: '/images/news/seattle-times-logo.png'
  }
];

// Sample news articles
export const newsArticles: NewsArticle[] = [
  {
    id: 'n001',
    title: 'Tonasket Farmers Market Celebrates Record Season',
    summary: 'The Tonasket Farmers Market reported record attendance and sales this season, with over 40 vendors participating throughout the summer.',
    content: `The Tonasket Farmers Market has concluded its most successful season to date, according to market organizers. With over 40 vendors participating throughout the summer months, the market saw record attendance and sales.

"We're thrilled with the community support this year," said Market Manager Sarah Johnson. "More people are recognizing the value of locally grown food and handmade products."

The market, which runs from May through October, features a variety of local produce, meats, baked goods, and crafts. This year, several new vendors joined, including three young entrepreneurs under the age of 18 who participated in the market's youth vendor program.

Local farmer Tom Martinez, who has been selling at the market for over a decade, noted the increase in customers. "I've seen more new faces this year than ever before. People are really interested in where their food comes from and how it's grown."

The market's success comes as more consumers seek out locally produced goods and direct connections with farmers. According to a recent survey, 78% of market customers cited supporting local agriculture as their primary reason for shopping at the farmers market.

Market organizers are already planning for next season, with potential expansions including extended hours and additional special event days.`,
    source: 'Okanogan Valley Gazette-Tribune',
    sourceUrl: 'https://www.gazette-tribune.com/local-news/tonasket-farmers-market-celebrates-record-season',
    imageUrl: '/images/news/farmers-market.jpg',
    publishedAt: '2025-04-22T14:30:00Z',
    category: 'Local News',
    author: 'Jane Smith',
    tags: ['farmers market', 'local food', 'agriculture', 'community'],
    featured: true
  },
  {
    id: 'n002',
    title: 'New Healthcare Facility Breaks Ground in Tonasket',
    summary: 'Construction has begun on a new healthcare facility in Tonasket that will expand medical services available to residents of northern Okanogan County.',
    content: `Construction officially began this week on a new healthcare facility in Tonasket that promises to expand medical services available to residents of northern Okanogan County.

The 15,000-square-foot facility, located on Whitcomb Avenue, will house primary care services, specialty care clinics, mental health services, and a pharmacy. The project represents a $12 million investment in the community's healthcare infrastructure.

"This facility will address a critical need in our community," said Dr. Maria Rodriguez, Chief Medical Officer at North Valley Hospital. "Many residents currently have to travel long distances for certain types of care, and this new center will make healthcare more accessible."

The project is a collaboration between North Valley Hospital and several healthcare partners, with additional funding from state and federal rural healthcare grants. Construction is expected to take approximately 18 months, with the facility scheduled to open in late 2026.

County Commissioner Robert Thompson called the groundbreaking "a milestone for healthcare access in our rural community" and noted that the facility is expected to create 30 new healthcare jobs.

Community members at the groundbreaking ceremony expressed enthusiasm about the project. "Having more healthcare options close to home will make a huge difference for many families here," said longtime resident Eleanor Watkins.

The facility will also include telehealth capabilities to connect patients with specialists at larger medical centers in Spokane and Seattle.`,
    source: 'Omak Chronicle',
    sourceUrl: 'https://www.omakchronicle.com/news/new-healthcare-facility-breaks-ground-in-tonasket',
    imageUrl: '/images/news/healthcare-facility.jpg',
    publishedAt: '2025-04-20T09:15:00Z',
    category: 'Health',
    author: 'Michael Johnson',
    tags: ['healthcare', 'construction', 'community development', 'rural healthcare'],
    featured: true
  },
  {
    id: 'n003',
    title: 'Local Orchard Wins State Award for Sustainable Practices',
    summary: 'River Valley Orchards of Tonasket has been recognized with a state award for their innovative sustainable farming practices and water conservation efforts.',
    content: `River Valley Orchards, a family-owned operation just outside Tonasket, has been recognized with the Washington State Agricultural Sustainability Award for their innovative farming practices and water conservation efforts.

The orchard, which grows apples, pears, and cherries on 200 acres, has implemented several sustainable practices over the past five years, including a precision irrigation system that has reduced water usage by 40% while maintaining crop yields.

"We're honored to receive this recognition," said orchard owner David Chen. "Sustainability isn't just good for the environment—it's essential for the long-term viability of our business and the agricultural industry in our region."

The award committee specifically cited River Valley's soil health program, which incorporates cover crops and reduced tillage to improve soil structure and carbon sequestration. The orchard has also installed solar panels that provide approximately 30% of their electricity needs.

Washington State Department of Agriculture Director Lisa Martinez presented the award at a ceremony in Olympia last week. "River Valley Orchards exemplifies how innovation and conservation can go hand in hand with productive agriculture," Martinez said.

The orchard hosts regular tours and educational events for other growers interested in adopting similar practices. According to Chen, several neighboring orchards have already implemented some of the same water conservation techniques after seeing their success.

The award includes a $10,000 grant, which Chen plans to use to further expand the orchard's renewable energy capacity.`,
    source: 'Wenatchee World',
    sourceUrl: 'https://www.wenatcheeworld.com/news/local-orchard-wins-state-award-for-sustainable-practices',
    imageUrl: '/images/news/orchard.jpg',
    publishedAt: '2025-04-18T11:45:00Z',
    category: 'Agriculture',
    author: 'Emily Rodriguez',
    tags: ['agriculture', 'sustainability', 'awards', 'water conservation'],
    featured: false
  },
  {
    id: 'n004',
    title: 'Tonasket School District Launches New STEM Program',
    summary: 'Tonasket School District has launched a new STEM program for middle and high school students, thanks to a grant from the Washington STEM Education Foundation.',
    content: `The Tonasket School District has launched a comprehensive new STEM (Science, Technology, Engineering, and Mathematics) program for middle and high school students, funded by a $250,000 grant from the Washington STEM Education Foundation.

The program, which began this semester, includes new curriculum materials, teacher training, and state-of-the-art equipment for hands-on learning experiences. Students will have access to 3D printers, robotics kits, and a variety of engineering and design software.

"This program opens up incredible opportunities for our students," said Tonasket High School Principal James Wilson. "We're preparing them for the jobs of the future and fostering critical thinking skills that will benefit them regardless of their career path."

The grant will fund the program for three years, with the district developing a sustainability plan to continue the initiative beyond the grant period. The curriculum includes project-based learning experiences that connect students with local industries and real-world applications of STEM concepts.

Local technology professional and parent Sarah Nguyen, who served on the grant committee, emphasized the importance of STEM education in rural communities. "Our students deserve the same opportunities as those in larger districts. This program helps level the playing field and could inspire the next generation of scientists and engineers from our community."

The district is also partnering with local businesses to provide internship opportunities for high school students interested in STEM careers. Several companies, including North Valley Hospital and River Valley Orchards, have already committed to hosting student interns.

A community open house is planned for next month to showcase the new equipment and student projects.`,
    source: 'Okanogan Valley Gazette-Tribune',
    sourceUrl: 'https://www.gazette-tribune.com/education/tonasket-school-district-launches-new-stem-program',
    imageUrl: '/images/news/stem-program.jpg',
    publishedAt: '2025-04-15T16:20:00Z',
    category: 'Education',
    author: 'Robert Williams',
    tags: ['education', 'STEM', 'schools', 'grants'],
    featured: false
  },
  {
    id: 'n005',
    title: 'Tonasket City Council Approves Downtown Revitalization Plan',
    summary: 'The Tonasket City Council has unanimously approved a downtown revitalization plan that includes infrastructure improvements, facade grants, and public space enhancements.',
    content: `The Tonasket City Council has unanimously approved a comprehensive downtown revitalization plan that aims to enhance the city's core business district over the next three years. The plan includes infrastructure improvements, a facade grant program for business owners, and several public space enhancements.

"This is an investment in the future of our community," said Mayor Linda Thompson at Tuesday's council meeting. "A vibrant downtown is essential for economic development and quality of life in Tonasket."

The $1.2 million plan will be funded through a combination of city reserves, a state community development grant, and a recently approved 0.1% sales tax increase dedicated to economic development. The first phase of the project, scheduled to begin this summer, includes sidewalk repairs, improved street lighting, and the installation of new benches and planters along Whitcomb Avenue.

The facade improvement program will offer matching grants of up to $10,000 to business owners who upgrade their storefronts according to design guidelines developed with community input. City officials hope this will encourage private investment to complement the public improvements.

Local business owner Carlos Mendez expressed support for the plan during the public comment period. "This is exactly what our downtown needs. These improvements will help attract more customers and new businesses to the area."

The plan also includes the creation of a small public plaza with seating and a performance area at the corner of 3rd Street and Whitcomb Avenue, on a currently vacant lot owned by the city.

A citizen advisory committee will be formed to oversee implementation of the plan and ensure community input continues throughout the process.`,
    source: 'Omak Chronicle',
    sourceUrl: 'https://www.omakchronicle.com/news/tonasket-city-council-approves-downtown-revitalization-plan',
    imageUrl: '/images/news/downtown.jpg',
    publishedAt: '2025-04-12T10:30:00Z',
    category: 'Government',
    author: 'Thomas Lee',
    tags: ['city council', 'downtown', 'economic development', 'infrastructure'],
    featured: false
  },
  {
    id: 'n006',
    title: "Local Artist's Work Selected for National Exhibition",
    summary: 'Tonasket-based artist Maria Gonzalez has had her work selected for inclusion in a prestigious national exhibition at the Smithsonian American Art Museum.',
    content: `Tonasket-based artist Maria Gonzalez has achieved a significant milestone in her career with the selection of her work for inclusion in the prestigious "American Landscapes: New Perspectives" exhibition at the Smithsonian American Art Museum in Washington, D.C.

Gonzalez, who has lived and worked in the Okanogan Valley for over 15 years, is one of only 45 artists nationwide chosen for the exhibition, which opens in September. Her large-scale mixed media piece "Okanogan Seasons" depicts the changing landscape of the valley throughout the year.

"I'm still in shock," Gonzalez said in an interview at her studio outside Tonasket. "To have my work recognized at this level is beyond anything I could have imagined when I started my artistic journey."

Gonzalez's work is known for incorporating natural materials from the local environment, including soil, plant matter, and minerals, to create textured landscapes that reflect the unique character of the Okanogan Valley. Her selected piece took over eight months to complete and measures six feet by four feet.

The exhibition's curator, Dr. James Wilson, described Gonzalez's work as "a powerful representation of the American rural landscape that challenges viewers to consider the relationship between human communities and the natural world."

Before moving to Tonasket, Gonzalez studied at the School of the Art Institute of Chicago and worked as a commercial artist in Seattle. She credits the Okanogan Valley's natural beauty and supportive arts community for inspiring her current artistic direction.

Local arts advocate and Tonasket Community Cultural Center director Susan Martinez expressed pride in Gonzalez's achievement. "Maria's recognition brings attention not just to her incredible talent, but to the vibrant arts community we have here in the Okanogan Valley."

Gonzalez will attend the exhibition opening in Washington, D.C., and participate in a panel discussion with other featured artists. The exhibition will run for six months before touring to three other museums across the country.`,
    source: 'Wenatchee World',
    sourceUrl: 'https://www.wenatcheeworld.com/arts/local-artists-work-selected-for-national-exhibition',
    imageUrl: '/images/news/artist.jpg',
    publishedAt: '2025-04-10T14:45:00Z',
    category: 'Community',
    author: 'Patricia Chen',
    tags: ['art', 'culture', 'local artist', 'exhibition'],
    featured: false
  },
  {
    id: 'n007',
    title: 'Drought Conditions Prompt Water Conservation Measures',
    summary: 'Local officials have implemented voluntary water conservation measures in response to worsening drought conditions across Okanogan County.',
    content: `Local officials have implemented voluntary water conservation measures in response to worsening drought conditions across Okanogan County. The measures come after the latest U.S. Drought Monitor report classified the county as experiencing "severe drought" conditions.

The Okanogan Conservation District, in partnership with the City of Tonasket and other municipalities, has launched a public awareness campaign encouraging residents and businesses to reduce water usage by at least 10 percent.

"While we're not at the point of mandatory restrictions, we need everyone to be mindful of their water use," said Okanogan Conservation District Manager Jennifer Martinez. "Small changes can make a big difference when we're all working together."

Recommended conservation measures include limiting lawn watering to early morning or evening hours, fixing leaky faucets and irrigation systems, and installing water-efficient fixtures. The Conservation District is offering free water conservation kits to residents, which include low-flow showerheads, faucet aerators, and leak detection tablets.

For agricultural users, who account for the majority of water consumption in the county, the Conservation District is providing technical assistance to improve irrigation efficiency and implement drought-resistant farming practices.

Local farmer Miguel Sanchez has already implemented several water-saving techniques on his 40-acre vegetable farm. "We've switched to drip irrigation and added mulch to reduce evaporation," Sanchez said. "It's not just about getting through this drought—it's about being prepared for a future where water may be less reliable."

The current drought conditions follow two consecutive winters with below-average snowpack in the mountains that feed the Okanogan River watershed. According to climate scientists, such conditions may become more common due to climate change.

City officials will reassess the situation in mid-June and may implement mandatory restrictions if conditions worsen or if voluntary measures don't achieve the desired reduction in water usage.`,
    source: 'Okanogan Valley Gazette-Tribune',
    sourceUrl: 'https://www.gazette-tribune.com/news/drought-conditions-prompt-water-conservation-measures',
    imageUrl: '/images/news/drought.jpg',
    publishedAt: '2025-04-08T09:10:00Z',
    category: 'Environment',
    author: 'Daniel Thompson',
    tags: ['drought', 'water conservation', 'climate', 'agriculture'],
    featured: false
  },
  {
    id: 'n008',
    title: 'Annual Cherry Festival Returns to Tonasket This Weekend',
    summary: 'The popular Tonasket Cherry Festival returns this weekend with live music, a parade, cherry-themed contests, and activities for all ages.',
    content: `The popular Tonasket Cherry Festival returns this weekend, celebrating the region's cherry harvest with three days of events and activities for all ages. Now in its 37th year, the festival will take place from Friday through Sunday in downtown Tonasket.

"We're excited to bring the community together for this beloved tradition," said Festival Coordinator Lisa Johnson. "The cherry harvest is an important part of our agricultural heritage, and this is a wonderful way to celebrate it."

The festival kicks off Friday evening with a street dance featuring live music from local band The Orchard Pickers. Saturday's highlights include the Grand Parade down Whitcomb Avenue at 11 a.m., followed by the cherry pie eating contest in History Park. Sunday will feature a community breakfast, cherry pit spitting contest, and an artisan market showcasing local crafts and products.

Throughout the weekend, attendees can enjoy cherry-themed food and beverages from local vendors, carnival rides for children, and orchard tours to learn about cherry production in the Okanogan Valley.

Local cherry grower James Wilson noted that despite challenging weather conditions earlier in the season, this year's cherry crop is expected to be excellent. "We're looking at good quality and quantity this year, which gives us even more reason to celebrate," Wilson said.

The festival typically draws visitors from across Washington and neighboring states, providing an economic boost to local businesses. According to the Chamber of Commerce, last year's festival brought approximately 5,000 visitors to Tonasket over the three-day period.

New to this year's festival is a sustainability initiative that includes compostable food service items, water refill stations to reduce plastic bottle usage, and a bicycle valet service to encourage car-free transportation.

A complete schedule of events is available on the festival's website and at the Tonasket Visitor Center.`,
    source: 'Omak Chronicle',
    sourceUrl: 'https://www.omakchronicle.com/events/annual-cherry-festival-returns-to-tonasket-this-weekend',
    imageUrl: '/images/news/cherry-festival.jpg',
    publishedAt: '2025-04-05T15:30:00Z',
    category: 'Events',
    author: 'Sarah Johnson',
    tags: ['festival', 'community events', 'cherry harvest', 'agriculture'],
    featured: false
  },
  {
    id: 'n009',
    title: 'Tonasket High School Basketball Team Advances to State Tournament',
    summary: 'The Tonasket Tigers basketball team has qualified for the state tournament for the first time in 12 years after a decisive victory in the regional finals.',
    content: `The Tonasket Tigers basketball team has qualified for the state tournament for the first time in 12 years after a decisive 68-54 victory over Liberty Bell in the regional finals last Saturday. The team will now advance to the 2B State Tournament in Spokane next week.

"These kids have worked incredibly hard all season," said head coach Marcus Rodriguez. "They've overcome adversity and really come together as a team. I couldn't be prouder of what they've accomplished."

The Tigers, who finished the regular season with a 18-4 record, were led by senior point guard Jason Martinez, who scored 22 points in the regional final. Junior center David Thompson contributed 15 points and 12 rebounds, while sophomore guard Elijah Wilson added 14 points, including four three-pointers.

"It feels amazing to bring Tonasket back to the state tournament," said Martinez after the game. "We've been working toward this goal since we were in middle school, and to finally achieve it in my senior year is just incredible."

The team's success has energized the community, with local businesses displaying "Go Tigers" signs and the high school hosting a pep rally on Thursday before the team departs for Spokane. A community fundraiser has already collected over $5,000 to help with travel expenses and to ensure that students and families can attend the tournament.

Tonasket High School Principal Susan Chen noted that the team's success extends beyond the basketball court. "These student-athletes are also excelling academically. They're great representatives of our school and community."

The Tigers will face defending state champion Brewster in their first-round game on Wednesday at 3:45 p.m. at the Spokane Arena. A community viewing party is being organized at the Tonasket High School gymnasium for those unable to make the trip to Spokane.

The team will depart with a police and fire department escort on Wednesday morning, with community members encouraged to line Whitcomb Avenue to show their support.`,
    source: 'Okanogan Valley Gazette-Tribune',
    sourceUrl: 'https://www.gazette-tribune.com/sports/tonasket-high-school-basketball-team-advances-to-state-tournament',
    imageUrl: '/images/news/basketball-team.jpg',
    publishedAt: '2025-04-02T18:15:00Z',
    category: 'Sports',
    author: 'Michael Thompson',
    tags: ['sports', 'basketball', 'high school', 'state tournament'],
    featured: false
  },
  {
    id: 'n010',
    title: 'New Study Highlights Economic Impact of Agriculture in Okanogan County',
    summary: 'A new economic impact study shows that agriculture contributes over $450 million annually to the Okanogan County economy and supports more than 3,000 jobs.',
    content: `A new economic impact study released by Washington State University Extension shows that agriculture contributes over $450 million annually to the Okanogan County economy and supports more than 3,000 jobs, highlighting the sector's critical importance to the region.

The comprehensive study, which analyzed data from 2023 and 2024, found that agriculture accounts for approximately 27% of the county's total economic output and 22% of all employment. When including indirect and induced economic effects, the total impact rises to nearly $600 million.

"This study confirms what many of us already knew—agriculture is the backbone of our local economy," said Okanogan County Commissioner Maria Rodriguez. "These numbers help us make informed decisions about policies and investments that support this vital industry."

Tree fruits, including apples, cherries, and pears, remain the largest agricultural sector in the county, accounting for 65% of total agricultural revenue. Cattle ranching, hay production, and an expanding wine grape industry make up most of the remainder.

The study also highlighted the growing importance of value-added agricultural businesses, such as packing facilities, cideries, and direct-to-consumer operations, which have increased by 18% over the past five years.

Dr. James Wilson, the WSU agricultural economist who led the research, noted several challenges facing the industry despite its strong economic performance. "Labor shortages, water availability, and climate change impacts are significant concerns for producers," Wilson said. "Addressing these challenges will be crucial for maintaining agriculture's economic contribution to the county."

Local farmer Sarah Thompson, who operates a 200-acre orchard near Tonasket, said the study validates the importance of continued investment in agricultural infrastructure. "We need ongoing support for irrigation systems, research, and workforce development to keep this industry strong," Thompson said.

The Okanogan Conservation District plans to use the study's findings to inform its upcoming five-year strategic plan and to advocate for additional resources to support sustainable agricultural practices in the region.

The full study is available on the WSU Extension website and at the Okanogan County Economic Alliance office in Omak.`,
    source: 'Wenatchee World',
    sourceUrl: 'https://www.wenatcheeworld.com/news/new-study-highlights-economic-impact-of-agriculture-in-okanogan-county',
    imageUrl: '/images/news/agriculture-study.jpg',
    publishedAt: '2025-03-30T11:20:00Z',
    category: 'Business',
    author: 'Jennifer Martinez',
    tags: ['agriculture', 'economy', 'research', 'jobs'],
    featured: false
  }
];
