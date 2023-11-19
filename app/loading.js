import React from "react";
import logo from "../public/logo2.png";
import Image from "next/image";

export default function HomeLoading() {
  return (
    <div className="w-5/6 ml-auto h-[80vh] flex items-center justify-center">
      <Image src={logo} width={120} height={40} objectFit="scale-down" className="animate-pulse" />
    </div>
  );
}
