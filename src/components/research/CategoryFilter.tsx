import React from 'react';

interface Category {
  id: string;
  name: string;
  // ...other fields
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
  className?: string;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onSelectCategory,
  className 
}: CategoryFilterProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      <h3 className="font-medium text-sm text-gray-500 uppercase">Categories</h3>
      <div className="space-y-1">
        <button
          onClick={() => onSelectCategory(null)}
          className={`w-full text-left px-3 py-2 text-sm rounded-md ${
            selectedCategory === null 
              ? 'bg-blue-100 text-blue-800 font-medium' 
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          All Categories
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`w-full text-left px-3 py-2 text-sm rounded-md ${
              selectedCategory === category.id 
                ? 'bg-blue-100 text-blue-800 font-medium' 
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
