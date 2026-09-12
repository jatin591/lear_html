import { useState } from 'react';
import {
  BookOpen,
  Cpu,
  Wrench,
  Terminal,
  Library,
  CheckCircle2,
  RotateCcw,
} from 'lucide-react';
import { AppMode } from '../types';

interface HeaderProps {
  currentMode: AppMode;
  onSelectMode: (mode: AppMode) => void;
  completedLessonsCount: number;
  totalLessonsCount: number;
  onResetProgress: () => void;
}

export function Header({
  currentMode,
  onSelectMode,
  completedLessonsCount,
  totalLessonsCount,
  onResetProgress,
}: HeaderProps) {
  const [showConfirmReset, setShowConfirmReset] = useState(false);

  const percent = Math.round((completedLessonsCount / totalLessonsCount) * 100);

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200 bg-white/95 backdrop-blur-xs">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2.5 sm:px-6">
        {/* Brand & Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-900 font-mono text-base font-bold text-white shadow-xs">
            &lt;/&gt;
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base font-bold tracking-tight text-stone-900">
                Learn HTML
              </h1>
              <span className="rounded-full border border-stone-200 bg-stone-50 px-2 py-0.5 text-[10px] font-semibold text-stone-600 uppercase tracking-wider">
                Interactive Studio
              </span>
            </div>
            <p className="hidden text-xs text-stone-500 sm:block">
              DOM Trees • Engine Logic • Accessibility • Challenges
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1 rounded-lg border border-stone-200 bg-stone-100 p-1 text-xs overflow-x-auto">
          <button
            type="button"
            onClick={() => onSelectMode('lessons')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'lessons'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <BookOpen className="h-3.5 w-3.5 text-blue-600" />
            <span>Lessons</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('labs')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'labs'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Cpu className="h-3.5 w-3.5 text-purple-600" />
            <span className="hidden sm:inline">Engine Labs</span>
            <span className="sm:hidden">Labs</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('debugger')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'debugger'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Wrench className="h-3.5 w-3.5 text-rose-600" />
            <span className="hidden sm:inline">Debugger</span>
            <span className="sm:hidden">Debug</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('playground')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'playground'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Terminal className="h-3.5 w-3.5 text-emerald-600" />
            <span>Playground</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('cheatsheet')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'cheatsheet'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <Library className="h-3.5 w-3.5 text-indigo-600" />
            <span className="hidden md:inline">Cheat Sheet</span>
            <span className="md:hidden">Tags</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectMode('quiz')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1.5 font-medium transition-all ${
              currentMode === 'quiz'
                ? 'bg-white text-stone-900 shadow-xs'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <CheckCircle2 className="h-3.5 w-3.5 text-amber-600" />
            <span>Quiz</span>
          </button>
        </nav>


        {/* Progress & Reset Option */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-1.5 text-xs">
              <span className="font-semibold text-stone-800">
                {completedLessonsCount} of {totalLessonsCount}
              </span>
              <span className="text-stone-500">lessons completed</span>
            </div>
            <div className="mt-1 h-1.5 w-28 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-300"
                style={{ width: `${percent}%` }}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowConfirmReset(true)}
            title="Reset course progress"
            className="cursor-pointer rounded-lg border border-stone-200 p-2 text-stone-500 hover:bg-stone-50 hover:text-stone-800 transition-colors"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {showConfirmReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm rounded-xl border border-stone-200 bg-white p-6 shadow-xl">
            <h3 className="text-base font-bold text-stone-900">Reset All Progress?</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-600">
              This will reset your completed lessons count back to zero. Your custom code in the
              playground will not be affected.
            </p>
            <div className="mt-5 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowConfirmReset(false)}
                className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  onResetProgress();
                  setShowConfirmReset(false);
                }}
                className="cursor-pointer rounded-lg bg-rose-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-rose-700 transition-colors"
              >
                Yes, Reset Progress
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
