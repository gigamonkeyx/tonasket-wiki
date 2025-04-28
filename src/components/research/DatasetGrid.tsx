import React from 'react';
import DatasetCard from './DatasetCard';
import { Dataset } from '@/data/research';
import { getCategoryById, getSourceById } from '@/data/research';

interface DatasetGridProps {
  datasets: Dataset[];
  className?: string;
}

export default function DatasetGrid({ datasets, className }: DatasetGridProps) {
  if (!datasets || datasets.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        <p className="text-gray-500">No datasets found.</p>
      </div>
    );
  }

  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
      {datasets.map((dataset) => {
        const category = getCategoryById(dataset.categoryId);
        const source = getSourceById(dataset.sourceId);

        return (
          <DatasetCard
            key={dataset.id}
            dataset={dataset}
            categoryName={category?.name}
            sourceName={source?.name}
          />
        );
      })}
    </div>
  );
}
