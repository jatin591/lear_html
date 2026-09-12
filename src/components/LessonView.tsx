import { useState, useEffect, useMemo } from 'react';
import {
  CheckCircle2,
  Circle,
  ChevronRight,
  ChevronLeft,
  Lightbulb,
  AlertTriangle,
  Award,
  Sparkles,
  Eye,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { Lesson } from '../types';
import { TagAnatomy } from './TagAnatomy';
import { CodeEditor } from './CodeEditor';
import { LivePreview } from './LivePreview';

interface LessonViewProps {
  lessons: Lesson[];
  activeLessonId: number;
  onSelectLesson: (id: number) => void;
  completedLessonIds: number[];
  onMarkComplete: (id: number) => void;
  onGoToPlaygroundWithCode: (code: string) => void;
}

export function LessonView({
  lessons,
  activeLessonId,
  onSelectLesson,
  completedLessonIds,
  onMarkComplete,
  onGoToPlaygroundWithCode,
}: LessonViewProps) {
  const currentLesson = useMemo(
    () => lessons.find((l) => l.id === activeLessonId) || lessons[0],
    [lessons, activeLessonId]
  );

  // Maintain working code per lesson in local state
  const [code, setCode] = useState<string>(() => {
    const saved = localStorage.getItem(`html_lesson_code_${currentLesson.id}`);
    return saved || currentLesson.starterCode;
  });

  const [showSolution, setShowSolution] = useState<boolean>(false);
  const [justCompleted, setJustCompleted] = useState<boolean>(false);

  // Sync code state when switching lessons
  useEffect(() => {
    const saved = localStorage.getItem(`html_lesson_code_${currentLesson.id}`);
    setCode(saved || currentLesson.starterCode);
    setShowSolution(false);
    setJustCompleted(false);
  }, [currentLesson.id, currentLesson.starterCode]);

  // Save changes to localStorage
  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem(`html_lesson_code_${currentLesson.id}`, newCode);
  };

  const handleResetCode = () => {
    setCode(currentLesson.starterCode);
    localStorage.setItem(`html_lesson_code_${currentLesson.id}`, currentLesson.starterCode);
    setShowSolution(false);
  };

  // Run test validations against current code
  const testResults = useMemo(() => {
    return currentLesson.testRules.map((rule) => {
      let passed = false;
      try {
        passed = rule.validate(code);
      } catch {
        passed = false;
      }
      return {
        ...rule,
        passed,
      };
    });
  }, [code, currentLesson.testRules]);

  const allTestsPassed = testResults.every((t) => t.passed);
  const isLessonCompleted = completedLessonIds.includes(currentLesson.id);

  // Auto-mark complete when all tests pass
  useEffect(() => {
    if (allTestsPassed && !isLessonCompleted) {
      onMarkComplete(currentLesson.id);
      setJustCompleted(true);
    }
  }, [allTestsPassed, isLessonCompleted, currentLesson.id, onMarkComplete]);

  const currentIndex = lessons.findIndex((l) => l.id === currentLesson.id);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col p-4 sm:p-6">
      {/* Lesson Selector Ribbon */}
      <div className="mb-6 flex items-center justify-between gap-2 overflow-x-auto rounded-xl border border-stone-200 bg-white p-2 shadow-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto py-1">
          {lessons.map((lesson) => {
            const isCompleted = completedLessonIds.includes(lesson.id);
            const isSelected = lesson.id === currentLesson.id;
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => onSelectLesson(lesson.id)}
                className={`flex cursor-pointer items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-medium whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : isCompleted
                    ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/60'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                {isCompleted ? (
                  <CheckCircle2
                    className={`h-3.5 w-3.5 ${
                      isSelected ? 'text-white' : 'text-emerald-600'
                    }`}
                  />
                ) : (
                  <Circle
                    className={`h-3.5 w-3.5 ${
                      isSelected ? 'text-blue-200' : 'text-stone-300'
                    }`}
                  />
                )}
                <span>
                  {lesson.id}. {lesson.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* Previous / Next buttons */}
        <div className="hidden sm:flex items-center gap-1 border-l border-stone-200 pl-2">
          <button
            type="button"
            disabled={!prevLesson}
            onClick={() => prevLesson && onSelectLesson(prevLesson.id)}
            className="cursor-pointer rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Previous Lesson"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            disabled={!nextLesson}
            onClick={() => nextLesson && onSelectLesson(nextLesson.id)}
            className="cursor-pointer rounded p-1 text-stone-500 hover:bg-stone-100 disabled:opacity-30 disabled:cursor-not-allowed"
            title="Next Lesson"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Lesson Workspace Grid */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Lesson Content, Theory, & Challenge Guidelines (5 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-5">
          {/* Lesson Header Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="rounded-md bg-stone-100 px-2 py-0.5 font-semibold text-stone-700">
                Lesson {currentLesson.id} of {lessons.length}
              </span>
              <span className="rounded-md bg-blue-50 px-2 py-0.5 font-medium text-blue-700">
                {currentLesson.category}
              </span>
              <span className="text-stone-400">•</span>
              <span className="text-stone-500">{currentLesson.duration}</span>
              {isLessonCompleted && (
                <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5" /> Completed
                </span>
              )}
            </div>

            <h2 className="mt-3 text-xl font-bold tracking-tight text-stone-900">
              {currentLesson.title}
            </h2>
            <p className="mt-1 text-xs text-stone-600 font-medium">
              {currentLesson.subtitle}
            </p>

            {/* Tags Introduced */}
            {currentLesson.tagsIntroduced && currentLesson.tagsIntroduced.length > 0 && (
              <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-3 border-t border-stone-100">
                <span className="text-[11px] font-semibold text-stone-500">Tags in this lesson:</span>
                {currentLesson.tagsIntroduced.map((tag) => (
                  <span
                    key={tag}
                    className="rounded bg-stone-100 px-1.5 py-0.5 font-mono text-[11px] font-medium text-stone-800 border border-stone-200/80"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Interactive Tag Anatomy (Featured on Lesson 1 or on demand) */}
          {currentLesson.id === 1 && <TagAnatomy />}

          {/* Core Explanation Card */}
          <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
            <h3 className="flex items-center gap-2 text-sm font-bold text-stone-900">
              <BookOpen className="h-4 w-4 text-blue-600" />
              How It Works
            </h3>
            <div className="mt-3 text-xs leading-relaxed text-stone-700 space-y-2 whitespace-pre-line">
              {currentLesson.explanation}
            </div>

            {/* Syntax Reference Box */}
            <div className="mt-4">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-stone-500">
                Syntax Example
              </span>
              <div className="mt-1.5 overflow-x-auto rounded-lg bg-stone-900 p-3 font-mono text-xs text-stone-200">
                <pre>{currentLesson.syntaxExample}</pre>
              </div>
            </div>

            {/* Key Points */}
            <div className="mt-4 rounded-lg bg-stone-50 p-3.5 border border-stone-100">
              <h4 className="flex items-center gap-1.5 text-xs font-bold text-stone-900">
                <Lightbulb className="h-3.5 w-3.5 text-amber-500" />
                Key Rules to Remember
              </h4>
              <ul className="mt-2 space-y-1.5 text-xs text-stone-700">
                {currentLesson.keyPoints.map((point, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Common Mistakes (if any) */}
            {currentLesson.commonMistakes && currentLesson.commonMistakes.length > 0 && (
              <div className="mt-3 rounded-lg bg-rose-50/70 p-3.5 border border-rose-100">
                <h4 className="flex items-center gap-1.5 text-xs font-bold text-rose-900">
                  <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
                  Common Traps to Avoid
                </h4>
                <ul className="mt-2 space-y-1.5 text-xs text-rose-800">
                  {currentLesson.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Interactive Challenge & Live Validation Card */}
          <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-5 shadow-xs">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-sm font-bold text-blue-950">
                <Sparkles className="h-4 w-4 text-blue-600" />
                Hands-On Challenge
              </h3>
              <button
                type="button"
                onClick={() => setShowSolution(!showSolution)}
                className="cursor-pointer text-xs font-medium text-blue-600 hover:text-blue-800 hover:underline"
              >
                {showSolution ? 'Hide Solution' : 'Peek Solution'}
              </button>
            </div>

            <div className="mt-2 rounded-md bg-white p-3 text-xs leading-relaxed text-stone-800 border border-blue-100 whitespace-pre-line">
              {currentLesson.challengePrompt}
            </div>

            {/* Revealed Solution */}
            {showSolution && (
              <div className="mt-3 rounded-lg bg-stone-900 p-3 text-xs font-mono text-stone-200">
                <div className="mb-1 text-[11px] font-sans font-semibold text-amber-400">
                  Reference Solution:
                </div>
                <pre className="overflow-x-auto">{currentLesson.solutionCode}</pre>
                <button
                  type="button"
                  onClick={() => handleCodeChange(currentLesson.solutionCode)}
                  className="mt-2 cursor-pointer rounded bg-stone-800 px-2 py-1 text-[11px] text-sky-300 hover:bg-stone-700"
                >
                  Insert Solution into Editor
                </button>
              </div>
            )}

            {/* Live Automated Verification Checklist */}
            <div className="mt-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-600">
                Challenge Criteria ({testResults.filter((t) => t.passed).length} /{' '}
                {testResults.length})
              </h4>
              <div className="mt-2 space-y-2">
                {testResults.map((test) => (
                  <div
                    key={test.id}
                    className={`flex items-start gap-2.5 rounded-lg border p-2.5 text-xs transition-all ${
                      test.passed
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-900'
                        : 'border-stone-200 bg-white text-stone-700'
                    }`}
                  >
                    {test.passed ? (
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                    ) : (
                      <Circle className="mt-0.5 h-4 w-4 shrink-0 text-stone-300" />
                    )}
                    <div className="flex-1">
                      <p className={`font-medium ${test.passed ? 'text-emerald-900' : 'text-stone-800'}`}>
                        {test.description}
                      </p>
                      {!test.passed && (
                        <p className="mt-0.5 text-[11px] text-stone-500 italic">
                          Hint: {test.hint}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Celebration Banner */}
            {allTestsPassed && (
              <div className="mt-4 flex items-center justify-between rounded-lg border border-emerald-300 bg-emerald-500 p-3 text-white shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-200" />
                  <div>
                    <h5 className="text-xs font-bold">Challenge Completed!</h5>
                    <p className="text-[11px] opacity-90">
                      Great job! Your HTML satisfies all tests.
                    </p>
                  </div>
                </div>

                {nextLesson && (
                  <button
                    type="button"
                    onClick={() => onSelectLesson(nextLesson.id)}
                    className="flex cursor-pointer items-center gap-1 rounded-md bg-white px-3 py-1.5 text-xs font-bold text-emerald-800 hover:bg-emerald-50 transition-colors shadow-xs"
                  >
                    <span>Next Lesson</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Code Editor & Live Preview (7 cols) */}
        <div className="flex flex-col gap-5 lg:col-span-7">
          {/* Editor Half */}
          <div className="h-[360px] sm:h-[400px]">
            <CodeEditor
              code={code}
              onChange={handleCodeChange}
              onReset={handleResetCode}
              title={`Lesson ${currentLesson.id} Code`}
              quickTags={currentLesson.tagsIntroduced}
              placeholder="Write your HTML tags here to solve the challenge..."
            />
          </div>

          {/* Preview Half */}
          <div className="min-h-[380px] flex-1">
            <LivePreview htmlCode={code} />
          </div>

          {/* Bottom Action Ribbon */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3 shadow-xs">
            <button
              type="button"
              onClick={() => onGoToPlaygroundWithCode(code)}
              className="flex cursor-pointer items-center gap-1.5 text-xs font-medium text-stone-600 hover:text-stone-900"
            >
              <Eye className="h-3.5 w-3.5 text-blue-600" />
              <span>Open in Full-Screen Playground</span>
            </button>

            <div className="flex items-center gap-2">
              {prevLesson && (
                <button
                  type="button"
                  onClick={() => onSelectLesson(prevLesson.id)}
                  className="flex cursor-pointer items-center gap-1 rounded-lg border border-stone-200 px-3 py-1.5 text-xs font-medium text-stone-700 hover:bg-stone-50"
                >
                  <ChevronLeft className="h-3.5 w-3.5" />
                  <span>Previous</span>
                </button>
              )}

              {nextLesson ? (
                <button
                  type="button"
                  onClick={() => onSelectLesson(nextLesson.id)}
                  className={`flex cursor-pointer items-center gap-1 rounded-lg px-4 py-1.5 text-xs font-semibold transition-all ${
                    allTestsPassed
                      ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-xs'
                      : 'border border-stone-200 bg-white text-stone-700 hover:bg-stone-50'
                  }`}
                >
                  <span>{allTestsPassed ? 'Next Lesson' : 'Skip to Next'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onSelectLesson(1)}
                  className="flex cursor-pointer items-center gap-1 rounded-lg bg-blue-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-blue-700 shadow-xs"
                >
                  <span>Review from Beginning</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
