import { Country } from "@/types/country";
import Link from "next/link";

export default function CountryCard({ country }: { country: Country }) {
  const population =
    typeof country.population === "number"
      ? new Intl.NumberFormat().format(country.population)
      : "—";

  const flagSrc = country.flags?.svg || country.flags?.png || "";

  return (
    <Link href={`/country/${encodeURIComponent(country.name || "")}`}>
      <article className="rounded-md overflow-hidden bg-surface shadow-card hover:shadow-lg transition-shadow cursor-pointer h-full">
        <div className="h-40 w-full bg-gray-200 dark:bg-gray-700">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={flagSrc}
            alt={country.name ? `${country.name} flag` : "Country flag"}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        </div>

        <div className="p-6">
          <h3 className="font-extrabold text-base mb-3 text-foreground">
            {country.name}
          </h3>
          <ul className="space-y-1 text-sm">
            <li>
              <span className="font-semibold text-foreground">
                Population:
              </span>{" "}
              <span className="text-muted">
                {population}
              </span>
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Region:
              </span>{" "}
              <span className="text-muted">
                {country.region || "—"}
              </span>
            </li>
            <li>
              <span className="font-semibold text-foreground">
                Capital:
              </span>{" "}
              <span className="text-muted">
                {country.capital || "—"}
              </span>
            </li>
          </ul>
        </div>
      </article>
    </Link>
  );
}