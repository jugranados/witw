import { Country } from "@/types/country";
import Link from "next/link";
import FlagImage from "@/components/atoms/flag-image";
import InfoItem from "@/components/atoms/info-item";

export default function CountryCard({ country }: { country: Country }) {
  const population =
    typeof country.population === "number"
      ? new Intl.NumberFormat().format(country.population)
      : "—";

  return (
    <Link href={`/country/${encodeURIComponent(country.name || "")}`}>
      <article className="rounded-md overflow-hidden bg-surface shadow-card hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="aspect-[3/2] w-full bg-gray-200 dark:bg-gray-700">
          <FlagImage
            flags={country.flags}
            name={country.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-6">
          <h3 className="font-extrabold text-base mb-3 text-foreground">
            {country.name}
          </h3>
          <ul className="space-y-1 text-sm">
            <InfoItem as="li" label="Population" value={population} />
            <InfoItem as="li" label="Region" value={country.region} />
            <InfoItem as="li" label="Capital" value={country.capital} />
          </ul>
        </div>
      </article>
    </Link>
  );
}