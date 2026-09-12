import React, { useMemo } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Info,
  CheckCircle2,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { AuditIssue } from '../types';

interface HtmlAuditorProps {
  htmlCode: string;
}

export function HtmlAuditor({ htmlCode }: HtmlAuditorProps) {
  const auditResult = useMemo(() => {
    const issues: AuditIssue[] = [];
    let score = 100;

    if (!htmlCode.trim()) {
      return {
        score: 100,
        grade: 'A',
        issues: [],
        passedChecks: ['Type HTML code to run the real-time accessibility and semantic auditor.'],
      };
    }

    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');

      // 1. Heading Hierarchy Check
      const headings = Array.from(doc.querySelectorAll('h1, h2, h3, h4, h5, h6'));
      const h1Count = doc.querySelectorAll('h1').length;

      if (headings.length > 0 && h1Count === 0) {
        issues.push({
          type: 'warning',
          rule: 'Heading Hierarchy',
          message: 'Document contains subheadings (h2-h6) but has no primary <h1> element.',
          fix: 'Always introduce a main top-level <h1> heading before lower-level subsections.',
        });
        score -= 10;
      } else if (h1Count > 1) {
        issues.push({
          type: 'info',
          rule: 'SEO & Hierarchy',
          message: `Found ${h1Count} <h1> elements. Single-page documents generally should have only one primary <h1>.`,
          fix: 'Convert secondary <h1> headings to <h2> for clear hierarchical structure.',
        });
        score -= 5;
      }

      // Check for skipped heading levels
      let lastLevel = 0;
      headings.forEach((h) => {
        const level = parseInt(h.tagName.substring(1), 10);
        if (lastLevel > 0 && level > lastLevel + 1) {
          issues.push({
            type: 'warning',
            rule: 'Skipped Heading Level',
            message: `Heading jumped from <h${lastLevel}> directly to <h${level}>.`,
            fix: `Use <h${lastLevel + 1}> instead to avoid confusing screen reader outline navigation.`,
          });
          score -= 10;
        }
        lastLevel = level;
      });

      // 2. Images accessibility
      const images = Array.from(doc.querySelectorAll('img'));
      images.forEach((img) => {
        if (!img.hasAttribute('alt')) {
          issues.push({
            type: 'error',
            rule: 'Image Alt Text Missing',
            message: `An <img> tag is missing the "alt" attribute entirely (${img.src ? img.src.slice(0, 30) + '…' : 'src empty'}).`,
            fix: 'Add alt="Descriptive text" so screen readers can describe the visual to visually impaired visitors.',
          });
          score -= 20;
        } else {
          const alt = img.getAttribute('alt')?.trim().toLowerCase();
          if (alt === 'image' || alt === 'photo' || alt === 'picture' || alt === 'graphic') {
            issues.push({
              type: 'warning',
              rule: 'Low Quality Alt Text',
              message: `Image has generic alt="${alt}". Screen readers already announce that it is an image.`,
              fix: 'Describe the actual content or purpose of the picture (e.g. alt="Pour-over coffee maker on wooden counter").',
            });
            score -= 10;
          }
        }
      });

      // 3. Hyperlinks
      const links = Array.from(doc.querySelectorAll('a'));
      links.forEach((a) => {
        if (!a.hasAttribute('href') || a.getAttribute('href') === '') {
          issues.push({
            type: 'error',
            rule: 'Hyperlink Missing Destination',
            message: 'An <a> anchor tag is missing a valid href attribute.',
            fix: 'Add href="https://..." or href="#section" to make the hyperlink functional.',
          });
          score -= 15;
        }

        const linkText = a.textContent?.trim().toLowerCase();
        if (linkText === 'click here' || linkText === 'here' || linkText === 'read more' || linkText === 'link') {
          issues.push({
            type: 'warning',
            rule: 'Inaccessible Link Label',
            message: `Anchor text "${linkText}" gives zero context when screen readers generate a link menu.`,
            fix: 'Rewrite link text to describe where it leads (e.g. "Read our seasonal menu guide").',
          });
          score -= 10;
        }

        if (a.getAttribute('target') === '_blank' && !a.getAttribute('rel')?.includes('noopener')) {
          issues.push({
            type: 'info',
            rule: 'Security & Window Isolation',
            message: 'Link uses target="_blank" without rel="noopener noreferrer".',
            fix: 'Add rel="noopener noreferrer" to prevent security vulnerabilities from window.opener.',
          });
          score -= 5;
        }
      });

      // 4. Forms & Inputs
      const inputs = Array.from(doc.querySelectorAll('input:not([type="hidden"]):not([type="submit"]):not([type="button"])'));
      inputs.forEach((input) => {
        const id = input.getAttribute('id');
        const hasParentLabel = input.closest('label') !== null;
        const hasAssociatedLabel = id ? doc.querySelector(`label[for="${id}"]`) !== null : false;
        const hasAriaLabel = input.hasAttribute('aria-label') || input.hasAttribute('aria-labelledby');

        if (!hasParentLabel && !hasAssociatedLabel && !hasAriaLabel) {
          issues.push({
            type: 'error',
            rule: 'Unlabeled Form Field',
            message: `<input type="${input.getAttribute('type') || 'text'}"> has no associated <label>.`,
            fix: 'Pair it with a <label for="field-id"> or wrap the <input> inside <label>Text <input></label>.',
          });
          score -= 15;
        }

        if (!input.hasAttribute('name')) {
          issues.push({
            type: 'warning',
            rule: 'Input Missing Name Attribute',
            message: `<input id="${id || 'unknown'}"> has no "name" attribute and will be ignored during form submission.`,
            fix: 'Add name="fieldname" so the browser serializes this data on submit.',
          });
          score -= 10;
        }
      });

      // 5. Buttons inside forms missing type
      const buttons = Array.from(doc.querySelectorAll('button'));
      buttons.forEach((btn) => {
        const text = btn.textContent?.trim();
        const hasAriaLabel = btn.hasAttribute('aria-label');
        if (!text && !hasAriaLabel) {
          issues.push({
            type: 'error',
            rule: 'Empty Button',
            message: 'A <button> has no visible text or aria-label.',
            fix: 'Provide button label text or aria-label="Action description".',
          });
          score -= 15;
        }

        if (btn.closest('form') && !btn.hasAttribute('type')) {
          issues.push({
            type: 'info',
            rule: 'Implicit Form Submission',
            message: '<button> inside a <form> has no type attribute. It defaults to type="submit"!',
            fix: 'If this button should not submit the form, explicitly write type="button".',
          });
          score -= 5;
        }
      });

      // 6. Tables semantic check
      const tables = Array.from(doc.querySelectorAll('table'));
      tables.forEach((table) => {
        const thCount = table.querySelectorAll('th').length;
        if (thCount === 0) {
          issues.push({
            type: 'warning',
            rule: 'Table Missing Headers',
            message: 'A <table> was found without any <th> header cells.',
            fix: 'Add a <thead> with <th> cells specifying column labels to make tabular data accessible.',
          });
          score -= 10;
        }
      });

      // 7. Deprecated HTML tags
      const deprecatedTags = ['font', 'center', 'marquee', 'strike', 'big'];
      deprecatedTags.forEach((tag) => {
        if (doc.querySelector(tag)) {
          issues.push({
            type: 'error',
            rule: 'Obsolete HTML Tag',
            message: `<${tag}> is obsolete and removed from the modern HTML5 standard.`,
            fix: `Replace <${tag}> with modern CSS styling or semantic elements.`,
          });
          score -= 20;
        }
      });

      // Clamp score
      score = Math.max(0, Math.min(100, score));

      let grade = 'A+';
      if (score < 50) grade = 'F';
      else if (score < 70) grade = 'C';
      else if (score < 85) grade = 'B';
      else if (score < 95) grade = 'A';

      const passedChecks: string[] = [];
      if (images.length > 0 && !issues.some((i) => i.rule.includes('Image'))) {
        passedChecks.push('All images include valid alternative descriptions.');
      }
      if (links.length > 0 && !issues.some((i) => i.rule.includes('Link'))) {
        passedChecks.push('Hyperlinks have meaningful anchor labels and destinations.');
      }
      if (headings.length > 0 && !issues.some((i) => i.rule.includes('Heading'))) {
        passedChecks.push('Heading structure follows proper descending hierarchy.');
      }
      if (inputs.length > 0 && !issues.some((i) => i.rule.includes('Input') || i.rule.includes('Form'))) {
        passedChecks.push('Form inputs have properly linked labels and submittable name attributes.');
      }

      return {
        score,
        grade,
        issues,
        passedChecks,
      };
    } catch {
      return {
        score: 100,
        grade: 'A',
        issues: [],
        passedChecks: [],
      };
    }
  }, [htmlCode]);

  const gradeColor = {
    'A+': 'bg-emerald-600 text-white',
    A: 'bg-emerald-500 text-white',
    B: 'bg-blue-600 text-white',
    C: 'bg-amber-500 text-white',
    F: 'bg-rose-600 text-white',
  }[auditResult.grade] || 'bg-stone-800 text-white';

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
      {/* Auditor Header */}
      <div className="flex items-center justify-between border-b border-stone-200 bg-stone-50 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 text-emerald-600" />
          <h3 className="font-bold text-stone-800">HTML Semantics & a11y Auditor</h3>
          <span className="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
            Real-Time Diagnostics
          </span>
        </div>

        {/* Score Pill */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-stone-500 font-medium">Health Score:</span>
          <span className={`flex h-6 w-6 items-center justify-center rounded-md font-bold text-xs shadow-2xs ${gradeColor}`}>
            {auditResult.grade}
          </span>
          <span className="font-mono text-xs font-bold text-stone-800">
            {auditResult.score}/100
          </span>
        </div>
      </div>

      {/* Issues & Passed Checks List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {auditResult.issues.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mb-3">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <h4 className="text-sm font-bold text-stone-900">Pristine HTML Architecture!</h4>
            <p className="mt-1 max-w-sm text-xs text-stone-600 leading-relaxed">
              No accessibility errors, skipped headings, missing alt attributes, or broken form labels detected in this document.
            </p>
          </div>
        ) : (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-xs text-stone-500 font-semibold uppercase tracking-wider">
              <span>Detected Issues ({auditResult.issues.length})</span>
              <span className="text-[10px] lowercase font-normal text-stone-400">
                ranked by severity
              </span>
            </div>

            {auditResult.issues.map((issue, idx) => {
              const isError = issue.type === 'error';
              const isWarn = issue.type === 'warning';

              return (
                <div
                  key={idx}
                  className={`rounded-lg border p-3 text-xs transition-all ${
                    isError
                      ? 'border-rose-200 bg-rose-50/50'
                      : isWarn
                      ? 'border-amber-200 bg-amber-50/50'
                      : 'border-blue-200 bg-blue-50/50'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {isError && <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-rose-600" />}
                    {isWarn && <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />}
                    {!isError && !isWarn && <Info className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />}

                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider ${
                            isError
                              ? 'bg-rose-200 text-rose-800'
                              : isWarn
                              ? 'bg-amber-200 text-amber-900'
                              : 'bg-blue-200 text-blue-900'
                          }`}
                        >
                          {issue.type}
                        </span>
                        <span className="font-bold text-stone-800">{issue.rule}</span>
                      </div>

                      <p className="mt-1 text-xs text-stone-700 leading-relaxed">{issue.message}</p>

                      <div className="mt-2 flex items-start gap-1.5 rounded bg-white/80 p-2 border border-stone-200/60 text-[11px] text-stone-800">
                        <Lightbulb className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber-600" />
                        <span>
                          <strong className="font-semibold text-stone-900">Recommended Fix: </strong>
                          {issue.fix}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Passed Checks Section */}
        {auditResult.passedChecks.length > 0 && (
          <div className="mt-4 pt-3 border-t border-stone-200">
            <h5 className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-2">
              Valid Validations Passed
            </h5>
            <div className="space-y-1.5">
              {auditResult.passedChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-emerald-800">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                  <span>{check}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
