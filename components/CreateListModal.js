import React, { useState } from "react";
import { useMovie } from "@/context/MovieContext";

export default function CreateListModal({ showModal, setShowModal }) {
  const { createList } = useMovie();
  const [listName, setListName] = useState("");
  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className="w-screen h-screen fixed top-0 right-0 left-0 z-10 flex items-center justify-center"
    >
      <div
        onClick={() => setShowModal(false)}
        className="w-screen h-screen bg-black/50 overflow-hidden z-20 absolute top-0 right-0 left-0  items-center justify-center backdrop-blur-sm"
      ></div>
      <div className="p-10 rounded-xl w-5/6 md:w-auto bg-[#191919] flex flex-col gap-3 z-40">
        <h5 className="text-white/60 tracking-tight text-3xl font-medium">
          Create list
        </h5>
        <input
          type="text"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          className="bg-white/5 p-3 rounded-lg text-white tracking-tight text-lg border-none outline-none placeholder:text-white/30"
          placeholder="List Name"
        />
        <button
          onClick={async () => {
            await createList(listName);
            setShowModal(false);
          }}
          className="w-full bg-[#3dd2cc] p-2 rounded-lg items-center flex justify-center tracking-tight font-medium hover:bg-opacity-90"
        >
          Create
        </button>
      </div>
    </div>
  );
}
