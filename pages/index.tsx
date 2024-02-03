import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [showWarning, setShowWarning] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-home-bg bg-cover bg-center">
      <main className="flex flex-col items-center justify-center flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold text-zinc-50">Welcome to our game</h1>
        <div className="flex flex-wrap items-center justify-around max-w-4xl mt-20 sm:w-full">
          <Link
            href="/game"
            className="p-6 mt-6 text-center border w-72 rounded-xl hover:text-blue-600 focus:text-blue-600 transform hover:scale-110 transition-transform duration-200"
          >
            <h3 className="text-2xl font-bold text-zinc-50">
              Start Game &rarr;
            </h3>
          </Link>
        </div>
      </main>
    </div>
  );
}
