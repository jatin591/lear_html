import { useState, useMemo } from 'react';
import {
  Layers,
  Send,
  Cpu,
  Globe,
  Lock,
  ArrowRight,
  Info,
  CheckCircle2,
  AlertTriangle,
  FileCode,
  Copy,
  Check,
  Search,
} from 'lucide-react';

type LabSection = 'flow' | 'forms' | 'parser' | 'head' | 'entities';

export function DeepLogicLab() {
  const [activeSection, setActiveSection] = useState<LabSection>('flow');

  // Lab 1: Block vs Inline state
  const [displayType, setDisplayType] = useState<'block' | 'inline' | 'inline-block'>('inline');
  const [customWidth, setCustomWidth] = useState<number>(180);
  const [customHeight, setCustomHeight] = useState<number>(60);
  const [customPadding, setCustomPadding] = useState<number>(12);
  const [customMargin, setCustomMargin] = useState<number>(16);
  const [showMarginCollapsing, setShowMarginCollapsing] = useState<boolean>(false);

  // Lab 2: Form Serialization state
  const [formMethod, setFormMethod] = useState<'GET' | 'POST'>('GET');
  const [formEnctype, setFormEnctype] = useState<'application/x-www-form-urlencoded' | 'multipart/form-data'>('application/x-www-form-urlencoded');
  const [usernameValue, setUsernameValue] = useState<string>('AlexDeveloper');
  const [emailValue, setEmailValue] = useState<string>('alex@example.com');
  const [hasEmailNameAttr, setHasEmailNameAttr] = useState<boolean>(true);
  const [roleValue, setRoleValue] = useState<string>('frontend');
  const [newsletterChecked, setNewsletterChecked] = useState<boolean>(true);

  // Lab 3: Parser Quirks state
  const [parserSnippetKey, setParserSnippetKey] = useState<'misnested' | 'div-in-p' | 'void-close'>('misnested');

  // Lab 4: Head & SEO state
  const [pageTitle, setPageTitle] = useState<string>('Modern Web Architecture Guide | HTML Deep Dive');
  const [metaDescription, setMetaDescription] = useState<string>('Master the inner workings of the HTML5 parser, DOM tree construction, layout flow, and accessible semantic architecture.');
  const [ogImage, setOgImage] = useState<string>('https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80');
  const [hasViewport, setHasViewport] = useState<boolean>(true);

  // Lab 5: Entities & Escaping
  const [rawTextInput, setRawTextInput] = useState<string>('Check if 5 < 10 & 20 > 15 for "special" deals!');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);

  // Form serialization calculation
  const serializedQuery = useMemo(() => {
    const params: string[] = [];
    if (usernameValue) params.push(`username=${encodeURIComponent(usernameValue)}`);
    if (hasEmailNameAttr && emailValue) params.push(`email=${encodeURIComponent(emailValue)}`);
    if (roleValue) params.push(`role=${encodeURIComponent(roleValue)}`);
    if (newsletterChecked) params.push('newsletter=on');
    return params.join('&');
  }, [usernameValue, emailValue, hasEmailNameAttr, roleValue, newsletterChecked]);

  // Escaped entity calculation
  const escapedText = useMemo(() => {
    return rawTextInput
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }, [rawTextInput]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col p-4 sm:p-6">
      {/* Top Banner */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-md bg-purple-100 px-2 py-0.5 text-xs font-bold text-purple-800">
                Advanced Laboratory
              </span>
              <span className="text-xs text-stone-500">• Browser Internals & Mechanics</span>
            </div>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-stone-900">
              Deep HTML Logic & Rendering Engine
            </h2>
            <p className="mt-1 text-xs text-stone-600 max-w-3xl leading-relaxed">
              HTML is not just static syntax—it is parsed by complex browser algorithms that determine document flow, box models, network serialization, and DOM tree construction. Explore interactive simulations of the browser engine below.
            </p>
          </div>
        </div>

        {/* Section Navigation Pills */}
        <div className="mt-5 flex flex-wrap gap-2 border-t border-stone-100 pt-4">
          <button
            type="button"
            onClick={() => setActiveSection('flow')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'flow'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Layers className="h-3.5 w-3.5" />
            <span>1. Block vs Inline Engine</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('forms')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'forms'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Send className="h-3.5 w-3.5" />
            <span>2. Form Serialization & Wire Protocol</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('parser')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'parser'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Cpu className="h-3.5 w-3.5" />
            <span>3. HTML5 Tree Parser & Void Elements</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('head')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'head'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Globe className="h-3.5 w-3.5" />
            <span>4. The &lt;head&gt; Engine & SEO Simulator</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveSection('entities')}
            className={`flex cursor-pointer items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-all ${
              activeSection === 'entities'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'bg-stone-100 text-stone-700 hover:bg-stone-200/80'
            }`}
          >
            <Lock className="h-3.5 w-3.5" />
            <span>5. Character Entities & Security</span>
          </button>
        </div>
      </div>

      {/* SECTION 1: BLOCK VS INLINE FLOW ENGINE */}
      {activeSection === 'flow' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Controls on Left */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900">Interactive Display Mode Controller</h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Test how the browser applies width, height, and margins based on whether an element is <strong>block</strong>, <strong>inline</strong>, or <strong>inline-block</strong>.
              </p>

              {/* Display selector */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-stone-700">Display Property:</label>
                <div className="mt-1.5 grid grid-cols-3 gap-2">
                  {(['inline', 'block', 'inline-block'] as const).map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setDisplayType(mode)}
                      className={`cursor-pointer rounded-lg py-2 text-xs font-mono font-semibold transition-all ${
                        displayType === mode
                          ? 'bg-blue-600 text-white shadow-xs'
                          : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension Sliders */}
              <div className="mt-4 space-y-3 pt-3 border-t border-stone-100 text-xs">
                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Width: {customWidth}px</span>
                    {displayType === 'inline' && (
                      <span className="text-rose-600 font-bold text-[11px]">(Ignored by inline tags!)</span>
                    )}
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="300"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Height: {customHeight}px</span>
                    {displayType === 'inline' && (
                      <span className="text-rose-600 font-bold text-[11px]">(Ignored by inline tags!)</span>
                    )}
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="120"
                    value={customHeight}
                    onChange={(e) => setCustomHeight(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Padding: {customPadding}px</span>
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="32"
                    value={customPadding}
                    onChange={(e) => setCustomPadding(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between">
                    <span className="font-medium text-stone-700">Margin: {customMargin}px</span>
                    {displayType === 'inline' && (
                      <span className="text-amber-600 font-medium text-[11px]">
                        (Top/bottom margins ignored)
                      </span>
                    )}
                  </div>
                  <input
                    type="range"
                    min="4"
                    max="40"
                    value={customMargin}
                    onChange={(e) => setCustomMargin(Number(e.target.value))}
                    className="w-full accent-blue-600 cursor-pointer"
                  />
                </div>
              </div>

              {/* Margin Collapse Toggle */}
              <div className="mt-4 pt-3 border-t border-stone-100">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-stone-800 font-medium">
                  <input
                    type="checkbox"
                    checked={showMarginCollapsing}
                    onChange={(e) => setShowMarginCollapsing(e.target.checked)}
                    className="rounded text-blue-600 accent-blue-600"
                  />
                  <span>Show Margin Collapsing Simulator</span>
                </label>
              </div>
            </div>

            {/* Deep Rule Box */}
            <div className="rounded-xl border border-blue-200 bg-blue-50/50 p-4 text-xs text-blue-950">
              <h4 className="flex items-center gap-1.5 font-bold">
                <Info className="h-4 w-4 text-blue-600" />
                Browser Rule: The Phrasing vs Flow Boundary
              </h4>
              <p className="mt-1.5 leading-relaxed text-blue-900">
                In HTML, standard tags like <code>&lt;span&gt;</code>, <code>&lt;a&gt;</code>, and <code>&lt;em&gt;</code> default to <code>display: inline</code>. The browser layout engine arranges inline elements horizontally alongside text glyphs. Consequently, CSS <code>width</code>, <code>height</code>, <code>margin-top</code>, and <code>margin-bottom</code> have <strong>no effect</strong> on them! To set custom dimensions on a link or badge, change it to <code>inline-block</code>.
              </p>
            </div>
          </div>

          {/* Visual Canvas on Right */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Live Flow Rendering Preview
                </span>
                <span className="font-mono text-xs text-stone-500">
                  computed display: <strong className="text-blue-600">{displayType}</strong>
                </span>
              </div>

              {/* Simulated browser document area */}
              <div className="mt-4 min-h-[220px] rounded-lg border border-dashed border-stone-300 bg-stone-50 p-4 font-sans text-sm text-stone-700 leading-relaxed overflow-hidden">
                <span>The quick brown fox jumps over the </span>

                {/* The Target Interactive Element */}
                <span
                  style={{
                    display: displayType,
                    width: displayType === 'inline' ? undefined : `${customWidth}px`,
                    height: displayType === 'inline' ? undefined : `${customHeight}px`,
                    padding: `${customPadding}px`,
                    margin: `${customMargin}px`,
                  }}
                  className="rounded-md border-2 border-blue-500 bg-blue-100/90 font-mono text-xs font-bold text-blue-900 shadow-2xs transition-all text-center inline-flex items-center justify-center"
                >
                  &lt;span&gt; Target &lt;/span&gt;
                </span>

                <span> lazy dog while the browser calculates text wrap and layout offsets.</span>
              </div>

              {/* Property Support Verdict Table */}
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                <div className="rounded-lg bg-stone-50 p-2 border border-stone-200/80">
                  <span className="text-[10px] text-stone-500 uppercase">Width / Height</span>
                  <p className={`font-bold mt-0.5 ${displayType === 'inline' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {displayType === 'inline' ? 'Ignored' : 'Honored'}
                  </p>
                </div>
                <div className="rounded-lg bg-stone-50 p-2 border border-stone-200/80">
                  <span className="text-[10px] text-stone-500 uppercase">Horizontal Margin</span>
                  <p className="font-bold text-emerald-600 mt-0.5">Honored</p>
                </div>
                <div className="rounded-lg bg-stone-50 p-2 border border-stone-200/80">
                  <span className="text-[10px] text-stone-500 uppercase">Vertical Margin</span>
                  <p className={`font-bold mt-0.5 ${displayType === 'inline' ? 'text-rose-600' : 'text-emerald-600'}`}>
                    {displayType === 'inline' ? 'Ignored' : 'Honored'}
                  </p>
                </div>
                <div className="rounded-lg bg-stone-50 p-2 border border-stone-200/80">
                  <span className="text-[10px] text-stone-500 uppercase">Line Break</span>
                  <p className={`font-bold mt-0.5 ${displayType === 'block' ? 'text-purple-600' : 'text-stone-700'}`}>
                    {displayType === 'block' ? 'Forces Break' : 'Inline Flow'}
                  </p>
                </div>
              </div>
            </div>

            {/* Margin Collapsing Demo */}
            {showMarginCollapsing && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-5 shadow-xs animate-in fade-in">
                <div className="flex items-center gap-2">
                  <span className="rounded bg-amber-200 px-2 py-0.5 text-xs font-bold text-amber-900">
                    Deep Concept
                  </span>
                  <h4 className="text-sm font-bold text-amber-950">
                    Why Adjacent Paragraph Margins Collapse
                  </h4>
                </div>
                <p className="mt-1 text-xs text-amber-900 leading-relaxed">
                  In CSS block layout, when two block elements like <code>&lt;p&gt;</code> each have <code>margin: 20px</code>, the space between them is <strong>20px</strong>, not 40px! The margins collapse into the single largest margin.
                </p>

                <div className="mt-3 rounded-lg border border-amber-300/80 bg-white p-3 font-mono text-xs">
                  <div className="rounded bg-emerald-100 p-2 text-emerald-900 border border-emerald-300">
                    &lt;p style=&quot;margin-bottom: 24px&quot;&gt;Paragraph 1&lt;/p&gt;
                  </div>
                  <div className="my-2 flex items-center justify-center rounded border border-dashed border-amber-400 bg-amber-100/70 py-1 text-[11px] font-bold text-amber-800">
                    Collapsed Distance: 24px (NOT 24 + 24 = 48px)
                  </div>
                  <div className="rounded bg-emerald-100 p-2 text-emerald-900 border border-emerald-300">
                    &lt;p style=&quot;margin-top: 24px&quot;&gt;Paragraph 2&lt;/p&gt;
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* SECTION 2: FORM SERIALIZATION & WIRE PROTOCOL */}
      {activeSection === 'forms' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Interactive Form on Left */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-100 pb-3">
                <h3 className="text-sm font-bold text-stone-900">Interactive Form Configuration</h3>
                <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-bold text-purple-800">
                  HTTP Engine
                </span>
              </div>

              <div className="mt-4 space-y-3.5 text-xs">
                {/* Method selector */}
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="font-semibold text-stone-700">Form Method:</label>
                    <div className="mt-1 flex gap-1 rounded-lg bg-stone-100 p-1">
                      <button
                        type="button"
                        onClick={() => setFormMethod('GET')}
                        className={`flex-1 cursor-pointer rounded py-1 font-mono font-bold transition-colors ${
                          formMethod === 'GET' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                        }`}
                      >
                        GET
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormMethod('POST')}
                        className={`flex-1 cursor-pointer rounded py-1 font-mono font-bold transition-colors ${
                          formMethod === 'POST' ? 'bg-white text-stone-900 shadow-2xs' : 'text-stone-600'
                        }`}
                      >
                        POST
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold text-stone-700">Encoding (enctype):</label>
                    <select
                      value={formEnctype}
                      onChange={(e) => setFormEnctype(e.target.value as any)}
                      className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 p-1.5 font-mono text-[11px] text-stone-800 outline-hidden"
                    >
                      <option value="application/x-www-form-urlencoded">urlencoded (standard)</option>
                      <option value="multipart/form-data">multipart/form-data (files)</option>
                    </select>
                  </div>
                </div>

                {/* Fields */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-stone-700">Field 1: &lt;input name=&quot;username&quot;&gt;</label>
                    <span className="text-[10px] text-emerald-600 font-mono font-bold">name=&quot;username&quot;</span>
                  </div>
                  <input
                    type="text"
                    value={usernameValue}
                    onChange={(e) => setUsernameValue(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900 focus:border-blue-500"
                  />
                </div>

                {/* Email with Name Attribute Toggle */}
                <div className="rounded-lg border border-amber-200 bg-amber-50/50 p-3">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-stone-900">
                      Field 2: Email Input
                    </label>
                    <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-amber-900">
                      <input
                        type="checkbox"
                        checked={hasEmailNameAttr}
                        onChange={(e) => setHasEmailNameAttr(e.target.checked)}
                        className="rounded accent-amber-600"
                      />
                      <span>Include name=&quot;email&quot;</span>
                    </label>
                  </div>

                  <input
                    type="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900"
                  />

                  {!hasEmailNameAttr && (
                    <p className="mt-1.5 text-[11px] font-semibold text-rose-600 flex items-center gap-1">
                      <AlertTriangle className="h-3.5 w-3.5 shrink-0" />
                      Notice: Without `name=&quot;email&quot;`, the browser parser omits this field from submission!
                    </p>
                  )}
                </div>

                {/* Role select */}
                <div>
                  <label className="font-semibold text-stone-700">Field 3: &lt;select name=&quot;role&quot;&gt;</label>
                  <select
                    value={roleValue}
                    onChange={(e) => setRoleValue(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900"
                  >
                    <option value="frontend">frontend</option>
                    <option value="backend">backend</option>
                    <option value="fullstack">fullstack</option>
                  </select>
                </div>

                {/* Checkbox */}
                <div className="flex items-center gap-2">
                  <input
                    id="lab-newsletter"
                    type="checkbox"
                    checked={newsletterChecked}
                    onChange={(e) => setNewsletterChecked(e.target.checked)}
                    className="rounded accent-blue-600"
                  />
                  <label htmlFor="lab-newsletter" className="text-xs text-stone-800">
                    &lt;input type=&quot;checkbox&quot; name=&quot;newsletter&quot;&gt; Subscribe to updates
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* Wire Protocol Output on Right */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="rounded-xl border border-stone-800 bg-stone-950 p-5 text-stone-100 shadow-xs">
              <div className="flex items-center justify-between border-b border-stone-800 pb-3">
                <div className="flex items-center gap-2">
                  <Send className="h-4 w-4 text-emerald-400" />
                  <span className="font-mono text-xs font-bold text-stone-200">
                    Raw HTTP Request Wire Serialization
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    copyToClipboard(
                      formMethod === 'GET'
                        ? `GET /submit?${serializedQuery} HTTP/1.1\nHost: example.com\nUser-Agent: BrowserEngine/2026`
                        : `POST /submit HTTP/1.1\nHost: example.com\nContent-Type: ${formEnctype}\nContent-Length: ${serializedQuery.length}\n\n${serializedQuery}`
                    )
                  }
                  className="flex items-center gap-1 text-[11px] text-stone-400 hover:text-stone-200 cursor-pointer"
                >
                  {copiedCode ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  <span>{copiedCode ? 'Copied' : 'Copy HTTP'}</span>
                </button>
              </div>

              {/* Wire output code block */}
              <div className="mt-4 font-mono text-xs leading-relaxed">
                {formMethod === 'GET' ? (
                  <div className="space-y-1">
                    <p className="text-emerald-400 font-bold">
                      GET /submit?{serializedQuery || '<empty>'} HTTP/1.1
                    </p>
                    <p className="text-stone-400">Host: api.example.com</p>
                    <p className="text-stone-400">User-Agent: Mozilla/5.0 (Modern HTML5 Engine)</p>
                    <p className="text-stone-400">Accept: text/html,application/xhtml+xml</p>
                    <div className="my-2 border-t border-stone-800" />
                    <p className="text-stone-500 italic text-[11px]">
                      (GET requests append form key-value pairs directly to the URL string. No body payload is transmitted.)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <p className="text-blue-400 font-bold">POST /submit HTTP/1.1</p>
                    <p className="text-stone-400">Host: api.example.com</p>
                    <p className="text-stone-400">Content-Type: {formEnctype}</p>
                    <p className="text-stone-400">Content-Length: {serializedQuery.length}</p>
                    <p className="text-stone-400">Origin: https://example.com</p>
                    <div className="my-3 border-t border-stone-800" />
                    <p className="text-amber-300 font-bold break-all bg-stone-900 p-2.5 rounded">
                      {serializedQuery || '/* Empty Body */'}
                    </p>
                    <p className="text-stone-500 italic text-[11px] mt-2">
                      (POST requests transmit serialized form values safely inside the HTTP message body, keeping URLs clean and supporting unlimited payload size.)
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Deep Logic Takeaway */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs text-xs text-stone-700">
              <h4 className="font-bold text-stone-900 flex items-center gap-1.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                The Core Rule of HTML Form Submission
              </h4>
              <p className="mt-1 text-stone-600 leading-relaxed">
                Notice what happens when you toggle the checkbox <strong>&quot;Include name=&quot;email&quot;&quot;</strong> above. Even though the input field contains valid text in the browser, the HTTP request wire completely ignores it! In HTML5, only elements with a non-empty <code>name</code> attribute are considered <em>submittable elements</em>.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 3: HTML5 TREE PARSER & VOID ELEMENTS */}
      {activeSection === 'parser' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Presets and Explanation */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900">The HTML5 Adoption Agency Algorithm</h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Unlike strict XML parsers that crash when syntax is imperfect, HTML5 parsers contain deterministic error-recovery algorithms that automatically restructure invalid markup.
              </p>

              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  onClick={() => setParserSnippetKey('misnested')}
                  className={`w-full cursor-pointer rounded-lg p-3 text-left text-xs transition-all border ${
                    parserSnippetKey === 'misnested'
                      ? 'border-purple-300 bg-purple-50 text-purple-950 font-medium'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="font-bold">1. Intertwined Formatting Tags</div>
                  <div className="font-mono text-[11px] text-stone-500 mt-1">
                    &lt;b&gt;&lt;i&gt;Text&lt;/b&gt;&lt;/i&gt;
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setParserSnippetKey('div-in-p')}
                  className={`w-full cursor-pointer rounded-lg p-3 text-left text-xs transition-all border ${
                    parserSnippetKey === 'div-in-p'
                      ? 'border-purple-300 bg-purple-50 text-purple-950 font-medium'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="font-bold">2. Paragraph Splitting by Block Elements</div>
                  <div className="font-mono text-[11px] text-stone-500 mt-1">
                    &lt;p&gt;Start &lt;div&gt;Box&lt;/div&gt; End&lt;/p&gt;
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setParserSnippetKey('void-close')}
                  className={`w-full cursor-pointer rounded-lg p-3 text-left text-xs transition-all border ${
                    parserSnippetKey === 'void-close'
                      ? 'border-purple-300 bg-purple-50 text-purple-950 font-medium'
                      : 'border-stone-200 bg-white hover:bg-stone-50 text-stone-800'
                  }`}
                >
                  <div className="font-bold">3. The 14 Void Elements Rule</div>
                  <div className="font-mono text-[11px] text-stone-500 mt-1">
                    &lt;img&gt;&lt;/img&gt; or &lt;input&gt;Children&lt;/input&gt;
                  </div>
                </button>
              </div>
            </div>

            {/* Void Tag Catalog Card */}
            <div className="rounded-xl border border-stone-200 bg-white p-4 shadow-xs text-xs">
              <h4 className="font-bold text-stone-900 mb-2">The Complete List of 14 Void Tags in HTML5</h4>
              <div className="flex flex-wrap gap-1.5 font-mono text-[11px]">
                {['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].map((tag) => (
                  <span key={tag} className="rounded bg-stone-100 px-2 py-0.5 text-stone-800 border border-stone-200">
                    &lt;{tag}&gt;
                  </span>
                ))}
              </div>
              <p className="mt-2 text-[11px] text-stone-500 leading-relaxed">
                Void elements are forbidden from ever having closing tags or nested children. Self-closing slashes like <code>&lt;br /&gt;</code> are optional legacy conventions ignored by HTML5.
              </p>
            </div>
          </div>

          {/* Transformation Visualizer on Right */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                How the Browser Parser Restructures Your Code
              </span>

              {parserSnippetKey === 'misnested' && (
                <div className="mt-4 space-y-4 text-xs">
                  <div>
                    <span className="text-rose-600 font-semibold">Author Wrote (Mismatched Overlap):</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-rose-300">
                      {'<b><i>Bold and italic</b> still italic?</i>'}
                    </pre>
                  </div>

                  <div className="flex items-center justify-center text-stone-400">
                    <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
                  </div>

                  <div>
                    <span className="text-emerald-700 font-semibold">Browser Constructs in DOM (Adoption Agency Algorithm):</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-emerald-300">
                      {'<b><i>Bold and italic</i></b><i> still italic?</i>'}
                    </pre>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3 border border-purple-100 text-purple-900 text-xs leading-relaxed">
                    <strong>Why this happens:</strong> When the parser encounters the closing <code>&lt;/b&gt;</code> tag while <code>&lt;i&gt;</code> is still open on the stack of open elements, it clones the <code>&lt;i&gt;</code> element to reopen it for remaining text.
                  </div>
                </div>
              )}

              {parserSnippetKey === 'div-in-p' && (
                <div className="mt-4 space-y-4 text-xs">
                  <div>
                    <span className="text-rose-600 font-semibold">Author Wrote (Div Nested in Paragraph):</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-rose-300">
                      {'<p>\n  Welcome to our shop!\n  <div class="deal">50% Off Today</div>\n  Limited supplies available.\n</p>'}
                    </pre>
                  </div>

                  <div className="flex items-center justify-center text-stone-400">
                    <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
                  </div>

                  <div>
                    <span className="text-emerald-700 font-semibold">Browser Silently Closes & Splits the Paragraph:</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-emerald-300">
                      {'<p>Welcome to our shop!</p>\n<div class="deal">50% Off Today</div>\n<p>Limited supplies available.</p>'}
                    </pre>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3 border border-purple-100 text-purple-900 text-xs leading-relaxed">
                    <strong>Why this happens:</strong> In the HTML specification, encountering a block element start tag like <code>&lt;div&gt;</code> automatically emits an implicit closing <code>&lt;/p&gt;</code> token!
                  </div>
                </div>
              )}

              {parserSnippetKey === 'void-close' && (
                <div className="mt-4 space-y-4 text-xs">
                  <div>
                    <span className="text-rose-600 font-semibold">Author Attempted:</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-rose-300">
                      {'<img src="avatar.png">\n  <span>Caption inside image</span>\n</img>'}
                    </pre>
                  </div>

                  <div className="flex items-center justify-center text-stone-400">
                    <ArrowRight className="h-5 w-5 rotate-90 sm:rotate-0" />
                  </div>

                  <div>
                    <span className="text-emerald-700 font-semibold">Browser Parser Reality:</span>
                    <pre className="mt-1.5 rounded-lg bg-stone-900 p-3 font-mono text-xs text-emerald-300">
                      {'<img src="avatar.png">\n<span>Caption inside image</span>\n<!-- </img> closing tag was completely discarded -->'}
                    </pre>
                  </div>

                  <div className="rounded-lg bg-purple-50 p-3 border border-purple-100 text-purple-900 text-xs leading-relaxed">
                    <strong>Proper solution:</strong> Use <code>&lt;figure&gt;&lt;img ...&gt;&lt;figcaption&gt;Caption&lt;/figcaption&gt;&lt;/figure&gt;</code> instead of trying to put children inside void tags.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: THE <HEAD> ENGINE & SEO / SOCIAL CARDS */}
      {activeSection === 'head' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Metadata Controls on Left */}
          <div className="flex flex-col gap-4 lg:col-span-5">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900">Head Meta Configuration</h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Configure document metadata and see how search engines and social cards ingest the HTML in real time.
              </p>

              <div className="mt-4 space-y-3 text-xs">
                <div>
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>&lt;title&gt; ({pageTitle.length} chars)</span>
                    <span className={pageTitle.length > 60 ? 'text-amber-600' : 'text-emerald-600'}>
                      {pageTitle.length > 60 ? 'Warning: May Truncate' : 'Optimal < 60'}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={pageTitle}
                    onChange={(e) => setPageTitle(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-semibold text-stone-700">
                    <span>&lt;meta name=&quot;description&quot;&gt; ({metaDescription.length} chars)</span>
                    <span className={metaDescription.length > 155 ? 'text-amber-600' : 'text-emerald-600'}>
                      {metaDescription.length > 155 ? 'Warning: May Truncate' : 'Optimal < 155'}
                    </span>
                  </div>
                  <textarea
                    rows={3}
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900"
                  />
                </div>

                <div>
                  <label className="font-semibold text-stone-700">&lt;meta property=&quot;og:image&quot;&gt; URL</label>
                  <input
                    type="text"
                    value={ogImage}
                    onChange={(e) => setOgImage(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-white p-2 font-mono text-xs text-stone-900"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-stone-800">
                    <input
                      type="checkbox"
                      checked={hasViewport}
                      onChange={(e) => setHasViewport(e.target.checked)}
                      className="rounded accent-blue-600"
                    />
                    <span>Include &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot;&gt;</span>
                  </label>
                  {!hasViewport && (
                    <p className="mt-1 text-[11px] text-rose-600 font-semibold">
                      Without the viewport meta tag, mobile browsers render at 980px desktop width and scale everything down to unreadable proportions!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Live SERP & Social Previews on Right */}
          <div className="flex flex-col gap-4 lg:col-span-7">
            {/* Google SERP Preview Card */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Search className="h-4 w-4 text-blue-600" />
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Search Engine Results Page (SERP) Preview
                </span>
              </div>

              <div className="mt-4 max-w-xl">
                <div className="flex items-center gap-2 text-xs text-stone-600">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-stone-100 text-[10px] font-bold text-stone-700">
                    🌐
                  </span>
                  <div>
                    <p className="font-semibold text-stone-900 leading-none">example.com</p>
                    <p className="text-[11px] text-stone-500 leading-none mt-0.5">https://www.example.com › guides › html</p>
                  </div>
                </div>

                <h4 className="mt-1.5 text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
                  {pageTitle.length > 60 ? pageTitle.slice(0, 58) + '...' : pageTitle}
                </h4>

                <p className="mt-1 text-xs text-[#4d5156] leading-relaxed line-clamp-2">
                  {metaDescription.length > 155 ? metaDescription.slice(0, 152) + '...' : metaDescription}
                </p>
              </div>
            </div>

            {/* Social Share Card (Open Graph) */}
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <div className="flex items-center gap-2 border-b border-stone-100 pb-3">
                <Globe className="h-4 w-4 text-purple-600" />
                <span className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  OpenGraph Social Media Share Card (Twitter / LinkedIn / Discord)
                </span>
              </div>

              <div className="mt-4 max-w-md overflow-hidden rounded-xl border border-stone-200 bg-stone-50 shadow-2xs">
                <img
                  src={ogImage}
                  alt="OG Banner preview"
                  className="h-48 w-full object-cover"
                />
                <div className="p-3.5 bg-white">
                  <span className="text-[10px] uppercase font-semibold text-stone-400">EXAMPLE.COM</span>
                  <h5 className="mt-0.5 text-sm font-bold text-stone-900 leading-snug line-clamp-1">
                    {pageTitle}
                  </h5>
                  <p className="mt-1 text-xs text-stone-500 line-clamp-2 leading-relaxed">
                    {metaDescription}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: CHARACTER ENTITIES & SECURITY (XSS) */}
      {activeSection === 'entities' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Encoder on Left */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900">HTML Character Entity Encoder</h3>
              <p className="mt-1 text-xs text-stone-500 leading-relaxed">
                Type any text with reserved HTML syntax symbols (<code>&lt;</code>, <code>&gt;</code>, <code>&amp;</code>, <code>&quot;</code>) to see how character entities protect against browser parsing collisions and Cross-Site Scripting (XSS).
              </p>

              <div className="mt-4 space-y-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700">Raw Input Text:</label>
                  <textarea
                    rows={3}
                    value={rawTextInput}
                    onChange={(e) => setRawTextInput(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-stone-200 bg-stone-50 p-2.5 font-mono text-xs text-stone-900 outline-hidden focus:border-blue-500"
                  />
                </div>

                {/* Escaped Output */}
                <div>
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-stone-700">Safe HTML Escaped Output:</label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(escapedText)}
                      className="flex items-center gap-1 text-[11px] text-blue-600 hover:text-blue-800 cursor-pointer"
                    >
                      {copiedCode ? <Check className="h-3 w-3 text-emerald-600" /> : <Copy className="h-3 w-3" />}
                      <span>{copiedCode ? 'Copied' : 'Copy Entity Markup'}</span>
                    </button>
                  </div>
                  <pre className="mt-1 rounded-lg bg-stone-900 p-3 font-mono text-xs text-emerald-400 overflow-x-auto whitespace-pre-wrap">
                    {escapedText}
                  </pre>
                </div>
              </div>
            </div>

            {/* XSS Explanation */}
            <div className="rounded-xl border border-rose-200 bg-rose-50/50 p-4 shadow-xs text-xs text-rose-950">
              <h4 className="flex items-center gap-1.5 font-bold text-rose-900">
                <Lock className="h-4 w-4 text-rose-600" />
                Why Unescaped HTML Causes Cross-Site Scripting (XSS)
              </h4>
              <p className="mt-1.5 leading-relaxed text-rose-900">
                If a web application prints user input like <code>&lt;script&gt;stealCookies()&lt;/script&gt;</code> directly into the HTML document without escaping it to <code>&amp;lt;script&amp;gt;</code>, the browser tokenizer transitions into tag-open mode and executes the script as legitimate application code!
              </p>
            </div>
          </div>

          {/* Entity Reference Catalog on Right */}
          <div className="flex flex-col gap-4 lg:col-span-6">
            <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
              <h3 className="text-sm font-bold text-stone-900 mb-3">
                Essential HTML Entities Quick Reference
              </h3>

              <div className="divide-y divide-stone-100 text-xs">
                {[
                  { char: '<', entity: '&lt;', name: 'Less-than', why: 'Prevents parser from opening a tag' },
                  { char: '>', entity: '&gt;', name: 'Greater-than', why: 'Prevents tag closing premature termination' },
                  { char: '&', entity: '&amp;', name: 'Ampersand', why: 'Distinguishes plain text & from entity prefix' },
                  { char: '"', entity: '&quot;', name: 'Double quote', why: 'Escapes attribute values like title="..."' },
                  { char: "'", entity: '&#39; / &apos;', name: 'Single quote', why: 'Escapes single-quoted attribute values' },
                  { char: '©', entity: '&copy;', name: 'Copyright symbol', why: 'Standard copyright mark' },
                  { char: '—', entity: '&mdash;', name: 'Em dash', why: 'Typographic break dash' },
                  { char: ' ', entity: '&nbsp;', name: 'Non-breaking space', why: 'Prevents browser from auto-wrapping' },
                ].map((item) => (
                  <div key={item.entity} className="flex items-center justify-between py-2">
                    <div className="flex items-center gap-3">
                      <span className="flex h-7 w-7 items-center justify-center rounded bg-stone-100 font-mono text-sm font-bold text-stone-800 border border-stone-200">
                        {item.char}
                      </span>
                      <div>
                        <code className="font-bold text-blue-600 text-xs">{item.entity}</code>
                        <span className="ml-2 text-stone-500 font-medium">{item.name}</span>
                      </div>
                    </div>
                    <span className="text-[11px] text-stone-400 hidden sm:inline">{item.why}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
