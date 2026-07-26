"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FinniKKNavigationLoader() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  useEffect(() => { setLoading(false); }, [pathname]);

  useEffect(() => {
    const click = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("a") as HTMLAnchorElement | null;
      if (!el || !el.href) return;
      const url = new URL(el.href, window.location.href);
      if (url.origin !== window.location.origin || url.hash || el.target === "_blank") return;
      if (url.pathname !== window.location.pathname) setLoading(true);
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, []);

  if (!loading) return null;
  return <div className="fixed inset-0 z-[9998] flex items-center justify-center bg-background/95 backdrop-blur-md">
    <div className="w-[min(78vw,360px)] text-center">
      <div className="finnikk-loader-word">finni<span>kk</span></div>
      <p className="mt-3 text-[10px] uppercase tracking-[.34em] text-muted-foreground sm:text-xs">Preparing your experience</p>
      <div className="finnikk-loader-track mt-7"><div className="finnikk-loader-bar" /></div>
    </div>
  </div>;
}
