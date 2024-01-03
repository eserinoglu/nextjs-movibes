"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useMovie } from "@/context/MovieContext";
import { supabase } from "@/supabase/supabase";
import Image from "next/image";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";
import Link from "next/link";
import dayjs from "dayjs";
import DeleteListModal from "@/components/DeleteListModal";

export default function ListView({ params }) {
  const { id } = params;
  const { user } = useUser();
  const { userLists, removeFromList } = useMovie();
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const list = userLists?.find((list) => list.id === Number(id));
  const fetchMovies = async () => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase
        .from("list_movies")
        .select("*")
        .eq("list_id", id);
      if (error) throw error;
      setMovies(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchMovies();
  }, [id]);
  if (isLoading) {
    return (
      <div className="w-full md:w-5/6 md:ml-auto h-[80vh] flex justify-center items-center">
        <div className="w-14 h-14 rounded-full border-2 border-[#3dd2cc] border-dashed animate-spin"></div>
      </div>
    );
  }
  return (
    <div className="w-full md:w-5/6 md:ml-auto md:px-10 px-4">
      <DeleteListModal
        showModal={showModal}
        setShowModal={setShowModal}
        listId={id}
      />
      <div className="w-full px-10 py-8 bg-[#212121] rounded-xl h-auto relative overflow-hidden flex items-center border border-white/5">
        <Image
          className="rounded-xl absolute top-0 right-0 blur-2xl opacity-60"
          objectFit="cover"
          fill
          loading="eager"
          sizes="100%"
          src={`https://image.tmdb.org/t/p/w500/${
            movies?.length > 0 && movies[0].poster_path
          }`}
        />
        <div className="w-full flex flex-col gap-2 z-10">
          <div className="flex items-center justify-between">
            <div className="flex-col gap-1 flex w-5/6">
              <h4 className="text-2xl md:text-4xl font-semibold z-10">
                {list?.name}
              </h4>
              <p className="opacity-50 z-10 text-xs">{movies?.length} movies</p>
              <hr className="opacity-10 my-2" />
              <span className="text-white/50 z-10 text-xs">
                Created at{" "}
                <span className="font-medium text-white/70">
                  {dayjs(list?.created_at).format("DD MMMM YYYY")}
                </span>
              </span>
            </div>
            <MdOutlineDelete
              onClick={() => setShowModal(true)}
              size={36}
              className="text-white z-10 cursor-pointer"
            />
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mb-10 mt-5">
        {movies?.map((movie) => (
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
                onClick={async () => {
                  await removeFromList(movie.movie_id, id);
                  fetchMovies();
                }}
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
