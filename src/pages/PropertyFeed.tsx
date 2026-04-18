import { API_BASE_URL } from "@/lib/api";
import { useEffect, useState } from "react";

export default function PropertyFeed() {
  const [xmlText, setXmlText] = useState("");

  useEffect(() => {
    const fetchXML = async () => {
      const res = await fetch(`${API_BASE_URL}/properties/feed/xml`);
      const xml = await res.text();
      setXmlText(xml);
    };
    fetchXML();
  }, []);

  return (
    <>
    {xmlText}
    </>
  );
}
