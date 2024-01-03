import React from "react";
import { useMovie } from "@/context/MovieContext";
import { useRouter } from "next/navigation";

export default function DeleteListModal({ showModal, setShowModal, listId }) {
  const router = useRouter();
  const { deleteList } = useMovie();
  return (
    <div
      style={{ display: showModal ? "flex" : "none" }}
      className="w-screen h-screen fixed top-0 right-0 left-0 z-40 flex items-center justify-center"
    >
      <div
        onClick={() => setShowModal(false)}
        className="w-screen h-screen bg-black/50 overflow-hidden z-20 absolute top-0 right-0 left-0  items-center justify-center backdrop-blur-sm"
      ></div>
      <div className="p-6 md:p-10 w-5/6 md:w-auto rounded-xl bg-[#191919] flex flex-col gap-3 z-40">
        <h5 className="text-white/60 tracking-tight text-3xl font-medium">
          Delete list
        </h5>
        <p className="text-sm tracking-tight text-white/60">
          Are you sure you want to delete this list? This action cannot be
          undone.
        </p>
        <div className="w-full grid grid-cols-2 items-center mt-4">
          <button
            onClick={() => {
              deleteList(listId);
              router.push("/");
            }}
            className="w-full bg-red-600 p-2 rounded-lg items-center flex justify-center tracking-tight font-medium hover:bg-opacity-90"
          >
            Delete
          </button>
          <button
            onClick={() => setShowModal(false)}
            className="w-full p-2 rounded-lg items-center flex justify-center tracking-tight font-medium hover:bg-opacity-90"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
