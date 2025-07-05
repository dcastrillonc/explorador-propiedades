import Image from 'next/image';
import Link from 'next/link';
import { Country } from '@/types/country';

interface CountryCardProps {
  country: Country;
}

export default function CountryCard({ country }: CountryCardProps) {
  return (
    <Link 
      href={`/${country.cca3}`} 
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden 
                 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500" // Añadimos ring para accesibilidad
    >
      <div className="relative w-full h-40">
        <Image
          src={country.flags.png}
          alt={country.flags.alt || `Bandera de ${country.name.common}`}
          fill
          style={{ objectFit: 'cover' }}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h2 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
          {country.name.common}
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-1 leading-relaxed">
          <strong className="font-semibold">Población:</strong> {country.population.toLocaleString()}
        </p>
        <p className="text-gray-700 dark:text-gray-300 mb-1 leading-relaxed">
          <strong className="font-semibold">Región:</strong> {country.region}
        </p>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          <strong className="font-semibold">Capital:</strong> {country.capital ? country.capital[0] : 'N/A'}
        </p>
      </div>
    </Link>
  );
}