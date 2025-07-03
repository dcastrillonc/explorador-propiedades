//Recibe los datos de un pais para mostrarlo 
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/types/country'; 
import { formatPopulation } from '@/lib/utils/formatters';

interface CountryCardProps {
  country: Country;
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
  const capitalDisplay = country.capital && country.capital.length > 0 ? country.capital[0] : 'N/A';

  return (
    <Link href={`/${country.cca3}`}>
      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative w-full h-40">
          <Image
            src={country.flags.png}
            alt={country.flags.alt || `Bandera de ${country.name.common}`}
            fill 
            style={{ objectFit: 'cover' }} 
            priority 
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="p-6 flex-grow"> 
          <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">{country.name.common}</h2>
          <div className="space-y-1 text-gray-700 dark:text-gray-300">
            <p><span className="font-semibold">Población:</span> {formatPopulation(country.population)}</p>
            <p><span className="font-semibold">Región:</span> {country.region}</p>
            <p><span className="font-semibold">Capital:</span> {capitalDisplay}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CountryCard;