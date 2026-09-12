import { Lesson } from '../types';

const parseHtml = (html: string): Document => {
  const parser = new DOMParser();
  return parser.parseFromString(html, 'text/html');
};

export const LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'What is HTML & Tag Anatomy',
    subtitle: 'The foundation of the World Wide Web',
    category: 'Basics',
    duration: '5 min',
    tagsIntroduced: ['<p>', '</p>'],
    explanation: `HTML stands for **HyperText Markup Language**. It is the skeleton of every website on earth!

Think of a web page like a house:
- **HTML** is the wooden framing, walls, and brickwork (the structure).
- **CSS** is the paint, wallpaper, and lighting (the styling).
- **JavaScript** is the electricity, plumbing, and automatic doors (the interactivity).

HTML uses **tags** to tell the web browser how to display content. Most tags come in pairs:
1. **Opening tag:** \`<p>\` (starts a paragraph)
2. **Content:** Text or other elements inside
3. **Closing tag:** \`</p>\` (note the forward slash \`/\`)

Together, the opening tag, content, and closing tag make up an **HTML Element**.`,
    keyPoints: [
      'Tags are enclosed in angle brackets: <tagname>',
      'Closing tags always have a forward slash: </tagname>',
      'The text between the opening and closing tag is the content',
      'HTML is not case-sensitive, but lowercase is standard best practice',
    ],
    commonMistakes: [
      'Forgetting the closing tag (e.g. writing <p>Hello without </p>)',
      'Using a backslash \\ instead of a forward slash / in the closing tag',
      'Misspelling tag names like <paragragh> instead of <p>',
    ],
    syntaxExample: `<p>This is a paragraph of text.</p>`,
    challengePrompt: `Write your very first HTML element! Create a paragraph \`<p>\` that introduces yourself (e.g., "Hello, my name is Alex and I am learning HTML!").`,
    starterCode: `<!-- Type your paragraph tag below! -->
`,
    solutionCode: `<p>Hello, my name is Alex and I am learning HTML!</p>`,
    testRules: [
      {
        id: 'has-p-tag',
        description: 'Contains at least one paragraph <p> element',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('p').length >= 1;
        },
        hint: 'Use an opening <p> tag and a closing </p> tag.',
      },
      {
        id: 'p-has-content',
        description: 'The paragraph contains text (at least 10 characters)',
        validate: (code) => {
          const doc = parseHtml(code);
          const p = doc.querySelector('p');
          return !!p && (p.textContent || '').trim().length >= 10;
        },
        hint: 'Write a sentence inside the <p> tags, like "Hello! I am learning to code HTML."',
      },
    ],
  },
  {
    id: 2,
    title: 'Headings & Paragraphs',
    subtitle: 'Structuring titles and written text',
    category: 'Text & Links',
    duration: '5 min',
    tagsIntroduced: ['<h1>', '<h2>', '<h3>', '<h4>', '<h5>', '<h6>', '<p>', '<br>', '<hr>'],
    explanation: `Headings give your webpage a clear visual and semantic hierarchy:
- \`<h1>\` is the **main title** of your page (you should typically have only one \`<h1>\` per page for SEO and accessibility).
- \`<h2>\` is a **major section subtitle**.
- \`<h3>\` to \`<h6>\` are smaller subheadings for nested topics.

To break lines within a paragraph without starting a new one, use \`<br>\` (line break).
To draw a horizontal dividing line between sections, use \`<hr>\` (horizontal rule).
Notice that \`<br>\` and \`<hr>\` are **self-closing** (they do not wrap around any text and don't need a closing tag).`,
    keyPoints: [
      '<h1> is the most important heading; <h6> is the least important',
      'Headings automatically appear bold and sized proportionally by browsers',
      '<br> creates an intentional line break inside text',
      '<hr> renders a thematic break line between topics',
    ],
    commonMistakes: [
      'Using headings just to make text bigger instead of indicating hierarchy',
      'Skipping heading levels (e.g. jumping from <h1> directly to <h4>)',
      'Putting closing tags on self-closing tags like </br> or </hr>',
    ],
    syntaxExample: `<h1>My Favorite City</h1>
<h2>Tokyo, Japan</h2>
<p>Tokyo is the capital of Japan.<br>It blends ultramodern and traditional culture.</p>
<hr>
<h3>Top Attractions</h3>
<p>Shibuya Crossing is the busiest intersection in the world.</p>`,
    challengePrompt: `Create an article structure with:
1. An \`<h1>\` heading for your topic title (e.g. "Space Exploration")
2. An \`<h2>\` subheading for a subtopic (e.g. "The Moon Landing")
3. A \`<p>\` paragraph with some text explaining it
4. A horizontal line divider \`<hr>\` underneath`,
    starterCode: `<!-- Build your page heading hierarchy below -->
`,
    solutionCode: `<h1>Space Exploration</h1>
<h2>The Moon Landing</h2>
<p>In July 1969, Apollo 11 astronauts landed on the moon for the first time in human history.</p>
<hr>`,
    testRules: [
      {
        id: 'has-h1',
        description: 'Includes a primary heading <h1> with text',
        validate: (code) => {
          const doc = parseHtml(code);
          const h1 = doc.querySelector('h1');
          return !!h1 && (h1.textContent || '').trim().length > 0;
        },
        hint: 'Add an <h1>Title Here</h1> element.',
      },
      {
        id: 'has-h2',
        description: 'Includes a secondary subheading <h2> with text',
        validate: (code) => {
          const doc = parseHtml(code);
          const h2 = doc.querySelector('h2');
          return !!h2 && (h2.textContent || '').trim().length > 0;
        },
        hint: 'Add an <h2>Subheading</h2> beneath your main title.',
      },
      {
        id: 'has-p',
        description: 'Includes a paragraph <p> with descriptive text',
        validate: (code) => {
          const doc = parseHtml(code);
          const p = doc.querySelector('p');
          return !!p && (p.textContent || '').trim().length > 10;
        },
        hint: 'Add a <p> element with at least a sentence of information.',
      },
      {
        id: 'has-hr',
        description: 'Includes a horizontal divider line <hr>',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('hr').length >= 1;
        },
        hint: 'Place an <hr> tag on its own line.',
      },
    ],
  },
  {
    id: 3,
    title: 'Text Formatting & Emphasis',
    subtitle: 'Making words bold, italic, highlighted, and code-styled',
    category: 'Text & Links',
    duration: '6 min',
    tagsIntroduced: ['<strong>', '<em>', '<mark>', '<del>', '<code>', '<blockquote>'],
    explanation: `HTML gives text rich semantic meaning, which both human readers and screen readers rely on:
- \`<strong>\`: Indicates strong importance, seriousness, or urgency (rendered **bold**).
- \`<em>\`: Indicates emphasized stress (rendered *italic*).
- \`<mark>\`: Highlights text as if marked with a yellow highlighter pen.
- \`<del>\`: Represents deleted or struck-through text (rendered with a line through it).
- \`<code>\`: Displays inline computer code in a fixed-width monospace font.
- \`<blockquote>\`: Quotes a long passage from another source with margin indentation.`,
    keyPoints: [
      'Use <strong> rather than <b> when the text has semantic importance',
      'Use <em> rather than <i> when the vocal emphasis changes meaning',
      'You can nest formatting tags, e.g. <p>She said <strong><em>never</em></strong> do that.</p>',
      'Tags must close in the reverse order they opened: <strong><em>text</em></strong>',
    ],
    commonMistakes: [
      'Overlapping tags incorrectly, such as <strong><em>text</strong></em>',
      'Forgetting to close the formatting tag, causing the rest of the page to stay bold',
    ],
    syntaxExample: `<p>Please note: this deadline is <strong>strictly enforced</strong>.</p>
<p>To run the program, type <code>npm start</code> in your terminal.</p>
<p>Original price: <del>$100</del> Now: <mark>$49</mark></p>
<blockquote>"The secret of getting ahead is getting started." — Mark Twain</blockquote>`,
    challengePrompt: `Write a short tech tip paragraph:
1. Wrap one or more important words in \`<strong>\`
2. Wrap at least one word in \`<em>\`
3. Wrap a keyboard command or code term in \`<code>\` (like \`Ctrl + S\` or \`git status\`)
4. Add a \`<mark>\` highlighted word or phrase`,
    starterCode: `<p>Tip: Remember to save your work frequently using the shortcut key.</p>`,
    solutionCode: `<p>Tip: <strong>Always</strong> remember to save your work <em>frequently</em> using <code>Ctrl + S</code> so you don't lose any <mark>valuable code</mark>!</p>`,
    testRules: [
      {
        id: 'has-strong',
        description: 'Contains <strong> text',
        validate: (code) => {
          const doc = parseHtml(code);
          const el = doc.querySelector('strong');
          return !!el && (el.textContent || '').trim().length > 0;
        },
        hint: 'Wrap important text inside <strong>...</strong>',
      },
      {
        id: 'has-em',
        description: 'Contains <em> emphasized text',
        validate: (code) => {
          const doc = parseHtml(code);
          const el = doc.querySelector('em');
          return !!el && (el.textContent || '').trim().length > 0;
        },
        hint: 'Wrap text inside <em>...</em>',
      },
      {
        id: 'has-code',
        description: 'Contains <code> snippet',
        validate: (code) => {
          const doc = parseHtml(code);
          const el = doc.querySelector('code');
          return !!el && (el.textContent || '').trim().length > 0;
        },
        hint: 'Put a shortcut or command in <code>...</code>',
      },
      {
        id: 'has-mark',
        description: 'Contains <mark> highlighted text',
        validate: (code) => {
          const doc = parseHtml(code);
          const el = doc.querySelector('mark');
          return !!el && (el.textContent || '').trim().length > 0;
        },
        hint: 'Wrap text in <mark>...</mark> to give it a highlight background.',
      },
    ],
  },
  {
    id: 4,
    title: 'Links & Anchors',
    subtitle: 'Connecting the web with clickable hyperlinks',
    category: 'Text & Links',
    duration: '6 min',
    tagsIntroduced: ['<a>', 'href', 'target'],
    explanation: `The \`<a>\` tag (short for **anchor**) creates hyperlinks that turn text or images into clickable portals to other pages.

The anchor tag requires an **attribute**:
\`\`\`html
<a href="https://example.com" target="_blank">Visit Example</a>
\`\`\`

### Attributes Explained:
- **\`href\`** (Hypertext Reference): The destination URL where the link goes.
- **\`target="_blank"\`**: Tells the browser to open the link in a **new browser tab**.
- Internal links can jump to specific parts of the same page using IDs, like \`href="#section2"\`.
- Email links start with \`mailto:\`, like \`href="mailto:help@example.com"\`.`,
    keyPoints: [
      'Attributes are always placed inside the OPENING tag',
      'Attributes follow the key="value" syntax (quotes are required)',
      'The text between <a> and </a> is what the user clicks on',
      'target="_blank" is great for linking to external websites',
    ],
    commonMistakes: [
      'Leaving out the https:// protocol on external links (e.g. href="google.com" instead of "https://google.com")',
      'Writing <a link="..."> instead of <a href="...">',
      'Putting quotes outside the value or omitting them',
    ],
    syntaxExample: `<p>Learn more at the <a href="https://wikipedia.org" target="_blank">Wikipedia Website</a>.</p>
<p>Need help? <a href="mailto:support@code.org">Email our team</a>.</p>`,
    challengePrompt: `Create a paragraph that includes a link:
1. Use an \`<a>\` tag with an \`href\` attribute pointing to any URL (such as \`https://google.com\` or \`https://github.com\`)
2. Add the \`target="_blank"\` attribute so it opens in a new tab
3. Give the link clear, clickable text (e.g., "Visit Google")`,
    starterCode: `<p>Check out this awesome website: </p>`,
    solutionCode: `<p>Check out this awesome website: <a href="https://google.com" target="_blank">Visit Google</a></p>`,
    testRules: [
      {
        id: 'has-anchor',
        description: 'Contains an <a> anchor tag',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('a').length >= 1;
        },
        hint: 'Use <a href="...">Click here</a>',
      },
      {
        id: 'has-href',
        description: 'The link has a valid href attribute',
        validate: (code) => {
          const doc = parseHtml(code);
          const link = doc.querySelector('a');
          return !!link && link.hasAttribute('href') && (link.getAttribute('href') || '').length > 3;
        },
        hint: 'Set the href attribute to a URL, like href="https://google.com"',
      },
      {
        id: 'has-target-blank',
        description: 'Includes target="_blank" to open in a new tab',
        validate: (code) => {
          const doc = parseHtml(code);
          const link = doc.querySelector('a');
          return !!link && link.getAttribute('target') === '_blank';
        },
        hint: 'Add target="_blank" inside the opening <a> tag.',
      },
      {
        id: 'has-link-text',
        description: 'The link has visible clickable text',
        validate: (code) => {
          const doc = parseHtml(code);
          const link = doc.querySelector('a');
          return !!link && (link.textContent || '').trim().length > 0;
        },
        hint: 'Write words between <a> and </a> so users can see and click it!',
      },
    ],
  },
  {
    id: 5,
    title: 'Images & Media',
    subtitle: 'Displaying graphics with src and alt attributes',
    category: 'Media',
    duration: '6 min',
    tagsIntroduced: ['<img>', 'src', 'alt', 'width', '<figure>', '<figcaption>'],
    explanation: `The \`<img>\` tag embeds images into your web page.

Unlike paragraphs and links, \`<img>\` is an **empty / self-closing tag** — it does NOT wrap around text, so it doesn't need a closing \`</img>\` tag.

### Crucial Image Attributes:
1. **\`src\`** (Source): The path or URL to the image file.
2. **\`alt\`** (Alternative Text): A concise description of the image.
   - Read aloud by screen readers for visually impaired users.
   - Displayed if the image fails to load or connection is slow.
   - Critical for Google SEO search indexing!
3. **\`width\`** & **\`height\`**: Specify dimensions in pixels or percentages.

To add a caption, wrap the image in a \`<figure>\` with a \`<figcaption>\`!`,
    keyPoints: [
      '<img> is self-closing: no </img> is needed',
      'alt text is strictly required for accessibility (WCAG) and good web hygiene',
      'Use descriptive alt text, not just "image" or "photo"',
      'figure and figcaption bundle an image with its caption cleanly',
    ],
    commonMistakes: [
      'Leaving out the alt attribute completely',
      'Writing src="image.png" when the file does not exist online',
      'Trying to close <img> with </img>',
    ],
    syntaxExample: `<figure>
  <img 
    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=400&q=80" 
    alt="Vibrant abstract colorful painting on canvas"
    width="300"
  />
  <figcaption>Modern art gallery showcase</figcaption>
</figure>`,
    challengePrompt: `Embed an image on your page:
1. Create an \`<img>\` element
2. Set the \`src\` attribute to: \`https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&q=80\` (a cute puppy)
3. Provide a meaningful \`alt\` text describing what is in the picture (e.g. "Golden retriever puppy sitting outdoors")
4. Set the \`width\` attribute to \`250\``,
    starterCode: `<h2>My Favorite Animal</h2>
<!-- Add your <img> tag below -->
`,
    solutionCode: `<h2>My Favorite Animal</h2>
<img 
  src="https://images.unsplash.com/photo-1546527868-ccb7ee7dfa6a?w=400&q=80" 
  alt="A cute golden retriever puppy sitting in the grass" 
  width="250"
/>`,
    testRules: [
      {
        id: 'has-img',
        description: 'Contains an <img> tag',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('img').length >= 1;
        },
        hint: 'Write an <img src="..." alt="..."> tag.',
      },
      {
        id: 'has-src',
        description: 'Has a valid image source (src attribute)',
        validate: (code) => {
          const doc = parseHtml(code);
          const img = doc.querySelector('img');
          return !!img && (img.getAttribute('src') || '').includes('unsplash.com');
        },
        hint: 'Paste the provided Unsplash URL into the src attribute.',
      },
      {
        id: 'has-alt',
        description: 'Has descriptive alt text (at least 5 characters)',
        validate: (code) => {
          const doc = parseHtml(code);
          const img = doc.querySelector('img');
          return !!img && (img.getAttribute('alt') || '').trim().length >= 5;
        },
        hint: 'Provide an alt attribute like alt="Golden retriever puppy"',
      },
      {
        id: 'has-width',
        description: 'Has width attribute specified',
        validate: (code) => {
          const doc = parseHtml(code);
          const img = doc.querySelector('img');
          return !!img && img.hasAttribute('width');
        },
        hint: 'Set width="250" on the image.',
      },
    ],
  },
  {
    id: 6,
    title: 'Lists (Ordered & Unordered)',
    subtitle: 'Organizing items into bullet points or numbered steps',
    category: 'Text & Links',
    duration: '5 min',
    tagsIntroduced: ['<ul>', '<ol>', '<li>'],
    explanation: `Webpages frequently organize information into lists. HTML has two main types of lists:

### 1. Unordered List (\`<ul>\`)
Used when the order does **not** matter (grocery lists, navigation links, feature lists).
Browsers display these as **bullet points** (•).

### 2. Ordered List (\`<ol>\`)
Used when the sequence **does** matter (recipes, top 10 rankings, step-by-step instructions).
Browsers automatically number these items (1, 2, 3...).

Inside both \`<ul>\` and \`<ol>\`, every single item must be wrapped in a **List Item** (\`<li>\`) tag!`,
    keyPoints: [
      '<ul> = Unordered list (bullet points)',
      '<ol> = Ordered list (numbered sequence 1, 2, 3)',
      '<li> = List Item (goes INSIDE ul or ol)',
      'Never put raw text directly inside <ul> or <ol>; always wrap it inside <li>',
    ],
    commonMistakes: [
      'Writing <li> tags without wrapping them in <ul> or <ol>',
      'Writing the numbers manually inside <li>1. Item</li> when using <ol> (the browser numbers it automatically!)',
      'Forgetting to close the </li> tags',
    ],
    syntaxExample: `<h3>Grocery List (Unordered)</h3>
<ul>
  <li>Avocados</li>
  <li>Almond milk</li>
  <li>Fresh sourdough bread</li>
</ul>

<h3>Recipe Steps (Ordered)</h3>
<ol>
  <li>Preheat the oven to 375°F</li>
  <li>Mix flour, sugar, and baking powder</li>
  <li>Bake for 25 minutes until golden</li>
</ol>`,
    challengePrompt: `Build a top 3 goals list:
1. Add an \`<h2>\` heading saying "My Top 3 Coding Goals"
2. Create an ordered list (\`<ol>\`)
3. Add three list items (\`<li>\`) inside the ordered list specifying your goals`,
    starterCode: `<!-- Create your ordered list of 3 goals here -->
`,
    solutionCode: `<h2>My Top 3 Coding Goals</h2>
<ol>
  <li>Learn HTML & semantic tags</li>
  <li>Master CSS styling and Flexbox</li>
  <li>Build and publish my personal portfolio</li>
</ol>`,
    testRules: [
      {
        id: 'has-ol',
        description: 'Contains an ordered list <ol>',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('ol').length >= 1;
        },
        hint: 'Use an opening <ol> and closing </ol> tag.',
      },
      {
        id: 'has-three-li',
        description: 'Contains at least 3 list items <li> inside the list',
        validate: (code) => {
          const doc = parseHtml(code);
          const ol = doc.querySelector('ol');
          if (!ol) return false;
          const lis = ol.querySelectorAll('li');
          return lis.length >= 3 && Array.from(lis).every((li) => (li.textContent || '').trim().length > 0);
        },
        hint: 'Place three <li> elements with text inside the <ol> container.',
      },
    ],
  },
  {
    id: 7,
    title: 'Semantic Structure & Containers',
    subtitle: 'Organizing clean layouts with semantic tags and div/span',
    category: 'Structure',
    duration: '7 min',
    tagsIntroduced: ['<header>', '<nav>', '<main>', '<section>', '<article>', '<footer>', '<div>', '<span>'],
    explanation: `In old HTML, developers wrapped everything in generic \`<div>\` (division) boxes.
Modern HTML5 introduced **Semantic Elements** that describe their exact purpose to search engines and screen readers!

### Key Semantic Elements:
- **\`<header>\`**: Introductory content, site title, or banner
- **\`<nav>\`**: Navigation links section
- **\`<main>\`**: The dominant, unique content of the webpage
- **\`<section>\`**: A thematic group of content, typically with a heading
- **\`<article>\`**: A self-contained piece of content (like a blog post, review, or card)
- **\`<footer>\`**: Copyright notices, author info, and footer links

### Generic Containers (Use when no semantic tag fits):
- **\`<div>\`**: Block-level container (takes up full available width and starts on a new line).
- **\`<span>\`**: Inline container (wraps around words inside a sentence without breaking the line).`,
    keyPoints: [
      'Semantic tags make your code clean, readable, accessible, and SEO-friendly',
      'A page should have only one <main> element',
      'Use <div> for generic layout styling (Flexbox/Grid wrapper)',
      'Use <span> to style or target a word inside a paragraph',
    ],
    commonMistakes: [
      'Using <div> for everything instead of semantic tags ("div soup")',
      'Putting multiple <main> elements on the same page',
    ],
    syntaxExample: `<header>
  <h1>TechBytes Daily</h1>
  <nav>
    <a href="#news">News</a> | <a href="#tutorials">Tutorials</a>
  </nav>
</header>

<main>
  <article>
    <h2>Understanding HTML5</h2>
    <p>Semantic tags give <span class="highlight">meaning</span> to your structure.</p>
  </article>
</main>

<footer>
  <p>© 2026 TechBytes. All rights reserved.</p>
</footer>`,
    challengePrompt: `Create a clean semantic page layout containing:
1. A \`<header>\` with a site title in \`<h1>\`
2. A \`<nav>\` with at least two \`<a>\` links
3. A \`<main>\` tag containing an \`<article>\` with an \`<h2>\` and a \`<p>\`
4. A \`<footer>\` with a copyright statement`,
    starterCode: `<!-- Build a semantic webpage layout -->
`,
    solutionCode: `<header>
  <h1>My Awesome Website</h1>
  <nav>
    <a href="#home">Home</a> | <a href="#about">About</a>
  </nav>
</header>

<main>
  <article>
    <h2>Welcome to my first page</h2>
    <p>Semantic HTML makes the web accessible and easy to organize.</p>
  </article>
</main>

<footer>
  <p>© 2026 My Awesome Website</p>
</footer>`,
    testRules: [
      {
        id: 'has-header',
        description: 'Contains a <header> element',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('header').length >= 1;
        },
        hint: 'Wrap top-level branding in <header>...</header>',
      },
      {
        id: 'has-nav',
        description: 'Contains a <nav> with at least 2 links',
        validate: (code) => {
          const doc = parseHtml(code);
          const nav = doc.querySelector('nav');
          return !!nav && nav.querySelectorAll('a').length >= 2;
        },
        hint: 'Add a <nav> tag containing two or more <a> links.',
      },
      {
        id: 'has-main-article',
        description: 'Contains a <main> containing an <article>',
        validate: (code) => {
          const doc = parseHtml(code);
          const main = doc.querySelector('main');
          return !!main && main.querySelectorAll('article').length >= 1;
        },
        hint: 'Place an <article> inside your <main> block.',
      },
      {
        id: 'has-footer',
        description: 'Contains a <footer> element',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('footer').length >= 1;
        },
        hint: 'Add a <footer>...</footer> at the bottom of the page.',
      },
    ],
  },
  {
    id: 8,
    title: 'Forms & User Inputs',
    subtitle: 'Collecting data with inputs, labels, selects, and buttons',
    category: 'Forms',
    duration: '8 min',
    tagsIntroduced: ['<form>', '<input>', '<label>', '<button>', '<select>', '<option>', '<textarea>'],
    explanation: `Forms allow users to interact with your site, submit comments, sign in, or search for products.

### Essential Form Elements:
- **\`<form>\`**: The container that groups input controls together.
- **\`<label>\`**: Text label for an input. Clicking the label focuses the input! Link it using \`for="inputId"\` matching \`id="inputId"\`.
- **\`<input>\`**: The most versatile form element. Its behavior changes based on the \`type\` attribute:
  - \`type="text"\`: Single line text input
  - \`type="email"\`: Validates email format automatically
  - \`type="password"\`: Masks keystrokes for security
  - \`type="checkbox"\`: Toggleable yes/no box
  - \`type="radio"\`: Single choice among grouped options
  - \`type="number"\`: Numerical input with steppers
- **\`<textarea>\`**: Multi-line text box for messages or feedback.
- **\`<select>\` & \`<option>\`**: Dropdown menu.
- **\`<button type="submit">\`**: Triggers form submission.`,
    keyPoints: [
      'Always associate every input with a <label> using id and for attributes',
      'The "placeholder" attribute provides a temporary hint inside empty inputs',
      'Add "required" to make a field mandatory before submitting',
      '<input> is self-closing; <textarea> requires a closing </textarea> tag',
    ],
    commonMistakes: [
      'Omitting the <label> tag (hurts accessibility)',
      'Forgetting type="button" on non-submitting buttons (default button type is submit!)',
      'Trying to close <input> with </input>',
    ],
    syntaxExample: `<form action="/submit" method="POST">
  <label for="username">Your Name:</label>
  <input type="text" id="username" name="username" placeholder="Jane Doe" required />

  <label for="useremail">Email Address:</label>
  <input type="email" id="useremail" name="email" placeholder="jane@example.com" required />

  <label for="topic">Inquiry Type:</label>
  <select id="topic" name="topic">
    <option value="support">Customer Support</option>
    <option value="sales">Sales Inquiry</option>
  </select>

  <label for="msg">Message:</label>
  <textarea id="msg" name="msg" rows="4" placeholder="Write your message here..."></textarea>

  <button type="submit">Send Message</button>
</form>`,
    challengePrompt: `Build a sign-up newsletter form:
1. Wrap everything in a \`<form>\`
2. Create an input with \`type="text"\` for the user's name
3. Create an input with \`type="email"\` for the user's email with \`required\`
4. Add corresponding \`<label>\` elements for each input
5. Include a \`<button type="submit">\` to submit the form`,
    starterCode: `<!-- Build your newsletter signup form here -->
`,
    solutionCode: `<form>
  <h2>Subscribe to our Newsletter</h2>
  
  <p>
    <label for="name-input">Full Name:</label><br>
    <input type="text" id="name-input" name="fullname" placeholder="Enter your full name" />
  </p>

  <p>
    <label for="email-input">Email Address:</label><br>
    <input type="email" id="email-input" name="email" placeholder="you@example.com" required />
  </p>

  <button type="submit">Join Newsletter</button>
</form>`,
    testRules: [
      {
        id: 'has-form',
        description: 'Contains a <form> container',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('form').length >= 1;
        },
        hint: 'Wrap your fields in a <form>...</form>',
      },
      {
        id: 'has-text-input',
        description: 'Contains an <input type="text"> for the name',
        validate: (code) => {
          const doc = parseHtml(code);
          const input = doc.querySelector('input[type="text"], input:not([type])');
          return !!input;
        },
        hint: 'Add an <input type="text" ... />',
      },
      {
        id: 'has-email-input',
        description: 'Contains an <input type="email"> with the required attribute',
        validate: (code) => {
          const doc = parseHtml(code);
          const emailInput = doc.querySelector('input[type="email"]');
          return !!emailInput && emailInput.hasAttribute('required');
        },
        hint: 'Add <input type="email" required />',
      },
      {
        id: 'has-labels',
        description: 'Contains at least two <label> elements',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('label').length >= 2;
        },
        hint: 'Add <label> tags so users know what each field is for.',
      },
      {
        id: 'has-submit-button',
        description: 'Contains a submit button',
        validate: (code) => {
          const doc = parseHtml(code);
          const btn = doc.querySelector('button, input[type="submit"]');
          return !!btn && (btn.textContent || '').trim().length > 0;
        },
        hint: 'Add <button type="submit">Subscribe</button>',
      },
    ],
  },
  {
    id: 9,
    title: 'Tables & Tabular Data',
    subtitle: 'Structuring rows and columns with table, tr, th, and td',
    category: 'Tables',
    duration: '6 min',
    tagsIntroduced: ['<table>', '<thead>', '<tbody>', '<tr>', '<th>', '<td>'],
    explanation: `HTML tables display structured, tabular data (like pricing plans, schedules, sports standings, or financial data).

### Table Structure Hierarchy:
- **\`<table>\`**: The master container.
- **\`<thead>\`**: The table header section (column titles).
- **\`<tbody>\`**: The table body section (the data rows).
- **\`<tr>\`** (Table Row): Represents an individual horizontal row.
- **\`<th>\`** (Table Header Cell): A header cell (bold and centered by default).
- **\`<td>\`** (Table Data Cell): A regular data cell containing content.

> **Pro Tip:** Never use \`<table>\` for page layouts! Tables are strictly for data matrices. For layouts, use CSS Flexbox and Grid.`,
    keyPoints: [
      'Rows (<tr>) go inside thead and tbody',
      '<th> is for column titles, <td> is for cell data',
      'The number of <td> cells in each row should match the number of <th> headers',
      'Attributes like "border" or CSS borders make gridlines visible',
    ],
    commonMistakes: [
      'Putting <td> directly inside <table> without wrapping in <tr>',
      'Mismatching the number of columns between rows',
    ],
    syntaxExample: `<table border="1">
  <thead>
    <tr>
      <th>Student</th>
      <th>Subject</th>
      <th>Grade</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Alex Rivera</td>
      <td>Computer Science</td>
      <td>A+</td>
    </tr>
    <tr>
      <td>Jordan Chen</td>
      <td>Web Design</td>
      <td>A</td>
    </tr>
  </tbody>
</table>`,
    challengePrompt: `Build a weekly schedule or leaderboard table:
1. Create a \`<table>\` element (add \`border="1"\` so borders show)
2. Add a \`<thead>\` with a \`<tr>\` containing at least 2 column header \`<th>\` tags (e.g., "Day" and "Activity")
3. Add a \`<tbody>\` with at least 2 data rows (\`<tr>\`), each with matching \`<td>\` cells`,
    starterCode: `<!-- Build your HTML table below -->
`,
    solutionCode: `<table border="1">
  <thead>
    <tr>
      <th>Day</th>
      <th>Activity</th>
      <th>Duration</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Monday</td>
      <td>HTML Basics & Tags</td>
      <td>1 hour</td>
    </tr>
    <tr>
      <td>Wednesday</td>
      <td>Forms & Tables</td>
      <td>45 mins</td>
    </tr>
  </tbody>
</table>`,
    testRules: [
      {
        id: 'has-table',
        description: 'Contains a <table> tag',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('table').length >= 1;
        },
        hint: 'Use <table>...</table>',
      },
      {
        id: 'has-th',
        description: 'Contains at least two table header <th> cells',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('th').length >= 2;
        },
        hint: 'Add <th>Column Name</th> inside a <tr>',
      },
      {
        id: 'has-rows-td',
        description: 'Contains at least two data rows with <td> cells',
        validate: (code) => {
          const doc = parseHtml(code);
          const tds = doc.querySelectorAll('td');
          return tds.length >= 4;
        },
        hint: 'Add two or more <tr> rows with <td> cells inside <tbody>.',
      },
    ],
  },
  {
    id: 10,
    title: 'Capstone Project: Your Personal Webpage',
    subtitle: 'Combine everything you learned into a complete profile site',
    category: 'Project',
    duration: '10 min',
    tagsIntroduced: ['All combined!'],
    explanation: `Congratulations on reaching the Capstone Project! 🎉

You now know:
- How HTML elements and tags work (\`<p>\`, \`<h1>\`-\`<h6>\`)
- Text formatting (\`<strong>\`, \`<em>\`, \`<code>\`)
- Hyperlinks (\`<a href="...">\`)
- Images with accessibility (\`<img src="..." alt="...">\`)
- Ordered and unordered lists (\`<ul>\`, \`<ol>\`, \`<li>\`)
- Semantic structure (\`<header>\`, \`<main>\`, \`<section>\`, \`<footer>\`)

Now let's build your very own **Developer Bio Page** from scratch!`,
    keyPoints: [
      'A real web project combines semantic layout, content hierarchy, and media',
      'Always test your links and make sure your images have alt text',
      'Keep your code formatted with clear indentation so it is easy to read',
    ],
    syntaxExample: `<!-- Capstone Profile Template -->
<header>
  <h1>Your Name</h1>
  <p>Aspiring Full-Stack Web Developer</p>
</header>
<main>
  <section>
    <h2>About Me</h2>
    <p>I love building beautiful things for the web.</p>
  </section>
  <section>
    <h2>My Skills</h2>
    <ul>
      <li>HTML5 Semantic Markup</li>
      <li>CSS Styling</li>
      <li>JavaScript Programming</li>
    </ul>
  </section>
</main>
<footer>
  <p>Connect with me on <a href="https://github.com">GitHub</a></p>
</footer>`,
    challengePrompt: `Build a complete Developer Profile page containing:
1. A \`<header>\` with your name in an \`<h1>\`
2. An \`<img>\` avatar or photo with \`src\`, \`alt\`, and \`width\`
3. An "About Me" section with a \`<h2>\` and a \`<p>\` using at least one \`<strong>\` or \`<em>\` word
4. A "Skills" or "Hobbies" list using \`<ul>\` or \`<ol>\` with at least 3 items
5. A \`<footer>\` with a link \`<a>\` to your social profile or portfolio`,
    starterCode: `<!-- Capstone Project: Build your Developer Bio Page! -->
<header>
  <!-- 1. Add your name in an h1 -->
</header>

<main>
  <!-- 2. Add an image avatar -->
  
  <!-- 3. Add an About Me section with strong or em -->
  
  <!-- 4. Add a list of 3 skills or hobbies -->
</main>

<footer>
  <!-- 5. Add a link -->
</footer>`,
    solutionCode: `<header>
  <h1>Alex Rivera</h1>
  <p>Frontend Developer in Training 🚀</p>
</header>

<main>
  <img 
    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80" 
    alt="Portrait photo of Alex Rivera" 
    width="160"
    style="border-radius: 50%;"
  />

  <section>
    <h2>About Me</h2>
    <p>I am an enthusiastic beginner who is <strong>passionate</strong> about building <em>clean, accessible websites</em>.</p>
  </section>

  <section>
    <h2>My Top Skills</h2>
    <ul>
      <li>HTML5 Semantic Structure</li>
      <li>Responsive Web Layouts</li>
      <li>Continuous Curiosity & Learning</li>
    </ul>
  </section>
</main>

<footer>
  <p>Find my code on <a href="https://github.com" target="_blank">GitHub</a></p>
</footer>`,
    testRules: [
      {
        id: 'has-header-h1',
        description: 'Header with an <h1> containing your name',
        validate: (code) => {
          const doc = parseHtml(code);
          const h1 = doc.querySelector('header h1, h1');
          return !!h1 && (h1.textContent || '').trim().length > 0;
        },
        hint: 'Put an <h1>Your Name</h1> inside the <header>',
      },
      {
        id: 'has-img',
        description: 'Image with src and alt attributes',
        validate: (code) => {
          const doc = parseHtml(code);
          const img = doc.querySelector('img');
          return !!img && img.hasAttribute('src') && img.hasAttribute('alt');
        },
        hint: 'Add <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" alt="Avatar" width="150" />',
      },
      {
        id: 'has-strong-or-em',
        description: 'Text formatted with <strong> or <em> emphasis',
        validate: (code) => {
          const doc = parseHtml(code);
          return doc.querySelectorAll('strong, em').length >= 1;
        },
        hint: 'Emphasize a key word using <strong> or <em>.',
      },
      {
        id: 'has-list',
        description: 'A list with at least 3 items (<ul> or <ol>)',
        validate: (code) => {
          const doc = parseHtml(code);
          const list = doc.querySelector('ul, ol');
          return !!list && list.querySelectorAll('li').length >= 3;
        },
        hint: 'Create a <ul> or <ol> list with 3 <li> items.',
      },
      {
        id: 'has-footer-link',
        description: 'Footer with a clickable link <a>',
        validate: (code) => {
          const doc = parseHtml(code);
          const footerLink = doc.querySelector('footer a, a');
          return !!footerLink && footerLink.hasAttribute('href') && (footerLink.textContent || '').trim().length > 0;
        },
        hint: 'Add <a href="https://github.com">GitHub</a> inside the <footer>.',
      },
    ],
  },
];
