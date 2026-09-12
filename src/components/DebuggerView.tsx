import { useState, useEffect, useMemo } from 'react';
import {
  Wrench,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  RotateCcw,
  Lightbulb,
  Award,
  ChevronRight,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { DEBUGGER_PUZZLES } from '../data/debuggerPuzzles';
import { CodeEditor } from './CodeEditor';
import { LivePreview } from './LivePreview';

export function DebuggerView() {
  const [activePuzzleId, setActivePuzzleId] = useState<string>(DEBUGGER_PUZZLES[0].id);
  const [solvedPuzzleIds, setSolvedPuzzleIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('html_solved_debugger_puzzles');
    return saved ? JSON.parse(saved) : [];
  });

  const currentPuzzle = useMemo(
    () => DEBUGGER_PUZZLES.find((p) => p.id === activePuzzleId) || DEBUGGER_PUZZLES[0],
    [activePuzzleId]
  );

  const [code, setCode] = useState<string>(() => {
    const saved = localStorage.getItem(`html_debugger_code_${currentPuzzle.id}`);
    return saved || currentPuzzle.brokenCode;
  });

  const [showHint, setShowHint] = useState<boolean>(false);
  const [showSolution, setShowSolution] = useState<boolean>(false);

  // Sync code when switching puzzles
  useEffect(() => {
    const saved = localStorage.getItem(`html_debugger_code_${currentPuzzle.id}`);
    setCode(saved || currentPuzzle.brokenCode);
    setShowHint(false);
    setShowSolution(false);
  }, [currentPuzzle.id, currentPuzzle.brokenCode]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`html_debugger_code_${currentPuzzle.id}`, newCode);
  };

  const handleReset = () => {
    setCode(currentPuzzle.brokenCode);
    localStorage.setItem(`html_debugger_code_${currentPuzzle.id}`, currentPuzzle.brokenCode);
    setShowHint(false);
    setShowSolution(false);
  };

  const validationResult = useMemo(() => {
    return currentPuzzle.validate(code);
  }, [code, currentPuzzle]);

  // Mark solved if passed
  useEffect(() => {
    if (validationResult.passed && !solvedPuzzleIds.includes(currentPuzzle.id)) {
      setSolvedPuzzleIds((prev) => {
        const next = [...prev, currentPuzzle.id];
        localStorage.setItem('html_solved_debugger_puzzles', JSON.stringify(next));
        return next;
      });
    }
  }, [validationResult.passed, currentPuzzle.id, solvedPuzzleIds]);

  const currentIndex = DEBUGGER_PUZZLES.findIndex((p) => p.id === currentPuzzle.id);
  const prevPuzzle = currentIndex > 0 ? DEBUGGER_PUZZLES[currentIndex - 1] : null;
  const nextPuzzle = currentIndex < DEBUGGER_PUZZLES.length - 1 ? DEBUGGER_PUZZLES[currentIndex + 1] : null;

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col p-4 sm:p-6">
      {/* Header Banner */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-rose-100 px-2 py-0.5 text-xs font-bold text-rose-800">
              Interactive Debugger
            </span>
            <span className="text-xs text-stone-500">• Real-world Broken HTML Puzzles</span>
          </div>
          <h2 className="mt-1.5 text-xl font-bold tracking-tight text-stone-900">
            Fix the Broken HTML
          </h2>
          <p className="mt-1 text-xs text-stone-600 max-w-2xl leading-relaxed">
            Diagnose and fix realistic markup bugs: swallowed characters, non-submitting form fields, improper nesting, and accessibility traps.
          </p>
        </div>

        {/* Solved score badge */}
        <div className="flex items-center gap-3 rounded-lg border border-stone-200 bg-stone-50 p-3">
          <Award className="h-6 w-6 text-amber-500" />
          <div>
            <div className="text-xs text-stone-500 font-medium">Bugs Fixed:</div>
            <div className="text-sm font-bold text-stone-900">
              {solvedPuzzleIds.length} of {DEBUGGER_PUZZLES.length} Puzzles Solved
            </div>
          </div>
        </div>
      </div>

      {/* Puzzle Selector Ribbon */}
      <div className="mb-6 flex items-center gap-2 overflow-x-auto rounded-xl border border-stone-200 bg-white p-2 shadow-xs">
        {DEBUGGER_PUZZLES.map((puzzle, i) => {
          const isSolved = solvedPuzzleIds.includes(puzzle.id);
          const isSelected = puzzle.id === currentPuzzle.id;

          return (
            <button
              key={puzzle.id}
              type="button"
              onClick={() => setActivePuzzleId(puzzle.id)}
              className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-rose-600 text-white shadow-xs'
                  : isSolved
                  ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                  : 'text-stone-600 hover:bg-stone-100'
              }`}
            >
              {isSolved ? (
                <CheckCircle2 className={`h-3.5 w-3.5 ${isSelected ? 'text-white' : 'text-emerald-600'}`} />
              ) : (
                <span className="flex h-3.5 w-3.5 items-center justify-center rounded-full text-[10px] font-bold">
                  {i + 1}
                </span>
              )}
              <span>{puzzle.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Workspace Split */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Diagnostics & Challenge Guidelines */}
        <div className="flex flex-col gap-4 lg:col-span-5">
          {/* Puzzle Details Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <span className="rounded bg-stone-100 px-2 py-0.5 font-semibold text-stone-700">
                  {currentPuzzle.category}
                </span>
                <span
                  className={`rounded px-2 py-0.5 text-[11px] font-bold ${
                    currentPuzzle.difficulty === 'Beginner'
                      ? 'bg-emerald-100 text-emerald-800'
                      : currentPuzzle.difficulty === 'Intermediate'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-rose-100 text-rose-800'
                  }`}
                >
                  {currentPuzzle.difficulty}
                </span>
              </div>

              {solvedPuzzleIds.includes(currentPuzzle.id) && (
                <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Solved
                </span>
              )}
            </div>

            <h3 className="mt-3 text-lg font-bold text-stone-900">{currentPuzzle.title}</h3>
            <p className="mt-2 text-xs leading-relaxed text-stone-700 whitespace-pre-line">
              {currentPuzzle.description}
            </p>

            {/* Diagnostic Status Box */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500">
                Automated Diagnostics Engine
              </span>

              <div
                className={`mt-2 rounded-lg border p-3.5 text-xs transition-all ${
                  validationResult.passed
                    ? 'border-emerald-300 bg-emerald-50/70 text-emerald-950'
                    : 'border-rose-200 bg-rose-50/70 text-rose-950'
                }`}
              >
                <div className="flex items-start gap-2.5">
                  {validationResult.passed ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                  ) : (
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold">
                      {validationResult.passed ? 'Bug Successfully Fixed!' : 'Issue Detected:'}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed opacity-90">
                      {validationResult.message}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hint & Peek Buttons */}
            <div className="mt-4 flex items-center justify-between text-xs">
              <button
                type="button"
                onClick={() => setShowHint(!showHint)}
                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 cursor-pointer font-medium"
              >
                <Lightbulb className="h-3.5 w-3.5" />
                <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="text-stone-500 hover:text-stone-800 cursor-pointer text-xs"
              >
                {showSolution ? 'Hide Solution' : 'Peek Solution'}
              </button>
            </div>

            {/* Hint reveal */}
            {showHint && (
              <div className="mt-3 rounded-lg border border-blue-200 bg-blue-50/60 p-3 text-xs text-blue-900 leading-relaxed">
                <strong>Clue:</strong> {currentPuzzle.expectedFixHint}
              </div>
            )}

            {/* Solution reveal */}
            {showSolution && (
              <div className="mt-3 rounded-lg bg-stone-900 p-3 text-xs font-mono text-stone-200">
                <span className="text-[11px] text-amber-400 font-sans font-bold">Reference Fix:</span>
                <pre className="mt-1 overflow-x-auto text-[11px]">{currentPuzzle.solutionCode}</pre>
                <button
                  type="button"
                  onClick={() => handleCodeChange(currentPuzzle.solutionCode)}
                  className="mt-2 rounded bg-stone-800 px-2 py-1 text-[11px] text-sky-300 hover:bg-stone-700 cursor-pointer"
                >
                  Apply Solution
                </button>
              </div>
            )}
          </div>

          {/* Deep Concept Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs text-xs text-stone-700">
            <h4 className="flex items-center gap-1.5 font-bold text-stone-900 mb-2">
              <Sparkles className="h-4 w-4 text-purple-600" />
              Under the Hood: HTML Engine Logic
            </h4>
            <p className="leading-relaxed text-stone-600">{currentPuzzle.deepConcept}</p>
          </div>
        </div>

        {/* Right Column: Code Editor & Live Preview */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* Editor */}
          <div className="h-[360px]">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onReset={handleReset}
              title={`Bug: ${currentPuzzle.title}`}
              placeholder="Fix the broken HTML code here..."
            />
          </div>

          {/* Preview */}
          <div className="min-h-[380px] flex-1">
            <LivePreview htmlCode={code} />
          </div>

          {/* Footer Navigation */}
          <div className="flex items-center justify-between rounded-xl border border-stone-200 bg-white p-3 shadow-xs">
            <button
              type="button"
              disabled={!prevPuzzle}
              onClick={() => prevPuzzle && setActivePuzzleId(prevPuzzle.id)}
              className="flex items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50 disabled:opacity-40 cursor-pointer disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              <span>Previous Bug</span>
            </button>

            {nextPuzzle && (
              <button
                type="button"
                onClick={() => setActivePuzzleId(nextPuzzle.id)}
                className={`flex items-center gap-1 rounded-lg px-4 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                  validationResult.passed
                    ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-xs'
                    : 'border border-stone-200 bg-stone-100 text-stone-700 hover:bg-stone-200'
                }`}
              >
                <span>{validationResult.passed ? 'Next Bug' : 'Skip Bug'}</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
