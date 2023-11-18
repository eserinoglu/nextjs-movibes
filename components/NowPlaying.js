import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AiFillStar } from "react-icons/ai";

export default async function NowPlaying() {
  const fetchMovies = async () => {
    const token =
      "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew";
    const headers = {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    const res = await fetch(
      "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
      { headers }
    );
    const data = await res.json();
    return data.results[0];
  };

  const data = await fetchMovies();
  return (
    <div className="w-full gap-5">
      <Link href={`/movies/${data.id}`}>
        <div className="w-full aspect-[4/4.5] md:aspect-[16/6] relative bg-black rounded-xl p-4 md:p-7 flex items-end border-[1px] border-[#ffffff2d] md:hover:scale-[1.03] duration-150">
          <div
            style={{
              transitionDuration: "0.3s",
              background: "rgb(25, 25, 25)",
              background:
                "linear-gradient(0deg, rgba(25,25,25,1) 1%, rgba(255,255,255,0) 99%)",
            }}
            className="w-full h-full absolute right-0 top-0 pointer-events-none z-10 rounded-xl"
          ></div>
          <div className="absolute top-0 right-0 w-full h-full rounded-xl object-cover">
            <Image
              priority
              fill
              loading="eager"
              sizes="100%"
              className="rounded-xl object-cover"
              src={`https://image.tmdb.org/t/p/original${data.backdrop_path}`}
              alt=""
            />
          </div>

          <div className="flex flex-col w-full gap-3">
            <h4 className="font-bold text-3xl md:text-4xl md:font-semibold z-20 w-3/4">
              {data.title}
            </h4>
            <div className="flex items-center gap-2 z-10 opacity-70">
              <AiFillStar color="#f1c40f" size={30} />
              <p className="text-xl font-semibold">
                {data.vote_average.toFixed(1)}
              </p>
            </div>
            <p className="opacity-50 z-20 w-full md:w-3/4 line-clamp-3 text-sm">
              {data.overview}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
}
