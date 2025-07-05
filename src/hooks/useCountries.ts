import { useState, useEffect, useCallback, useMemo } from 'react';
import { getAllCountries } from '@/lib/api/countries';
import { Country } from '@/types/country';

interface UseCountriesProps {
  searchTerm: string;
  selectedRegion: string;
}

export const useCountries = ({ searchTerm, selectedRegion }: UseCountriesProps) => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [allFetchedCountries, setAllFetchedCountries] = useState<Country[]>([]);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCountries({ name: searchTerm, region: selectedRegion });
      setCountries(data);

      if (!selectedRegion && !searchTerm) { 
        const allData = await getAllCountries();
        setAllFetchedCountries(allData);
      }

    } catch (err) {
      console.error("Failed to fetch countries:", err);
      setError("No se pudieron cargar los países. Intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [searchTerm, selectedRegion]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const uniqueRegions = useMemo(() => {
    const regions = new Set<string>();
    regions.add('');
    
    allFetchedCountries.forEach(country => {
      if (country.region) {
        regions.add(country.region);
      }
    });
    return Array.from(regions).sort(); 
  }, [allFetchedCountries]);

  return { countries, loading, error, uniqueRegions };
};