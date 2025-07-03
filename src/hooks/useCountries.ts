//Hook encargado de la lógica de fetching de datos
import { useState, useEffect, useCallback } from 'react';
import { Country } from '@/types/country'; 
import { getAllCountries } from '@/lib/api/countries';

export const useCountries = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getAllCountries();
      setCountries(data);
    } catch (err) {
      console.error("Failed to fetch countries:", err);
      setError("No se pudo cargar los países. Intenta de nuevo.");
      setCountries([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  return { countries, loading, error, refetch: fetchCountries };
};