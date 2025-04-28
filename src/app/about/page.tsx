import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-800 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">About Tonasket Resource Wiki</h1>
          <p className="text-xl max-w-3xl">
            Learn about our mission to provide comprehensive information about Tonasket and Okanogan County.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Mission Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Mission</h2>
          <p className="text-gray-600 mb-4">
            The Tonasket Resource Wiki was created to serve as a comprehensive information hub for residents, 
            businesses, and visitors of Tonasket and Okanogan County. Our mission is to aggregate and present 
            valuable data about the region&apos;s economy, businesses, trade impacts, news, and weather in an 
            accessible and user-friendly format.
          </p>
          <p className="text-gray-600">
            We believe that access to accurate, up-to-date information is essential for community development, 
            informed decision-making, and fostering economic growth. By centralizing diverse data sources, 
            we aim to support local businesses, inform policy discussions, and highlight the unique 
            characteristics and opportunities of our region.
          </p>
        </div>
        
        {/* What We Offer Section */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">What We Offer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Economic Data</h3>
              <p className="text-gray-600">
                Comprehensive economic statistics, employment data, and growth indicators for Tonasket and Okanogan County.
                We gather data from reliable sources and present it in an easy-to-understand format.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Business Directory</h3>
              <p className="text-gray-600">
                A comprehensive directory of local businesses, services, and opportunities in the Tonasket area.
                We help connect customers with local businesses and promote economic activity within our community.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Trade Impact Analysis</h3>
              <p className="text-gray-600">
                Analysis of trade policies and their impact on the local economy, including tariffs on Canada.
                We provide insights into how national and international trade policies affect our local businesses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Local News</h3>
              <p className="text-gray-600">
                Stay informed with the latest news and updates from Tonasket and Okanogan County.
                We aggregate news from various sources to keep you informed about what&apos;s happening in our community.
              </p>
            </div>
          </div>
        </div>
        
        {/* Data Sources Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Our Data Sources</h2>
          <p className="text-gray-600 mb-6">
            We gather information from a variety of reliable sources to ensure the accuracy and comprehensiveness of our data:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Government Sources</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>U.S. Census Bureau</li>
                <li>Bureau of Labor Statistics</li>
                <li>Washington State Department of Commerce</li>
                <li>Okanogan County Government</li>
                <li>City of Tonasket</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Other Sources</h3>
              <ul className="list-disc pl-5 space-y-1 text-gray-600">
                <li>Local news outlets</li>
                <li>Chamber of Commerce</li>
                <li>Economic development organizations</li>
                <li>National Weather Service</li>
                <li>Local business associations</li>
              </ul>
            </div>
          </div>
        </div>
        
        {/* Contact Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Contact Us</h2>
          <p className="text-gray-600 mb-6">
            We welcome your feedback, suggestions, and contributions to help improve the Tonasket Resource Wiki.
            If you have information to share, questions about our data, or ideas for new features, please get in touch.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-lg mb-2">Get in Touch</h3>
              <p className="text-gray-600 mb-4">
                Use our contact form to send us a message, and we&apos;ll get back to you as soon as possible.
              </p>
              <Link href="/contact" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Contact Form
              </Link>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Contribute</h3>
              <p className="text-gray-600 mb-4">
                Interested in contributing data, articles, or expertise to the Tonasket Resource Wiki?
                We welcome community contributions to help make this resource even more valuable.
              </p>
              <Link href="/contribute" className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Learn How to Contribute
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
