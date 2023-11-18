"use client";
import React from "react";
import { useUser } from "@clerk/nextjs";

export default function SpecialBox() {
  const { user } = useUser();
  if (!user) return null;
  if (user && user.id === "user_2YLmnARNkoMSiCoDRxIZLWw4iPn") {
    return (
      <div className="w-[95%] mx-auto rounded-xl bg-white py-6 mb-5 flex justify-center items-center">
        <h4 className="text-xl font-semibold text-red-600">
          Askım seni cok seviyorum ❤️
        </h4>
      </div>
    );
  }
}
