import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title?: string;
  subtitle?: string;
  image?: string; // /public path or URL
};

export default function HeroCta({
  title = "Find Your Next Home With Enclave Horizon.",
  subtitle = "Looking to buy, rent, or invest in Dubai? Our team is here to guide you every step of the way. Let’s make your property journey simple, smooth, and successful.",
  image = "/city.jpg",
}: Props) {
  return (
    <section className="relative isolate h-[68vh] min-h-[480px] w-full overflow-hidden">
      {/* Background */}
      <img
        src={image}
        alt=""
        className="absolute inset-0 -z-10 h-full w-full object-cover grayscale"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 -z-10 bg-black/45" />

      {/* Content */}
      <div className="mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 max-w-3xl text-base text-white/90 sm:text-lg">
          {subtitle}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/properties"
            className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10"
          >
            Search Properties
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-semibold uppercase tracking-wider text-white hover:bg-white/10"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </section>
  );
}
