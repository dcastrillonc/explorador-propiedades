//Funciones de formateo
import { Country } from '@/types/country';

export const formatPopulation = (population: number): string => {
  return new Intl.NumberFormat('es-ES').format(population);
};

export const formatCurrencies = (currencies?: Country['currencies']): string => {
  if (!currencies) return 'N/A';
  return Object.values(currencies)
    .map(currency => `${currency.name} (${currency.symbol})`)
    .join(', ');
};

export const formatLanguages = (languages?: Country['languages']): string => {
  if (!languages) return 'N/A';
  return Object.values(languages).join(', ');
};

export const formatNativeName = (nativeName?: Country['name']['nativeName']): string => {
  if (!nativeName) return 'N/A';
  const lastKey = Object.keys(nativeName).pop();
  return lastKey ? nativeName[lastKey].common : 'N/A';
};