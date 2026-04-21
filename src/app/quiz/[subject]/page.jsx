"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePoints } from "@/context/PointsContext";
import QuestionTimer from "@/components/QuestionTimer";
import Results from "@/components/Results";

const toSlug = (value = "") =>
  value
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");

const Quiz = ({ params }) => {
  const { subject } = params;
  const { points, setPoints } = usePoints();

  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [retryCount, setRetryCount] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [unattemptedQuestions, setUnattemptedQuestions] = useState(0);
  const [totalTimeSpent, setTotalTimeSpent] = useState(0);
  const [timePerQuestion, setTimePerQuestion] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const fetchQuestions = async () => {
      setIsLoading(true);
      setLoadError("");

      setQuestions([]);
      setCurrentQuestionIndex(0);
      setSelectedOption(null);
      setIsAnswered(false);
      setShowResults(false);
      setCorrectAnswers(0);
      setWrongAnswers(0);
      setUnattemptedQuestions(0);
      setTotalTimeSpent(0);
      setTimePerQuestion(0);
      setPoints(0);

      try {
        const response = await fetch("/data/questions.json");

        if (!response.ok) {
          throw new Error("Failed to fetch questions.");
        }

        const data = await response.json();
        const normalizedSubject = toSlug(decodeURIComponent(subject || ""));

        const subjectData = Array.isArray(data.subjects)
          ? data.subjects.find((entry) => toSlug(entry.name) === normalizedSubject)
          : null;

        if (!subjectData || !Array.isArray(subjectData.questions) || subjectData.questions.length === 0) {
          throw new Error("Quiz subject not found or has no questions.");
        }

        if (isMounted) {
          setQuestions(subjectData.questions);
        }
      } catch (error) {
        if (isMounted) {
          setLoadError(error?.message || "Unable to load this quiz right now.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      isMounted = false;
    };
  }, [subject, retryCount, setPoints]);

  const handleAnswer = (option) => {
    if (isAnswered || questions.length === 0) {
      return;
    }

    const currentQuestion = questions[currentQuestionIndex];
    if (!currentQuestion) {
      return;
    }

    setSelectedOption(option);
    setIsAnswered(true);

    // Track the time spent on this question
    setTotalTimeSpent((prev) => prev + timePerQuestion);

    if (option === currentQuestion.answer) {
      setPoints((prev) => prev + 4); // 4 points for a correct answer
      setCorrectAnswers((prev) => prev + 1);
    } else {
      setWrongAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (questions.length === 0) {
      return;
    }

    const nextQuestion = currentQuestionIndex + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestionIndex(nextQuestion);
      setSelectedOption(null);
      setIsAnswered(false);
      setTimePerQuestion(0);
    } else {
      setShowResults(true);
    }
  };

  // When time is up
  const handleTimeUp = () => {
    if (isAnswered || questions.length === 0) {
      return;
    }

    setIsAnswered(true);
    setUnattemptedQuestions((prev) => prev + 1);
    setTotalTimeSpent((prev) => prev + 10);
    handleNext(); // Automatically go to the next question
  };

  const handleRetake = () => {
    setPoints(0);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setShowResults(false);
    setCorrectAnswers(0);
    setWrongAnswers(0);
    setUnattemptedQuestions(0);
    setTotalTimeSpent(0);
    setTimePerQuestion(0);
  };

  const totalQuestions = questions.length;
  const currentQuestion = questions[currentQuestionIndex];
  const subjectLabel = decodeURIComponent(subject || "")
    .split("-")
    .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
    .join(" ");

  // Calculate the percentage score
  const percentage = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
  const averageTimePerQuestion =
    totalQuestions > 0 ? (totalTimeSpent / totalQuestions).toFixed(2) : "0.00";

  return (
    <div className="relative min-h-screen px-4 py-10 sm:px-6">
      <div className="pointer-events-none absolute inset-x-0 top-6 -z-10 mx-auto h-72 max-w-5xl rounded-[3rem] bg-gradient-to-r from-orange-200/35 via-transparent to-emerald-200/35 blur-3xl"></div>

      {isLoading ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-white/70 bg-white/80 p-10 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.7)]">
          <p className="text-xl font-semibold text-slate-600 animate-pulse">Loading quiz...</p>
        </div>
      ) : loadError ? (
        <div className="mx-auto max-w-3xl rounded-2xl border border-rose-200 bg-rose-50/90 p-8 text-center shadow-[0_20px_45px_-35px_rgba(16,32,51,0.7)]">
          <h2 className="mb-4 text-3xl font-bold text-rose-700">Unable to load quiz</h2>
          <p className="text-slate-700">{loadError}</p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              onClick={() => setRetryCount((prev) => prev + 1)}
              className="rounded-xl bg-rose-600 px-5 py-2 font-semibold text-white transition hover:bg-rose-700"
            >
              Retry
            </button>
            <Link
              href="/"
              className="rounded-xl bg-slate-800 px-5 py-2 font-semibold text-white transition hover:bg-slate-900"
            >
              Back Home
            </Link>
          </div>
        </div>
      ) : !showResults ? (
        <div className="mx-auto max-w-3xl overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_25px_60px_-38px_rgba(16,32,51,0.7)] sm:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-orange-200">
              {subjectLabel}
            </span>
            <span className="text-sm font-semibold uppercase tracking-[0.1em] text-slate-600">
              Question {currentQuestionIndex + 1}/{totalQuestions}
            </span>
          </div>

          <div
            className="mb-6 h-2 overflow-hidden rounded-full bg-slate-200"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-orange-500 via-amber-400 to-emerald-500 transition-all duration-300"
            style={{ width: `${totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0}%` }}
            ></div>
          </div>

          <h3 className="mb-2 text-sm font-semibold uppercase tracking-[0.14em] text-emerald-700">Current Challenge</h3>
          <h2 className="mb-6 text-2xl font-extrabold leading-tight text-slate-900 sm:text-3xl">
            {currentQuestion?.question}
          </h2>

          <QuestionTimer
            onTimeUp={handleTimeUp}
            setTimePerQuestion={setTimePerQuestion}
            isAnswered={isAnswered}
            resetTimer={currentQuestionIndex}
          />

          <div className="mt-4 space-y-3">
            {currentQuestion?.options.map((option, index) => {
              const optionPrefix = String.fromCharCode(65 + index);
              const isCorrectOption = option === currentQuestion.answer;
              const isSelectedOption = option === selectedOption;

              let stateClass = "border-slate-200 bg-white text-slate-800 hover:border-orange-300 hover:bg-orange-50";
              let badgeClass = "bg-slate-100 text-slate-700";
              let stateText = "";

              if (isAnswered && isCorrectOption) {
                stateClass = "border-emerald-300 bg-emerald-50 text-emerald-900";
                badgeClass = "bg-emerald-100 text-emerald-700";
                stateText = "Correct";
              } else if (isAnswered && isSelectedOption) {
                stateClass = "border-rose-300 bg-rose-50 text-rose-900";
                badgeClass = "bg-rose-100 text-rose-700";
                stateText = "Try Again";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={isAnswered}
                  aria-label={`Select option ${option}`}
                  className={`flex w-full items-center gap-4 rounded-2xl border px-4 py-4 text-left text-base font-semibold transition duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300 disabled:cursor-not-allowed sm:text-lg ${stateClass}`}
                >
                  <span className={`inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-extrabold ${badgeClass}`}>
                    {optionPrefix}
                  </span>
                  <span className="flex-1">{option}</span>
                  {stateText ? (
                    <span className="text-xs font-bold uppercase tracking-[0.1em]">{stateText}</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <button
              onClick={handleNext}
              className="mt-8 w-full rounded-2xl bg-gradient-to-r from-orange-500 to-emerald-500 py-4 text-lg font-bold text-white transition hover:from-orange-600 hover:to-emerald-600"
            >
              {currentQuestionIndex === totalQuestions - 1 ? "Submit" : "Next Question"}
            </button>
          )}
        </div>
      ) : (
        <Results
          score={points}
          totalQuestions={totalQuestions}
          correctAnswers={correctAnswers}
          wrongAnswers={wrongAnswers}
          unattemptedQuestions={unattemptedQuestions}
          percentage={percentage}
          timeSpent={totalTimeSpent}
          averageTimePerQuestion={averageTimePerQuestion}
          onRetake={handleRetake}
        />
      )}
    </div>
  );
};

export default Quiz;
