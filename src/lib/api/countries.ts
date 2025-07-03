//Funciones para interactuar con la API
import { Country } from '@/types/country';

const BASE_URL = 'https://restcountries.com/v3.1';

const ALL_COUNTRY_FIELDS = ['name', 'population', 'region', 'subregion', 'capital', 'flags', 'cca3', 'currencies', 'languages', 'borders'].join(',');

export const getCountryByCode = async (code: string): Promise<Country | undefined> => {
  try {
    const url = `${BASE_URL}/alpha/${code}?fields=${ALL_COUNTRY_FIELDS}`;
    console.log(`Attempting to fetch country by code from URL: ${url}`);

    const response = await fetch(url);
    console.log(`Response status for ${code}:`, response.status);

    if (!response.ok) {
      if (response.status === 404) {
        return undefined; // Country not found
      }
      const errorData = await response.json().catch(() => ({ message: 'No error message from API' }));
      throw new Error(`HTTP error! Status: ${response.status} - ${errorData.message || 'Unknown API error'}`);
    }

    const data = await response.json();

    if (Array.isArray(data) && data.length > 0) {
      const countryData = data[0];
      return countryData;
    } else if (typeof data === 'object' && data !== null && !Array.isArray(data)) {
      return data as Country;
    } else {
      return undefined;
    }
  } catch (error) {
    return undefined; 
  }
};

export const getAllCountries = async (): Promise<Country[]> => {
  try {
    const url = `${BASE_URL}/all?fields=${ALL_COUNTRY_FIELDS}`;
    console.log("Fetching all countries from URL:", url); 

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response Data:", errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching all countries:", error);
    throw error;
  }
};

export const getCountriesByCodes = async (codes: string[]): Promise<Country[]> => {
  if (codes.length === 0) return [];
  try {
    const url = `${BASE_URL}/alpha?codes=${codes.join(',')}&fields=${ALL_COUNTRY_FIELDS}`;
    console.log(`Fetching countries by codes (${codes.join(',')}) from URL:`, url);

    const response = await fetch(url);
    if (!response.ok) {
      const errorData = await response.json();
      console.error("API Error Response Data for Codes:", errorData);
      throw new Error(`HTTP error! status: ${response.status} - ${errorData.message || 'Unknown error'}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching countries by codes (${codes.join(',')}):`, error);
    throw error;
  }
};