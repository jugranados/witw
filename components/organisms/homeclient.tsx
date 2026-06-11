"use client";

import { useEffect, useMemo, useState } from "react";
import SearchBar from "@/components/molecules/searchbar";
import RegionSelect, { Region } from "@/components/molecules/regionselect";
import CountryCard from "@/components/molecules/countrycard";
import Pagination from "@/components/molecules/pagination";
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
    <main className="mx-auto max-w-screen1440 px-4 sm:px-8 py-6 sm:py-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
        <SearchBar value={query} onChange={setQuery} />
        <RegionSelect value={region} onChange={setRegion} options={regions} />
      </div>

      <section
        aria-label="Countries"
        className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {paginated.map((c) => (
          <CountryCard key={c.name} country={c} />
        ))}
      </section>

      <Pagination
        page={page}
        totalPages={totalPages}
        onPrev={() => setPage((p) => Math.max(1, p - 1))}
        onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
      />
    </main>
  );
}