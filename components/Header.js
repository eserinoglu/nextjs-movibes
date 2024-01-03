"use client";
import React, { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";
import { FaChevronDown } from "react-icons/fa";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import logo from "../public/logo2.png";
import Image from "next/image";
import { useUser } from "@/context/UserContext";
import { useMovie } from "@/context/MovieContext";
import { supabase } from "@/supabase/supabase";
import CreateListModal from "./CreateListModal";

export default function Header() {
  const { user, userData } = useUser();
  const router = useRouter();
  const currentUrl = usePathname();
  const [searchValue, setSearchValue] = useState("");
  const [showSideModal, setShowSideModal] = useState(false);
  useEffect(() => {
    setShowSideModal(false);
  }, [currentUrl]);

  return (
    <div className="flex flex-col gap-1 mt-2">
      <SideModal
        user={user}
        showSideModal={showSideModal}
        setShowSideModal={setShowSideModal}
        currentUrl={currentUrl}
      />
      <div
        className={`w-full flex items-center justify-between md:hidden px-3 ${
          currentUrl === "/sign-in" || currentUrl === "/sign-up" ? "hidden" : ""
        }`}
      >
        <div className="w-24 aspect-[3/1] object-scale-down relative">
          <Link href={"/"}>
            <Image src={logo} fill sizes="100%" priority />
          </Link>
        </div>
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-[#212121]">
          <AiOutlineMenu
            onClick={() => setShowSideModal(!showSideModal)}
            size={30}
            color="white"
            className="opacity-60"
          />
        </div>
      </div>
      <div
        className={`w-full md:w-5/6 md:ml-auto py-3 px-3 md:px-10 grid-cols-12 grid items-center justify-center bg-[#191919] mb-4 mt-1 md:mt-4 ${
          currentUrl === "/sign-in" || currentUrl === "/sign-up" ? "hidden" : ""
        }`}
      >
        <div className="col-span-12 md:col-span-11 bg-[#212121] rounded-xl flex items-center p-3 gap-3">
          <FiSearch color="#666666" size={26} />
          <form
            className="w-full"
            action="/search"
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchValue) return;
              router.push(`/search?q=${searchValue}`);
              setSearchValue("");
            }}
          >
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              type="search"
              placeholder="Search for Movies"
              className="w-full bg-transparent outline-none text-white placeholder:text-[#666666]"
            />
          </form>
        </div>
        <div className="hidden md:flex md:col-span-1 items-center justify-end gap-7">
          {user ? (
            <Link href={"/profile"}>
              <div className="bg-[#3dd2cc] rounded-full w-11 h-11 items-center flex justify-center">
                <h4 className="text-2xl font-semibold leading-none">
                  {userData?.display_name.split("")[0]}
                </h4>
              </div>
            </Link>
          ) : (
            <Link href={"/sign-in"}>Sign In</Link>
          )}
        </div>
      </div>
    </div>
  );
}

function SideModal({ showSideModal, setShowSideModal, user, currentUrl }) {
  const { userLists } = useMovie();
  const { userData } = useUser();
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      window.location.href = "/";
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="z-40">
      <CreateListModal showModal={showModal} setShowModal={setShowModal} />
      <div
        style={{
          opacity: showSideModal ? 1 : 0,
          pointerEvents: showSideModal ? "all" : "none",
          transitionDuration: "0.3s",
          transitionProperty: "opacity",
        }}
        onClick={() => setShowSideModal(false)}
        className="fixed top-0 left-0 w-screen h-screen bg-transparent backdrop-blur-md opacity-100"
      ></div>
      <div
        style={{
          transform: showSideModal ? "translateX(0)" : "translateX(100%)",
          transitionDuration: "0.3s",
        }}
        className="fixed w-3/4 right-0 bg-[#191919] h-screen top-0 flex flex-col gap-7 py-5"
      >
        <div className="w-2/4 mx-auto aspect-[3/1] object-scale-down relative">
          <Image src={logo} fill sizes="100%" loading="eager" alt="logo" />
        </div>
        <div className="bg-[#212121] rounded-xl shadow-lg flex items-center gap-2 p-4 w-[90%] mx-auto">
          {user ? (
            <div
              onClick={() => router.push("/profile")}
              className="flex items-center gap-2 justify-center w-full cursor-pointer"
            >
              <span>{userData?.display_name}</span>
            </div>
          ) : (
            <div className="w-full flex justify-center">
              <Link className="font-semibold opacity-70" href={"/sign-in"}>
                Sign In
              </Link>
            </div>
          )}
        </div>
        <div className="flex flex-col w-[90%] mx-auto gap-2 h-full">
          <Link
            style={{
              opacity: currentUrl === "/" ? 1 : 0.3,
              backgroundColor: currentUrl === "/" ? "#3dd2cc" : "",
            }}
            className="w-full p-4 flex justify-center rounded-xl font-semibold text-lg"
            href={"/"}
          >
            Home
          </Link>
          <Link
            style={{
              opacity: currentUrl.includes("/movies") ? 1 : 0.3,
              backgroundColor: currentUrl.includes("/movies") ? "#3dd2cc" : "",
            }}
            className="w-full p-4 flex justify-center rounded-xl font-semibold text-lg"
            href={"/movies"}
          >
            Movies
          </Link>
          <Link
            style={{
              opacity: currentUrl === "/favorites" ? 1 : 0.3,
              backgroundColor: currentUrl === "/favorites" ? "#3dd2cc" : "",
            }}
            className="w-full p-4 flex justify-center rounded-xl font-semibold text-lg"
            href={"/favorites"}
          >
            Favorites
          </Link>
          <Link
            style={{
              opacity: currentUrl === "/watchlist" ? 1 : 0.3,
              backgroundColor: currentUrl === "/watchlist" ? "#3dd2cc" : "",
            }}
            className="w-full p-4 flex justify-center rounded-xl font-semibold text-lg"
            href={"/watchlist"}
          >
            Watchlist
          </Link>
          {user && (
            <div className="w-full px-3 py-2 bg-[#3dd2cc] rounded-xl">
              <div
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center justify-between"
              >
                <h5 className="font-medium text-lg">Lists</h5>
                <FaChevronDown
                  style={{
                    transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
                    transitionDuration: "0.3s",
                  }}
                />
              </div>
              {isExpanded && (
                <div className="flex flex-col gap-2 mt-3">
                  <div
                    onClick={() => setShowModal(true)}
                    className="p-2 bg-white rounded-lg cursor-pointer"
                  >
                    <span className="text-[#3dd2cc]">Create list</span>
                  </div>
                  {userLists?.map((list, index) => {
                    return (
                      <Link key={index} href={`/lists/${list.id}`}>
                        <div className="flex bg-black/10 p-2 rounded-lg">
                          <span>{list.name}</span>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          )}
          {user && (
            <button className="mt-auto mb-5 text-red-600" onClick={signOut}>
              Sign Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
