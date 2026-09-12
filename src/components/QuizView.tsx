import { useState } from 'react';
import { CheckCircle2, XCircle, Award, RotateCcw, ArrowRight, HelpCircle } from 'lucide-react';
import { QuizQuestion } from '../types';

interface QuizViewProps {
  questions: QuizQuestion[];
  onFinishQuiz?: (score: number) => void;
}

export function QuizView({ questions }: QuizViewProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const currentQ = questions[currentIndex];
  const totalQuestions = questions.length;
  const currentSelection = selectedAnswers[currentQ.id];
  const isAnswered = currentSelection !== undefined;

  const handleSelectOption = (optionIndex: number) => {
    if (isAnswered) return; // prevent changing after submitted
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setCurrentIndex(0);
    setIsFinished(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score += 1;
      }
    });
    return score;
  };

  const score = calculateScore();
  const percentage = Math.round((score / totalQuestions) * 100);

  if (isFinished) {
    return (
      <div className="mx-auto flex max-w-2xl flex-1 flex-col items-center justify-center p-6 text-center">
        <div className="w-full rounded-2xl border border-stone-200 bg-white p-8 shadow-xs">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Award className="h-8 w-8" />
          </div>

          <h2 className="mt-4 text-2xl font-bold tracking-tight text-stone-900">
            Quiz Completed!
          </h2>
          <p className="mt-1 text-xs text-stone-500">
            Here is your HTML mastery assessment score:
          </p>

          <div className="my-6 rounded-xl bg-stone-50 p-6 border border-stone-100">
            <div className="text-4xl font-extrabold text-stone-900">
              {score} / {totalQuestions}
            </div>
            <div className="mt-1 text-xs font-semibold text-stone-600">
              {percentage}% Accuracy
            </div>
            <p className="mt-3 text-xs text-stone-600">
              {percentage >= 80
                ? '🌟 Outstanding! You understand HTML structure and syntax deeply.'
                : percentage >= 50
                ? '👍 Good job! Review the cheat sheet or redo lessons to master tricky tags.'
                : '📚 Keep practicing! Revisit the lessons to solidify your understanding.'}
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Retake Quiz</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-1 flex-col p-4 sm:p-6">
      {/* Quiz Header & Stepper */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4 text-amber-600" />
            <span className="text-xs font-bold text-stone-900">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
          </div>
          <span className="rounded bg-stone-100 px-2 py-0.5 text-[11px] font-medium text-stone-600">
            Topic: {currentQ.category}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      {/* Question Card */}
      <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-xs">
        <h3 className="text-base font-bold text-stone-900 leading-snug">
          {currentQ.question}
        </h3>

        {/* Optional code snippet */}
        {currentQ.codeSnippet && (
          <div className="mt-3 rounded-lg bg-stone-900 p-3 font-mono text-xs text-sky-300">
            <code>{currentQ.codeSnippet}</code>
          </div>
        )}

        {/* Options List */}
        <div className="mt-6 space-y-2.5">
          {currentQ.options.map((option, idx) => {
            const isSelected = currentSelection === idx;
            const isCorrect = idx === currentQ.correctIndex;

            let optionStyle =
              'border-stone-200 bg-white text-stone-800 hover:border-stone-300 hover:bg-stone-50';

            if (isAnswered) {
              if (isCorrect) {
                optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-900 font-medium';
              } else if (isSelected && !isCorrect) {
                optionStyle = 'border-rose-400 bg-rose-50 text-rose-900';
              } else {
                optionStyle = 'border-stone-100 bg-stone-50 text-stone-400 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                type="button"
                disabled={isAnswered}
                onClick={() => handleSelectOption(idx)}
                className={`flex w-full cursor-pointer items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all ${optionStyle}`}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-stone-300 font-mono text-[11px] font-bold">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span>{option}</span>
                </div>

                {isAnswered && isCorrect && (
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="h-4 w-4 shrink-0 text-rose-600" />
                )}
              </button>
            );
          })}
        </div>

        {/* Explanation Callout (Revealed upon selecting an option) */}
        {isAnswered && (
          <div
            className={`mt-6 rounded-lg border p-4 text-xs leading-relaxed ${
              currentSelection === currentQ.correctIndex
                ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                : 'border-rose-200 bg-rose-50/70 text-rose-900'
            }`}
          >
            <div className="flex items-center gap-1.5 font-bold">
              {currentSelection === currentQ.correctIndex ? (
                <>
                  <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                  <span>Correct!</span>
                </>
              ) : (
                <>
                  <XCircle className="h-4 w-4 text-rose-600" />
                  <span>Not quite!</span>
                </>
              )}
            </div>
            <p className="mt-1">{currentQ.explanation}</p>
          </div>
        )}

        {/* Next Question Navigation */}
        {isAnswered && (
          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleNext}
              className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-blue-600 px-5 py-2 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs"
            >
              <span>
                {currentIndex < totalQuestions - 1 ? 'Next Question' : 'View Results'}
              </span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
