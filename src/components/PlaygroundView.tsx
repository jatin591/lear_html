import { useState } from 'react';
import { Download, LayoutTemplate, Trash2, Sparkles, Share2 } from 'lucide-react';
import { PlaygroundTemplate } from '../types';
import { CodeEditor } from './CodeEditor';
import { LivePreview } from './LivePreview';

interface PlaygroundViewProps {
  initialCode?: string;
  templates: PlaygroundTemplate[];
}

export function PlaygroundView({
  initialCode,
  templates,
}: PlaygroundViewProps) {
  const [code, setCode] = useState<string>(() => {
    const saved = localStorage.getItem('html_playground_code');
    return saved || initialCode || templates[1]?.code || templates[0]?.code || '<h1>Hello World</h1>';
  });

  const [selectedTemplateId, setSelectedTemplateId] = useState<string>('profile-card');
  const [downloadSuccess, setDownloadSuccess] = useState<boolean>(false);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
    localStorage.setItem('html_playground_code', newCode);
  };

  const handleSelectTemplate = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setCode(template.code);
      setSelectedTemplateId(templateId);
      localStorage.setItem('html_playground_code', template.code);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([code], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'my-webpage.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2000);
  };

  const handleClear = () => {
    setCode('');
    localStorage.setItem('html_playground_code', '');
  };

  const commonPlaygroundTags = [
    '<h1>',
    '<h2>',
    '<p>',
    '<a href="https://" target="_blank">',
    '<img src="" alt="">',
    '<ul>',
    '<li>',
    '<button>',
    '<div>',
    '<span>',
    '<form>',
    '<table>',
  ];

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col p-4 sm:p-6">
      {/* Playground Header & Toolbar */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-stone-200 bg-white p-3.5 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-700">
            <Sparkles className="h-4 w-4" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-stone-900">HTML Live Playground</h2>
            <p className="text-xs text-stone-500">
              Free-form live canvas. Experiment with tags and download real HTML files.
            </p>
          </div>
        </div>

        {/* Toolbar Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Template Dropdown */}
          <div className="flex items-center gap-1.5">
            <LayoutTemplate className="h-3.5 w-3.5 text-stone-500" />
            <select
              value={selectedTemplateId}
              onChange={(e) => handleSelectTemplate(e.target.value)}
              className="cursor-pointer rounded-lg border border-stone-200 bg-stone-50 px-2.5 py-1.5 text-xs font-medium text-stone-800 outline-hidden hover:bg-stone-100"
            >
              {templates.map((t) => (
                <option key={t.id} value={t.id}>
                  Template: {t.name}
                </option>
              ))}
            </select>
          </div>

          <div className="h-4 w-px bg-stone-200 mx-1 hidden sm:block" />

          {/* Clear Code */}
          <button
            type="button"
            onClick={handleClear}
            className="flex cursor-pointer items-center gap-1 rounded-lg border border-stone-200 px-2.5 py-1.5 text-xs font-medium text-stone-600 hover:bg-stone-50 hover:text-stone-900"
            title="Clear all code"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear</span>
          </button>

          {/* Download as HTML file */}
          <button
            type="button"
            onClick={handleDownload}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-stone-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-stone-800 shadow-xs"
          >
            <Download className="h-3.5 w-3.5" />
            <span>{downloadSuccess ? 'Downloaded!' : 'Export .html'}</span>
          </button>
        </div>
      </div>

      {/* Editor & Preview Split Screen */}
      <div className="grid flex-1 grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left: Code Editor */}
        <div className="h-[460px] lg:h-[680px]">
          <CodeEditor
            code={code}
            onChange={handleCodeChange}
            title="HTML Playground"
            quickTags={commonPlaygroundTags}
            placeholder="<!-- Write any HTML code here to see live preview -->"
          />
        </div>

        {/* Right: Live Preview */}
        <div className="h-[460px] lg:h-[680px]">
          <LivePreview htmlCode={code} />
        </div>
      </div>
    </div>
  );
}
