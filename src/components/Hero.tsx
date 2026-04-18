// src/components/Hero.tsx
import { Search } from "lucide-react";
import { ReactNode } from "react";
import clsx from "clsx";

type HeroProps = {
  media?: ReactNode; // <video .../> or <img .../>
  kicker?: string;   // the large faint word (e.g., "Forward Thinking")
  title: string;     // main title (e.g., "Real Estate")
  subtitle?: string;
};

export default function Hero({ media, kicker = "Luxury", title, subtitle }: HeroProps) {
  return (
    <section className="relative h-[82vh] min-h-[720px] w-full overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0 -z-10">
        {media ?? (
            <>
          <video
      autoPlay
      loop
      muted
      playsInline
      className="hidden md:block h-full w-full object-cover"
      >
      <source src="/hero_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <img
            src="https://cdn.pixabay.com/photo/2017/02/27/12/04/dubai-3-2103072_1280.jpg"
            alt="Hero background"
            className="block md:hidden h-full w-full object-cover"
            />
    </>
  
          
        )}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="mx-auto flex h-full max-w-7xl flex-col justify-center gap-6 px-4 sm:px-6 lg:px-8">
      <div className="relative text-center sm:text-left">
  {/* Kicker text – large behind title */}
  <span className="pointer-events-none block select-none font-extrabold tracking-tight text-white/30 
                   text-[2.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] leading-none">
    {kicker}
  </span>

  {/* Title */}
  <h1 className="mt-2 sm:-mt-4 text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white">
    {title}
  </h1>
</div>

        {subtitle && (
          <p className="max-w-3xl text-base text-white/90 md:text-lg">
            {subtitle}
          </p>
        )}

        {/* Search Bar */}
        <div className="mt-2 w-full max-w-4xl rounded-lg bg-white/95 p-2 shadow-lg backdrop-blur">
          <form
            className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_max-content] sm:gap-3"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 gap-2 md:grid-cols-5">
              <div className="col-span-4 flex items-center gap-2 rounded-md border border-gray-300 px-3">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="City, community or building"
                  className="h-10 w-full bg-transparent text-sm outline-none placeholder:text-gray-500"
                />
              </div>
              {/* <Select like="Buy" />
              <Select like="Property Type" />
              <Select like="Min Price" /> */}
              {/* You can add more selects like Bedrooms/Bathrooms here */}
            </div>

            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary"
            >
              Search
            </button>
          </form>

          {/* Quick filters (Residential / Commercial / Off Plan) */}
          {/* <div className="mt-3 flex flex-wrap items-center gap-x-6 gap-y-2 px-1">
            {["Residential", "Commercial", "Off Plan"].map((t) => (
              <button
                key={t}
                className="text-xs uppercase tracking-wide text-black hover:text-black"
              >
                {t}
              </button>
            ))}
            <button className="ml-auto flex items-center gap-2 text-xs font-medium text-black hover:text-black">
              <span className="inline-block h-0.5 w-3 bg-white/60" />
              Advanced Search
            </button>
          </div> */}
        </div>
      </div>
    </section>
  );
}

/** Minimal faux select to keep markup light; swap with Radix/Select later */
function Select({ like }: { like: string }) {
  return (
    <div className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-700">
      {like} <span className="ml-2 text-gray-400">▾</span>
    </div>
  );
}
