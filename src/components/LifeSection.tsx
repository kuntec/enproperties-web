import React from "react";
import { Link } from "react-router-dom";

type Tile = {
  title: string;
  desc?: string;
  image: string;
  href: string;
};

export default function LifeSection({
  heading = "Life at Enclave Horizon",
  copy = `At Enclave Horizon, it's more than just real estate — it's a team of passionate
people, a positive culture, and a place where careers grow and achievements are celebrated together.`,
  left = {
    title: "Meet The Team",
    desc:
      "Get to know the people behind Enclave Horiozon — a passionate, knowledgeable team that's here to guide you through every step of your property journey in Dubai.",
    image: "https://cdn.pixabay.com/photo/2020/07/08/04/12/work-5382501_1280.jpg",
    href: "/team",
  },
  right = {
    title: "Careers",
    image: "https://cdn.pixabay.com/photo/2019/12/17/17/09/woman-4702060_1280.jpg",
    href: "/careers",
  },
}: {
  heading?: string;
  copy?: string;
  left?: Tile;
  right?: Tile;
}) {
  return (
    <section className="bg-[#F7F5F2] py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Headline */}
        <h2 className="text-3xl font-semibold tracking-tight text-[#0D3B66] md:text-4xl">
          {heading}
        </h2>
        <p className="mt-3 max-w-4xl text-lg text-gray-800">{copy}</p>

        {/* Tiles */}
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <LifeTile {...left} withDesc />
          <LifeTile {...right} />
        </div>
      </div>
    </section>
  );
}

function LifeTile({
  title,
  desc,
  image,
  href,
  withDesc,
}: Tile & { withDesc?: boolean }) {
  return (
    <Link
      to={href}
      className="group relative block overflow-hidden rounded-md"
    >
      {/* Image */}
      <img
        src={image}
        alt={title}
        className="h-[420px] w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />

      {/* Dark gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

      {/* Top-center VIEW bar */}
      <div className="pointer-events-none absolute left-0 right-0 top-5 flex items-center justify-center gap-4 text-white/90">
        <span className="h-px w-14 bg-white/70" />
        <span className="text-xs tracking-[0.35em]">VIEW</span>
        <span className="h-px w-14 bg-white/70" />
      </div>

      {/* Bottom-left caption */}
      <div className="absolute bottom-4 left-5 right-5">
        <h3 className="text-2xl font-semibold text-white drop-shadow">{title}</h3>
        {withDesc && (
          <p className="mt-2 max-w-xl text-white/90 drop-shadow">
            {desc}
          </p>
        )}
      </div>

      {/* Subtle hover border glow */}
      <div className="pointer-events-none absolute inset-0 rounded-md ring-0 ring-white/0 transition group-hover:ring-2 group-hover:ring-white/30" />
    </Link>
  );
}
