"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";

const CrewView = ({ id }) => {
  const [crewData, setcrewData] = useState(null);

  async function fetchCrew() {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/${id}/credits`,
      params: { language: "en-US" },
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlYmNkZWNmODNjZjg0ZmQ0ZGVhNDQ2NjhjNjYwMGFkOSIsInN1YiI6IjY0NzRiMTUzOWFlNjEzMDEyNTdjZGZlNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.T69nKZl7FL8H4m3B3BKMh-J87Jku91-Ffb2ujM2jQew",
      },
    };

    return axios
      .request(options)
      .then((response) => setcrewData(response.data.crew))
      .catch((error) => {
        console.error(error);
        throw new Error("Failed to fetch crew data");
      });
  }

  useEffect(() => {
    fetchCrew();
  }, [id]);

  const getCrewMember = (job) =>
    crewData && crewData.find((crew) => crew.job === job);

  const director = getCrewMember("Director");
  const directorOfPhotography = getCrewMember("Director of Photography");
  const editor = getCrewMember("Editor");
  const producer = getCrewMember("Producer");

  const crew = [director, directorOfPhotography, editor, producer];

  return (
    <div className="w-full flex flex-col md:grid md:grid-cols-4 gap-3">
      {crewData &&
        crew
          .filter((item) => item)
          .map((item) => <CrewMember key={item.job} item={item} />)}
    </div>
  );
};

const CrewMember = ({ item }) => (
  <div className="col-span-1 border border-transparent flex items-center md:flex-col md:items-start bg-[#ffffff0d] p-5 rounded-xl gap-3">
    <div className="w-[5rem] md:w-[7rem] aspect-square relative">
      <Image
        sizes="100%"
        loading="eager"
        fill
        className="rounded-full object-cover"
        src={
          item.profile_path
            ? `https://image.tmdb.org/t/p/w185${item.profile_path}`
            : "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
        }
        alt=""
      />
    </div>

    <div className="flex flex-col gap-1">
      <h5 className="opacity-60">{item.job}</h5>
      <h4 className="text-xl md:text-2xl font-semibold w-full line-clamp-2">
        {item.name}
      </h4>
    </div>
  </div>
);

export default CrewView;
