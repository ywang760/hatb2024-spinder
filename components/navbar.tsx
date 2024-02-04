import ChatIcon from "@mui/icons-material/Chat";
import ExploreIcon from "@mui/icons-material/Explore";
import LogoutIcon from "@mui/icons-material/Logout";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="flex flex-col items-center w-80 h-full p-6 bg-primary-500 text-zinc-50 justify-around font-mono">
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
          className=" text-2xl space-x-2 flex flex-row items-center"
        >
          <ExploreIcon />
          <div>Explore</div>
        </Link>
        <Link
          href="/chat"
          className="e text-2xl space-x-2 flex flex-row items-center"
        >
          <ChatIcon />
          <div>Chat</div>
        </Link>
      </div>
      <Link
        className="mb-20 bg-primary-400 hover:bg-primary-600 p-6 border-2 border-zinc-50 rounded-xl "
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
