import React from "react";
import MoviesSlider from "@/components/MoviesSlider";
import NowPlaying from "@/components/NowPlaying";

export const metadata = {
  title: "Movibes",
  description:
    "Movibes is a movie database that allows you to explore movies and also create your specialized lists.",
};

export default async function Home() {
  return (
    <div className="w-full md:w-5/6 md:ml-auto mb-5 md:mb-10">
      <div className="flex flex-col w-full gap-4 md:px-10 px-3">
        <h4 className="text-lg font-semibold opacity-60">Now Playing</h4>
        <NowPlaying />
      </div>
      <div className="w-full flex flex-col gap-4 mt-8">
        <div className="flex w-full items-center justify-between px-3 md:px-10">
          <h4 className="text-xl font-semibold opacity-60">Popular Movies</h4>
        </div>
        <MoviesSlider type={"popular"} />
      </div>
      <div className="w-full flex flex-col gap-4 mt-8">
        <div className="flex w-full items-center justify-between px-3 md:px-10">
          <h4 className="text-xl font-semibold opacity-60">Upcoming Movies</h4>
        </div>
        <MoviesSlider type={"upcoming"} />
      </div>
      <div className="w-full flex flex-col gap-4 mt-8">
        <div className="flex w-full items-center justify-between px-3 md:px-10">
          <h4 className="text-xl font-semibold opacity-60">Top Rated Movies</h4>
        </div>
        <MoviesSlider type={"top_rated"} />
      </div>
    </div>
  );
}
