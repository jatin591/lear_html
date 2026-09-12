export type AppMode = 'lessons' | 'labs' | 'debugger' | 'playground' | 'cheatsheet' | 'quiz';

export interface TestRule {
  id: string;
  description: string;
  validate: (html: string) => boolean;
  hint: string;
}

export interface Lesson {
  id: number;
  title: string;
  subtitle: string;
  category: 'Basics' | 'Text & Links' | 'Media' | 'Structure' | 'Forms' | 'Tables' | 'Project';
  duration: string;
  explanation: string;
  keyPoints: string[];
  commonMistakes?: string[];
  syntaxExample: string;
  starterCode: string;
  solutionCode: string;
  testRules: TestRule[];
  challengePrompt: string;
  tagsIntroduced: string[];
}

export interface TagReference {
  tag: string;
  name: string;
  category: 'Structure' | 'Text' | 'Links & Media' | 'Forms' | 'Tables' | 'Metadata';
  selfClosing: boolean;
  description: string;
  attributes: { name: string; description: string }[];
  example: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  category: string;
}

export interface PlaygroundTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  code: string;
}

export interface DebuggerPuzzle {
  id: string;
  title: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  description: string;
  brokenCode: string;
  solutionCode: string;
  expectedFixHint: string;
  validate: (html: string) => { passed: boolean; message: string };
  deepConcept: string;
}

export interface AuditIssue {
  type: 'error' | 'warning' | 'info';
  rule: string;
  message: string;
  fix: string;
}

