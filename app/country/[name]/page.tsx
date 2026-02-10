import { Country, RestCountriesResponse, transformRestCountriesData } from "@/types/country";
import CountryDetail from "@/components/country-detail";

type Props = {
  params: Promise<{
    name: string;
  }>;
};

async function getCountries(): Promise<Country[]> {
  try {
    const response = await fetch(
      "https://restcountries.com/v3.1/all?fields=tld,name,capital,subregion,region,population,borders,currencies,languages,flags",
      { cache: "force-cache" }
    );
    const raw: RestCountriesResponse[] = await response.json();
    return raw.map(transformRestCountriesData);
  } catch {
    return [];
  }
}

async function getCountryByName(countries: Country[], name: string): Promise<Country | null> {
  const decodedName = decodeURIComponent(name);
  return countries.find((c) => c.name?.toLowerCase() === decodedName.toLowerCase()) || null;
}

async function getBorderCountryByCode(code: string): Promise<Country | null> {
  try {
    const response = await fetch(
      `https://restcountries.com/v3.1/alpha/${code}?fields=tld,name,capital,subregion,region,population,borders,currencies,languages,flags`,
      { cache: "force-cache" }
    );
    const data: RestCountriesResponse = await response.json();
    return transformRestCountriesData(data);
  } catch {
    return null;
  }
}

async function getBorderCountryNames(borderCodes: string[] | undefined): Promise<Country[]> {
  if (!borderCodes || borderCodes.length === 0) return [];
  
  const borderCountries = await Promise.all(
    borderCodes.map((code) => getBorderCountryByCode(code))
  );
  return borderCountries.filter((c) => c !== null) as Country[];
}

export default async function CountryDetailPage(props: Props) {
  const params = await props.params;
  const countries = await getCountries();
  const country = await getCountryByName(countries, params.name);

  if (!country) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="mx-auto max-w-screen1440 px-4 sm:px-8 py-8">
          <p className="text-lg">Country not found</p>
        </div>
      </div>
    );
  }

  const borderCountries = await getBorderCountryNames(country.borders);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-screen1440 px-4 sm:px-8 py-8">
        <CountryDetail country={country} borderCountries={borderCountries} />
      </div>
    </div>
  );
}
