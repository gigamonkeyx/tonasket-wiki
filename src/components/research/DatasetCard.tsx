'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dataset } from '@/data/research';

interface DatasetCardProps {
  dataset: Dataset;
  categoryName?: string;
  sourceName?: string;
}

export default function DatasetCard({ dataset, categoryName, sourceName }: DatasetCardProps) {
  // Format the last updated date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get icon for dataset format
  const getFormatIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'csv':
      case 'excel':
        return '📊';
      case 'pdf':
        return '📄';
      case 'json':
        return '📋';
      case 'gis':
      case 'shapefile':
        return '🗺️';
      case 'html':
        return '🌐';
      default:
        return '📁';
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{dataset.title}</CardTitle>
          {dataset.featured && (
            <Badge variant="secondary" className="ml-2">Featured</Badge>
          )}
        </div>
        <CardDescription>
          {categoryName && (
            <span className="block text-sm">{categoryName}</span>
          )}
          {sourceName && (
            <span className="block text-sm text-muted-foreground">Source: {sourceName}</span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-sm text-muted-foreground mb-4">{dataset.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {dataset.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {dataset.tags.length > 3 && (
            <Badge variant="outline" className="text-xs">+{dataset.tags.length - 3} more</Badge>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <div className="text-xs text-muted-foreground">
          <span className="mr-2">{getFormatIcon(dataset.format)} {dataset.format}</span>
          <span>Updated: {formatDate(dataset.lastUpdated)}</span>
        </div>
        <Link
          href={`/research/dataset/${dataset.id}`}
          className="text-sm font-medium text-primary hover:underline"
        >
          View Details
        </Link>
      </CardFooter>
    </Card>
  );
}
