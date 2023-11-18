"use client";
import React from "react";
import MovieGrid from "@/components/MovieGrid";
import { useSearchParams } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");

  return (
    <div className="min-h-max">
      <MovieGrid query={q} />
    </div>
  );
}
