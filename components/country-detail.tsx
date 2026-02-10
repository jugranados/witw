"use client";

import { Country } from "@/types/country";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

type Props = {
  country: Country;
  borderCountries: Country[];
};

export default function CountryDetail({ country, borderCountries }: Props) {
  const router = useRouter();

  const formatPopulation = (pop: number | undefined) => {
    if (!pop) return "—";
    return new Intl.NumberFormat().format(pop);
  };

  const getCurrencies = (currencies: Country["currencies"]) => {
    if (!currencies || currencies.length === 0) return "—";
    return currencies.map((c) => c.name || c.code || "—").join(", ");
  };

  const getLanguages = (languages: Country["languages"]) => {
    if (!languages || languages.length === 0) return "—";
    return languages.map((l) => l.name || "—").join(", ");
  };

  const getTopLevelDomain = (domains: string[] | undefined) => {
    if (!domains || domains.length === 0) return "—";
    return domains.join(", ");
  };

  const flagSrc = country.flags?.svg || country.flags?.png || "";

  return (
    <div className="space-y-8">
      <button
        onClick={() => router.back()}
        className="inline-flex items-center gap-2 px-6 py-2 rounded-md bg-surface text-foreground shadow-md hover:shadow-lg transition-shadow"
      >
        <ArrowLeftIcon className="h-5 w-5" />
        <span>Back</span>
      </button>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-center">
          {flagSrc && (
            <img
              src={flagSrc}
              alt={`${country.name} flag`}
              className="w-full rounded-lg shadow-lg"
            />
          )}
        </div>

        <div className="space-y-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-foreground">
            {country.name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-3">
              <DetailItem label="Native Name" value={country.nativeName} />
              <DetailItem
                label="Population"
                value={formatPopulation(country.population)}
              />
              <DetailItem label="Region" value={country.region} />
              <DetailItem label="Sub Region" value={country.subregion} />
              <DetailItem label="Capital" value={country.capital} />
            </div>

            <div className="space-y-3">
              <DetailItem
                label="Top Level Domain"
                value={getTopLevelDomain(country.topLevelDomain)}
              />
              <DetailItem
                label="Currencies"
                value={getCurrencies(country.currencies)}
              />
              <DetailItem
                label="Languages"
                value={getLanguages(country.languages)}
              />
            </div>
          </div>

          {borderCountries.length > 0 && (
            <div className="pt-6 border-t border-muted/20">
              <h2 className="text-lg font-semibold text-foreground mb-4">
                Border Countries:
              </h2>
              <div className="flex flex-wrap gap-3">
                {borderCountries.map((border) => (
                  <Link
                    key={border.name}
                    href={`/country/${encodeURIComponent(border.name || "")}`}
                    className="px-4 py-2 bg-surface text-foreground rounded-md shadow-md hover:shadow-lg transition-shadow text-sm"
                  >
                    {border.name}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

type DetailItemProps = {
  label: string;
  value: string | undefined;
};

function DetailItem({ label, value }: DetailItemProps) {
  return (
    <div className="text-sm">
      <span className="font-semibold text-foreground">{label}: </span>
      <span className="text-muted">{value || "—"}</span>
    </div>
  );
}
