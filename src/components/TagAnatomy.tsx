import { useState } from 'react';
import { Info } from 'lucide-react';

interface PartInfo {
  title: string;
  role: string;
  explanation: string;
  color: string;
}

const PARTS: Record<string, PartInfo> = {
  opening: {
    title: 'Opening Tag',
    role: 'Marks the start of the element',
    explanation: 'Contains the tag name surrounded by angle brackets (< >). Tells the browser what type of content follows.',
    color: 'border-blue-500 bg-blue-50 text-blue-700',
  },
  tagName: {
    title: 'Tag Name',
    role: 'The keyword defining the element',
    explanation: 'Defines the element behavior (e.g., "p" for paragraph, "a" for link, "h1" for heading). Always lowercase by convention.',
    color: 'border-indigo-500 bg-indigo-50 text-indigo-700',
  },
  attrName: {
    title: 'Attribute Name',
    role: 'The property being configured',
    explanation: 'Provides extra information or configuration to the element (e.g. "class", "id", "href", "src").',
    color: 'border-amber-500 bg-amber-50 text-amber-700',
  },
  attrValue: {
    title: 'Attribute Value',
    role: 'The setting assigned to the attribute',
    explanation: 'Enclosed in quotes ("..."). Specifies the parameter or target for the attribute.',
    color: 'border-emerald-500 bg-emerald-50 text-emerald-700',
  },
  content: {
    title: 'Element Content',
    role: 'The text or nested children',
    explanation: 'The actual text, image, or other HTML tags displayed to the visitor between the opening and closing tags.',
    color: 'border-purple-500 bg-purple-50 text-purple-700',
  },
  closing: {
    title: 'Closing Tag',
    role: 'Marks the end of the element',
    explanation: 'Identical to the opening tag, but preceded by a forward slash (/). Crucial for letting the browser know where this element stops.',
    color: 'border-rose-500 bg-rose-50 text-rose-700',
  },
};

export function TagAnatomy() {
  const [selectedPart, setSelectedPart] = useState<string>('opening');

  const active = PARTS[selectedPart] || PARTS.opening;

  return (
    <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-stone-500">
          Interactive Anatomy of an HTML Tag
        </span>
        <span className="flex items-center gap-1 text-xs text-stone-600">
          <Info className="h-3.5 w-3.5 text-blue-500" />
          Click or hover parts to inspect
        </span>
      </div>

      {/* Interactive Code Snippet Visualizer */}
      <div className="flex flex-wrap items-center gap-1 rounded-lg bg-stone-900 p-4 font-mono text-sm sm:text-base">
        {/* Opening Bracket & Tag Name */}
        <button
          type="button"
          onClick={() => setSelectedPart('opening')}
          onMouseEnter={() => setSelectedPart('opening')}
          className={`cursor-pointer rounded px-1.5 py-0.5 transition-all ${
            selectedPart === 'opening'
              ? 'ring-2 ring-blue-400 bg-blue-900/60 text-blue-300'
              : 'text-stone-400 hover:bg-stone-800'
          }`}
        >
          &lt;
          <span
            className={
              selectedPart === 'tagName'
                ? 'font-bold text-indigo-300 underline'
                : 'text-rose-400'
            }
            onClick={(e) => {
              e.stopPropagation();
              setSelectedPart('tagName');
            }}
          >
            p
          </span>
        </button>

        {/* Attribute Name */}
        <button
          type="button"
          onClick={() => setSelectedPart('attrName')}
          onMouseEnter={() => setSelectedPart('attrName')}
          className={`cursor-pointer rounded px-1.5 py-0.5 transition-all ${
            selectedPart === 'attrName'
              ? 'ring-2 ring-amber-400 bg-amber-900/60 text-amber-300'
              : 'text-amber-400 hover:bg-stone-800'
          }`}
        >
          class
        </button>

        <span className="text-stone-400">=</span>

        {/* Attribute Value */}
        <button
          type="button"
          onClick={() => setSelectedPart('attrValue')}
          onMouseEnter={() => setSelectedPart('attrValue')}
          className={`cursor-pointer rounded px-1.5 py-0.5 transition-all ${
            selectedPart === 'attrValue'
              ? 'ring-2 ring-emerald-400 bg-emerald-900/60 text-emerald-300'
              : 'text-emerald-400 hover:bg-stone-800'
          }`}
        >
          &quot;highlight&quot;
        </button>

        <span className="text-stone-400">&gt;</span>

        {/* Content */}
        <button
          type="button"
          onClick={() => setSelectedPart('content')}
          onMouseEnter={() => setSelectedPart('content')}
          className={`cursor-pointer rounded px-2 py-0.5 transition-all ${
            selectedPart === 'content'
              ? 'ring-2 ring-purple-400 bg-purple-900/60 text-purple-200'
              : 'text-stone-100 hover:bg-stone-800'
          }`}
        >
          Hello World!
        </button>

        {/* Closing Tag */}
        <button
          type="button"
          onClick={() => setSelectedPart('closing')}
          onMouseEnter={() => setSelectedPart('closing')}
          className={`cursor-pointer rounded px-1.5 py-0.5 transition-all ${
            selectedPart === 'closing'
              ? 'ring-2 ring-rose-400 bg-rose-900/60 text-rose-300'
              : 'text-rose-400 hover:bg-stone-800'
          }`}
        >
          &lt;/p&gt;
        </button>
      </div>

      {/* Explanatory Callout Card */}
      <div className={`mt-3 rounded-lg border p-3.5 transition-all ${active.color}`}>
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">{active.title}</h4>
          <span className="text-xs font-medium opacity-85">{active.role}</span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-stone-700">{active.explanation}</p>
      </div>
    </div>
  );
}
