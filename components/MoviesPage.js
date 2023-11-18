"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import FilteringBar from "./FilteringBar";
import DetailModal from "./DetailModal";
export default function Movies({ genres }) {
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  //filtering and sorting states
  const [selectedGenre, setSelectedGenre] = useState(28);
  const [minRating, setMinRating] = useState(5);
  const [minYear, setMinYear] = useState(1950);
  const [includeAdult, setIncludeAdult] = useState(false);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [page, setPage] = useState(1);

  //modal states
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  async function fetchMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };
    setIsLoading(true);
    const moviesData = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedGenre}&sort_by=${sortBy}&primary_release_date.gte=${minYear}&vote_average.gte=${minRating}&include_adult=${includeAdult}&vote_count.gte=500&language=en-US&page=${page}`,
      options
    );
    const res = await moviesData.json();
    setMovies(res);
    setIsLoading(false);
  }

  useEffect(() => {
    fetchMovies();
    scrollTo(0, 0);
  }, [selectedGenre, minRating, minYear, includeAdult, sortBy, page]);

  useEffect(() => {
    setIncludeAdult(false);
    setMinRating(5);
    setMinYear(1950);
    setSortBy("popularity.desc");
    setPage(1);
    window.scrollTo(0, 0);
  }, [selectedGenre]);

  useEffect(() => {
    setPage(1);
  }, [sortBy, minYear, minRating, includeAdult]);

  return (
    <div className="min-h-screen">
      <div
        style={{
          transitionDuration: "0.5s",
          transitionProperty: "transform",
          transform: showModal ? "translateY(0)" : "translateY(100%)",
        }}
        className="w-full h-[93dvh] fixed bottom-0 bg-[#191919] rounded-tr-3xl flex rounded-tl-3xl flex-col overflow-y-scroll overflow-x-hidden shadow-xl z-30"
      >
        <DetailModal
          data={selectedMovie}
          showModal={showModal}
          setShowModal={setShowModal}
          setSelectedMovie={setSelectedMovie}
        />
      </div>
      <div
        style={{
          opacity: showModal ? "1" : "0",
          transitionDuration: "0.3s",
          pointerEvents: showModal ? "auto" : "none",
        }}
        className="w-screen h-screen fixed top-0 right-0 bg-[#000000c0] backdrop-blur-md z-20"
      ></div>
      <div className="w-full md:w-5/6 flex flex-col ml-auto gap-5 relative">
        <div className="w-full overflow-x-scroll no-scrollbar sticky py-4 -mt-5 top-0 z-10 bg-[#19191987] backdrop-blur-lg">
          <div className="w-max overflow-x-scroll gap-2 flex items-center">
            {genres.map((item, index) => (
              <div
                style={{
                  opacity: selectedGenre === item.id ? "1" : "0.4",
                  marginLeft: index === 0 ? "1rem" : "0",
                  marginRight: index === genres.length - 1 ? "1rem" : "0",
                  backgroundColor:
                    selectedGenre === item.id
                      ? "rgba(61, 210, 204, 0.7)"
                      : "#212121",
                  transitionDuration: "0.3s",
                }}
                key={item.id}
                onClick={() => setSelectedGenre(item.id)}
                className="px-8 md:px-10 box-content py-3 text-center rounded-lg cursor-pointer select-none"
              >
                <h5 className="text-white">{item.name}</h5>
              </div>
            ))}
          </div>
        </div>
        <div className="w-full grid grid-cols-8 px-3 md:px-10 z-0">
          <div className="col-span-8 md:col-span-6 grid grid-cols-3 md:grid-cols-5 gap-2 md:pr-5 mb-10">
            {isLoading ? (
              <div className="col-span-full h-[80vh] flex justify-center items-center">
                <div className="w-14 h-14 rounded-full border-2 border-[#3dd2cc] border-dashed animate-spin"></div>
              </div>
            ) : (
              movies.results.map((item) => (
                <div
                  className="col-span-1 aspect-[2/3] relative cursor-pointer"
                  key={item.id}
                  onClick={() => {
                    setSelectedMovie(item);
                    setShowModal(true);
                  }}
                >
                  <Image
                    sizes="100%"
                    loading="eager"
                    fill
                    className="object-cover rounded-xl"
                    src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                    alt=""
                  />
                </div>
              ))
            )}
            <div className="col-span-full flex items-center justify-between mt-5">
              <button
                disabled={page === 1}
                onClick={() => setPage(page - 1)}
                className="bg-[#212121] rounded-lg px-5 py-3 text-sm opacity-50 hover:opacity-90 duration-150"
              >
                Previous page
              </button>
              <p className="font-semibold text-3xl opacity-60">{page}</p>
              <button
                onClick={() => setPage(page + 1)}
                className="bg-[#212121] rounded-lg px-5 py-3 text-sm opacity-50 hover:opacity-90 duration-150"
              >
                Next page
              </button>
            </div>
          </div>
          <FilteringBar
            includeAdult={includeAdult}
            setIncludeAdult={setIncludeAdult}
            minRating={minRating}
            setMinRating={setMinRating}
            minYear={minYear}
            setMinYear={setMinYear}
            sortBy={sortBy}
            setSortBy={setSortBy}
          />
        </div>
      </div>
    </div>
  );
}
