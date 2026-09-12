import { useState, useMemo } from 'react';
import { Search, Copy, Check, Terminal, ExternalLink } from 'lucide-react';
import { TagReference } from '../types';

interface CheatSheetViewProps {
  tags: TagReference[];
  onOpenInPlayground: (snippet: string) => void;
}

export function CheatSheetView({ tags, onOpenInPlayground }: CheatSheetViewProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [copiedTag, setCopiedTag] = useState<string | null>(null);

  const categories = ['All', 'Structure', 'Text', 'Links & Media', 'Forms', 'Tables', 'Metadata'];

  const filteredTags = useMemo(() => {
    return tags.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.tag.toLowerCase().includes(q) ||
        item.name.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.attributes.some((attr) => attr.name.toLowerCase().includes(q));
      return matchesCategory && matchesSearch;
    });
  }, [tags, searchTerm, selectedCategory]);

  const handleCopy = async (example: string, tag: string) => {
    try {
      await navigator.clipboard.writeText(example);
      setCopiedTag(tag);
      setTimeout(() => setCopiedTag(null), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div className="mx-auto flex max-w-7xl flex-1 flex-col p-4 sm:p-6">
      {/* Search and Category Filter Banner */}
      <div className="mb-6 rounded-xl border border-stone-200 bg-white p-5 shadow-xs">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold tracking-tight text-stone-900">
              HTML Tag Dictionary & Cheat Sheet
            </h2>
            <p className="mt-1 text-xs text-stone-500">
              Quick syntax reference for all core HTML elements and their key attributes.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-stone-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search tag (e.g. img, form)..."
              className="w-full rounded-lg border border-stone-200 bg-stone-50 py-2 pl-9 pr-4 text-xs text-stone-900 placeholder-stone-400 outline-hidden focus:border-blue-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 pt-3 border-t border-stone-100">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`cursor-pointer rounded-lg px-3 py-1 text-xs font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200 hover:text-stone-900'
              }`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-xs text-stone-400">
            Showing {filteredTags.length} of {tags.length} tags
          </span>
        </div>
      </div>

      {/* Tags Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredTags.map((item) => (
          <div
            key={item.tag}
            className="flex flex-col justify-between rounded-xl border border-stone-200 bg-white p-5 shadow-xs transition-hover hover:border-stone-300"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="font-mono text-base font-bold text-blue-700">
                    {item.tag}
                  </span>
                  <h3 className="text-xs font-semibold text-stone-800">{item.name}</h3>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="rounded-md bg-stone-100 px-2 py-0.5 text-[10px] font-medium text-stone-600">
                    {item.category}
                  </span>
                  {item.selfClosing && (
                    <span className="rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700">
                      Self-closing
                    </span>
                  )}
                </div>
              </div>

              {/* Description */}
              <p className="mt-2 text-xs leading-relaxed text-stone-600">
                {item.description}
              </p>

              {/* Attributes List */}
              {item.attributes.length > 0 && (
                <div className="mt-3 rounded-lg bg-stone-50 p-2.5 text-xs border border-stone-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400">
                    Key Attributes
                  </span>
                  <ul className="mt-1 space-y-1">
                    {item.attributes.map((attr) => (
                      <li key={attr.name} className="flex items-start gap-1.5 text-[11px]">
                        <code className="font-mono font-bold text-indigo-600">{attr.name}</code>
                        <span className="text-stone-500">— {attr.description}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Code Example & Actions */}
            <div className="mt-4 pt-3 border-t border-stone-100">
              <div className="relative overflow-hidden rounded-md bg-stone-900 p-2.5 font-mono text-[11px] text-stone-200">
                <pre className="overflow-x-auto">{item.example}</pre>
              </div>

              <div className="mt-2 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(item.example, item.tag)}
                  className="flex cursor-pointer items-center gap-1 text-[11px] font-medium text-stone-500 hover:text-stone-800"
                >
                  {copiedTag === item.tag ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span className="text-emerald-600">Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy snippet</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => onOpenInPlayground(item.example)}
                  className="flex cursor-pointer items-center gap-1 rounded bg-stone-100 px-2 py-1 text-[11px] font-semibold text-stone-700 hover:bg-stone-200 hover:text-stone-900 transition-colors"
                >
                  <Terminal className="h-3 w-3 text-blue-600" />
                  <span>Try in Playground</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
