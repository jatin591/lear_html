import { useState, useEffect } from 'react';
import { AppMode } from './types';
import { LESSONS } from './data/lessons';
import { TAG_REFERENCES } from './data/cheatSheet';
import { QUIZ_QUESTIONS } from './data/quizzes';
import { PLAYGROUND_TEMPLATES } from './data/templates';
import { Header } from './components/Header';
import { LessonView } from './components/LessonView';
import { PlaygroundView } from './components/PlaygroundView';
import { CheatSheetView } from './components/CheatSheetView';
import { QuizView } from './components/QuizView';

export default function App() {
  const [mode, setMode] = useState<AppMode>('lessons');
  const [activeLessonId, setActiveLessonId] = useState<number>(() => {
    const saved = localStorage.getItem('html_active_lesson_id');
    return saved ? parseInt(saved, 10) : 1;
  });

  const [completedLessonIds, setCompletedLessonIds] = useState<number[]>(() => {
    const saved = localStorage.getItem('html_completed_lessons');
    return saved ? JSON.parse(saved) : [];
  });

  const [playgroundInitialCode, setPlaygroundInitialCode] = useState<string | undefined>();

  // Persist state
  useEffect(() => {
    localStorage.setItem('html_active_lesson_id', activeLessonId.toString());
  }, [activeLessonId]);

  useEffect(() => {
    localStorage.setItem('html_completed_lessons', JSON.stringify(completedLessonIds));
  }, [completedLessonIds]);

  const handleMarkComplete = (lessonId: number) => {
    if (!completedLessonIds.includes(lessonId)) {
      setCompletedLessonIds((prev) => [...prev, lessonId]);
    }
  };

  const handleResetProgress = () => {
    setCompletedLessonIds([]);
    setActiveLessonId(1);
    localStorage.removeItem('html_completed_lessons');
    localStorage.removeItem('html_active_lesson_id');
  };

  const handleGoToPlaygroundWithCode = (snippet: string) => {
    setPlaygroundInitialCode(snippet);
    setMode('playground');
  };

  return (
    <div className="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-900 antialiased selection:bg-blue-100 selection:text-blue-900">
      {/* Navigation & Header */}
      <Header
        currentMode={mode}
        onSelectMode={(newMode) => {
          setMode(newMode);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        completedLessonsCount={completedLessonIds.length}
        totalLessonsCount={LESSONS.length}
        onResetProgress={handleResetProgress}
      />

      {/* Main View Container */}
      <main className="flex flex-1 flex-col">
        {mode === 'lessons' && (
          <LessonView
            lessons={LESSONS}
            activeLessonId={activeLessonId}
            onSelectLesson={(id) => {
              setActiveLessonId(id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            completedLessonIds={completedLessonIds}
            onMarkComplete={handleMarkComplete}
            onGoToPlaygroundWithCode={handleGoToPlaygroundWithCode}
          />
        )}

        {mode === 'playground' && (
          <PlaygroundView
            initialCode={playgroundInitialCode}
            templates={PLAYGROUND_TEMPLATES}
          />
        )}

        {mode === 'cheatsheet' && (
          <CheatSheetView
            tags={TAG_REFERENCES}
            onOpenInPlayground={handleGoToPlaygroundWithCode}
          />
        )}

        {mode === 'quiz' && (
          <QuizView questions={QUIZ_QUESTIONS} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-stone-200 bg-white py-4 text-center text-xs text-stone-500">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 sm:flex-row sm:px-6">
          <p>© 2026 Learn HTML • Clean semantic markup is the foundation of the modern web.</p>
          <div className="flex items-center gap-4 text-xs font-medium text-stone-600">
            <button
              type="button"
              onClick={() => setMode('lessons')}
              className="hover:text-stone-900"
            >
              10 Core Lessons
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setMode('cheatsheet')}
              className="hover:text-stone-900"
            >
              Tag Reference
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setMode('quiz')}
              className="hover:text-stone-900"
            >
              Self Assessment
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}

