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

const cute_font = Cute_Font({
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  variable: "--font-cute",
});

const nanum = Nanum_Brush_Script({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nanum",
  weight: ["400"],
});

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className={` ${roboto_mono.variable} ${cute_font.variable} ${nanum.variable} flex h-screen bg-opacity-20 bg-cover bg-center `}
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
