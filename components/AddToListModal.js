"use client";
import React from "react";
import { useMovie } from "@/context/MovieContext";
import { IoIosArrowBack } from "react-icons/io";
import { FaPlus } from "react-icons/fa";

export default function AddToListModal({ showModal, setShowModal, movie }) {
  const { addToList, userLists } = useMovie();
  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className="w-screen h-screen fixed top-0 right-0 left-0 z-40 flex items-center justify-center"
    >
      <div
        onClick={() => setShowModal(false)}
        className="w-screen h-screen bg-black/50 overflow-hidden z-20 absolute top-0 right-0 left-0  items-center justify-center backdrop-blur-sm"
      ></div>
      <div className="p-6 rounded-xl bg-[#191919] flex w-5/6 md:w-1/3 flex-col gap-3 z-40">
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => setShowModal(false)}
            className="text-white/60 hover:text-white/80"
          >
            <IoIosArrowBack size={24} />
          </button>
          <h5 className="text-white/60 tracking-tight text-xl font-medium">
            Add movie to list
          </h5>
        </div>
        <ul className="flex flex-col gap-2">
          {userLists?.map((list, index) => {
            return (
              <li
                onClick={async () => {
                  await addToList(movie.id, movie.poster_path, list.id);
                  setShowModal(false);
                }}
                className="bg-white/10 p-3 rounded-lg flex items-center justify-between cursor-pointer"
              >
                <span className="w-full text-left text-white/60 hover:text-white/80">
                  {list.name}
                </span>
                <FaPlus size={16} className="text-white/60" />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
