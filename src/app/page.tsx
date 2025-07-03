//Vista principal que usará el hook y los componentes
'use client'; 

import { useCountries } from '@/hooks/useCountries';
import CountryCard from '@/components/CountryCard';
import SearchFilter from '@/components/SearchFilter'; 
import Skeleton from '@/components/ui/Skeleton'; 

export default function Home() {
  const { countries, loading, error } = useCountries();

  const skeletonCount = 8;

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">

      {error && (
        <div className="text-red-600 dark:text-red-400 text-center text-lg mt-8">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {loading ? (
          //Mostrar skeleton loaders mientras carga
          Array.from({ length: skeletonCount }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))
        ) : (
          //Mostrar las tarjetas de países
          countries.map((country) => (
            <CountryCard key={country.cca3} country={country} />
          ))
        )}
      </div>
    </main>
  );
}