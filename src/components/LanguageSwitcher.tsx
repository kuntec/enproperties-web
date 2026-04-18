// src/components/LanguageSwitcher.tsx
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useEffect, useMemo, useState } from "react";
import clsx from "clsx";

/** Minimal inline SVG flags (no external assets) */
const Flag = {
  // UK/English
  GB: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-full overflow-hidden">
      <clipPath id="gb"><path d="M0 0h60v60H0z"/></clipPath>
      <g clipPath="url(#gb)">
        <path fill="#012169" d="M0 0h60v60H0z"/>
        <path stroke="#fff" strokeWidth="12" d="M0 0l60 60M60 0L0 60"/>
        <path stroke="#C8102E" strokeWidth="8" d="M0 0l60 60M60 0L0 60"/>
        <path fill="#fff" d="M25 0h10v60H25zM0 25h60v10H0z"/>
        <path fill="#C8102E" d="M27.5 0h5v60h-5zM0 27.5h60v5H0z"/>
      </g>
    </svg>
  ),
  // UAE/Arabic
  AE: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-sm">
      <path fill="#00732f" d="M20 0h40v20H20z"/><path fill="#fff" d="M20 20h40v20H20z"/>
      <path fill="#000" d="M20 40h40v20H20z"/><path fill="#ef3340" d="M0 0h20v60H0z"/>
    </svg>
  ),
  // China / Chinese
  CN: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-sm">
      <path fill="#EE1C25" d="M0 0h60v60H0z"/>
      <path fill="#FF0" d="M10 12l2.4 7.3H20l-5.8 4.2 2.2 7.2-6-4.3-6 4.3 2.3-7.2L0 19.3h7.6z"/>
      <circle cx="26" cy="12" r="1.8" fill="#FF0"/><circle cx="30" cy="16" r="1.8" fill="#FF0"/>
      <circle cx="30" cy="22" r="1.8" fill="#FF0"/><circle cx="26" cy="26" r="1.8" fill="#FF0"/>
    </svg>
  ),
  FR: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-sm">
      <path fill="#0055A4" d="M0 0h20v60H0z"/><path fill="#fff" d="M20 0h20v60H20z"/><path fill="#EF4135" d="M40 0h20v60H40z"/>
    </svg>
  ),
  RU: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-sm">
      <path fill="#fff" d="M0 0h60v20H0z"/><path fill="#0039A6" d="M0 20h60v20H0z"/><path fill="#D52B1E" d="M0 40h60v20H0z"/>
    </svg>
  ),
  ES: () => (
    <svg viewBox="0 0 60 60" className="h-5 w-5 rounded-sm">
      <path fill="#AA151B" d="M0 0h60v60H0z"/><path fill="#F1BF00" d="M0 15h60v30H0z"/>
    </svg>
  ),
};

type Locale = "ar" | "zh" | "en" | "fr" | "ru" | "es";

const LANGS: { code: Locale; label: string; flag: keyof typeof Flag }[] = [
  { code: "ar", label: "Arabic", flag: "AE" },
  { code: "zh", label: "Chinese", flag: "CN" },
  { code: "en", label: "English", flag: "GB" },
  { code: "fr", label: "French", flag: "FR" },
  { code: "ru", label: "Russian", flag: "RU" },
  { code: "es", label: "Spanish", flag: "ES" },
];

type Props = {
  value?: Locale;                   // current locale
  onChange?: (v: Locale) => void;   // callback when changed
  light?: boolean;                  // for white trigger over hero
};

export default function LanguageSwitcher({ value, onChange, light }: Props) {
  const [locale, setLocale] = useState<Locale>(value || "en");

  useEffect(() => {
    if (value && value !== locale) setLocale(value);
  }, [value]);

  const CurrentFlag = useMemo(() => Flag[LANGS.find(l => l.code === locale)?.flag || "GB"], [locale]);

  const handleSelect = (code: Locale) => {
    setLocale(code);
    // persist and notify
    localStorage.setItem("lang", code);
    onChange?.(code);
    // Optionally: trigger i18n change or reload routes
    // i18n.changeLanguage(code)
  };

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Change language"
          className={clsx(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border transition",
            light ? "border-white/70" : "border-gray-300",
            light ? "bg-white/10 hover:bg-white/20" : "bg-white hover:bg-gray-50",
          )}
        >
          <CurrentFlag />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          sideOffset={10}
          align="end"
          className="z-50 w-56 rounded-md bg-white p-2 shadow-xl ring-1 ring-black/5 data-[state=open]:animate-in data-[state=closed]:animate-out"
        >
          {LANGS.map(({ code, label, flag }) => {
            const F = Flag[flag];
            const active = locale === code;
            return (
              <DropdownMenu.Item
                key={code}
                onSelect={() => handleSelect(code)}
                className={clsx(
                  "flex cursor-pointer select-none items-center gap-3 rounded-md px-3 py-2 text-sm uppercase tracking-wide outline-none",
                  active ? "bg-emerald-50 text-emerald-800" : "hover:bg-gray-50"
                )}
              >
                <F />
                <span className="text-gray-900">{label}</span>
              </DropdownMenu.Item>
            );
          })}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
