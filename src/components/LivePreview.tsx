import { useMemo, useState } from 'react';
import {
  Monitor,
  Smartphone,
  Tablet,
  RefreshCw,
  Eye,
  Code2,
  Layers,
  ShieldCheck,
} from 'lucide-react';
import { DomVisualizer } from './DomVisualizer';
import { HtmlAuditor } from './HtmlAuditor';

interface LivePreviewProps {
  htmlCode: string;
}

export type PreviewTab = 'preview' | 'tree' | 'auditor';

export function LivePreview({ htmlCode }: LivePreviewProps) {
  const [activeTab, setActiveTab] = useState<PreviewTab>('preview');
  const [viewport, setViewport] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showDomSummary, setShowDomSummary] = useState<boolean>(false);
  const [refreshKey, setRefreshKey] = useState<number>(0);

  // Parse elements for beginner inspection
  const tagSummary = useMemo(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');
      const elements = doc.body.querySelectorAll('*');
      const counts: Record<string, number> = {};
      elements.forEach((el) => {
        const name = el.tagName.toLowerCase();
        counts[name] = (counts[name] || 0) + 1;
      });
      return Object.entries(counts).sort((a, b) => b[1] - a[1]);
    } catch {
      return [];
    }
  }, [htmlCode]);

  // Build sandboxed HTML payload with clean base styles for standard HTML elements
  const fullHtmlDocument = useMemo(() => {
    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    :root {
      color-scheme: light;
    }
    body {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      margin: 1.25rem;
      color: #1c1917;
      background-color: #ffffff;
      line-height: 1.6;
    }
    img {
      max-width: 100%;
      height: auto;
      display: inline-block;
    }
    a {
      color: #2563eb;
      text-decoration: underline;
    }
    a:hover {
      color: #1d4ed8;
    }
    table {
      border-collapse: collapse;
      margin: 1rem 0;
      min-width: 280px;
    }
    th, td {
      border: 1px solid #d6d3d1;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f5f5f4;
      font-weight: 600;
    }
    blockquote {
      border-left: 4px solid #d6d3d1;
      margin: 1rem 0;
      padding-left: 1rem;
      color: #57534e;
      font-style: italic;
    }
    code {
      background-color: #f5f5f4;
      padding: 0.15rem 0.35rem;
      border-radius: 4px;
      font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
      font-size: 0.9em;
      color: #e11d48;
    }
    hr {
      border: none;
      border-top: 1px solid #e7e5e4;
      margin: 1.5rem 0;
    }
    input, select, textarea, button {
      font-family: inherit;
      font-size: 0.95rem;
    }
    button {
      cursor: pointer;
    }
  </style>
</head>
<body>
${htmlCode}
</body>
</html>`;
  }, [htmlCode]);

  const viewportWidth = {
    desktop: 'w-full',
    tablet: 'max-w-[768px] mx-auto',
    mobile: 'max-w-[375px] mx-auto',
  }[viewport];

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
      {/* Tab Switcher & Header Controls */}
      <div className="flex flex-wrap items-center justify-between border-b border-stone-200 bg-stone-50 px-3 py-2 text-xs">
        {/* Navigation Tabs for Preview vs Tree vs a11y Auditor */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('preview')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              activeTab === 'preview'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-emerald-600" />
            <span>Preview</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('tree')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              activeTab === 'tree'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-purple-600" />
            <span>DOM Tree</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('auditor')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all ${
              activeTab === 'auditor'
                ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                : 'text-stone-500 hover:text-stone-800'
            }`}
          >
            <ShieldCheck className="h-3.5 w-3.5 text-blue-600" />
            <span>a11y Auditor</span>
          </button>
        </div>

        {/* Viewport and Inspector Controls (Only when in preview tab) */}
        {activeTab === 'preview' && (
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setShowDomSummary(!showDomSummary)}
              title="Toggle DOM element breakdown"
              className={`flex cursor-pointer items-center gap-1 rounded px-2 py-1 transition-colors ${
                showDomSummary
                  ? 'bg-blue-100 font-semibold text-blue-700'
                  : 'text-stone-500 hover:bg-stone-200/70 hover:text-stone-800'
              }`}
            >
              <Code2 className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Tags</span>
            </button>

            <div className="h-4 w-px bg-stone-300 mx-1" />

            <button
              type="button"
              onClick={() => setViewport('desktop')}
              title="Desktop view"
              className={`cursor-pointer rounded p-1.5 transition-colors ${
                viewport === 'desktop'
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('tablet')}
              title="Tablet view (768px)"
              className={`cursor-pointer rounded p-1.5 transition-colors ${
                viewport === 'tablet'
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Tablet className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setViewport('mobile')}
              title="Mobile view (375px)"
              className={`cursor-pointer rounded p-1.5 transition-colors ${
                viewport === 'mobile'
                  ? 'bg-stone-200 text-stone-900'
                  : 'text-stone-400 hover:text-stone-700'
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
            </button>

            <button
              type="button"
              onClick={() => setRefreshKey((prev) => prev + 1)}
              title="Force reload preview"
              className="cursor-pointer rounded p-1.5 text-stone-400 hover:bg-stone-200 hover:text-stone-700 transition-colors"
            >
              <RefreshCw className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Content based on Active Tab */}
      {activeTab === 'preview' && (
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* DOM Tag Inspector Bar (when active) */}
          {showDomSummary && (
            <div className="border-b border-stone-200 bg-stone-100/80 px-4 py-2 text-xs">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-semibold text-stone-600">Rendered Tags:</span>
                {tagSummary.length === 0 ? (
                  <span className="text-stone-400 italic">No HTML elements detected yet</span>
                ) : (
                  tagSummary.map(([tagName, count]) => (
                    <span
                      key={tagName}
                      className="inline-flex items-center gap-1 rounded bg-white px-2 py-0.5 font-mono text-[11px] text-stone-700 border border-stone-200"
                    >
                      &lt;{tagName}&gt;
                      <span className="rounded-full bg-stone-100 px-1 text-[9px] font-bold text-stone-500">
                        {count}
                      </span>
                    </span>
                  ))
                )}
              </div>
            </div>
          )}

          {/* Browser Viewport Window */}
          <div className="relative flex flex-1 items-center justify-center overflow-auto bg-stone-100/50 p-2 sm:p-4">
            <div
              className={`h-full w-full transition-all duration-200 rounded-lg border border-stone-200 bg-white shadow-xs overflow-hidden ${viewportWidth}`}
            >
              <iframe
                key={refreshKey}
                title="HTML Output Preview"
                srcDoc={fullHtmlDocument}
                sandbox="allow-scripts"
                className="h-full w-full border-0 bg-white"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tree' && (
        <div className="flex-1 overflow-hidden">
          <DomVisualizer htmlCode={htmlCode} />
        </div>
      )}

      {activeTab === 'auditor' && (
        <div className="flex-1 overflow-hidden">
          <HtmlAuditor htmlCode={htmlCode} />
        </div>
      )}
    </div>
  );
}

