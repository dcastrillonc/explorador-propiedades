"use client";

import { useEffect, useState } from 'react';
import { Country } from '@/types/country';
import { getCountryByCode, getCountriesByCodes } from '@/lib/api/countries';
import { formatPopulation, formatCurrencies, formatLanguages, formatNativeName } from '@/lib/utils/formatters';
import Button from '@/components/ui/Button';
import Skeleton from '@/components/ui/Skeleton';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface CountryDetailPageProps {
  params: {
    countryName: string;
  };
}

export default function CountryDetailPage({ params }: CountryDetailPageProps) {
  const router = useRouter();
  const { countryName } = params;

  const [country, setCountry] = useState<Country | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [borderCountries, setBorderCountries] = useState<Country[]>([]);
  const [loadingBorders, setLoadingBorders] = useState<boolean>(false);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getCountryByCode(countryName); 

        if (data) {
          setCountry(data); 
          console.log("Country data set to state:", data.name.common); 
          
          if (data.borders && data.borders.length > 0) { 
            setLoadingBorders(true);
            console.log("Fetching border countries:", data.borders);
            try {
              const borderData = await getCountriesByCodes(data.borders);
              setBorderCountries(borderData);
              console.log("Border countries data set:", borderData.map(c => c.name.common));
            } catch (borderErr) {
              console.error("Error fetching border countries:", borderErr);
            } finally {
              setLoadingBorders(false);
            }
          } else {
            setBorderCountries([]);
          }
        } else {
          setError("País no encontrado."); 
          setCountry(null);
          setBorderCountries([]);
        }
      } catch (err) {
        setError("No se pudo cargar la información del país. Intenta de nuevo más tarde.");
        setCountry(null);
        setBorderCountries([]);
      } finally {
        setLoading(false);
      }
    };

    if (countryName) {
      fetchCountryDetails();
    } else {
      setError("URL inválida. No se especificó un país.");
      setLoading(false);
    }
  }, [countryName]);

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
        <div className="w-full max-w-4xl bg-white dark:bg-gray-800 shadow-md rounded-lg p-8 flex flex-col md:flex-row gap-8">
          <Skeleton className="w-full md:w-1/2 h-64 md:h-auto" />
          <div className="w-full md:w-1/2 space-y-4">
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-5/6" />
            <Skeleton className="h-6 w-4/5" />
            <Skeleton className="h-6 w-1/2" />
          </div>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center justify-center">
        <Button onClick={() => router.back()} className="mb-4">← Volver</Button>
        <div className="text-red-600 dark:text-red-400 text-center text-xl">
          {error}
        </div>
      </main>
    );
  }

  if (!country) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex flex-col items-center justify-center">
        <Button onClick={() => router.back()} className="mb-4">← Volver</Button>
        <div className="text-gray-600 dark:text-gray-400 text-center text-xl">
          Información del país no disponible.
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <Button onClick={() => router.back()} className="mb-12">← Volver</Button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 lg:w-2/5 relative h-64 md:h-96">
            {country.flags && (
              <img
                src={country.flags.png}
                alt={country.flags.alt || `Bandera de ${country.name.common}`}
                className="w-full h-full object-cover rounded-md shadow-lg"
              />
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-3/5 text-gray-900 dark:text-white">
            <h1 className="text-4xl font-extrabold mb-8">{country.name.common}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-lg">
              <div>
                <p><span className="font-semibold">Nombre Nativo:</span> {formatNativeName(country.name.nativeName)}</p>
                <p><span className="font-semibold">Población:</span> {formatPopulation(country.population)}</p>
                <p><span className="font-semibold">Región:</span> {country.region}</p>
                <p><span className="font-semibold">Sub Región:</span> {country.subregion || 'N/A'}</p>
                <p><span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
              </div>
              <div>
                <p><span className="font-semibold">Moneda(s):</span> {formatCurrencies(country.currencies)}</p>
                <p><span className="font-semibold">Idioma(s):</span> {formatLanguages(country.languages)}</p>
              </div>
            </div>

            {country.borders && country.borders.length > 0 && (
              <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4">
                <h3 className="font-semibold text-xl shrink-0">Países Fronterizos:</h3>
                <div className="flex flex-wrap gap-2">
                  {loadingBorders ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-8 w-24" />
                    ))
                  ) : (
                    borderCountries.length > 0 ? (
                      borderCountries.map((borderCountry) => (
                        <Link href={`/${borderCountry.cca3}`} key={borderCountry.cca3}>
                          <Button className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm transition-colors duration-200">
                            {borderCountry.name.common}
                          </Button>
                        </Link>
                      ))
                    ) : (
                      <span className="text-gray-500 dark:text-gray-400">N/A</span>
                    )
                  )}
                </div>
              </div>
            )}
            {!country.borders || country.borders.length === 0 && (
              <div className="mt-12">
                <h3 className="font-semibold text-xl">Países Fronterizos: <span className="font-normal text-gray-500 dark:text-gray-400">Ninguno</span></h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}