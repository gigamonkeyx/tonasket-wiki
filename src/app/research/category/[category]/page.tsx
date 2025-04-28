'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Skeleton } from '@/components/ui/skeleton';
import DatasetCard from '@/components/research/DatasetCard';
import DatasetFilter from '@/components/research/DatasetFilter';
import CategoryList from '@/components/research/CategoryList';
import SourceList from '@/components/research/SourceList';
import { Dataset, DatasetCategory, DatasetSource } from '@/data/research';

export default function CategoryPage() {
  const params = useParams();
  const categoryId = params.category as string;

  const [datasets, setDatasets] = useState<Dataset[]>([]);
  const [categories, setCategories] = useState<DatasetCategory[]>([]);
  const [sources, setSources] = useState<DatasetSource[]>([]);
  const [currentCategory, setCurrentCategory] = useState<DatasetCategory | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    query: '',
    categoryId,
    featured: false
  });

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // Fetch categories
        const categoriesResponse = await fetch('/api/research/categories');
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);

        // Find current category
        const category = categoriesData.find((c: DatasetCategory) => c.id === categoryId);
        if (category) {
          setCurrentCategory(category);
        }

        // Fetch sources
        const sourcesResponse = await fetch('/api/research/sources');
        if (!sourcesResponse.ok) {
          throw new Error('Failed to fetch sources');
        }
        const sourcesData = await sourcesResponse.json();
        setSources(sourcesData);

        // Fetch datasets with initial filters
        await fetchDatasets({ ...filters, categoryId });

        setError(null);
      } catch (err) {
        console.error('Error fetching research data:', err);
        setError('Failed to load research data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryId]);

  // Fetch datasets with filters
  const fetchDatasets = async (filters: { query: string; categoryId: string; featured: boolean }) => {
    try {
      setLoading(true);

      // Build query string
      const params = new URLSearchParams();
      if (filters.query) params.append('query', filters.query);
      if (filters.categoryId) params.append('category', filters.categoryId);
      if (filters.featured) params.append('featured', 'true');

      const response = await fetch(`/api/research/datasets?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch datasets');
      }

      const data = await response.json();
      setDatasets(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching datasets:', err);
      setError('Failed to load datasets. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Handle filter changes
  const handleFilterChange = (newFilters: { query: string; categoryId: string; featured: boolean }) => {
    // If categoryId is 'all', use the current category from the URL
    // Otherwise, use the selected category
    const effectiveCategoryId = newFilters.categoryId === 'all' ? categoryId : newFilters.categoryId;
    const updatedFilters = { ...newFilters, categoryId: effectiveCategoryId };
    setFilters(updatedFilters);
    fetchDatasets(updatedFilters);
  };

  // Get source name for a dataset
  const getSourceName = (sourceId: string) => {
    const source = sources.find(s => s.id === sourceId);
    return source ? source.name : '';
  };

  return (
    <div className="container mx-auto py-8">
      {currentCategory ? (
        <>
          <h1 className="text-3xl font-bold mb-2">{currentCategory.name}</h1>
          <p className="text-muted-foreground mb-6">
            {currentCategory.description}
          </p>
        </>
      ) : (
        <h1 className="text-3xl font-bold mb-6">Category Datasets</h1>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {loading && !categories.length ? (
            <div className="space-y-2">
              <Skeleton className="h-[300px] w-full" />
              <Skeleton className="h-[400px] w-full" />
            </div>
          ) : (
            <>
              <CategoryList categories={categories} activeCategory={categoryId} />
              <SourceList sources={sources} />
            </>
          )}
        </div>

        {/* Main content */}
        <div className="lg:col-span-3">
          <DatasetFilter
            categories={categories}
            onFilterChange={handleFilterChange}
            initialCategory={categoryId}
          />

          {error ? (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-4 rounded-md text-red-600 dark:text-red-400">
              {error}
            </div>
          ) : loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-[250px] w-full" />
              ))}
            </div>
          ) : datasets.length === 0 ? (
            <div className="bg-muted p-8 rounded-lg text-center">
              <h3 className="text-lg font-medium mb-2">No datasets found</h3>
              <p className="text-muted-foreground">
                Try adjusting your filters or search terms.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-4">
                Showing {datasets.length} dataset{datasets.length !== 1 ? 's' : ''} in {currentCategory?.name}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {datasets.map((dataset) => (
                  <DatasetCard
                    key={dataset.id}
                    dataset={dataset}
                    categoryName={currentCategory?.name}
                    sourceName={getSourceName(dataset.sourceId)}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
