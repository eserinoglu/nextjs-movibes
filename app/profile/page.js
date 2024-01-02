"use client";
import React from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/navigation";

export default function Profile() {
  const router = useRouter();
  const { user } = useUser();
  if (!user) return router.push("/sign-in?redirect=/profile");
  return (
    <div className="w-full md:w-5/6 md:ml-auto px-3 md:px-10 flex flex-col gap-3 mb-10">
      <h3>{user.email}</h3>
    </div>
  );
}
