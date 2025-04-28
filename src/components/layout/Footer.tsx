import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
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
              <li><Link href="/research" className="text-gray-400 hover:text-white">Research</Link></li>
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
  );
}
