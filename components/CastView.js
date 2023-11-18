"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CastView = ({ id }) => {
  const [castData, setCastData] = useState(null);
  const array = Array.from(Array(12).keys());
  const fetchCast = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${id}/credits`,
        {
          params: { language: "en-US" },
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
          },
        }
      );
      setCastData(response.data.cast);
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch cast data");
    }
  };

  useEffect(() => {
    fetchCast();
  }, [id]);

  return (
    <div className="w-full h-full overflow-x-scroll rounded-xl no-scrollbar">
      <div className="flex gap-2 overflow-x-scroll w-max">
        {castData &&
          castData
            .filter((item) => item.profile_path)
            .map((item) => <CastItem key={item.id} item={item} />)}
      </div>
    </div>
  );
};

const CastItem = ({ item }) => {
  return (
    <div className="flex flex-col gap-3 items-center">
      <div className="w-[6rem] md:w-[7.5rem] aspect-[2/3] relative">
        <Image
          sizes="100%"
          loading="lazy"
          fill
          className="object-cover rounded-xl"
          src={`https://image.tmdb.org/t/p/w185${item.profile_path}`}
          alt=""
        />
      </div>
      <p className="text-center text-xs opacity-50 line-clamp-1 w-[6rem] md:w-[7.5rem]">
        {item.name}
      </p>
    </div>
  );
};

export default CastView;
