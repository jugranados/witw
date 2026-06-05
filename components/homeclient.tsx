"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/searchbar";
import RegionSelect, { Region } from "@/components/regionselect";
import CountryCard from "@/components/countrycard";
import { Country, RestCountriesResponse, transformRestCountriesData } from "@/types/country";

export default function HomeClient() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [query, setQuery] = useState("");
  const [region, setRegion] = useState<Region>("All");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 8;

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=tld,name,capital,subregion,region,population,borders,currencies,languages,flags",
          { cache: "force-cache" }
        );
        const raw: RestCountriesResponse[] = await res.json();
        const parsed = raw.map(transformRestCountriesData);
        if (!cancelled) setCountries(parsed);
      } catch {
        if (!cancelled) setCountries([]);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const regions = useMemo(() => {
    const set = new Set<string>();
    countries.forEach((c) => c.region && set.add(c.region));
    return Array.from(set).sort((a, b) => a.localeCompare(b));
  }, [countries]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return countries.filter((c) => {
      const matchRegion = region === "All" ? true : c.region === region;
      const matchQuery = q ? (c.name || "").toLowerCase().includes(q) : true;
      return matchRegion && matchQuery;
    });
  }, [countries, query, region]);

  // Reset to page 1 when filters change
  useEffect(() => {
    setPage(1);
  }, [query, region]);

  const totalPages = Math.max(1, Math.ceil(visible.length / PAGE_SIZE));
  const paginated = visible.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className="mx-auto max-w-screen1440 px-4 sm:px-8 py-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between mb-8">
        <SearchBar value={query} onChange={setQuery} />
        <RegionSelect value={region} onChange={setRegion} options={regions} />
      </div>

      <section
        aria-label="Countries"
        className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {paginated.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </section>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-4 py-2 rounded shadow bg-elements text-foreground disabled:opacity-40 hover:opacity-80 transition-opacity"
            aria-label="Previous page"
          >
            Previous
          </button>
          <span className="text-sm text-foreground">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-4 py-2 rounded shadow bg-elements text-foreground disabled:opacity-40 hover:opacity-80 transition-opacity"
            aria-label="Next page"
          >
            Next
          </button>
        </div>
      )}
    </main>
  );
}