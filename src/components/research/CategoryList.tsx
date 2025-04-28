'use client';

import React from 'react';
import Link from 'next/link';
import { DatasetCategory } from '@/data/research';

interface CategoryListProps {
  categories: DatasetCategory[];
  activeCategory?: string;
}

export default function CategoryList({ categories, activeCategory }: CategoryListProps) {
  // Get icon for category
  const getCategoryIcon = (icon: string) => {
    switch (icon) {
      case 'leaf':
        return '🌿';
      case 'cloud-sun':
        return '⛅';
      case 'users':
        return '👥';
      case 'chart-line':
        return '📈';
      case 'graduation-cap':
        return '🎓';
      case 'landmark':
        return '🏛️';
      case 'heart-pulse':
        return '❤️';
      case 'road':
        return '🛣️';
      default:
        return '📊';
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-medium mb-4">Categories</h3>
      <ul className="space-y-1">
        <li>
          <Link
            href="/research"
            className={`flex items-center px-3 py-2 rounded-md text-sm ${
              !activeCategory
                ? 'bg-primary/10 text-primary font-medium'
                : 'hover:bg-muted'
            }`}
          >
            <span className="mr-2">📚</span>
            <span>All Categories</span>
            <span className="ml-auto text-muted-foreground text-xs">
              {categories.reduce((sum, cat) => sum + (cat.count || 0), 0)}
            </span>
          </Link>
        </li>
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/research/category/${category.id}`}
              className={`flex items-center px-3 py-2 rounded-md text-sm ${
                activeCategory === category.id
                  ? 'bg-primary/10 text-primary font-medium'
                  : 'hover:bg-muted'
              }`}
            >
              <span className="mr-2">{getCategoryIcon(category.icon)}</span>
              <span>{category.name}</span>
              {category.count !== undefined && (
                <span className="ml-auto text-muted-foreground text-xs">
                  {category.count}
                </span>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
