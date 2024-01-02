"use client";
import React from "react";
import logo2 from "../public/logo2.png";
import Image from "next/image";
import { BiCameraMovie } from "react-icons/bi";
import { GoHome } from "react-icons/go";
import { CgUserList } from "react-icons/cg";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLogout } from "react-icons/ci";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { supabase } from "@/supabase/supabase";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";

export default function SideBar() {
  const { user } = useUser();
  const router = useRouter();
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
      name: "My Lists",
      icon: <CgUserList size={18} />,
      path: "/lists",
    },
    {
      name: "Profile",
      icon: <FaRegUserCircle size={18} />,
      path: "/profile",
    },
  ];
  return (
    <div
      className={`w-1/6 z-30 bg-[#212121] h-screen rounded-tr-2xl fixed top-0 left-0 rounded-br-2xl hidden py-4 shadow-lg ${
        currentUrl === "/sign-in" || currentUrl === "/sign-up" ? "" : "md:block"
      }`}
    >
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
            <button
              onClick={signOut}
              className="p-3 w-full rounded-lg bg-red-600 flex items-center gap-2 mt-auto"
            >
              <CiLogout size={18} className="text-white" />
              <span className="text-white text-sm font-medium">Sign Out</span>
            </button>
          )}
        </ul>
      </div>
    </div>
  );
}
