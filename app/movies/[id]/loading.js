import React from "react";

export default function Loading() {
  return (
    <div className="w-screen h-screen z-20 fixed top-0 right-0 bg-[#191919] flex items-center justify-center">
      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#3dd2cc] animate-spin"></div>
    </div>
  );
}
