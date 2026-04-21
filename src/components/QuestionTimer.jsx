"use client";
import { useEffect, useRef, useState } from "react";

const TOTAL_SECONDS = 10;

const QuestionTimer = ({ onTimeUp, setTimePerQuestion, isAnswered, resetTimer }) => {
  const [seconds, setSeconds] = useState(TOTAL_SECONDS);
  const hasTimedOut = useRef(false);

  useEffect(() => {
    setTimePerQuestion(TOTAL_SECONDS - seconds);
  }, [seconds, setTimePerQuestion]);

  useEffect(() => {
    if (isAnswered) {
      return;
    }

    if (seconds === 0) {
      if (!hasTimedOut.current) {
        hasTimedOut.current = true;
        onTimeUp();
      }
      return;
    }

    const timer = setTimeout(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [seconds, isAnswered, onTimeUp]);

  // Reset the timer whenever a new question is loaded
  useEffect(() => {
    hasTimedOut.current = false;
    setSeconds(TOTAL_SECONDS);
    setTimePerQuestion(0);
  }, [resetTimer, setTimePerQuestion]);

  const progress = Math.max(0, Math.min(100, (seconds / TOTAL_SECONDS) * 100));
  const isUrgent = seconds <= 3;

  return (
    <div className="mb-6 rounded-2xl border border-slate-200 bg-slate-50/70 p-4" aria-live="polite" role="status">
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-600">Time Left</span>
        <span className={`text-xl font-extrabold ${isUrgent ? "text-rose-600" : "text-teal-700"}`}>{seconds}s</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full transition-all duration-1000 ${isUrgent ? "bg-rose-500" : "bg-teal-500"}`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default QuestionTimer;
