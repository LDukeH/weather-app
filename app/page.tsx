import { Bricolage_Grotesque } from "next/font/google";
import LogoIcon from "@/public/assets/images/logo.svg";

import SearchBar from "@/components/SearchBar";
import WeatherData from "@/components/WeatherData";

import { ToastContainer } from "react-toastify";

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div className="w-full mx-auto border-blue-500">
      <ToastContainer />

      {/* Header */}
      <header className="flex items-center justify-between w-full h-16 px-6 mx-auto lg:px-12">
        <LogoIcon />
      </header>

      <main className="w-full px-6 mx-auto space-y-12 lg:px-12">
        <section className="w-full pt-16 space-y-8 text-center">
          <h1 className=" text-6xl font-bold max-w-[22rem] sm:max-w-[28rem] lg:max-w-none mx-auto">
            How’s the sky looking today?
          </h1>

          <SearchBar />
        </section>

        {/* Weather */}
        <section className="w-full mx-auto">
          <WeatherData />
        </section>
      </main>
    </div>
  );
}
