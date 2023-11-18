"use client";
import React, { createContext, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { toast } from "react-toastify";

export const MovieContext = createContext();

const MovieContextProvider = (props) => {
  const { user } = useUser();
  const clerk_id = user ? user.id : null;
  const notify = (message) => toast(message);

  const [favorites, setFavorites] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const addFavorite = async (movie) => {
    if (!clerk_id) return notify("Please sign in to add favorites");
    try {
      setFavorites([...favorites, movie]);
      await fetch("/api/addFavorites", {
        method: "POST",
        body: JSON.stringify({ clerk_id, movie }),
      }).then(() => notify("Added to favorites"));
    } catch (err) {
      alert(err);
    }
  };

  const removeFavorite = async (movie) => {
    if (!clerk_id) return notify("Please sign in to remove favorites");
    try {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
      await fetch("/api/removeFavorites", {
        method: "POST",
        body: JSON.stringify({ clerk_id, movie }),
      }).then(() => notify("Removed from favorites"));
    } catch (err) {
      alert(err);
    }
  };

  const initFavorites = async () => {
    if (!clerk_id) return null;
    try {
      const response = await fetch("/api/getFavorites?clerk_id=" + clerk_id);
      if (!response.ok) {
        throw new Error(
          "Failed to fetch favorites. Status: " + response.status
        );
      }
      const results = await response.json();
      setFavorites(results.favorites);
      setIsLoading(false);
    } catch (err) {
      setFavorites([]);
      setIsLoading(false);
      console.error("Error fetching favorites:", err);
      // Handle the error gracefully, alerting or displaying a message to the user
      alert("Failed to fetch favorites. Please try again.");
    }
  };

  const addWatchlist = async (movie) => {
    if (!clerk_id) return notify("Please sign in to add watchlist");
    try {
      setWatchlist([...watchlist, movie]);
      await fetch("/api/addWatchlist", {
        method: "POST",
        body: JSON.stringify({ clerk_id, movie }),
      }).then(() => notify("Added to watchlist"));
    } catch (err) {
      alert(err);
    }
  };

  const removeWatchlist = async (movie) => {
    if (!clerk_id) return notify("Please sign in to remove watchlist");
    try {
      setWatchlist(watchlist.filter((watchlist) => watchlist.id !== movie.id));
      await fetch("/api/removeWatchlist", {
        method: "POST",
        body: JSON.stringify({ clerk_id, movie }),
      }).then(() => notify("Removed from watchlist"));
    } catch (err) {
      console.log(err);
    }
  };

  const initWatchlist = async () => {
    if (!clerk_id) return null;
    try {
      const response = await fetch("/api/getWatchlist?clerk_id=" + clerk_id);
      if (!response.ok) {
        throw new Error("Failed to fetch watchlist. Status: " + response.status);
      }
      const results = await response.json();
      setWatchlist(results.watchlist);
      setIsLoading(false);
    } catch (err) {
      setWatchlist([]);
      setIsLoading(false);
      console.error("Error fetching watchlist:", err);
      // Handle the error gracefully, alerting or displaying a message to the user
      alert("Failed to fetch watchlist. Please try again.");
    }
  };

  const clearStates = () => {
    setFavorites([]);
    setWatchlist([]);
  };
  return (
    <MovieContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite,
        initFavorites,
        clearStates,
        addWatchlist,
        removeWatchlist,
        initWatchlist,
        isLoading,
        watchlist,
      }}
    >
      {props.children}
    </MovieContext.Provider>
  );
};

export default MovieContextProvider;
