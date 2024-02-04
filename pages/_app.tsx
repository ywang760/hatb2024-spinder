import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Cute_Font, Nanum_Brush_Script, Roboto_Mono } from "next/font/google";
import { useRouter } from "next/router";
import { AlienStateProvider } from "../components/AlienContext";

// const inter = Inter({
//   subsets: ["latin"],
//   display: "swap",
//   variable: "--font-inter",
// });

const roboto_mono = Roboto_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto-mono",
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className={` ${roboto_mono.variable} flex h-screen bg-opacity-20 bg-cover bg-center `}
      style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
    >
      {router.pathname !== "/" && <Navbar />}
      <AlienStateProvider>
        <div className="flex-grow  bg-zinc-50 bg-opacity-70">
          <Component {...pageProps} />
        </div>
      </AlienStateProvider>
    </div>
  );
}
