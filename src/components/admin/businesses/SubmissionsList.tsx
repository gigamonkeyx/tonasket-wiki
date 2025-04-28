'use client';

import React, { useState, useEffect } from 'react';
import SubmissionDetails from './SubmissionDetails';

// Define submission status types
type SubmissionStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'NEEDS_INFO';

// Define submission interface
interface BusinessSubmission {
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  email?: string;
  website?: string;
  status: SubmissionStatus;
  submittedAt: string;
  reviewedAt?: string;
}

const SubmissionsList: React.FC = () => {
  // State for submissions
  const [submissions, setSubmissions] = useState<BusinessSubmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // State for selected submission
  const [selectedSubmission, setSelectedSubmission] = useState<BusinessSubmission | null>(null);
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState<SubmissionStatus | 'ALL'>('ALL');
  
  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      setIsLoading(true);
      try {
        // In a real implementation, this would fetch from an API
        // For now, we'll use mock data
        const mockSubmissions: BusinessSubmission[] = [
          {
            id: '1',
            name: 'Mountain View Bakery',
            description: 'Artisan bakery specializing in sourdough bread and pastries.',
            category: 'Food & Dining',
            address: '123 Main St, Tonasket, WA 98855',
            phone: '(509) 555-1234',
            email: 'info@mountainviewbakery.com',
            website: 'https://www.mountainviewbakery.com',
            status: 'PENDING',
            submittedAt: '2023-06-15T14:30:00Z'
          },
          {
            id: '2',
            name: 'Okanogan Valley Farm Supply',
            description: 'Agricultural supplies and equipment for local farmers.',
            category: 'Agriculture',
            address: '456 Farm Rd, Tonasket, WA 98855',
            phone: '(509) 555-5678',
            status: 'APPROVED',
            submittedAt: '2023-06-10T09:15:00Z',
            reviewedAt: '2023-06-12T11:20:00Z'
          },
          {
            id: '3',
            name: 'Riverside Wellness Center',
            description: 'Holistic health and wellness services.',
            category: 'Healthcare',
            address: '789 River Dr, Tonasket, WA 98855',
            phone: '(509) 555-9012',
            email: 'appointments@riversidewellness.com',
            website: 'https://www.riversidewellness.com',
            status: 'NEEDS_INFO',
            submittedAt: '2023-06-14T16:45:00Z',
            reviewedAt: '2023-06-16T10:30:00Z'
          },
          {
            id: '4',
            name: 'North Country Auto Repair',
            description: 'Full-service auto repair and maintenance.',
            category: 'Services',
            address: '321 Mechanic Way, Tonasket, WA 98855',
            phone: '(509) 555-3456',
            status: 'REJECTED',
            submittedAt: '2023-06-08T13:20:00Z',
            reviewedAt: '2023-06-11T09:45:00Z'
          }
        ];
        
        setSubmissions(mockSubmissions);
      } catch (err) {
        setError('Failed to fetch submissions');
        console.error('Error fetching submissions:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchSubmissions();
  }, []);
  
  // Filter submissions by status
  const filteredSubmissions = statusFilter === 'ALL'
    ? submissions
    : submissions.filter(submission => submission.status === statusFilter);
  
  // Handle submission selection
  const handleSelectSubmission = (submission: BusinessSubmission) => {
    setSelectedSubmission(submission);
  };
  
  // Handle submission status update
  const handleUpdateStatus = async (id: string, status: SubmissionStatus, notes?: string) => {
    try {
      // In a real implementation, this would call an API
      // For now, we'll update the local state
      setSubmissions(prevSubmissions => 
        prevSubmissions.map(submission => 
          submission.id === id
            ? { 
                ...submission, 
                status, 
                reviewedAt: new Date().toISOString() 
              }
            : submission
        )
      );
      
      // Close the details panel
      setSelectedSubmission(null);
      
      // Show success message (in a real implementation)
      console.log(`Submission ${id} updated to ${status}`);
    } catch (err) {
      // Show error message (in a real implementation)
      console.error(`Error updating submission ${id}:`, err);
    }
  };
  
  // Get status badge color
  const getStatusBadgeColor = (status: SubmissionStatus) => {
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
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Business Submissions</h3>
        
        {/* Status Filter */}
        <div className="flex items-center">
          <span className="mr-2 text-sm text-gray-700 dark:text-gray-300">Filter:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as SubmissionStatus | 'ALL')}
            className="bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2 px-3 text-sm"
          >
            <option value="ALL">All Submissions</option>
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
          {/* Submissions List */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Business
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Category
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
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <tr 
                        key={submission.id}
                        onClick={() => handleSelectSubmission(submission)}
                        className={`cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 ${
                          selectedSubmission?.id === submission.id
                            ? 'bg-blue-50 dark:bg-blue-900/20'
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{submission.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 dark:text-gray-300">{submission.category}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(submission.status)}`}>
                            {submission.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                          {formatDate(submission.submittedAt)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                        No submissions found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          
          {/* Submission Details */}
          <div>
            {selectedSubmission ? (
              <SubmissionDetails
                submission={selectedSubmission}
                onUpdateStatus={handleUpdateStatus}
                onClose={() => setSelectedSubmission(null)}
              />
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No submission selected</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Select a submission from the list to view details
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmissionsList;
