'use client';

import { useEffect, useState } from "react";
import SubjectCard from '@/components/SubjectCard';
import { BRANDING } from "@/config/branding";

export default function Home() {
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchSubjects = async () => {
      setIsLoading(true);
      setError("");

      try {
        const response = await fetch('/data/questions.json');

        if (!response.ok) {
          throw new Error("Failed to fetch subjects.");
        }

        const data = await response.json();
        const loadedSubjects = Array.isArray(data.subjects) ? data.subjects : [];

        if (isMounted) {
          setSubjects(loadedSubjects);
        }
      } catch (fetchError) {
        if (isMounted) {
          setError("Unable to load subjects right now. Please try again.");
          setSubjects([]);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchSubjects();

    return () => {
      isMounted = false;
    };
  }, [retryCount]);

  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-72 max-w-6xl rounded-[3rem] bg-gradient-to-r from-orange-200/40 via-transparent to-emerald-200/30 blur-3xl"></div>

      <section className="mx-auto w-full max-w-6xl">
        <div className="rounded-3xl border border-white/70 bg-white/80 p-8 shadow-[0_25px_60px_-40px_rgba(16,32,51,0.65)] backdrop-blur-sm">
          <p className="inline-flex rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-orange-800">
            {BRANDING.homeEyebrow}
          </p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{BRANDING.homeTitle}</h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700 sm:text-xl">{BRANDING.homeSubtitle}</p>
          <p className="mt-3 text-sm font-semibold uppercase tracking-[0.12em] text-emerald-700">{BRANDING.homeHint}</p>
        </div>

        {isLoading ? (
          <div className="mt-10 rounded-2xl border border-white/70 bg-white/70 p-8 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.7)]">
            <p className="text-lg font-semibold text-slate-600 animate-pulse">Loading subjects...</p>
          </div>
        ) : error ? (
          <div className="mt-10 w-full rounded-2xl border border-rose-200 bg-rose-50/90 p-8 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.7)]">
            <p className="font-medium text-rose-700">{error}</p>
            <button
              onClick={() => setRetryCount((prev) => prev + 1)}
              className="mt-4 rounded-xl bg-rose-600 px-5 py-2 font-semibold text-white transition hover:bg-rose-700"
            >
              Retry
            </button>
          </div>
        ) : subjects.length === 0 ? (
          <div className="mt-10 rounded-2xl border border-white/70 bg-white/70 p-8 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.7)]">
            <p className="text-lg text-slate-600">No subjects available right now.</p>
          </div>
        ) : (
          <div className="stagger-grid mt-10 grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {subjects.map((subject) => (
              <SubjectCard key={subject.name} subject={subject} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
