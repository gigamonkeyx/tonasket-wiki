'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DatasetSource } from '@/data/research';

interface SourceListProps {
  sources: DatasetSource[];
}

export default function SourceList({ sources }: SourceListProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border p-4">
      <h3 className="text-lg font-medium mb-4">Data Sources</h3>
      <ul className="space-y-4">
        {sources.map((source) => (
          <li key={source.id} className="flex items-center">
            <div className="w-8 h-8 relative mr-3 flex-shrink-0">
              {source.logo ? (
                <Image
                  src={source.logo}
                  alt={source.name}
                  fill
                  style={{ objectFit: 'contain' }}
                  className="rounded-sm"
                />
              ) : (
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 rounded-sm flex items-center justify-center text-xs">
                  {source.name.substring(0, 2).toUpperCase()}
                </div>
              )}
            </div>
            <div className="flex-grow">
              <Link
                href={source.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium hover:underline"
              >
                {source.name}
              </Link>
              <p className="text-xs text-muted-foreground line-clamp-1">
                {source.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
