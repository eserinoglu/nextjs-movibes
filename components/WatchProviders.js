"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";

export default function WatchProviders({ id }) {
  const [providers, setProviders] = useState(null);
  async function fetchProviders() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}/watch/providers`,
      options
    );
    const data = await res.json();
    setProviders(data.results.US || null);
  }

  useEffect(() => {
    fetchProviders();
  }, [id]);

  const buyingOptions = providers && providers.buy ? providers.buy : null;
  const flatRateOptions =
    providers && providers.flatrate ? providers.flatrate : null;

  return (
    <div className=" w-full gap-5 flex flex-col md:grid md:grid-cols-2">
      <div className="flex flex-col gap-4 col-span-1 bg-[#212121] p-3 md:p-6 rounded-xl">
        <h5 className="text-[#666666]">Buy or Rent</h5>
        <div className="grid grid-cols-6 md:flex items-center gap-2">
          {buyingOptions ? (
            buyingOptions.slice(0, 6).map((item) => (
              <div
                key={item.provider_id}
                className="col-span-1 md:w-[4rem] aspect-square rounded-xl relative"
              >
                <Image
                  fill
                  sizes="100%"
                  key={item.provider_id}
                  className="rounded-2xl"
                  src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                  alt=""
                />
              </div>
            ))
          ) : (
            <div className="h-6 col-span-full flex md:w-full items-center text-sm">
              No provider found.
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-4 col-span-1 bg-[#212121] p-3 md:p-6 rounded-xl">
        <h5 className="text-[#666666]">Stream</h5>
        <div className="grid grid-cols-6 md:flex items-center gap-2">
          {flatRateOptions ? (
            flatRateOptions.slice(0, 6).map((item) => (
              <div
                key={item.provider_id}
                className="col-span-1 md:w-[4rem] aspect-square rounded-2xl relative"
              >
                <Image
                  fill
                  sizes="100%"
                  key={item.provider_id}
                  className="rounded-2xl"
                  src={`https://image.tmdb.org/t/p/w500${item.logo_path}`}
                  alt=""
                />
              </div>
            ))
          ) : (
            <div className="h-6 col-span-full flex md:w-full items-center text-sm">
              No provider found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
