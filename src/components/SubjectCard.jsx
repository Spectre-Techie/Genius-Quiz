'use client';

import Image from 'next/image';
import { useRouter } from "next/navigation";

const toSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

export default function SubjectCard({ subject }) {
  const router = useRouter();

  const handleClick = () => {
    const subjectSlug = toSlug(subject.name);
    router.push(`/quiz/${encodeURIComponent(subjectSlug)}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={`Start ${subject.name} quiz`}
      className="group relative w-full overflow-hidden rounded-3xl border border-slate-200/80 bg-white/85 text-left shadow-[0_22px_45px_-35px_rgba(16,32,51,0.8)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_50px_-30px_rgba(16,32,51,0.85)] focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
    >
      <div className="relative overflow-hidden">
        <Image
          src={subject.image} 
          alt={`${subject.name} image`}
          width={400} 
          height={300} 
          className="h-52 w-full object-cover transition duration-500 group-hover:scale-110"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#102038]/70 via-[#102038]/20 to-transparent"></div>
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-slate-800">
          Challenge
        </span>
      </div>

      <div className="p-5">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-bold text-slate-900 transition-colors group-hover:text-orange-700">
            {subject.name}
          </h2>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-700">
            {subject.questions.length} Qs
          </span>
        </div>
        <p className="mt-3 text-sm text-slate-600">
          Start a timed sprint in {subject.name} and test your accuracy.
        </p>
        <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-orange-700">
          Start Challenge
          <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">-&gt;</span>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-orange-400 via-amber-300 to-emerald-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
    </button>
  );
}
