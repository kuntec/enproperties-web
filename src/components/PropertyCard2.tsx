import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Bed, Bath, Ruler, MapPin, MessageCircle } from "lucide-react";

export type PropertyCardProps = {
  id: string;
  images: string[];
  priceAED: number;
  summary: string; // e.g., "MID FLOOR | PARK VIEW | MULTIPLE UNITS"
  address: string; // e.g., "Island Park II, Dubai Creek Harbour (The Lagoons)"
  beds: number;
  baths: number;
  areaSqft: number;
  whatsapp?: string; // phone in international format, e.g. "971501234567"
};

const formatAED = (v: number) =>
  new Intl.NumberFormat("en-AE", { style: "currency", currency: "AED", maximumFractionDigits: 0 }).format(v);

export default function PropertyCard2({
  id,
  images,
  priceAED,
  summary,
  address,
  beds,
  baths,
  areaSqft,
  whatsapp,
}: PropertyCardProps) {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, dragFree: false });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  const waHref = whatsapp
    ? `https://wa.me/${whatsapp}?text=${encodeURIComponent(
        `Hello! I'm interested in property ${id} priced at ${formatAED(priceAED)}.`
      )}`
    : undefined;

  return (
    <article className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
      {/* Carousel */}
      <div className="relative">
        <div className="overflow-hidden rounded-t-2xl" ref={emblaRef}>
          <div className="flex">
            {images.map((src, i) => (
              <div className="relative min-w-0 flex-[0_0_100%]" key={i}>
                <img src={src} alt={`Property ${id} image ${i + 1}`} className="h-72 w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button
              aria-label="Previous image"
              onClick={scrollPrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-gray-900 shadow hover:bg-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              aria-label="Next image"
              onClick={scrollNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center h-9 w-9 rounded-full bg-white/90 text-gray-900 shadow hover:bg-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}

        {/* Dot (centered bottom) */}
        {images.length > 1 && (
          <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2">
            <div className="h-2 w-2 rounded-full bg-white/90 ring-1 ring-black/10" />
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="text-2xl font-semibold tracking-tight">{formatAED(priceAED)}</h3>

        <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-gray-700">
          {summary}
        </p>

        <div className="mt-2 flex items-start gap-2 text-gray-700">
          <MapPin className="mt-0.5 h-5 w-5 text-primary" />
          <span className="text-[15px] leading-6">{address}</span>
        </div>

        {/* Specs + WhatsApp */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-5 text-gray-900">
            <span className="inline-flex items-center gap-2">
              <Bed className="h-5 w-5" /> <span className="text-sm">{beds}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Bath className="h-5 w-5" /> <span className="text-sm">{baths}</span>
            </span>
            <span className="inline-flex items-center gap-2">
              <Ruler className="h-5 w-5" />{" "}
              <span className="text-sm">{areaSqft.toLocaleString()} sq ft</span>
            </span>
          </div>

          {waHref && (
            <a
              href={waHref}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white hover:bg-primary"
            >
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
