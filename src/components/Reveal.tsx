"use client";
import { useEffect, useRef, type ReactNode } from "react";

/** Single job: fade/slide children in when scrolled into view. */
export default function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("in"); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms` }}>{children}</div>;
}
