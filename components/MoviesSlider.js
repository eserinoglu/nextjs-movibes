import React from "react";
import Link from "next/link";
import Image from "next/image";

export default async function MoviesSlider({ type }) {
  const fetchMovies = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew";
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${type}?language=en-US&page=1`,
      { headers }
    );
    const data = await res.json();
    return data.results;
  };

  const data = await fetchMovies();
  return (
    <div className="w-full h-max relative pl-3 md:pl-10">
      <div
        id="slider"
        className="w-full h-max overflow-x-auto no-scrollbar relative"
      >
        <div className="w-max overflow-x-scroll flex items-center gap-2 md:gap-4 relative h-max">
          {data.slice(0, 10).map((item, index) => (
            <Link
              className="w-[7rem] aspect-[2/3] relative cursor-pointer md:w-[11rem]"
              href={`/movies/${item.id}`}
              key={index}
            >
              <Image
                sizes="100%"
                loading="lazy"
                fill
                style={{ marginRight: index === 9 ? "2.5rem" : 0 }}
                className="rounded-xl"
                src={`https://image.tmdb.org/t/p/w342${item.poster_path}`}
                alt=""
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
