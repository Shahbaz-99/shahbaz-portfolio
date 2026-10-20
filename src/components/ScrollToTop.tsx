"use client";
import { useEffect } from "react";

/** On every load or refresh, start at the hero (top) instead of restoring the old scroll position. */
export default function ScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    if (window.location.hash) history.replaceState(null, "", window.location.pathname + window.location.search);
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);
  return null;
}