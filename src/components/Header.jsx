"use client";

import { FaCoins } from "react-icons/fa6";

import Link from "next/link";
import { usePoints } from "@/context/PointsContext";
import { BRANDING } from "@/config/branding";

const Header = () => {
  const { points } = usePoints();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-900/10 bg-[linear-gradient(96deg,#0b2037_0%,#133352_46%,#174161_100%)] text-slate-100 shadow-[0_10px_24px_-16px_rgba(2,6,23,0.9)] backdrop-blur">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6">
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.35em] text-amber-200/95 sm:text-[11px]">
            {BRANDING.headerTagline}
          </span>
          <span className="mt-1 text-2xl font-black tracking-[0.03em] text-white sm:text-[2rem]">
            {BRANDING.appName}
          </span>
        </Link>

        <div className="flex items-center gap-3 rounded-2xl border border-white/20 bg-white/10 px-4 py-2">
          <FaCoins className="text-xl text-amber-300 sm:text-2xl" />
          <div className="flex flex-col leading-none">
            <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-200 sm:text-[11px]">Points</span>
            <span className="mt-1 text-lg font-extrabold tracking-wide text-amber-100 sm:text-xl">{points}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
