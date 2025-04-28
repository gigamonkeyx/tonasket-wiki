'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DatasetCategory } from '@/data/research';

interface DatasetFilterProps {
  categories: DatasetCategory[];
  onFilterChange: (filters: {
    query: string;
    categoryId: string;
    featured: boolean;
  }) => void;
  initialCategory?: string;
}

export default function DatasetFilter({
  categories,
  onFilterChange,
  initialCategory = 'all'
}: DatasetFilterProps) {
  const [query, setQuery] = useState('');
  const [categoryId, setCategoryId] = useState(initialCategory);
  const [featured, setFeatured] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  // Apply filters when they change
  useEffect(() => {
    // Debounce filter changes to prevent infinite loops
    const timer = setTimeout(() => {
      onFilterChange({ query, categoryId, featured });
    }, 300); // 300ms debounce

    return () => clearTimeout(timer);
  }, [query, categoryId, featured, onFilterChange]);

  // Reset filters
  const handleReset = () => {
    setQuery('');
    setCategoryId('all');
    setFeatured(false);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4 mb-6">
      <div className="flex flex-col md:flex-row gap-4 items-end">
        <div className="flex-grow">
          <Label htmlFor="search-datasets" className="mb-2 block">Search Datasets</Label>
          <Input
            id="search-datasets"
            placeholder="Search by keyword..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full"
          />
        </div>

        <div className="w-full md:w-48">
          <Label htmlFor="category-filter" className="mb-2 block">Category</Label>
          <Select value={categoryId} onValueChange={setCategoryId}>
            <SelectTrigger id="category-filter">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name} {category.count && `(${category.count})`}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2 mt-2 md:mt-0">
          <Button
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={!query && categoryId === 'all' && !featured}
          >
            Reset
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Less Filters' : 'More Filters'}
          </Button>
        </div>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="featured-only"
              checked={featured}
              onCheckedChange={(checked) => setFeatured(checked as boolean)}
            />
            <Label htmlFor="featured-only">Featured datasets only</Label>
          </div>
        </div>
      )}
    </div>
  );
}
