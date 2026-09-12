import React, { useRef } from 'react';
import { Copy, RotateCcw, Check, Sparkles } from 'lucide-react';

interface CodeEditorProps {
  code: string;
  onChange: (newCode: string) => void;
  onReset?: () => void;
  title?: string;
  quickTags?: string[];
  placeholder?: string;
}

export function CodeEditor({
  code,
  onChange,
  onReset,
  title = 'HTML Editor',
  quickTags = ['<p>', '<h1>', '<a href="">', '<img src="">', '<ul>', '<div>', '<button>'],
  placeholder = 'Type your HTML here...',
}: CodeEditorProps) {
  const [copied, setCopied] = React.useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const lines = code.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newCode = code.substring(0, start) + '  ' + code.substring(end);
      onChange(newCode);

      // restore cursor position after inserting 2 spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 2;
      }, 0);
    }
  };

  const insertTag = (tagTemplate: string) => {
    const textarea = textareaRef.current;
    if (!textarea) {
      onChange(code + '\n' + tagTemplate);
      return;
    }

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = code.substring(start, end);

    let snippet = tagTemplate;
    // If it's something like <p> and user has text selected, wrap it: <p>selected</p>
    if (selection && tagTemplate.startsWith('<') && !tagTemplate.includes('/>') && !tagTemplate.includes('img') && !tagTemplate.includes('input')) {
      const tagNameMatch = tagTemplate.match(/<([a-z0-9]+)/i);
      if (tagNameMatch) {
        const tagName = tagNameMatch[1];
        snippet = `<${tagName}>${selection}</${tagName}>`;
      }
    }

    const newCode = code.substring(0, start) + snippet + code.substring(end);
    onChange(newCode);

    setTimeout(() => {
      textarea.focus();
      textarea.selectionStart = textarea.selectionEnd = start + snippet.length;
    }, 0);
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-stone-950 text-stone-100 shadow-xs">
      {/* Editor Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-stone-800 bg-stone-900 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-1 font-mono font-medium text-stone-300">{title}</span>
          <span className="rounded bg-stone-800 px-1.5 py-0.5 font-mono text-[10px] text-stone-400">
            {lines.length} {lines.length === 1 ? 'line' : 'lines'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {onReset && (
            <button
              type="button"
              onClick={onReset}
              title="Reset code to starter"
              className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
            >
              <RotateCcw className="h-3.5 w-3.5" />
              <span>Reset</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleCopy}
            title="Copy code"
            className="flex cursor-pointer items-center gap-1 rounded-md px-2 py-1 text-stone-400 hover:bg-stone-800 hover:text-stone-200 transition-colors"
          >
            {copied ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-3.5 w-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick Insert Snippet Toolbar */}
      {quickTags && quickTags.length > 0 && (
        <div className="flex items-center gap-1.5 overflow-x-auto border-b border-stone-800/80 bg-stone-900/50 px-3 py-1.5 text-xs">
          <span className="flex items-center gap-1 text-[11px] font-medium text-stone-400 whitespace-nowrap">
            <Sparkles className="h-3 w-3 text-amber-400" /> Quick Insert:
          </span>
          <div className="flex items-center gap-1.5">
            {quickTags.map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => insertTag(tag)}
                className="cursor-pointer rounded bg-stone-800/80 px-2 py-0.5 font-mono text-[11px] text-sky-300 hover:bg-stone-700 hover:text-sky-200 transition-colors whitespace-nowrap"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Code Area with Line Numbers */}
      <div className="relative flex flex-1 overflow-hidden bg-stone-950 font-mono text-sm leading-6">
        {/* Line Numbers column */}
        <div
          aria-hidden="true"
          className="select-none border-r border-stone-800/70 bg-stone-900/40 px-3 py-3 text-right font-mono text-xs text-stone-600"
        >
          {lines.map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          placeholder={placeholder}
          className="w-full resize-none bg-transparent p-3 font-mono text-xs sm:text-sm text-stone-100 placeholder-stone-600 outline-hidden selection:bg-blue-900 selection:text-white"
        />
      </div>
    </div>
  );
}
