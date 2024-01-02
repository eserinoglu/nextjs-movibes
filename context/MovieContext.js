"use client";
import React, { createContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const router = useRouter();
  const { user } = useUser();
  const [favorites, setFavorites] = useState(null);
  const [watchlist, setWatchlist] = useState(null);

  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      setFavorites(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchWatchlist = async () => {
    try {
      const { data, error } = await supabase
        .from("user_watchlist")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      setWatchlist(data);
    } catch (error) {
      console.log(error);
    }
  };
  const addFavorites = async (movieId, posterPath) => {
    if (!user) router.push(`/sign-in?redirect=/movies/${movieId}`);
    try {
      const movie = {
        movie_id: movieId,
        poster_path: posterPath,
        user_id: user.id,
      };
      setFavorites((prev) => [...prev, movie]);
      const { data, error } = await supabase
        .from("user_favorites")
        .insert([
          {
            user_id: user.id,
            movie_id: movieId,
            poster_path: posterPath,
          },
        ])
        .select();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const removeFavorites = async (movieId) => {
    try {
      setFavorites((prev) => prev.filter((fav) => fav.movie_id !== movieId));
      const { data, error } = await supabase
        .from("user_favorites")
        .delete()
        .eq("movie_id", movieId)
        .eq("user_id", user.id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const addWatchlist = async (movieId, posterPath) => {
    if (!user) router.push(`/sign-in?redirect=/movies/${movieId}`);
    try {
      const movie = {
        movie_id: movieId,
        poster_path: posterPath,
        user_id: user.id,
      };
      setWatchlist((prev) => [...prev, movie]);
      const { data, error } = await supabase
        .from("user_watchlist")
        .insert([
          {
            user_id: user.id,
            movie_id: movieId,
            poster_path: posterPath,
          },
        ])
        .select();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const removeWatchlist = async (movieId) => {
    try {
      setWatchlist((prev) =>
        prev.filter((watch) => watch.movie_id !== movieId)
      );
      const { data, error } = await supabase
        .from("user_watchlist")
        .delete()
        .eq("movie_id", movieId)
        .eq("user_id", user.id);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchFavorites();
      fetchWatchlist();
    } else {
      setFavorites(null);
      setWatchlist(null);
    }
  }, [user]);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        watchlist,
        addFavorites,
        removeFavorites,
        addWatchlist,
        removeWatchlist,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
