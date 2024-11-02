import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedType: string;
  onTypeChange: (value: string) => void;
  types: string[];
}

export function SearchBar({
  search,
  onSearchChange,
  selectedType,
  onTypeChange,
  types,
}: SearchBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <div className="relative flex-1">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
        <input
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Pokémon..."
          className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm text-base"
        />
      </div>
      <select
        value={selectedType}
        onChange={(e) => onTypeChange(e.target.value)}
        className="px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm capitalize text-base appearance-none bg-white cursor-pointer min-w-[140px]"
      >
        <option value="">All Types</option>
        {types.map((type) => (
          <option key={type} value={type} className="capitalize">
            {type}
          </option>
        ))}
      </select>
    </div>
  );
}