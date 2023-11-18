import React from "react";
import CastView from "@/components/CastView";
import CrewView from "@/components/CrewView";
import WatchProviders from "@/components/WatchProviders";
import MovieBanner from "@/components/MovieBanner";

export const metadata = {
  title: "Movie Detail",
  description: "Details about the movie.",
};

export default async function MovieDetailPage({ params }) {
  const fetchMovieData = async () => {
    const options = {
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${params.id}?language=en-US`,
      options
    );
    const data = await res.json();
    return data;
  };
  const data = await fetchMovieData();

  return (
    <div className="w-full md:w-5/6 ml-auto mb-5 px-3 md:px-10">
      <MovieBanner data={data} />
      <div className="w-full flex h-full flex-col gap-3 p-4 md:p-5 rounded-xl bg-[#ffffff0d] mt-5">
        <h4 className="text-xl md:text-2xl font-semibold">Overview</h4>
        <p className="opacity-50 h-full overflow-y-scroll">{data.overview}</p>
      </div>
      <div className="h-full w-full md:p-5 flex flex-col gap-4 bg-[#ffffff0d] p-4 rounded-xl mt-5">
        <h4 className="text-xl md:text-2xl font-semibold">Cast</h4>
        <CastView id={data.id} />
      </div>
      <div className="mt-6 flex flex-col gap-4">
        <h4 className="text-xl md:text-2xl font-semibold">
          Watch Providers{" "}
          <span className="text-xs opacity-50 font-light">for U.S.</span>
        </h4>
        <WatchProviders id={data.id} />
      </div>
      <div className="flex flex-col gap-3 mt-6">
        <h4 className="text-xl md:text-2xl font-semibold">Crew</h4>
        <CrewView id={data.id} />
      </div>
    </div>
  );
}
