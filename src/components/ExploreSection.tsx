import React from "react";
import { Link } from "react-router-dom";

type Tile = { title: string; image: string; href: string };

export default function ExploreSection({
  tiles = [
    { title: "Buy",        image: "https://whiteandcogroup.com/wp-content/uploads/2025/07/Buy-Featured.webp",        href: "/buy" },
    { title: "Rent",       image: "https://whiteandcogroup.com/wp-content/uploads/2025/07/Rent-Featured.webp",       href: "/rent" },
    { title: "Sell",       image: "https://whiteandcogroup.com/wp-content/uploads/2025/07/Sell-Featured.webp",       href: "/sell" },
    { title: "Commercial", image: "https://whiteandcogroup.com/wp-content/uploads/2025/07/Commercial-Featured.webp", href: "/commercial" },
    { title: "Off Plan",   image: "https://whiteandcogroup.com/wp-content/uploads/2025/07/Offplan-Featured.webp",    href: "/off-plan" },
  ],
}: { tiles?: Tile[] }) {
  return (
    <section className="relative">
      {/* Heading + copy */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-semibold tracking-tight text-[#0D3B66] md:text-4xl">
          Explore Property in Dubai
        </h2>
        <p className="mt-3 max-w-3xl text-gray-700">
          Enclave Horizon is your go‑to real estate agency in Dubai, offering a wide range of homes and investments,
          expert advice, and a friendly team that’s with you every step of the way.
        </p>

        {/* Rail */}
        <div className="mt-8 overflow-x-auto">
          <div
            className="flex gap-4 pb-2 snap-x snap-mandatory"
            role="list"
          >
            {tiles.map((t) => (
              <Link
                key={t.title}
                to={t.href}
                role="listitem"
                className="group relative h-[360px] min-w-[260px] flex-1 snap-start overflow-hidden rounded-md shadow ring-1 ring-black/5 sm:min-w-[300px] md:min-w-[340px]"
              >
                <img
                  src={t.image}
                  alt={t.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4">
                  <span className="text-white text-lg font-medium drop-shadow">{t.title}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Stats band */}
      <StatsBand
        items={[
          { big: "300+", sub1: "Community Brokers", sub2: "Here to Help" },
          { big: "4.7/5", sub1: "Google Rating from", sub2: "1,152 Reviews" },
          { big: "6,000+", sub1: "Property", sub2: "Transactions in 2024" },
          { big: "24/7", sub1: "We Work Round", sub2: "the Clock" },
        ]}
      />
    </section>
  );
}

function StatsBand({
  items,
}: {
  items: { big: string; sub1: string; sub2?: string }[];
}) {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* thin white rule aligned with cards in ref */}
        <div className="h-px w-full bg-white/70 translate-y-[-1px]" />
        <div className="grid grid-cols-2 gap-8 py-8 md:grid-cols-4 md:gap-6">
          {items.map((it, i) => (
            <div
              key={i}
              className="flex flex-col items-start justify-center gap-1 md:items-center"
            >
              <div className="text-3xl font-semibold tracking-tight md:text-4xl">
                {it.big}
              </div>
              <div className="text-[11px] uppercase tracking-[0.14em] text-white/90">
                {it.sub1}
              </div>
              {it.sub2 && (
                <div className="text-[11px] uppercase tracking-[0.14em] text-white/90">
                  {it.sub2}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
