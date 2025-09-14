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
    <div className="px-28 w-full">
      <ToastContainer />
      <div
        className={`${bricolageGrotesque.className} text-white pt-12 flex justify-between items-center`}
      >
        <LogoIcon />

        <div>Drop down go here</div>
      </div>

      <div
        className={`${bricolageGrotesque.className} text-white text-5.5xl mt-16 w-full flex justify-center font-bold`}
      >
        How's the sky looking today?
      </div>

      <div className="mt-16">
        <SearchBar />
      </div>

      <div className="mt-12">
        <WeatherData />
      </div>
    </div>
  );
}
