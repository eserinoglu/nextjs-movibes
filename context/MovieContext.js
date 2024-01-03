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
  const [userLists, setUserLists] = useState(null);

  const fetchUserLists = async () => {
    try {
      const { data, error } = await supabase
        .from("user_lists")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      setUserLists(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFavorites = async () => {
    try {
      const { data, error } = await supabase
        .from("user_favorites")
        .select("*")
        .eq("user_id", user.id);
      if (error) throw error;
      setFavorites(data);
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
  const removeFromList = async (movieId, listId) => {
    if (!user) router.push(`/sign-in?redirect=/movies/${movieId}`);
    try {
      const { data, error } = await supabase
        .from("list_movies")
        .delete()
        .eq("movie_id", movieId)
        .eq("list_id", listId);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const addToList = async (movieId, posterPath, listId) => {
    if (!user) router.push(`/sign-in?redirect=/movies/${movieId}`);
    try {
      const { data, error } = await supabase
        .from("list_movies")
        .insert([
          {
            movie_id: movieId,
            poster_path: posterPath,
            list_id: listId,
          },
        ])
        .select();
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const createList = async (name) => {
    if (!user) router.push(`/sign-in`);
    try {
      const { data, error } = await supabase
        .from("user_lists")
        .insert([
          {
            name: name,
            user_id: user.id,
          },
        ])
        .select();
      setUserLists((prev) => [...prev, data[0]]);
      if (error) throw error;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteList = async (listId) => {
    if (!user) router.push(`/sign-in`);
    try {
      setUserLists((prev) => prev.filter((list) => list.id !== Number(listId)));
      const { data, error } = await supabase
        .from("user_lists")
        .delete()
        .eq("id", listId)
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
      fetchUserLists();
    } else {
      setFavorites(null);
      setWatchlist(null);
      setUserLists(null);
    }
  }, [user]);

  return (
    <MovieContext.Provider
      value={{
        favorites,
        watchlist,
        userLists,
        addFavorites,
        removeFavorites,
        addWatchlist,
        removeWatchlist,
        removeFromList,
        addToList,
        createList,
        deleteList,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;

export const useMovie = () => React.useContext(MovieContext);
