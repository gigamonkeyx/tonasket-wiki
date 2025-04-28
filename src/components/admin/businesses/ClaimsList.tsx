'use client';

import React, { useState, useEffect } from 'react';
import ClaimDetails from './ClaimDetails';

// Define claim status types
type ClaimStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_INFO';

// Define claim interface
interface BusinessClaim {
  id: string;
  businessId: string;
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  verificationMethod: string;
  proofDescription: string;
  status: ClaimStatus;
  submittedAt: string;
  reviewedAt?: string;
}

const ClaimsList: React.FC = () => {
  // State for claims
  const [claims, setClaims] = useState<BusinessClaim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for selected claim
  const [selectedClaim, setSelectedClaim] = useState<BusinessClaim | null>(null);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState<ClaimStatus | 'ALL'>('ALL');
  
  // Fetch claims
  useEffect(() => {
    const fetchClaims = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockClaims: BusinessClaim[] = [
          {
            id: '1',
            businessId: '101',
            businessName: 'Mountain View Bakery',
            ownerName: 'Jane Smith',
            email: 'jane@mountainviewbakery.com',
            phone: '(509) 555-1234',
            verificationMethod: 'email',
            proofDescription: 'I can provide business license and utility bills.',
            status: 'PENDING',
            submittedAt: '2023-06-15T14:30:00Z'
          },
          {
            id: '2',
            businessId: '102',
            businessName: 'Okanogan Valley Farm Supply',
            ownerName: 'John Doe',
            email: 'john@ovfarmsupply.com',
            phone: '(509) 555-5678',
            verificationMethod: 'document',
            proofDescription: 'I have attached my business license and tax documents.',
            status: 'APPROVED',
            submittedAt: '2023-06-10T09:15:00Z',
            reviewedAt: '2023-06-12T11:20:00Z'
          },
          {
            id: '3',
            businessId: '103',
            businessName: 'Riverside Wellness Center',
            ownerName: 'Sarah Johnson',
            email: 'sarah@riversidewellness.com',
            phone: '(509) 555-9012',
            verificationMethod: 'phone',
            proofDescription: 'I can verify over the phone and provide business documents.',
            status: 'NEEDS_INFO',
            submittedAt: '2023-06-14T16:45:00Z',
            reviewedAt: '2023-06-16T10:30:00Z'
          },
          {
            id: '4',
            businessId: '104',
            businessName: 'North Country Auto Repair',
            ownerName: 'Mike Wilson',
            email: 'mike@northcountryauto.com',
            phone: '(509) 555-3456',
            verificationMethod: 'inPerson',
            proofDescription: 'I can come to the office with my ID and business documents.',
            status: 'REJECTED',
            submittedAt: '2023-06-08T13:20:00Z',
            reviewedAt: '2023-06-11T09:45:00Z'
          }
        ];
        
        setClaims(mockClaims);
      } catch (err) {
        setError('Failed to fetch claims');
        console.error('Error fetching claims:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchClaims();
  }, []);
  
  // Filter claims by status
  const filteredClaims = statusFilter === 'ALL'
    ? claims
    : claims.filter(claim => claim.status === statusFilter);
  
  // Handle claim selection
  const handleSelectClaim = (claim: BusinessClaim) => {
    setSelectedClaim(claim);
  };
  
  // Handle claim status update
  const handleUpdateStatus = async (id: string, status: ClaimStatus, notes?: string) => {
    try {
      // In a real implementation, this would call an API
      // For now, we'll update the local state
      setClaims(prevClaims => 
        prevClaims.map(claim => 
          claim.id === id
            ? { 
                ...claim, 
                status, 
                reviewedAt: new Date().toISOString() 
              }
            : claim
        )
      );
      
      // Close the details panel
      setSelectedClaim(null);
      
      // Show success message (in a real implementation)
      console.log(`Claim ${id} updated to ${status}`);
    } catch (err) {
      // Show error message (in a real implementation)
      console.error(`Error updating claim ${id}:`, err);
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: ClaimStatus) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300';
      case 'APPROVED':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300';
      case 'REJECTED':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300';
      case 'NEEDS_INFO':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Claims</h3>
        
        {/* Status Filter */}
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as ClaimStatus | 'ALL')}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm"
          >
            <option value="ALL">All Claims</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
            <option value="NEEDS_INFO">Needs Info</option>
          </select>
        </div>
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-600 dark:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Error</h3>
              <div className="mt-2 text-sm text-red-700 dark:text-red-400">
                <p>{error}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Claims List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Owner
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Submitted
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredClaims.length > 0 ? (
                    filteredClaims.map((claim) => (
                      <tr 
                        key={claim.id}
                        onClick={() => handleSelectClaim(claim)}
                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedClaim?.id === claim.id
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{claim.businessName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{claim.ownerName}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(claim.status)}`}>
                            {claim.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {formatDate(claim.submittedAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No claims found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Claim Details */}
          <div>
            {selectedClaim ? (
              <ClaimDetails
                claim={selectedClaim}
                onUpdateStatus={handleUpdateStatus}
                onClose={() => setSelectedClaim(null)}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No claim selected</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select a claim from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClaimsList;
