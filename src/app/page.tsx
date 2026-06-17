import { VIcons } from "@/lib/asset";
import Image from "next/image";
import { cn } from "@/lib/utils";
import SearchEventForm from "@/components/search-event-form";

export default function Home() {
  return (
    <>
      {/* NavBar */}
      <header className=" sticky top-0 w-full bg-primary border-b border-primary z-10 ">
        <div className=" w-full max-w-screen-lg mx-auto px-3 py-4 flex justify-between items-center">
          <Image src={VIcons.dark} width={120} height={32} alt="icon" />

          <h1 className="items-center text-lg font-bold text-white">
            HIMATIKA Vektor Event Management Platform
          </h1>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="search"
        className={cn("py-20 px-5", " bg-primary/50 h-svh flex items-center")}
      >
        <div className=" w-full max-w-screen-xl mx-auto space-y-4">
          <h1 className={cn(" text-3xl md:text-5xl font-bold text-center")}>
            Temukan 🔎 dan Ikuti
            <br /> Event Favoritmu!
          </h1>
          <p className=" text-center">
            Masukkan Code Event yang kamu terima dan langsung akses halaman
            eventnya.
          </p>
          <SearchEventForm className=" flex gap-3 w-full max-w-screen-md mx-auto" />
        </div>
      </section>
    </>
  );
}
