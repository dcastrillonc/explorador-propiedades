'use client';

import React, { useState } from 'react';
import Input from '@/components/ui/Input';
import Select from '@/components/ui/Select';

interface SearchFilterProps {
  onFilterChange: (searchTerm: string, selectedRegion: string) => void;
  regions: string[];
}

export default function SearchFilter({ onFilterChange, regions }: SearchFilterProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onFilterChange(newSearchTerm, selectedRegion);
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newSelectedRegion = e.target.value;
    setSelectedRegion(newSelectedRegion);
    onFilterChange(searchTerm, newSelectedRegion);
  };

  return (
    <div className="flex flex-col md:flex-row justify-between gap-4 mb-12">
      <Input
        placeholder="Buscar por nombre de país..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="md:w-1/2 p-4 rounded-md shadow-md outline-none 
                   focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-white"
      />
      <Select
        value={selectedRegion}
        onChange={handleRegionChange}
        options={regions.map(region => ({ value: region, label: region === '' ? 'Filtrar por región' : region }))}
        className="md:w-1/4 p-4 rounded-md shadow-md outline-none 
                   focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 
                   text-gray-900 dark:text-white"
      />
    </div>
  );
}