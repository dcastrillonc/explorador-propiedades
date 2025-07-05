'use client'; 

import { useState } from 'react';
import { useCountries } from '@/hooks/useCountries'; 
import CountryCard from '@/components/CountryCard';
import SearchFilter from '@/components/SearchFilter'; 
import SkeletonCard from '@/components/ui/Skeleton'; 

export default function Home() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const { countries, loading, error, uniqueRegions } = useCountries({ searchTerm, selectedRegion });

  const skeletonCount = 8;

  const handleFilterChange = (newSearchTerm: string, newSelectedRegion: string) => {
    setSearchTerm(newSearchTerm);
    setSelectedRegion(newSelectedRegion);
  };

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <SearchFilter onFilterChange={handleFilterChange} regions={uniqueRegions} />

        {error && (
          <div className="text-red-600 dark:text-red-400 text-center text-xl font-medium mt-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {Array.from({ length: skeletonCount }).map((_, index) => (
              <SkeletonCard key={index} /> 
            ))}
          </div>
        ) : countries.length === 0 ? (
          <div className="text-center text-gray-700 dark:text-gray-300 text-xl font-medium mt-8">
            No se encontraron países que coincidan con tu búsqueda
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {countries.map((country) => (
              <CountryCard key={country.cca3} country={country} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}