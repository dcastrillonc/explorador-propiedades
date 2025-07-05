'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/types/country';
import { getCountryByCode, getCountriesByCodes } from '@/lib/api/countries';
import Button from '@/components/ui/Button';
import SkeletonDetail from '@/components/SkeletonDetail';
import { formatNativeName, formatPopulation, formatCurrencies, formatLanguages } from '@/lib/utils/formatters';

export default function CountryDetailPage({
    params,
  }: {
    params: { countryName: string };
  }) {

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
          
          if (data.borders && data.borders.length > 0) { 
            setLoadingBorders(true);
            try {
              const borderData = await getCountriesByCodes(data.borders);
              setBorderCountries(borderData);
            } catch (borderErr) {
              console.error("Error fetching border countries:", borderErr);
            } finally {
              setLoadingBorders(false);
            }
          } else {
            setBorderCountries([]);
          }
        } else {
          setError("El país solicitado no fue encontrado"); 
          setCountry(null);
          setBorderCountries([]);
        }
      } catch (err) {
        console.error("Failed to fetch country details:", err);
        setError("No se pudo cargar la información del país. Por favor, inténtalo de nuevo.");
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

  const handleGoBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 flex items-center justify-center">
          <SkeletonDetail />
      </main>
    );
  }

  if (error || !country) {
    return (
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
        <div className="max-w-6xl mx-auto">
          <Button onClick={handleGoBack} className="mb-12 py-3 px-8 rounded-md shadow-md 
                                                  bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                                  hover:bg-gray-50 dark:hover:bg-gray-600 
                                                  focus:ring-2 focus:ring-blue-500 transition-all duration-200">
            ← Volver
          </Button>
          <div className="flex flex-col items-center justify-center h-full min-h-[calc(100vh-12rem)]">
              <div className="text-center text-gray-700 dark:text-gray-300 text-xl font-medium mt-8">
              {error || "Información del país no disponible."}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8">
      <div className="max-w-6xl mx-auto">
        <Button onClick={handleGoBack} className="mb-12 py-3 px-8 rounded-md shadow-md 
                                                bg-white dark:bg-gray-700 text-gray-900 dark:text-white 
                                                hover:bg-gray-50 dark:hover:bg-gray-600 
                                                focus:ring-2 focus:ring-blue-500 transition-all duration-200">
          ← Volver
        </Button>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-16 bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
          <div className="w-full md:w-1/2 lg:w-2/5 relative pb-[56.25%] md:pb-[28.125%] lg:pb-[25%]"> 
            {country.flags && (
              <Image
                src={country.flags.png}
                alt={country.flags.alt || `Bandera de ${country.name.common}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 30vw"
                style={{ objectFit: 'contain' }}
                className="rounded-md shadow-lg"
              />
            )}
          </div>

          <div className="w-full md:w-1/2 lg:w-3/5 text-gray-900 dark:text-white">
            <h1 className="text-4xl font-extrabold mb-8">{country.name.common}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4 text-lg">
              <div>
                <p><span className="font-semibold">Nombre nativo:</span> {formatNativeName(country.name.nativeName)}</p>
                <p className="mb-4"><span className="font-semibold">Capital:</span> {country.capital ? country.capital[0] : 'N/A'}</p>
                <p><span className="font-semibold">Población:</span> {formatPopulation(country.population)}</p>
                <p><span className="font-semibold">Región:</span> {country.region}</p>
                <p><span className="font-semibold">Subregión:</span> {country.subregion || 'N/A'}</p>
              </div>
              <div>
                <p><span className="font-semibold">Moneda(s):</span> {formatCurrencies(country.currencies)}</p>
                <p><span className="font-semibold">Idioma(s):</span> {formatLanguages(country.languages)}</p>
              </div>
            </div>

            {country.borders && country.borders.length > 0 ? (
              <div className="mt-12 flex flex-col md:flex-row md:items-center gap-4">
                <h3 className="font-semibold text-xl shrink-0">Países fronterizos:</h3>
                <div className="flex flex-wrap gap-2">
                  {loadingBorders ? (
                    Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="bg-gray-200 dark:bg-gray-700 h-8 w-24 rounded-md animate-pulse"></div>
                    ))
                  ) : (
                    borderCountries.map((borderCountry) => (
                      <Link href={`/${borderCountry.cca3}`} key={borderCountry.cca3}>
                        <Button className="px-4 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 shadow-sm transition-colors duration-200">
                          {borderCountry.name.common}
                        </Button>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            )  : (
              <div className="mt-12">
                <h3 className="font-semibold text-xl">Países fronterizos: <span className="font-normal text-gray-500 dark:text-gray-400">Ninguno</span></h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}