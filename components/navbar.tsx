import React from "react";
import Link from "next/link";
import Image from "next/image";
import ExploreIcon from "@mui/icons-material/Explore";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center w-80 h-full p-6 bg-red-500 text-white justify-around">
      <div className="flex flex-col items-center mb-20">
        <Image
          src="/logo.png"
          alt="Space"
          width={200}
          height={200}
          className="rounded-full"
        />
        <span className="text-5xl mt-20">name</span>
      </div>
      <div className="flex flex-col gap-8 mb-8">
        <Link
          href="/feed"
          className="text-white text-2xl space-x-2 flex flex-row items-center"
        >
          <ExploreIcon />
          <div>Explore</div>
        </Link>
        <Link
          href="/chat"
          className="text-white text-2xl space-x-2 flex flex-row items-center"
        >
          <ChatIcon />
          <div>Chat</div>
        </Link>
      </div>
      <Link
        className="mb-20 bg-red-400 hover:bg-red-600 p-6 border-2 border-white rounded-xl text-white"
        href="/"
        onClick={() => {
          /* Add logout functionality here */
        }}
      >
        <LogoutIcon />
      </Link>
    </nav>
  );
};

export default Navbar;
