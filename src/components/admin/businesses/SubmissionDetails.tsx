'use client';

import React, { useState } from 'react';

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

interface SubmissionDetailsProps {
  submission: BusinessSubmission;
  onUpdateStatus: (id: string, status: SubmissionStatus, notes?: string) => void;
  onClose: () => void;
}

const SubmissionDetails: React.FC<SubmissionDetailsProps> = ({
  submission,
  onUpdateStatus,
  onClose
}) => {
  // State for review notes
  const [reviewNotes, setReviewNotes] = useState('');
  
  // State for loading
  const [isUpdating, setIsUpdating] = useState(false);
  
  // Handle status update
  const handleStatusUpdate = async (status: SubmissionStatus) => {
    setIsUpdating(true);
    try {
      await onUpdateStatus(submission.id, status, reviewNotes);
    } finally {
      setIsUpdating(false);
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Submission Details</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-xl font-medium text-gray-900 dark:text-white mb-2">{submission.name}</h4>
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400 mb-4">
            <span className="mr-2">Status:</span>
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
              submission.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300' :
              submission.status === 'APPROVED' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' :
              submission.status === 'REJECTED' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300' :
              'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300'
            }`}>
              {submission.status}
            </span>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{submission.description}</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Business Information</h5>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Category:</span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">{submission.category}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Address:</span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">{submission.address}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Phone:</span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">{submission.phone}</span>
              </div>
              {submission.email && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Email:</span>
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">{submission.email}</span>
                </div>
              )}
              {submission.website && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Website:</span>
                  <a 
                    href={submission.website} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="ml-2 text-sm text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    {submission.website}
                  </a>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <h5 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Submission Information</h5>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-600 dark:text-gray-400">Submitted:</span>
                <span className="ml-2 text-sm text-gray-900 dark:text-white">{formatDate(submission.submittedAt)}</span>
              </div>
              {submission.reviewedAt && (
                <div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">Reviewed:</span>
                  <span className="ml-2 text-sm text-gray-900 dark:text-white">{formatDate(submission.reviewedAt)}</span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Review Notes */}
        <div className="mb-6">
          <label htmlFor="reviewNotes" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Review Notes
          </label>
          <textarea
            id="reviewNotes"
            rows={4}
            value={reviewNotes}
            onChange={(e) => setReviewNotes(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            placeholder="Add notes about this submission..."
          />
        </div>
        
        {/* Actions */}
        <div className="flex flex-wrap gap-3 justify-end">
          {submission.status === 'PENDING' && (
            <>
              <button
                onClick={() => handleStatusUpdate('APPROVED')}
                disabled={isUpdating}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Approve'}
              </button>
              <button
                onClick={() => handleStatusUpdate('REJECTED')}
                disabled={isUpdating}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Reject'}
              </button>
              <button
                onClick={() => handleStatusUpdate('NEEDS_INFO')}
                disabled={isUpdating}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUpdating ? 'Updating...' : 'Request Info'}
              </button>
            </>
          )}
          {submission.status !== 'PENDING' && (
            <button
              onClick={() => handleStatusUpdate('PENDING')}
              disabled={isUpdating}
              className="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUpdating ? 'Updating...' : 'Reset to Pending'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SubmissionDetails;
