'use client';

import React from 'react';
import Link from 'next/link';

export default function TestAdminPage() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard Test Page</h1>
      <p className="mb-4">This is a simplified test page to check if the admin dashboard works.</p>
      
      <div className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2">Navigation</h2>
        <ul className="space-y-2">
          <li>
            <Link href="/admin" className="text-blue-600 hover:underline">
              Dashboard
            </Link>
          </li>
          <li>
            <Link href="/admin/businesses" className="text-blue-600 hover:underline">
              Businesses
            </Link>
          </li>
          <li>
            <Link href="/admin/settings" className="text-blue-600 hover:underline">
              Settings
            </Link>
          </li>
          <li>
            <Link href="/" className="text-blue-600 hover:underline">
              Back to Home
            </Link>
          </li>
        </ul>
      </div>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2">Status</h2>
        <p>If you can see this page, the basic admin routing is working correctly.</p>
      </div>
    </div>
  );
}
