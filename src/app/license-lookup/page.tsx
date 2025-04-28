'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { InfoIcon } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import PageHeader from '@/components/layout/PageHeader';

export default function LicenseLookupPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('name');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!searchTerm.trim()) {
      setError('Please enter a search term');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Call our API endpoint
      const response = await fetch(
        `/api/license-lookup?type=${searchType}&term=${encodeURIComponent(searchTerm)}&limit=10`
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch results');
      }

      const data = await response.json();
      setResults(data.results.map((result: any) => ({
        ...result,
        searchTerm,
        searchType
      })));
    } catch (err) {
      setError('An error occurred while searching. Please try again.');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-6">
      <PageHeader
        title="Washington State License Lookup"
        description="Search for business licenses in Washington State"
      />

      <div className="grid gap-6">
        <Alert>
          <InfoIcon className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription>
            This tool allows you to search for business licenses in Washington State.
            You can search by business name, UBI number, or location.
          </AlertDescription>
        </Alert>

        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="search">Search</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>

          <TabsContent value="search">
            <Card>
              <CardHeader>
                <CardTitle>Search for a Business License</CardTitle>
                <CardDescription>
                  Enter your search criteria below to find business licenses in Washington State.
                </CardDescription>
              </CardHeader>

              <CardContent>
                <form onSubmit={handleSearch} className="space-y-6">
                  <div className="grid gap-2">
                    <Label htmlFor="searchType">Search by</Label>
                    <div className="relative z-20">
                      <Select
                        value={searchType}
                        onValueChange={setSearchType}
                      >
                        <SelectTrigger id="searchType" className="w-full bg-background">
                          <SelectValue placeholder="Select search type" />
                        </SelectTrigger>
                        <SelectContent
                          position="popper"
                          className="w-full bg-background border shadow-md z-50"
                          sideOffset={4}
                        >
                          <SelectItem value="name">Business Name</SelectItem>
                          <SelectItem value="ubi">UBI Number</SelectItem>
                          <SelectItem value="location">Location</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="searchTerm">
                      {searchType === 'name' ? 'Business Name' :
                       searchType === 'ubi' ? 'UBI Number' : 'City/Location'}
                    </Label>
                    <div className="flex gap-2">
                      <div className="relative flex-1">
                        <Input
                          id="searchTerm"
                          className="w-full pr-10"
                          placeholder={
                            searchType === 'name' ? 'Enter business name...' :
                            searchType === 'ubi' ? 'Enter UBI number...' : 'Enter city...'
                          }
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          autoComplete="off"
                        />
                        {searchTerm && (
                          <button
                            type="button"
                            className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                            onClick={() => setSearchTerm('')}
                            aria-label="Clear search"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <line x1="18" y1="6" x2="6" y2="18"></line>
                              <line x1="6" y1="6" x2="18" y2="18"></line>
                            </svg>
                          </button>
                        )}
                      </div>
                      <Button type="submit" disabled={isLoading}>
                        {isLoading ? 'Searching...' : 'Search'}
                      </Button>
                    </div>
                  </div>

                  {error && (
                    <Alert variant="destructive">
                      <AlertDescription>{error}</AlertDescription>
                    </Alert>
                  )}
                </form>
              </CardContent>
            </Card>

            {isLoading ? (
              <div className="mt-6 text-center">
                <p>Searching for businesses...</p>
              </div>
            ) : (
              <div className="mt-6">
                {results.length > 0 ? (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Search Results</h2>
                    <div className="grid gap-4">
                      {results.map((result, index) => (
                        <Card key={`${result.id}-${index}`}>
                          <CardHeader>
                            <CardTitle>{result.name}</CardTitle>
                            <CardDescription>
                              {result.licenseType || 'Business License'}
                              {result.licenseStatus && ` • ${result.licenseStatus}`}
                            </CardDescription>
                          </CardHeader>
                          <CardContent>
                            <div className="space-y-4">
                              {/* License Information */}
                              <div className="bg-muted p-3 rounded-md">
                                <h4 className="font-medium mb-2">License Information</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                                  {result.licenseNumber && (
                                    <div>
                                      <span className="font-medium">License Number:</span> {result.licenseNumber}
                                    </div>
                                  )}
                                  {result.licenseType && (
                                    <div>
                                      <span className="font-medium">License Type:</span> {result.licenseType}
                                    </div>
                                  )}
                                  {result.licenseStatus && (
                                    <div>
                                      <span className="font-medium">Status:</span> {result.licenseStatus}
                                    </div>
                                  )}
                                  {result.firstIssueDate && (
                                    <div>
                                      <span className="font-medium">First Issued:</span> {result.firstIssueDate}
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Business Information */}
                              <div>
                                <h4 className="font-medium mb-2">Business Information</h4>
                                <div className="space-y-2 text-sm">
                                  {result.businessName && result.locationName && result.businessName !== result.locationName && (
                                    <div>
                                      <span className="font-medium">DBA:</span> {result.locationName}
                                    </div>
                                  )}

                                  {result.businessAddress && (
                                    <div>
                                      <span className="font-medium">Business Address:</span>{' '}
                                      {result.businessAddress}
                                      {' '}
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.businessAddress)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                      >
                                        (Map)
                                      </a>
                                    </div>
                                  )}

                                  {result.locationAddress && result.locationAddress !== result.businessAddress && (
                                    <div>
                                      <span className="font-medium">Location Address:</span>{' '}
                                      {result.locationAddress}
                                      {' '}
                                      <a
                                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.locationAddress)}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-xs text-blue-500 hover:underline"
                                      >
                                        (Map)
                                      </a>
                                    </div>
                                  )}

                                  {result.phone && (
                                    <div>
                                      <span className="font-medium">Phone:</span>{' '}
                                      <a href={`tel:${result.phone.replace(/\D/g, '')}`} className="text-blue-500 hover:underline">
                                        {result.phone}
                                      </a>
                                    </div>
                                  )}

                                  {result.website && (
                                    <div>
                                      <span className="font-medium">Website:</span>{' '}
                                      <a
                                        href={result.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-500 hover:underline"
                                      >
                                        {result.website}
                                      </a>
                                    </div>
                                  )}
                                </div>
                              </div>

                              {/* Tags */}
                              {result.tags && result.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-2">
                                  {result.tags.map((tag, tagIndex) => (
                                    <span
                                      key={tagIndex}
                                      className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                                    >
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                          </CardContent>
                          <CardFooter className="flex flex-wrap gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <a
                                href={`https://secure.dor.wa.gov/gteunauth/_/#/results?searchBy=name&searchCriteria=${encodeURIComponent(result.name)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                View on WA Business Lookup
                              </a>
                            </Button>

                            {result.licenseNumber && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={`https://secure.dor.wa.gov/gteunauth/_/#/results?searchBy=ubi&searchCriteria=${encodeURIComponent(result.licenseNumber)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View License Details
                                </a>
                              </Button>
                            )}

                            {result.businessAddress && (
                              <Button variant="outline" size="sm" asChild>
                                <a
                                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(result.businessAddress)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  View on Map
                                </a>
                              </Button>
                            )}
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </>
                ) : searchTerm && !isLoading ? (
                  <div className="text-center p-6 bg-muted rounded-lg">
                    <h3 className="text-xl font-medium mb-2">No results found</h3>
                    <p className="text-muted-foreground">
                      No businesses found matching "{searchTerm}" in the {searchType === 'name' ? 'name' : searchType === 'ubi' ? 'UBI number' : 'location'} search.
                    </p>
                    <p className="mt-2 text-sm">
                      Try a different search term or search type.
                    </p>
                  </div>
                ) : null}
              </div>
            )}
          </TabsContent>

          <TabsContent value="about">
            <Card>
              <CardHeader>
                <CardTitle>About the License Lookup Tool</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>
                  The Washington State License Lookup tool provides access to information about businesses
                  registered with the Washington State Department of Revenue.
                </p>
                <p>
                  This tool allows you to search for:
                </p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Business licenses by name</li>
                  <li>Business information by UBI (Unified Business Identifier) number</li>
                  <li>Businesses by location</li>
                </ul>
                <p>
                  The data is sourced directly from the Washington State Department of Revenue's
                  Business Lookup service, which provides public information related to all current
                  active accounts and five years of closed accounts for business licenses, excise tax
                  accounts, and reseller permits.
                </p>
                <p>
                  <strong>Note:</strong> This feature is currently in development. For now, it will
                  redirect you to the official Washington State Department of Revenue Business Lookup tool.
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild>
                  <a
                    href="https://secure.dor.wa.gov/gteunauth/_/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Visit Official Business Lookup
                  </a>
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
