"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaTrophy, FaCheckCircle, FaTimesCircle, FaQuestionCircle, FaPercentage, FaClock, FaStopwatch } from "react-icons/fa";
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Results = ({
  score,
  totalQuestions,
  correctAnswers,
  wrongAnswers,
  unattemptedQuestions,
  percentage,
  timeSpent,
  averageTimePerQuestion,
  onRetake,
}) => {
  // Set the state for confetti
  const [showConfetti, setShowConfetti] = useState(true);
  const { width, height } = useWindowSize();
  const earnedPoints = correctAnswers * 4;
  const resultTone =
    percentage >= 80 ? "Champion Run" : percentage >= 50 ? "Solid Run" : "Keep Training";

  const stats = [
    {
      label: "Total Points",
      value: score,
      icon: FaTrophy,
      iconColor: "text-amber-500",
    },
    {
      label: "Points Earned",
      value: earnedPoints,
      icon: FaTrophy,
      iconColor: "text-orange-500",
    },
    {
      label: "Correct Answers",
      value: correctAnswers,
      icon: FaCheckCircle,
      iconColor: "text-emerald-500",
    },
    {
      label: "Wrong Answers",
      value: wrongAnswers,
      icon: FaTimesCircle,
      iconColor: "text-rose-500",
    },
    {
      label: "Unattempted Questions",
      value: unattemptedQuestions,
      icon: FaQuestionCircle,
      iconColor: "text-amber-500",
    },
    {
      label: "Percentage",
      value: `${percentage}%`,
      icon: FaPercentage,
      iconColor: "text-sky-500",
    },
    {
      label: "Total Time Spent",
      value: `${timeSpent.toFixed(2)}s`,
      icon: FaClock,
      iconColor: "text-indigo-500",
    },
    {
      label: "Avg Time/Question",
      value: `${averageTimePerQuestion}s`,
      icon: FaStopwatch,
      iconColor: "text-cyan-500",
    },
  ];

  // Disable confetti after a few seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
    }, 7000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6">
      {showConfetti && <Confetti width={width} height={height} numberOfPieces={420} recycle={false} />}

      <div className="mx-auto w-full max-w-6xl">
        <section className="rounded-3xl border border-white/70 bg-white/85 p-8 shadow-[0_25px_60px_-40px_rgba(16,32,51,0.7)]">
          <p className="inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-800">
            Results Dashboard
          </p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900">Quiz Complete</h2>
          <p className="mt-3 text-lg text-slate-700">
            {resultTone} - You scored {earnedPoints} out of {totalQuestions * 4} points.
          </p>
        </section>

        <div className="stagger-grid mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map(({ label, value, icon: Icon, iconColor }) => (
            <article
              key={label}
              className="rounded-2xl border border-white/70 bg-white/80 p-5 shadow-[0_20px_45px_-35px_rgba(16,32,51,0.75)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_45px_-30px_rgba(16,32,51,0.85)]"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-500">{label}</p>
                  <p className="mt-2 text-2xl font-extrabold text-slate-900">{value}</p>
                </div>
                <Icon className={`text-3xl ${iconColor}`} aria-hidden="true" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/70 bg-white/80 p-6 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.75)]">
          <p className="text-xl font-semibold text-slate-800">
            Keep going. Your next streak starts now.
          </p>
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              type="button"
              onClick={onRetake}
              className="w-full rounded-xl bg-gradient-to-r from-orange-500 to-emerald-500 px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-white transition hover:from-orange-600 hover:to-emerald-600 sm:w-auto"
            >
              Retake Quiz
            </button>
            <Link
              href="/"
              className="w-full rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-bold uppercase tracking-[0.06em] text-slate-700 transition hover:bg-slate-100 sm:w-auto"
            >
              Go To Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
