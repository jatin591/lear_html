import React, { useMemo, useState } from 'react';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Sparkles,
  Info,
  Tag,
  FileCode2,
  CheckCircle2,
  AlertCircle,
  Search,
} from 'lucide-react';

interface DomTreeNode {
  id: string;
  tagName: string;
  nodeType: number; // 1 = Element, 3 = Text, 8 = Comment
  text?: string;
  attributes: Record<string, string>;
  children: DomTreeNode[];
  displayRole?: string;
  ariaRole?: string;
  isVoid?: boolean;
  rawHtml?: string;
}

const VOID_TAGS = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const BLOCK_ELEMENTS = new Set([
  'address', 'article', 'aside', 'blockquote', 'details', 'dialog',
  'dd', 'div', 'dl', 'dt', 'fieldset', 'figcaption', 'figure', 'footer',
  'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hgroup', 'hr',
  'li', 'main', 'nav', 'ol', 'p', 'pre', 'section', 'table', 'ul',
]);

const INLINE_ELEMENTS = new Set([
  'a', 'abbr', 'b', 'bdo', 'br', 'cite', 'code', 'dfn', 'em', 'i',
  'kbd', 'mark', 'q', 's', 'samp', 'small', 'span', 'strong', 'sub',
  'sup', 'time', 'u', 'var',
]);

function getAriaRole(tagName: string, attributes: Record<string, string>): string {
  if (attributes.role) return attributes.role;
  const tag = tagName.toLowerCase();
  switch (tag) {
    case 'a':
      return attributes.href ? 'link' : 'generic';
    case 'button':
      return 'button';
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      return 'heading';
    case 'nav':
      return 'navigation';
    case 'main':
      return 'main';
    case 'header':
      return 'banner';
    case 'footer':
      return 'contentinfo';
    case 'article':
      return 'article';
    case 'section':
      return 'region';
    case 'aside':
      return 'complementary';
    case 'form':
      return 'form';
    case 'table':
      return 'table';
    case 'ul':
    case 'ol':
      return 'list';
    case 'li':
      return 'listitem';
    case 'img':
      return attributes.alt === '' ? 'presentation / none' : 'img';
    default:
      return 'generic';
  }
}

function parseDomTree(element: Element | Node, path = '0'): DomTreeNode | null {
  if (element.nodeType === Node.TEXT_NODE) {
    const text = element.textContent?.trim();
    if (!text) return null; // Ignore pure whitespace text nodes for cleaner hierarchy
    return {
      id: path,
      tagName: '#text',
      nodeType: 3,
      text: text.length > 50 ? text.slice(0, 50) + '…' : text,
      attributes: {},
      children: [],
      displayRole: 'inline text node',
      ariaRole: 'text',
      isVoid: false,
      rawHtml: text,
    };
  }

  if (element.nodeType === Node.ELEMENT_NODE) {
    const el = element as Element;
    const tagName = el.tagName.toLowerCase();
    const isVoid = VOID_TAGS.has(tagName);

    const attributes: Record<string, string> = {};
    for (let i = 0; i < el.attributes.length; i++) {
      const attr = el.attributes[i];
      attributes[attr.name] = attr.value;
    }

    let displayRole = 'other';
    if (BLOCK_ELEMENTS.has(tagName)) displayRole = 'block';
    else if (INLINE_ELEMENTS.has(tagName)) displayRole = 'inline';
    else if (tagName === 'img' || tagName === 'input' || tagName === 'button') displayRole = 'inline-block (replaced element)';

    const children: DomTreeNode[] = [];
    let childIndex = 0;
    el.childNodes.forEach((childNode) => {
      const parsedChild = parseDomTree(childNode, `${path}-${childIndex}`);
      if (parsedChild) {
        children.push(parsedChild);
        childIndex++;
      }
    });

    return {
      id: path,
      tagName: el.tagName,
      nodeType: 1,
      attributes,
      children,
      displayRole,
      ariaRole: getAriaRole(tagName, attributes),
      isVoid,
      rawHtml: el.outerHTML,
    };
  }

  return null;
}

