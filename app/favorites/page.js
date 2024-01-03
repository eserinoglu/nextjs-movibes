"use client";
import React, { useContext, useEffect } from "react";
import Image from "next/image";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { MovieContext } from "@/context/MovieContext";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function FavoritesList() {
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) router.push("/sign-in");
  }, [user]);
  const { favorites, removeFavorites } = useContext(MovieContext);
  if (favorites) {
    return (
      <div className="w-full md:w-5/6 md:ml-auto px-3 md:px-10 flex flex-col gap-4">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          limit={5}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className="w-full p-5 bg-[#212121] rounded-xl h-auto relative overflow-hidden flex items-center">
          <Image
            className="rounded-xl absolute top-0 right-0 blur-2xl opacity-60"
            objectFit="cover"
            fill
            loading="eager"
            sizes="100%"
            src={`https://image.tmdb.org/t/p/w500/${favorites[0].poster_path}`}
          />
          <div className="w-full flex flex-col gap-2 items-center">
            <AiFillHeart className="z-10" color="#3dd2cc" size={36} />
            <h4 className="text-2xl md:text-4xl font-semibold z-10">
              Favorites
            </h4>
            <p className="opacity-50 z-10 text-xs">{favorites.length} movies</p>
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10">
          {favorites.map((movie) => (
            <div
              key={movie.id}
              className="col-span-1 aspect-[2/3] relative group cursor-pointer"
            >
              <Link key={movie.id} href={`/movies/${movie.movie_id}`}>
                <Image
                  src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                  alt={movie.title}
                  fill
                  loading="eager"
                  className="rounded-xl movie-img"
                />
              </Link>
              <div className="overlay flex p-4 flex-col absolute bottom-0 rounded-bl-xl rounded-br-xl opacity-0 w-full h-1/4 bg-[#000000c0] items-center justify-center group-hover:opacity-100 duration-200">
                <div
                  onClick={() => removeFavorites(movie.movie_id)}
                  className="w-10 h-10 rounded-full bg-[#3dd2cc] flex items-center justify-center"
                >
                  <AiOutlineClose
                    color="white"
                    size={20}
                    className="cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
