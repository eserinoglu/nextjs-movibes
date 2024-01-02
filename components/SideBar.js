"use client";
import React from "react";
import logo2 from "../public/logo2.png";
import Image from "next/image";
import { BiHome, BiMoviePlay } from "react-icons/bi";
import { HiQueueList } from "react-icons/hi2";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideBar() {
  const currentUrl = usePathname();
  return (
    <div
      className={`w-1/6 z-30 bg-[#212121] h-screen rounded-tr-2xl fixed top-0 left-0 rounded-br-2xl hidden py-4 shadow-lg ${
        currentUrl === "/sign-in" || currentUrl === "/sign-up" ? "" : "md:block"
      }`}
    >
      <div className="flex flex-col gap-3">
        <Image
          width={100}
          height={100}
          src={logo2}
          alt="logo2"
          className="mx-auto w-auto h-auto"
        />
        <ul className="flex flex-col w-full mt-10 gap-5">
          <Link href={"/"}>
            <li
              style={{
                backgroundColor: currentUrl === "/" ? "#3dd2cc" : "transparent",
              }}
              className="flex items-center gap-3 p-4"
            >
              <BiHome
                size={26}
                color={currentUrl === "/" ? "white" : "#666666"}
              />
              <h6
                style={{
                  color: currentUrl == "/" ? "white" : "#666666",
                }}
                className="font-semibold text-lg"
              >
                Home
              </h6>
            </li>
          </Link>
          <Link href={"/movies"}>
            <li
              style={{
                backgroundColor: currentUrl.includes("/movies")
                  ? "#3dd2cc"
                  : "transparent",
              }}
              className="flex items-center gap-3 p-4"
            >
              <BiMoviePlay
                size={26}
                color={currentUrl.includes("/movies") ? "white" : "#666666"}
              />
              <h6
                style={{
                  color: currentUrl.includes("/movies") ? "white" : "#666666",
                }}
                className="font-semibold text-lg"
              >
                Movies
              </h6>
            </li>
          </Link>
          <Link href={"/profile"}>
            <li
              style={{
                backgroundColor: currentUrl.includes("/profile")
                  ? "#3dd2cc"
                  : "transparent",
              }}
              className="flex items-center gap-3 p-4"
            >
              <HiQueueList
                size={26}
                color={currentUrl.includes("/profile") ? "white" : "#666666"}
              />
              <h6
                style={{
                  color: currentUrl.includes("/profile") ? "white" : "#666666",
                }}
                className="font-semibold text-lg"
              >
                Profile
              </h6>
            </li>
          </Link>
          <Link href={"/lists"}>
            <li
              style={{
                backgroundColor: currentUrl.includes("/lists")
                  ? "#3dd2cc"
                  : "transparent",
              }}
              className="flex items-center gap-3 p-4"
            >
              <HiQueueList
                size={26}
                color={currentUrl.includes("/lists") ? "white" : "#666666"}
              />
              <h6
                style={{
                  color: currentUrl.includes("/lists") ? "white" : "#666666",
                }}
                className="font-semibold text-lg"
              >
                Lists
              </h6>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
}
