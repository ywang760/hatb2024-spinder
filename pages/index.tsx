import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-home-bg bg-cover bg-center font-mono w-full">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        {/* Smaller Logo */}
        <img
          src="/logo.png"
          alt="Logo"
          className="mb-4" // You can adjust the margin as needed
          width="100"   // Adjust the width to make it smaller
          height="100"  // Adjust the height to make it smaller
          style={{ borderRadius: "30%" }}
        />

        {/* Name "Spinder" */}
        <div className="text-6xl font-bold text-4xl text-zinc-50 mb-6">
          Spinder
        </div>

        {/* Main heading */}
        <h1 className="text-4xl font-bold text-zinc-50">
          You have some new matchups!
        </h1>
        
        {/* Adjusted margin for "See profiles" link */}
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-10 sm:w-full">
          <Link
            href="/feed"
            className="p-6 mt-2 text-center border w-72 rounded-xl hover:text-blue-600 focus:text-blue-600 transform hover:scale-110 transition-transform duration-200"
          >
            <h3 className="text-2xl font-bold text-zinc-50">
              See profiles &rarr;
            </h3>
          </Link>
        </div>
      </main>
    </div>
  );
}
