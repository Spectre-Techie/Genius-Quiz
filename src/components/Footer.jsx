import { BRANDING } from "@/config/branding";
import Link from "next/link";

const Footer = () => (
  <footer className="mt-8 border-t border-slate-900/10 bg-[#0d233b] text-slate-200">
    <div className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm font-semibold tracking-wide text-white">{BRANDING.footerBrand}</p>

        <nav className="flex items-center gap-4 text-xs font-medium">
          <Link href="/" className="text-slate-200 transition hover:text-white">Home</Link>
          <Link href="/quiz/coding" className="text-slate-200 transition hover:text-white">Coding Quiz</Link>
        </nav>
      </div>

      <p className="mt-2 text-xs text-slate-300">{BRANDING.footerNote}</p>
      <p className="mt-1 text-xs text-slate-400">&copy; {new Date().getFullYear()} {BRANDING.footerBrand}. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
