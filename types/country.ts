export type Country = {
  name: string;
  capital?: string;
  population?: number;
  region?: string;
  subregion?: string;
  nativeName?: string;
  topLevelDomain?: string[];
  alpha2Code?: string;
  alpha3Code?: string;
  borders?: string[];
  flags?: { svg?: string; png?: string };
  currencies?: Array<{
    code?: string;
    name?: string;
    symbol?: string;
  }>;
  languages?: Array<{
    iso639_1?: string;
    iso639_2?: string;
    name?: string;
    nativeName?: string;
  }>;
};

export type RestCountriesResponse = {
  name: {
    common: string;
    official?: string;
    nativeName?: Record<string, { official?: string; common?: string }>;
  };
  tld?: string[];
  capital?: string[];
  region?: string;
  subregion?: string;
  population?: number;
  borders?: string[];
  currencies?: Record<string, { name: string; symbol?: string }>;
  languages?: Record<string, string>;
  flags?: {
    svg?: string;
    png?: string;
    alt?: string;
  };
};

export function transformRestCountriesData(data: RestCountriesResponse): Country {
  const currenciesArray = data.currencies
    ? Object.entries(data.currencies).map(([code, value]) => ({
        code,
        name: value.name,
        symbol: value.symbol,
      }))
    : undefined;

  const languagesArray = data.languages
    ? Object.entries(data.languages).map(([code, name]) => ({
        iso639_1: code,
        name,
      }))
    : undefined;

  const nativeName = data.name.nativeName
    ? Object.values(data.name.nativeName)[0]?.common
    : undefined;

  return {
    name: data.name.common,
    capital: data.capital?.[0],
    population: data.population,
    region: data.region,
    subregion: data.subregion,
    nativeName,
    topLevelDomain: data.tld,
    borders: data.borders,
    flags: data.flags,
    currencies: currenciesArray,
    languages: languagesArray,
  };
}