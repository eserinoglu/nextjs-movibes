"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user, userData, updateUserData } = useUser();
  const [isEditMode, setIsEditMode] = useState(false);
  const [displayName, setDisplayName] = useState(userData?.display_name);
  useEffect(() => {
    if (!user) {
      router.push("/sign-in?redirect=/profile");
    }
  }, [user]);
  if (user) {
    return (
      <div className="w-full md:w-5/6 md:ml-auto px-4 md:px-10 flex flex-col gap-3 mb-10">
        <div className="w-full flex items-center justify-between">
          <h5 className="text-2xl tracking-tight font-medium">Profile</h5>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="text-[#3dd2cc]"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>
        <div className="flex-col flex gap-1">
          <span className="text-white/40 text-sm ml-1">Name</span>
          <div
            style={{ borderWidth: isEditMode ? 1 : 0 }}
            className="bg-white/10 p-3 rounded-lg"
          >
            {isEditMode ? (
              <input
                type="text"
                className="text-white/60 font-medium bg-transparent w-full border-none outline-none"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            ) : (
              <span className="text-white/60 font-medium">
                {userData?.display_name}
              </span>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-white/40 text-sm ml-1">E-mail</span>
          <div className="bg-white/5 p-3 rounded-lg">
            <span className="text-white/40">{userData?.email}</span>
          </div>
        </div>
        {isEditMode && (
          <button
            onClick={() => {
              updateUserData(displayName);
              setIsEditMode(false);
            }}
            className="w-full bg-[#3dd2cc] p-3 mt-4 rounded-lg text-white font-medium"
          >
            Save changes
          </button>
        )}
      </div>
    );
  }
}
