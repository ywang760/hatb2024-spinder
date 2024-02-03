import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "@/components/navbar";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <div className="flex h-screen">
      {router.pathname !== "/" && <Navbar />}
      <div className="flex-grow">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
