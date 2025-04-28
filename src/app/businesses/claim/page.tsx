'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ClaimBusinessPage() {
  // Form state
  const [businessName, setBusinessName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [verificationMethod, setVerificationMethod] = useState('email');
  const [proofDescription, setProofDescription] = useState('');
  
  // Form validation state
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Form submission state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const newErrors: Record<string, string> = {};
    
    if (!businessName.trim()) {
      newErrors.businessName = 'Business name is required';
    }
    
    if (!ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }
    
    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    
    if (!proofDescription.trim()) {
      newErrors.proofDescription = 'Please describe your proof of ownership';
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      // In a real implementation, this would send the claim request to the server
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSubmitSuccess(true);
      
      // Reset form
      setBusinessName('');
      setOwnerName('');
      setEmail('');
      setPhone('');
      setVerificationMethod('email');
      setProofDescription('');
    } catch (error) {
      setSubmitError('Failed to submit claim request. Please try again later.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-blue-800 dark:bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <Link 
                href="/businesses"
                className="inline-flex items-center text-blue-200 hover:text-white mb-4"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Directory
              </Link>
              <h1 className="text-3xl md:text-4xl font-bold">Claim Your Business</h1>
              <p className="text-xl max-w-3xl mt-2">
                Take control of your business listing in the Tonasket Business Directory.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">About Claiming Your Business</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              Claiming your business gives you the ability to update your business information, respond to reviews, and access analytics about your listing.
              Our team will verify your ownership before granting access to manage your listing.
            </p>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              The verification process typically takes 1-3 business days. Once verified, you'll receive an email with instructions on how to access your business dashboard.
            </p>
            <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-600 dark:text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">Verification Required</h3>
                  <div className="mt-2 text-sm text-blue-700 dark:text-blue-400">
                    <p>To protect your business information, we require proof of ownership. This can include business documents, utility bills, or other official correspondence.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Claim Request Form</h2>
            
            {submitSuccess ? (
              <div className="bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-600 dark:text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Claim Request Submitted</h3>
                    <div className="mt-2 text-sm text-green-700 dark:text-green-400">
                      <p>Thank you for submitting your claim request. Our team will review your request and contact you within 1-3 business days to complete the verification process.</p>
                    </div>
                    <div className="mt-4">
                      <button
                        type="button"
                        onClick={() => setSubmitSuccess(false)}
                        className="text-sm font-medium text-green-700 dark:text-green-400 hover:text-green-600 dark:hover:text-green-300"
                      >
                        Submit another claim
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {submitError && (
                  <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Submission Error</h3>
                        <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                          <p>{submitError}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Business Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Business Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="businessName"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.businessName ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Enter the exact name as it appears in the directory"
                        required
                      />
                      {errors.businessName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.businessName}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Owner Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Owner Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Owner/Manager Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="ownerName"
                        value={ownerName}
                        onChange={(e) => setOwnerName(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.ownerName ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Your full name"
                        required
                      />
                      {errors.ownerName && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.ownerName}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="your@email.com"
                        required
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
                      )}
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Phone Number <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.phone ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="(509) 123-4567"
                        required
                      />
                      {errors.phone && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Verification Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Verification Information</h3>
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <label htmlFor="verificationMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Preferred Verification Method <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="verificationMethod"
                        value={verificationMethod}
                        onChange={(e) => setVerificationMethod(e.target.value)}
                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        required
                      >
                        <option value="email">Email Verification</option>
                        <option value="phone">Phone Verification</option>
                        <option value="document">Document Upload</option>
                        <option value="inPerson">In-Person Verification</option>
                      </select>
                    </div>
                    
                    <div>
                      <label htmlFor="proofDescription" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Proof of Ownership Description <span className="text-red-600">*</span>
                      </label>
                      <textarea
                        id="proofDescription"
                        value={proofDescription}
                        onChange={(e) => setProofDescription(e.target.value)}
                        rows={4}
                        className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:text-white ${
                          errors.proofDescription ? 'border-red-500 dark:border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Describe what documents or information you can provide to verify your ownership (e.g., business license, utility bill, etc.)"
                        required
                      />
                      {errors.proofDescription && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.proofDescription}</p>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Form Actions */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Submitting...
                      </>
                    ) : (
                      'Submit Claim Request'
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
