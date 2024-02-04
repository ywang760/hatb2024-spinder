import Navbar from "@/components/navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div
      className="flex h-screen bg-opacity-20 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/home-bg.jpg')" }}
    >
      {router.pathname !== "/" && <Navbar />}
      <div className="flex-grow bg-white bg-opacity-70">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
