import React from "react";
import Image from "next/image";
import Link from "next/link";

export default async function MovieGrid({ query }) {
  const fetchMovies = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const resultsData = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1&sort_by=vote_average.desc`,
      options
    );
    const results = await resultsData.json();
    return results;
  };
  const results = await fetchMovies();
  if (results) {
    return (
      <div className="w-full md:w-5/6 ml-auto flex flex-col px-3 md:px-10 gap-5 mb-10">
        <div className="flex flex-col md:flex-row md:items-end w-full justify-between">
          <div className="flex flex-col">
            <h5 className="opacity-60 md:text-lg">Search results for</h5>
            <h3 className="text-2xl md:text-3xl font-semibold">
              {query &&
                query
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ")}
            </h3>
          </div>
          <p className="mt-2 opacity-50">{results.total_results} results</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {results.results
            .filter((item) => item.poster_path)
            .map((item) => (
              <Link
                key={item.id}
                href={`/movies/${item.id}`}
                className="col-span-1 aspect-[2/3] rounded-xl cursor-pointer relative"
              >
                <Image
                  fill
                  sizes="100%"
                  className="rounded-xl object-cover"
                  loading="eager"
                  src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                  alt=""
                />
              </Link>
            ))}
        </div>
      </div>
    );
  }
}
