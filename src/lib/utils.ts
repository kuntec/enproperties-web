import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


// utils/translateText.ts
import axios from "axios";

export async function translateText(text: string, targetLang: string) {
  if (!text) return "";

  const res = await axios.post("https://libretranslate.com/translate", {
    q: text,
    source: "en",
    target: targetLang,
    format: "text",
  });

  return res.data.translatedText;
}
