import { DebuggerPuzzle } from '../types';

export const DEBUGGER_PUZZLES: DebuggerPuzzle[] = [
  {
    id: 'ghost-input',
    title: 'The Ghost Form Input',
    difficulty: 'Beginner',
    category: 'Forms & Serialization',
    description:
      'The developer built a newsletter signup form, but the server keeps receiving an empty submission for the email field. Find out why the input is ignored during form submission and fix it.',
    brokenCode: `<form action="/subscribe" method="GET">
  <label for="user-email">Your Email Address:</label>
  <input id="user-email" type="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe</button>
</form>`,
    solutionCode: `<form action="/subscribe" method="GET">
  <label for="user-email">Your Email Address:</label>
  <input id="user-email" name="email" type="email" placeholder="you@example.com" required>
  <button type="submit">Subscribe</button>
</form>`,
    expectedFixHint: 'HTML form inputs require a "name" attribute (e.g. name="email") to be included in the form submission payload.',
    validate: (html: string) => {
      const hasNameAttr = /<input[^>]*name=["'][a-zA-Z0-9_-]+["'][^>]*>/i.test(html) ||
                          /<input[^>]*id=["'][^"']+["'][^>]*name=["'][^"']+["']/i.test(html);
      if (!hasNameAttr) {
        return {
          passed: false,
          message: 'The <input> element is still missing a "name" attribute. Browsers completely ignore inputs without "name" when serializing form data!',
        };
      }
      return { passed: true, message: 'Excellent! With the "name" attribute added, form data will serialize properly as key=value.' };
    },
    deepConcept:
      'HTML Deep Logic: An <input> without a `name` attribute is considered non-submittable by the HTML specification. When a form is submitted, the browser collects only submittable elements with a non-empty name attribute. An `id` is only for CSS styling and DOM `<label for>` linking; it is never sent across the network.',
  },
  {
    id: 'swallowed-text',
    title: 'The Swallowed Text Mystery',
    difficulty: 'Beginner',
    category: 'Parser & Entities',
    description:
      'A pricing tier explains that shipping is free when items cost less than $50. However, in the browser, everything after "cost" vanishes! Diagnose why the browser parser cut off the text and fix it using the proper HTML entity.',
    brokenCode: `<div class="promo">
  <h3>Shipping Policy</h3>
  <p>Free express delivery if your order cost < 50 dollars!</p>
  <p>Standard delivery is 5 dollars.</p>
</div>`,
    solutionCode: `<div class="promo">
  <h3>Shipping Policy</h3>
  <p>Free express delivery if your order cost &lt; 50 dollars!</p>
  <p>Standard delivery is 5 dollars.</p>
</div>`,
    expectedFixHint: 'In HTML, the less-than symbol "<" signals the start of a tag. Replace "<" with the character entity "&lt;".',
    validate: (html: string) => {
      if (html.includes('&lt;')) {
        return { passed: true, message: 'Spot on! &lt; safely displays the less-than character without confusing the HTML parser.' };
      }
      return {
        passed: false,
        message: 'The raw "<" character is still causing the parser to treat the following text as a malformed HTML tag. Replace "<" with "&lt;".',
      };
    },
    deepConcept:
      'HTML Deep Logic: In standard HTML text nodes, characters like `<`, `>`, and `&` have syntactic meaning in the HTML tokenizer. When the tokenizer encounters `<`, it transitions from data state into tag-open state. If followed by characters, it expects a tag name. Always use `&lt;` for "<", `&gt;` for ">", and `&amp;` for "&".',
  },
  {
    id: 'accidental-submit',
    title: 'The Accidental Form Submission',
    difficulty: 'Intermediate',
    category: 'Button Defaults & Behavior',
    description:
      'This user profile form has a "Save Changes" button and a secondary "Cancel" button. But when users click "Cancel", it unexpectedly submits the form and reloads the page! Fix the cancel button so it behaves as a normal non-submitting button.',
    brokenCode: `<form action="/profile" method="POST">
  <label for="username">Display Name:</label>
  <input id="username" name="username" type="text" value="JaneDoe">

  <div class="actions">
    <button>Cancel</button>
    <button type="submit">Save Changes</button>
  </div>
</form>`,
    solutionCode: `<form action="/profile" method="POST">
  <label for="username">Display Name:</label>
  <input id="username" name="username" type="text" value="JaneDoe">

  <div class="actions">
    <button type="button">Cancel</button>
    <button type="submit">Save Changes</button>
  </div>
</form>`,
    expectedFixHint: 'By default, any <button> inside a <form> has type="submit". Add type="button" to the Cancel button.',
    validate: (html: string) => {
      const hasTypeButton = /<button[^>]*type=["']button["'][^>]*>\s*Cancel\s*<\/button>/i.test(html) ||
                            /<button[^>]*type=["']button["'][^>]*>[\s\S]*?Cancel[\s\S]*?<\/button>/i.test(html);
      if (!hasTypeButton) {
        return {
          passed: false,
          message: 'The Cancel button still defaults to type="submit". Add type="button" so clicking it does not submit the form.',
        };
      }
      return { passed: true, message: 'Perfect! type="button" prevents accidental form submission.' };
    },
    deepConcept:
      'HTML Deep Logic: In the HTML standard, the default value for the `type` attribute on a `<button>` is "submit" (not "button"). If a `<button>` without an explicit `type` attribute is placed inside a `<form>`, clicking it triggers the form submission algorithm. Non-submitting buttons MUST explicitly declare `type="button"`.',
  },
  {
    id: 'invalid-nesting',
    title: 'The Implicitly Broken Paragraph',
    difficulty: 'Advanced',
    category: 'DOM Construction & Flow',
    description:
      'A developer nested a `<div>` inside a `<p>` tag thinking it creates a styled sub-box inside the paragraph. But in DevTools, the browser creates two separate paragraphs and places the div outside! Fix the markup by using semantic phrasing elements (or change the container).',
    brokenCode: `<article>
  <h2>Product Feature</h2>
  <p>
    This cutting-edge gadget includes:
    <div class="badge">Exclusive 2026 Edition</div>
    Get yours while supplies last!
  </p>
</article>`,
    solutionCode: `<article>
  <h2>Product Feature</h2>
  <p>
    This cutting-edge gadget includes:
    <span class="badge">Exclusive 2026 Edition</span>
    Get yours while supplies last!
  </p>
</article>`,
    expectedFixHint: 'A <p> element only permits phrasing content (inline elements). Replace the <div> inside the <p> with a <span>.',
    validate: (html: string) => {
      const pWithDiv = /<p[\s\S]*?<div[\s\S]*?<\/p>/i.test(html);
      const hasSpanBadge = /<span[^>]*class=["']badge["'][^>]*>[\s\S]*?<\/span>/i.test(html) ||
                           /<span[^>]*>[\s\S]*?Exclusive 2026 Edition[\s\S]*?<\/span>/i.test(html);
      if (pWithDiv) {
        return {
          passed: false,
          message: 'A <div> cannot be placed inside a <p>. Replace <div> with an inline element like <span>.',
        };
      }
      if (!hasSpanBadge && !html.includes('<span')) {
        return {
          passed: false,
          message: 'Use a <span> instead of <div> so the inline phrasing flow of the paragraph is preserved.',
        };
      }
      return { passed: true, message: 'Fantastic! <span> is an inline phrasing element that validly lives inside <p> without splitting the DOM.' };
    },
    deepConcept:
      'HTML Deep Logic: The HTML parsing specification states that the start tag of any block-level element (like `<div>`, `<ul>`, `<h1>`, or `<p>`) implicitly closes an open `<p>` element! If you write `<p>Hello <div>World</div></p>`, the browser parses it into `<p>Hello</p><div>World</div><p></p>`. Knowing phrasing vs flow content prevents broken layouts.',
  },
  {
    id: 'accessibility-a11y',
    title: 'The Inaccessible Link & Image',
    difficulty: 'Intermediate',
    category: 'Accessibility (a11y) & SEO',
    description:
      'An audit detected two critical accessibility failures: an <img> tag is missing an alternative description for screen reader users, and a hyperlink uses uninformative text "click here". Update the markup with an informative `alt` attribute and meaningful link text.',
    brokenCode: `<section class="hero">
  <h2>Discover Our Coffee</h2>
  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80">
  <p>
    To view our full seasonal roast catalog,
    <a href="/roasts">click here</a>.
  </p>
</section>`,
    solutionCode: `<section class="hero">
  <h2>Discover Our Coffee</h2>
  <img src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=300&q=80" alt="Freshly poured cup of hot coffee with latte art">
  <p>
    Explore our
    <a href="/roasts">seasonal roast catalog</a>.
  </p>
</section>`,
    expectedFixHint: 'Add an alt attribute describing the image (e.g. alt="Cup of coffee"), and rewrite the link text so it describes the destination instead of just "click here".',
    validate: (html: string) => {
      const hasAlt = /<img[^>]+alt=["'][^"']+["'][^>]*>/i.test(html);
      const hasGenericClickHere = />\s*click here\s*<\/a>/i.test(html);
      if (!hasAlt) {
        return {
          passed: false,
          message: 'The <img> tag is still missing a descriptive alt attribute.',
        };
      }
      if (hasGenericClickHere) {
        return {
          passed: false,
          message: 'The link still uses "click here" as its text. Screen reader users navigating by link lists cannot tell where "click here" goes! Replace it with descriptive text like "seasonal roast catalog".',
        };
      }
      return { passed: true, message: 'Brilliant! Now both screen reader users and search engine crawlers can comprehend the content.' };
    },
    deepConcept:
      'HTML Deep Logic: Accessibility is not an afterthought in HTML—it is baked into the browser accessibility tree (AOM). Screen readers read `alt` text when graphics cannot be displayed, and extract a list of all hyperlinks on the page. Links saying "click here" provide zero context in link navigation menus.',
  },
  {
    id: 'table-colspan',
    title: 'The Misaligned Financial Table',
    difficulty: 'Advanced',
    category: 'Tables & Grid Alignment',
    description:
      'This pricing breakdown table has 3 column headers: Item, Quantity, and Price. The summary footer row says "Total: $140", but it is stuck under the first column because it is missing the `colspan` attribute, throwing off the entire grid alignment. Fix the footer row so the "Total" spans 2 columns.',
    brokenCode: `<table border="1">
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Espresso Roast</td>
      <td>2</td>
      <td>$40</td>
    </tr>
    <tr>
      <td>Pour-over Dripper</td>
      <td>1</td>
      <td>$100</td>
    </tr>
    <tr>
      <td>Total</td>
      <td>$140</td>
    </tr>
  </tbody>
</table>`,
    solutionCode: `<table border="1">
  <thead>
    <tr>
      <th>Item</th>
      <th>Quantity</th>
      <th>Price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Espresso Roast</td>
      <td>2</td>
      <td>$40</td>
    </tr>
    <tr>
      <td>Pour-over Dripper</td>
      <td>1</td>
      <td>$100</td>
    </tr>
    <tr>
      <td colspan="2">Total</td>
      <td>$140</td>
    </tr>
  </tbody>
</table>`,
    expectedFixHint: 'Add colspan="2" to the <td>Total</td> cell so it spans across both the Item and Quantity columns.',
    validate: (html: string) => {
      const hasColspan = /<td[^>]+colspan=["']2["'][^>]*>\s*Total/i.test(html) ||
                         /colspan=["']2["'][^>]*>[\s\S]*?Total/i.test(html);
      if (!hasColspan) {
        return {
          passed: false,
          message: 'The "Total" cell needs colspan="2" so it correctly spans across 2 columns to align with the 3-column table.',
        };
      }
      return { passed: true, message: 'Well done! colspan="2" perfectly aligns the table columns.' };
    },
    deepConcept:
      'HTML Deep Logic: HTML tables calculate grid coordinates (x, y) dynamically. If a `<tr>` has fewer cells than the max column count established by preceding rows, the browser does not stretch remaining cells automatically; it leaves trailing columns empty. `colspan` and `rowspan` allow cells to bridge multiple coordinates in the tabular grid.',
  },
];
