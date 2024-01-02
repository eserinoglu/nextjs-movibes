import Image from "next/image";
import React, { useContext, useEffect } from "react";
import {
  AiOutlineHeart,
  AiOutlineEye,
  AiOutlineShareAlt,
  AiOutlineClose,
  AiFillHeart,
  AiFillEye,
} from "react-icons/ai";
import { LuListPlus } from "react-icons/lu";
import { BiSolidStar } from "react-icons/bi";
import CastView from "./CastView";
import WatchProviders from "./WatchProviders";
import CrewView from "./CrewView";
import { MovieContext } from "@/context/MovieContext";
import { ToastContainer } from "react-toastify";

export default function DetailModal({
  data,
  showModal,
  setSelectedMovie,
  setShowModal,
}) {
  if (!data) return null;
  return (
    <div className="flex flex-col rounded-tl-3xl rounded-tr-3xl">
      <ToastContainer
        position="top-center"
        autoClose={1600}
        limit={5}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <AiOutlineClose
        color="white"
        size={25}
        onClick={() => {
          setShowModal(false);
          setSelectedMovie(null);
        }}
        className="absolute top-6 right-6 cursor-pointer z-10"
      />
      <MovieBanner2
        data={data}
        setSelectedMovie={setSelectedMovie}
        setShowModal={setShowModal}
      />
      <div className="w-full px-3 md:px-10 flex flex-col mb-5">
        <div className="w-full flex flex-col gap-3 p-4 md:p-5 rounded-xl bg-[#ffffff0d] mt-5">
          <h4 className="text-xl md:text-2xl font-semibold">Overview</h4>
          <p className="opacity-50 h-full overflow-y-scroll text-sm md:text-base">
            {data.overview}
          </p>
        </div>
        <div className="h-full w-full flex flex-col gap-4 bg-[#ffffff0d] p-4 md:p-5 rounded-xl mt-5">
          <h4 className="text-xl md:text-2xl font-semibold">Cast</h4>
          <CastView id={data.id} />
        </div>
        <div className="mt-6 flex flex-col gap-4">
          <h4 className="text-xl md:text-2xl font-semibold">
            Providers{" "}
            <span className="text-xs opacity-50 font-light">for U.S.</span>
          </h4>
          <WatchProviders id={data.id} />
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <h4 className="text-2xl font-semibold">Crew</h4>
          <CrewView id={data.id} />
        </div>
      </div>
    </div>
  );
}

function MovieBanner2({ data }) {
  const {
    addFavorites,
    removeFavorites,
    favorites,
    watchlist,
    addWatchlist,
    removeWatchlist,
  } = useContext(MovieContext);
  const [isLiked, setIsLiked] = React.useState(false);
  const [isInWatchlist, setIsInWatchlist] = React.useState(false);

  console.log(data);

  useEffect(() => {
    setIsLiked(favorites?.some((fav) => fav.movie_id === data.id));
    setIsInWatchlist(watchlist?.some((watch) => watch.movie_id === data.id));
  }, [favorites, watchlist]);

  return (
    <div className="w-full h-auto rounded-tl-3xl rounded-tr-3xl py-7 md:py-10 relative shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-5 w-full h-full px-5 md:px-10 shadow-lg">
        <div className="w-[10rem] md:w-[12rem] aspect-[2/3] relative">
          <Image
            priority
            fill
            sizes="100%"
            className="rounded-xl shadow-lg z-10"
            src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
            alt=""
          />
        </div>

        <div className="flex flex-col gap-6 z-10">
          <div className="flex flex-col gap-1">
            <h4 className="opacity-50">{data.release_date.split("-")[0]}</h4>
            <h4 className="text-3xl md:text-4xl font-semibold">{data.title}</h4>
          </div>
          <div className="flex items-center gap-5">
            {isLiked ? (
              <AiFillHeart
                onClick={() => removeFavorites(data.id)}
                color="red"
                className="cursor-pointer"
                size={26}
              />
            ) : (
              <AiOutlineHeart
                onClick={() => addFavorites(data.id, data.poster_path)}
                className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
                color="white"
                size={26}
              />
            )}
            {isInWatchlist ? (
              <AiFillEye
                onClick={() => removeWatchlist(data.id)}
                color="#3dd2cc"
                className="cursor-pointer"
                size={30}
              />
            ) : (
              <AiOutlineEye
                onClick={() => addWatchlist(data.id, data.poster_path)}
                className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
                color="white"
                size={30}
              />
            )}
            <LuListPlus
              className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
              color="white"
              size={30}
            />
            <AiOutlineShareAlt
              onClick={() => {
                const movieUrl = `${window.location.href}/${data.id}`;
                navigator.clipboard.writeText(movieUrl);
                alert("Copied the link to clipboard!");
              }}
              className="opacity-30 hover:opacity-100 cursor-pointer duration-100"
              color="white"
              size={30}
            />
          </div>
          <div className="flex items-end gap-3 h-[1.8rem]">
            <BiSolidStar color="FAB52A" size={30} />
            <h5 className="font-semibold text-3xl leading-none">
              {data.vote_average.toFixed(1)}
            </h5>
            <div className="w-[1px] h-full bg-white opacity-30"></div>
            <p className="opacity-50 leading-[1.2]">
              {data.vote_count} ratings
            </p>
          </div>
        </div>
      </div>
      <div className="absolute w-full h-full right-0 top-0 overflow-hidden">
        <Image
          priority
          src={`https://image.tmdb.org/t/p/w300${data.backdrop_path}`}
          alt=""
          fill
          sizes="100%"
          className="opacity-60 blur-2xl"
        />
      </div>
    </div>
  );
}
