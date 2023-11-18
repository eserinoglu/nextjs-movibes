"use client";
import React, { useContext } from "react";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import { AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { MovieContext } from "@/context/MovieContext";
import { ToastContainer } from "react-toastify";
import { useRouter } from "next/navigation";

export default function FavoritesList() {
  const router = useRouter();
  const { user } = useUser();
  const { favorites, removeFavorite, isLoading } = useContext(MovieContext);

  if (isLoading) {
    return (
      <div className="w-full md:w-5/6 md:ml-auto h-[60vh] flex items-center justify-center">
        <div className="w-14 h-14 border-2 border-dashed border-[#3dd2cc] animate-spin rounded-full"></div>
      </div>
    );
  }

  if (favorites.length > 0) {
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
              onClick={() => router.push(`/movies/${movie.id}`)}
              key={movie.id}
              className="col-span-1 aspect-[2/3] relative group cursor-pointer"
            >
              <Image
                src={`https://image.tmdb.org/t/p/w342/${movie.poster_path}`}
                alt={movie.title}
                fill
                loading="eager"
                className="rounded-xl movie-img"
              />
              <div className="overlay flex p-4 flex-col absolute bottom-0 rounded-bl-xl rounded-br-xl opacity-0 w-full h-1/4 bg-[#000000c0] items-center justify-center group-hover:opacity-100 duration-200">
                <div
                  onClick={() => removeFavorite(movie, user.id)}
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
