"use client";
import React, { useState } from "react";
import logo2 from "../public/logo2.png";
import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import {
  IoHeartOutline,
  IoEyeOutline,
  IoChevronForward,
} from "react-icons/io5";
import { CiLogout, CiCirclePlus } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { useMovie } from "@/context/MovieContext";
import CreateListModal from "./CreateListModal";

export default function SideBar() {
  const { userLists } = useMovie();
  const { user } = useUser();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  const currentUrl = usePathname();
  const routes = [
    {
      name: "Home",
      icon: <GoHome size={18} />,
      path: "/",
    },
    {
      name: "Movies",
      icon: <BiCameraMovie size={18} />,
      path: "/movies",
    },
    {
      name: "Favorites",
      icon: <IoHeartOutline size={18} />,
      path: "/favorites",
    },
    {
      name: "Watchlist",
      icon: <IoEyeOutline size={18} />,
      path: "/watchlist",
    },
  ];
  return (
    <div
      className={`w-1/6 z-30 bg-[#212121] h-screen rounded-tr-2xl fixed top-0 left-0 rounded-br-2xl hidden py-4 shadow-lg ${
        currentUrl === "/sign-in" || currentUrl === "/sign-up" ? "" : "md:block"
      }`}
    >
      <CreateListModal showModal={showModal} setShowModal={setShowModal} />
      <div className="flex flex-col gap-3 h-full">
        <Image
          width={90}
          height={60}
          src={logo2}
          alt="logo2"
          className="mx-auto mt-5"
        />
        <ul className="flex flex-col w-full mt-10 gap-5 px-5 h-full">
          {routes.map((route, index) => {
            return (
              <Link
                className="hover:bg-white/5 hover:rounded-lg duration-150"
                key={index}
                href={route.path}
              >
                <div
                  style={{
                    backgroundColor:
                      (currentUrl.includes(route.path) && route.path !== "/") ||
                      currentUrl === route.path
                        ? "#3dd2cc"
                        : "transparent",
                    opacity:
                      currentUrl === route.path ||
                      (currentUrl.includes(route.path) && route.path !== "/")
                        ? 1
                        : 0.2,
                  }}
                  className="flex items-center gap-2 p-2 rounded-lg"
                >
                  {route.icon}
                  <span className="text-white font-medium">{route.name}</span>
                </div>
              </Link>
            );
          })}
          {user && (
            <div className="flex-col">
              <h6 className="text-white/50 tracking-tight text-sm mt-4 font-semibold">
                Your lists
              </h6>
              <li
                onClick={() => setShowModal(true)}
                className="bg-[#3dd2cc] hover:bg-opacity-80 duration-100 rounded-lg px-3 py-2 items-center justify-between flex my-2 cursor-pointer"
              >
                <span className="text-white text-sm font-semibold">
                  Create new list
                </span>
                <CiCirclePlus size={18} className="text-white" />
              </li>
              <ul className="flex flex-col gap-2">
                {userLists?.map((list, index) => {
                  return (
                    <Link href={`/lists/${list.id}`} key={index}>
                      <li className="bg-white/5 hover:bg-white/10 duration-100 rounded-lg px-3 py-2 items-center justify-between flex">
                        <span className="text-white/40 tracking-tight text-sm">
                          • {list.name}
                        </span>
                        <IoChevronForward size={18} className="text-white/40" />
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          )}
          {user && (
            <button
              onClick={signOut}
              className="p-3 w-full rounded-lg border border-red-600 flex items-center gap-2 mt-auto"
            >
              <CiLogout size={18} className="text-red-600" />
              <span className="text-red-600 text-sm font-medium">Sign Out</span>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
