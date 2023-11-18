import React from "react";
import MoviesPage from "@/components/MoviesPage";

export const metadata = {
  title: "Explore Movies",
  description:
    "Explore the latest movies or top rated. Find out what's trending and what's popular.",
};

export default async function Movies() {
  const fetchGenres = async () => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    const genresData = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      options
    );
    const genres = await genresData.json();
    return genres.genres;
  };

  const genres = await fetchGenres();
  return (
    <div>
      <MoviesPage genres={genres} />
    </div>
  );
}
