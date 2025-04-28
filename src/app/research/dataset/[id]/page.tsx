'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dataset, DatasetCategory, DatasetSource } from '@/data/research';

interface ExtendedDataset extends Dataset {
  category?: DatasetCategory;
  source?: DatasetSource;
}

export default function DatasetDetailPage() {
  const params = useParams();
  const datasetId = params.id as string;
  
  const [dataset, setDataset] = useState<ExtendedDataset | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch dataset
  useEffect(() => {
    const fetchDataset = async () => {
      try {
        setLoading(true);
        
        const response = await fetch(`/api/research/datasets/${datasetId}`);
        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Dataset not found');
          }
          throw new Error('Failed to fetch dataset');
        }
        
        const data = await response.json();
        setDataset(data);
        setError(null);
      } catch (err) {
        console.error(`Error fetching dataset ${datasetId}:`, err);
        setError((err as Error).message || 'Failed to load dataset. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchDataset();
  }, [datasetId]);
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Link href="/research" className="text-primary hover:underline">
          ← Back to Research Datasets
        </Link>
      </div>
      
      {error ? (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-600 dark:text-red-400">
          {error}
        </div>
      ) : loading ? (
        <div className="space-y-6">
          <Skeleton className="h-12 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
          <Skeleton className="h-[400px] w-full" />
        </div>
      ) : dataset ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                {dataset.category && (
                  <Link href={`/research/category/${dataset.category.id}`}>
                    <Badge variant="secondary">{dataset.category.name}</Badge>
                  </Link>
                )}
                {dataset.featured && (
                  <Badge variant="outline" className="border-yellow-400 text-yellow-600 dark:text-yellow-400">
                    Featured
                  </Badge>
                )}
              </div>
              
              <h1 className="text-3xl font-bold mb-4">{dataset.title}</h1>
              
              <div className="prose dark:prose-invert max-w-none mb-6">
                <p className="text-lg">{dataset.description}</p>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">Coverage</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  {dataset.coverage.spatial && (
                    <div>
                      <h3 className="text-base font-medium">Geographic Coverage</h3>
                      <p>{dataset.coverage.spatial}</p>
                    </div>
                  )}
                  {dataset.coverage.temporal && (
                    <div>
                      <h3 className="text-base font-medium">Temporal Coverage</h3>
                      <p>{dataset.coverage.temporal.start} to {dataset.coverage.temporal.end}</p>
                    </div>
                  )}
                </div>
                
                <h2 className="text-xl font-semibold mt-6 mb-3">Tags</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {dataset.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href={dataset.url} target="_blank" rel="noopener noreferrer">
                    Access Dataset
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Dataset Info */}
            <Card>
              <CardHeader>
                <CardTitle>Dataset Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Format</h3>
                  <p>{dataset.format}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">Last Updated</h3>
                  <p>{formatDate(dataset.lastUpdated)}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">ID</h3>
                  <p className="font-mono text-sm">{dataset.id}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Source Info */}
            {dataset.source && (
              <Card>
                <CardHeader>
                  <CardTitle>Data Source</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center mb-4">
                    {dataset.source.logo ? (
                      <div className="w-12 h-12 relative mr-3">
                        <Image
                          src={dataset.source.logo}
                          alt={dataset.source.name}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="rounded-sm"
                        />
                      </div>
                    ) : (
                      <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-sm flex items-center justify-center text-lg mr-3">
                        {dataset.source.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-medium">{dataset.source.name}</h3>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    {dataset.source.description}
                  </p>
                  <Button variant="outline" asChild size="sm">
                    <Link href={dataset.source.url} target="_blank" rel="noopener noreferrer">
                      Visit Source Website
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )}
            
            {/* Related Datasets */}
            {dataset.category && (
              <Card>
                <CardHeader>
                  <CardTitle>Related Datasets</CardTitle>
                  <CardDescription>
                    More datasets in {dataset.category.name}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link 
                    href={`/research/category/${dataset.category.id}`}
                    className="text-primary hover:underline"
                  >
                    View all {dataset.category.name} datasets
                  </Link>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