interface DomVisualizerProps {
  htmlCode: string;
}

export function DomVisualizer({ htmlCode }: DomVisualizerProps) {
  const [selectedNode, setSelectedNode] = useState<DomTreeNode | null>(null);
  const [collapsedNodes, setCollapsedNodes] = useState<Record<string, boolean>>({});
  const [searchFilter, setSearchFilter] = useState<string>('');

  const domTree = useMemo(() => {
    try {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlCode, 'text/html');
      const body = doc.body;
      const rootChildren: DomTreeNode[] = [];
      let index = 0;
      body.childNodes.forEach((child) => {
        const parsed = parseDomTree(child, `root-${index}`);
        if (parsed) {
          rootChildren.push(parsed);
          index++;
        }
      });

      return {
        id: 'root-body',
        tagName: 'BODY',
        nodeType: 1,
        attributes: {},
        children: rootChildren,
        displayRole: 'block (document body)',
        ariaRole: 'document',
        isVoid: false,
        rawHtml: body.outerHTML,
      };
    } catch {
      return null;
    }
  }, [htmlCode]);

  // If currently selected node is null and tree exists, auto-select first child or body
  React.useEffect(() => {
    if (!selectedNode && domTree) {
      setSelectedNode(domTree.children[0] || domTree);
    }
  }, [domTree, selectedNode]);

  const toggleCollapse = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setCollapsedNodes((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const renderTreeNode = (node: DomTreeNode, depth = 0) => {
    const isCollapsed = collapsedNodes[node.id];
    const isSelected = selectedNode?.id === node.id;
    const hasChildren = node.children.length > 0;
    const isTextNode = node.nodeType === 3;

    // Filter match
    const matchesSearch =
      !searchFilter ||
      node.tagName.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (node.text && node.text.toLowerCase().includes(searchFilter.toLowerCase()));

    return (
      <div key={node.id} className="flex flex-col">
        <div
          onClick={() => setSelectedNode(node)}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          className={`group flex cursor-pointer items-center justify-between gap-2 py-1 pr-3 text-xs transition-colors rounded-md ${
            isSelected
              ? 'bg-blue-600 text-white font-medium shadow-2xs'
              : matchesSearch
              ? 'hover:bg-stone-100 text-stone-800'
              : 'opacity-40 hover:opacity-100 hover:bg-stone-100 text-stone-600'
          }`}
        >
          <div className="flex items-center gap-1.5 overflow-hidden">
            {hasChildren ? (
              <button
                type="button"
                onClick={(e) => toggleCollapse(node.id, e)}
                className={`p-0.5 rounded transition-transform ${
                  isSelected ? 'text-white hover:bg-blue-700' : 'text-stone-400 hover:text-stone-700'
                }`}
              >
                {isCollapsed ? (
                  <ChevronRight className="h-3 w-3" />
                ) : (
                  <ChevronDown className="h-3 w-3" />
                )}
              </button>
            ) : (
              <span className="w-3.5 inline-block" />
            )}

            {isTextNode ? (
              <span
                className={`font-mono text-[11px] italic truncate max-w-[200px] ${
                  isSelected ? 'text-blue-100' : 'text-stone-500'
                }`}
              >
                &quot;{node.text}&quot;
              </span>
            ) : (
              <div className="flex items-center gap-1 font-mono">
                <span
                  className={`font-bold ${
                    isSelected
                      ? 'text-white'
                      : node.tagName === 'BODY'
                      ? 'text-purple-600'
                      : 'text-blue-600'
                  }`}
                >
                  &lt;{node.tagName.toLowerCase()}&gt;
                </span>

                {/* Attributes pill previews */}
                {Object.entries(node.attributes).slice(0, 2).map(([key, val]) => (
                  <span
                    key={key}
                    className={`rounded px-1 text-[10px] truncate max-w-[100px] ${
                      isSelected ? 'bg-blue-700/80 text-blue-100' : 'bg-stone-100 text-amber-700'
                    }`}
                  >
                    {key}=&quot;{val}&quot;
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {node.isVoid && (
              <span
                className={`rounded px-1 py-0.2 text-[9px] font-semibold uppercase ${
                  isSelected ? 'bg-blue-700 text-blue-200' : 'bg-stone-200 text-stone-600'
                }`}
              >
                Void
              </span>
            )}
            <span
              className={`rounded-full px-1.5 py-0.2 text-[9px] font-mono ${
                isSelected
                  ? 'bg-blue-700 text-blue-100'
                  : node.nodeType === 1
                  ? 'bg-stone-100 text-stone-500'
                  : 'bg-emerald-50 text-emerald-700'
              }`}
            >
              {node.nodeType === 1 ? 'Element' : 'Text'}
            </span>
          </div>
        </div>

        {hasChildren && !isCollapsed && (
          <div className="flex flex-col border-l border-stone-200 ml-3">
            {node.children.map((child) => renderTreeNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-xs">
      {/* Visualizer Header */}
      <div className="flex flex-wrap items-center justify-between border-b border-stone-200 bg-stone-50 px-4 py-2.5 text-xs">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-purple-600" />
          <h3 className="font-bold text-stone-800">Interactive DOM Tree Visualizer</h3>
          <span className="rounded bg-purple-100 px-2 py-0.5 text-[10px] font-semibold text-purple-800">
            Live Browser Tree
          </span>
        </div>

        {/* Filter input */}
        <div className="relative">
          <Search className="absolute left-2 top-2 h-3 w-3 text-stone-400" />
          <input
            type="text"
            placeholder="Search tags or text..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="rounded-lg border border-stone-200 bg-white py-1 pl-7 pr-2.5 text-xs text-stone-700 placeholder-stone-400 outline-hidden focus:border-blue-400"
          />
        </div>
      </div>

      {/* Main Split: Tree Hierarchy on left, Node Inspector on right */}
      <div className="grid flex-1 grid-cols-1 divide-y lg:grid-cols-12 lg:divide-y-0 lg:divide-x divide-stone-200 overflow-hidden">
        {/* Left: Tree Viewer */}
        <div className="flex flex-col p-3 overflow-y-auto lg:col-span-7 max-h-[400px] lg:max-h-none">
          <div className="mb-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-stone-400">
            <span>DOM Hierarchy (Parent → Children)</span>
            <span className="text-[10px] font-normal lowercase text-stone-500">
              click any node to inspect properties
            </span>
          </div>

          <div className="flex flex-col gap-0.5 font-sans">
            {domTree && domTree.children.length > 0 ? (
              domTree.children.map((child) => renderTreeNode(child, 0))
            ) : (
              <div className="py-8 text-center text-xs text-stone-400 italic">
                No DOM elements detected in HTML code. Type some tags in the editor to see the DOM tree!
              </div>
            )}
          </div>
        </div>

        {/* Right: Detailed Node Inspector */}
        <div className="flex flex-col p-4 overflow-y-auto lg:col-span-5 bg-stone-50/50">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-stone-500 mb-3">
            <Info className="h-3.5 w-3.5 text-blue-600" />
            <span>Selected Node Details</span>
          </div>

          {selectedNode ? (
            <div className="flex flex-col gap-3">
              {/* Tag Banner */}
              <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4 text-blue-600" />
                    <span className="font-mono text-base font-bold text-stone-900">
                      {selectedNode.nodeType === 3
                        ? '#text node'
                        : `<${selectedNode.tagName.toLowerCase()}>`}
                    </span>
                  </div>
                  <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                    NodeType {selectedNode.nodeType}
                  </span>
                </div>

                <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] pt-2 border-t border-stone-100">
                  <div>
                    <span className="text-stone-500">Display Category:</span>
                    <p className="font-semibold text-stone-800 capitalize">
                      {selectedNode.displayRole || 'Unknown'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500">Implicit ARIA Role:</span>
                    <p className="font-semibold text-stone-800">
                      {selectedNode.ariaRole || 'None'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500">Void / Self-Closing:</span>
                    <p className="font-semibold text-stone-800">
                      {selectedNode.isVoid ? 'Yes (No closing tag permitted)' : 'No (Requires </tag>)'}
                    </p>
                  </div>
                  <div>
                    <span className="text-stone-500">Child Elements:</span>
                    <p className="font-semibold text-stone-800">
                      {selectedNode.children.length}
                    </p>
                  </div>
                </div>
              </div>

              {/* Attributes Card */}
              {selectedNode.nodeType === 1 && (
                <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-2xs">
                  <h4 className="text-xs font-semibold text-stone-700 mb-2">
                    Attributes Map ({Object.keys(selectedNode.attributes).length})
                  </h4>
                  {Object.keys(selectedNode.attributes).length === 0 ? (
                    <p className="text-xs text-stone-400 italic">No attributes configured on this tag.</p>
                  ) : (
                    <div className="flex flex-col gap-1.5">
                      {Object.entries(selectedNode.attributes).map(([attr, val]) => (
                        <div
                          key={attr}
                          className="flex items-center justify-between rounded bg-stone-50 p-1.5 font-mono text-xs border border-stone-100"
                        >
                          <span className="font-semibold text-amber-700">{attr}</span>
                          <span className="text-stone-600 truncate max-w-[180px]">&quot;{val}&quot;</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Text node contents if text */}
              {selectedNode.nodeType === 3 && (
                <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-2xs">
                  <h4 className="text-xs font-semibold text-stone-700 mb-1">Text Content:</h4>
                  <p className="rounded bg-stone-50 p-2 text-xs text-stone-800 font-mono italic">
                    &quot;{selectedNode.text}&quot;
                  </p>
                </div>
              )}

              {/* Outer HTML Snippet */}
              {selectedNode.rawHtml && (
                <div className="rounded-lg border border-stone-200 bg-white p-3 shadow-2xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-stone-700">Raw Serialized HTML:</span>
                    <FileCode2 className="h-3 w-3 text-stone-400" />
                  </div>
                  <pre className="max-h-28 overflow-x-auto rounded bg-stone-900 p-2 font-mono text-[11px] text-stone-200">
                    {selectedNode.rawHtml}
                  </pre>
                </div>
              )}

              {/* Deep HTML Logic Callout */}
              <div className="rounded-lg bg-blue-50/70 p-3 border border-blue-100 text-xs text-blue-900">
                <div className="flex items-center gap-1.5 font-semibold text-blue-950 mb-1">
                  <Sparkles className="h-3.5 w-3.5 text-blue-600" />
                  <span>How the Browser Handles This Node</span>
                </div>
                <p className="text-[11px] leading-relaxed text-blue-900">
                  {selectedNode.nodeType === 1 && selectedNode.isVoid &&
                    'This element is void. Browsers refuse to create child nodes inside it. Any closing tag like </img> or </input> is invalid in HTML5.'}
                  {selectedNode.nodeType === 1 && !selectedNode.isVoid && selectedNode.displayRole === 'block' &&
                    'This element is block-level. By default, it spans 100% width of its parent container and forces subsequent content onto a new line.'}
                  {selectedNode.nodeType === 1 && !selectedNode.isVoid && selectedNode.displayRole === 'inline' &&
                    'This element is inline. It only occupies the width of its content. Browsers ignore width, height, and vertical margins on inline tags.'}
                  {selectedNode.nodeType === 3 &&
                    'Text nodes represent the raw character content between element tags. Adjacent text nodes are automatically normalized into one by the browser.'}
                </p>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-stone-400">
              Select any node in the tree to examine its attributes and layout rules.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
