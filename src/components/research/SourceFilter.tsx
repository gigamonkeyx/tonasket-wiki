import React from 'react';

interface Source {
  id: string;
  name: string;
  // ...other fields
}

interface SourceFilterProps {
  sources: Source[];
  selectedSource: string | null;
  onSelectSource: (source: string | null) => void;
  className?: string;
}

export default function SourceFilter({
  sources,
  selectedSource,
  onSelectSource,
  className
}: SourceFilterProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-medium text-sm text-gray-500 uppercase">Sources</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelectSource(null)}
          className={`w-full text-left px-3 py-2 text-sm rounded-md ${
            selectedSource === null
              ? 'bg-blue-100 text-blue-800 font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Sources
        </button>

        {sources.map((source) => (
          <button
            key={source.id}
            onClick={() => onSelectSource(source.id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${
              selectedSource === source.id
                ? 'bg-blue-100 text-blue-800 font-medium'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {source.name}
          </button>
        ))}
      </div>
    </div>
  );
}
