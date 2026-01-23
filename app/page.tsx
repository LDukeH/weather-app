import Image from "next/image";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import LogoIcon from "@/public/assets/images/logo.svg";

import SearchBar from "@/components/SearchBar";
import WeatherData from "@/components/WeatherData";

import { ToastContainer } from "react-toastify";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="mx-auto max-w-9xl px-6 lg:px-12">
      <ToastContainer />
      {/* Header */}
      <header className="mx-auto px-6 lg:px-12 h-16 flex items-center justify-between">
        <LogoIcon />
        <div>Dropdown</div>
      </header>

      <main className="mx-auto px-6 lg:px-12 space-y-16">
        <section className="pt-16 space-y-8 text-center">
          <h1
            className={`${bricolageGrotesque.className} text-[3.5rem] font-bold max-w-5xl mx-auto`}
          >
            How’s the sky looking today?
          </h1>
          <SearchBar />
        </section>

        {/* Weather */}
        <section>
          <WeatherData />
        </section>
      </main>
    </div>
  );
}
