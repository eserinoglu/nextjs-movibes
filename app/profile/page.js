"use client";
import React, { useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user, userData } = useUser();
  useEffect(() => {
    if (!user) {
      router.push("/sign-in?redirect=/profile");
    }
  }, [user]);
  if (user) {
    return (
      <div className="w-full md:w-5/6 md:ml-auto px-3 md:px-10 flex flex-col gap-3 mb-10">
        <h3>{userData?.display_name}</h3>
      </div>
    );
  }
}
