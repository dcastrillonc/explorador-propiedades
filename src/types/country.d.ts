// Estructura de datos de la API
export interface Country {
  name: {
    common: string;
    official: string;
    nativeName?: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  population: number;
  region: string;
  subregion?: string;
  capital?: string[];
  flags: {
    png: string;
    svg: string;
    alt?: string;
  };
  cca3: string; 
  borders?: string[];
  currencies?: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  languages?: {
    [key: string]: string;
  };
}