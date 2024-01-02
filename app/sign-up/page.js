"use client";
import React, { useState } from "react";
import { AiOutlineGoogle } from "react-icons/ai";
import logo2 from "../../public/logo2.png";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  return (
    <div className="w-screen h-screen flex justify-center items-center p-5">
      <div className="p-5 rounded-3xl shadow-xl bg-[#212121] flex flex-col w-full md:w-2/6 md:p-10 gap-5 z-10">
        <form className="flex flex-col gap-8">
          <div className="flex flex-col gap-1">
            <Link href={"/"}>
              <Image
                className="mb-4"
                src={logo2}
                width={100}
                height={60}
                objectFit="scale-down"
              />
            </Link>
            <h2 className="text-3xl font-bold tracking-tight">
              Welcome to Movibes!
            </h2>
            <h6 className="tracking-tight opacity-50 ">
              Create an account to continue.
            </h6>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-full grid grid-cols-2 gap-2 items-center">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="First Name"
                className="col-span-1 py-3 px-4 border-[1px] outline-none bg-opacity-10 bg-white text-[#ffffff80] border-[#2121212b] rounded-lg placeholder:text-[#ffffff20] focus:shadow-xl duration-100"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="Last Name"
                className="col-span-1 py-3 px-4 border-[1px] outline-none bg-opacity-10 bg-white text-[#ffffff80] border-[#2121212b] rounded-lg placeholder:text-[#ffffff20] focus:shadow-xl duration-100"
              />
            </div>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="w-full py-3 px-4 border-[1px] outline-none bg-opacity-10 bg-white text-[#ffffff80] border-[#2121212b] rounded-lg placeholder:text-[#ffffff20] focus:shadow-xl duration-100"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full py-3 px-4 border-[1px] outline-none bg-opacity-10 bg-white text-[#ffffff80] border-[#2121212b] rounded-lg placeholder:text-[#ffffff20] focus:shadow-xl duration-100"
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 text-center bg-[#3dd2cc] rounded-lg font-semibold hover:bg-[#35b5b0] duration-200]"
          >
            Sign Up
          </button>
        </form>
        <div className="w-full grid grid-cols-7 items-center justify-between">
          <div className="col-span-3 h-[1px] bg-white opacity-30"></div>
          <p className="col-span-1 text-center opacity-30 text-sm">or</p>
          <div className="col-span-3 h-[1px] bg-white opacity-30"></div>
        </div>
        <div className="w-full rounded-lg border-[1px] border-[#3dd2cc] py-3 flex items-center gap-2 justify-center opacity-50 hover:opacity-100 duration-200 cursor-pointer">
          <AiOutlineGoogle size={30} color="#3dd2cc" />
          <p className="text-sm font-semibold tracking-tight text-[#3dd2cc]">
            Continue with Google
          </p>
        </div>
        <Link
          className="text-[#3dd2cc] text-xs text-center mt-5 opacity-50 hover:opacity-100 duration-150"
          href={"/sign-in"}
        >
          Already have an account? Sign In.
        </Link>
      </div>
    </div>
  );
}
