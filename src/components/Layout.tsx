import React from 'react';
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-blue-800">
              Tonasket Wiki
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/economic-data" className="text-gray-600 hover:text-blue-800">
                Economic Data
              </Link>
              <Link href="/businesses" className="text-gray-600 hover:text-blue-800">
                Businesses
              </Link>
              <Link href="/trade-impact" className="text-gray-600 hover:text-blue-800">
                Trade Impact
              </Link>
              <Link href="/news" className="text-gray-600 hover:text-blue-800">
                News
              </Link>
              <Link href="/weather" className="text-gray-600 hover:text-blue-800">
                Weather
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-800">
                About
              </Link>
            </nav>
            
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600 focus:outline-none">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-grow">
        {children}
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
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
};

export default Layout;
