import Image from "next/image";
import Link from "next/link";
import WeatherWidget from "@/components/weather/WeatherWidget";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-800 to-blue-600 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Tonasket Resource Wiki</h1>
            <p className="text-xl md:text-2xl mb-8">
              Your comprehensive guide to Tonasket and Okanogan County resources,
              economic data, businesses, news, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/economic-data"
                className="bg-white text-blue-800 hover:bg-blue-100 px-6 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Explore Data
              </Link>
              <Link
                href="/about"
                className="bg-transparent border-2 border-white hover:bg-white/10 px-6 py-3 rounded-lg font-medium text-lg transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover What We Offer</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Economic Data */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Economic Data</h3>
              <p className="text-black mb-4">
                Comprehensive economic statistics, employment data, and growth indicators for Tonasket and Okanogan County.
              </p>
              <Link href="/economic-data" className="text-blue-600 hover:text-blue-800 font-medium">
                View Economic Data →
              </Link>
            </div>

            {/* Business Directory */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Directory</h3>
              <p className="text-black mb-4">
                Explore local businesses, services, and opportunities in the Tonasket area.
              </p>
              <Link href="/businesses" className="text-blue-600 hover:text-blue-800 font-medium">
                Browse Businesses →
              </Link>
            </div>

            {/* Trade Impact */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade Impact Analysis</h3>
              <p className="text-black mb-4">
                Analysis of trade policies and their impact on local economy, including tariffs on Canada.
              </p>
              <Link href="/trade-impact" className="text-blue-600 hover:text-blue-800 font-medium">
                Explore Trade Impact →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* News & Weather Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* News */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
                Latest News
              </h2>
              <div className="space-y-4">
                <p className="text-black">Loading latest news...</p>
                <Link href="/news" className="inline-block text-blue-600 hover:text-blue-800 font-medium mt-4">
                  View All News →
                </Link>
              </div>
            </div>

            {/* Weather */}
            <div>
              <h2 className="text-2xl font-bold mb-6 flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
                Weather Forecast
              </h2>
              <div>
                <WeatherWidget className="mb-4" />
                <div className="mt-2">
                  <Link href="/weather" className="inline-block text-blue-600 hover:text-blue-800 font-medium">
                    View Full Forecast →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">Tonasket Resource Wiki</h3>
              <p className="text-gray-400">
                Your comprehensive guide to Tonasket and Okanogan County.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="text-gray-400 hover:text-white">Home</Link></li>
                <li><Link href="/economic-data" className="text-gray-400 hover:text-white">Economic Data</Link></li>
                <li><Link href="/businesses" className="text-gray-400 hover:text-white">Businesses</Link></li>
                <li><Link href="/trade-impact" className="text-gray-400 hover:text-white">Trade Impact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><Link href="/news" className="text-gray-400 hover:text-white">News</Link></li>
                <li><Link href="/weather" className="text-gray-400 hover:text-white">Weather</Link></li>
                <li><Link href="/about" className="text-gray-400 hover:text-white">About</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact</h3>
              <p className="text-gray-400">
                Have questions or suggestions? Reach out to us.
              </p>
              <Link href="/contact" className="inline-block mt-2 text-blue-400 hover:text-blue-300">
                Contact Us
              </Link>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Tonasket Resource Wiki. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
