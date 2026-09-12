import { PlaygroundTemplate } from '../types';

export const PLAYGROUND_TEMPLATES: PlaygroundTemplate[] = [
  {
    id: 'blank',
    name: 'Blank Canvas',
    description: 'A minimal starter boilerplate ready for your own experimentation.',
    category: 'Starter',
    code: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My Experiment</title>
</head>
<body>
  <h1>Hello, World!</h1>
  <p>Start writing your HTML here...</p>
</body>
</html>`,
  },
  {
    id: 'profile-card',
    name: 'Developer Profile Card',
    description: 'A stylish personal bio card with avatar, skills, and links.',
    category: 'Showcase',
    code: `<article style="max-width: 400px; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; font-family: sans-serif; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);">
  <img 
    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300" 
    alt="Developer portrait" 
    width="100" 
    style="border-radius: 50%; border: 3px solid #3b82f6;"
  />
  <h2>Jordan Taylor</h2>
  <p><strong>Junior Frontend Developer</strong> in New York</p>
  <p>Passionate about crafting intuitive, high-performance web experiences with semantic HTML and modern CSS.</p>
  
  <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 16px 0;" />
  
  <h3>Core Toolkit</h3>
  <ul>
    <li>HTML5 & Semantic SEO</li>
    <li>Responsive CSS Layouts</li>
    <li>JavaScript Fundamentals</li>
  </ul>

  <p>
    <a href="https://github.com" target="_blank" style="display: inline-block; background: #2563eb; color: white; padding: 8px 16px; border-radius: 6px; text-decoration: none; font-weight: bold;">
      View GitHub Profile →
    </a>
  </p>
</article>`,
  },
  {
    id: 'cafe-menu',
    name: 'Artisan Cafe Menu',
    description: 'Clean cafe menu using headings, descriptions, and organized pricing.',
    category: 'Showcase',
    code: `<header style="font-family: serif; text-align: center; margin-bottom: 24px;">
  <h1 style="color: #451a03; margin-bottom: 4px;">Roast & Bloom Coffee Co.</h1>
  <p style="color: #78350f; font-style: italic;">Ethically sourced, single-origin beans roasted daily</p>
  <hr style="width: 60px; border-top: 2px solid #b45309;" />
</header>

<main style="font-family: sans-serif; max-width: 500px; margin: 0 auto;">
  <section>
    <h2 style="color: #78350f; border-bottom: 1px solid #fed7aa; padding-bottom: 6px;">Hot Beverages</h2>
    
    <article>
      <p><strong>Espresso Blend</strong> — <mark>$3.50</mark><br>
      <small>Rich crema with notes of dark chocolate & roasted almond.</small></p>
    </article>

    <article>
      <p><strong>Vanilla Oat Latte</strong> — <mark>$5.25</mark><br>
      <small>House-made Madagascar vanilla syrup with steamed creamy oat milk.</small></p>
    </article>
  </section>

  <section style="margin-top: 24px;">
    <h2 style="color: #78350f; border-bottom: 1px solid #fed7aa; padding-bottom: 6px;">Fresh Bakery</h2>
    
    <article>
      <p><strong>Almond Croissant</strong> — <mark>$4.50</mark><br>
      <small>Flaky pastry filled with rich almond frangipane.</small></p>
    </article>
  </section>
</main>

<footer style="text-align: center; margin-top: 32px; font-size: 14px; color: #71717a;">
  <p>Open Daily: 7:00 AM – 6:00 PM • <a href="mailto:hello@roastbloom.com">Contact Us</a></p>
</footer>`,
  },
  {
    id: 'contact-form',
    name: 'Interactive Contact Form',
    description: 'Standard accessible inquiry form with inputs, select dropdown, and buttons.',
    category: 'Forms',
    code: `<form style="font-family: sans-serif; max-width: 450px; padding: 20px; border: 1px solid #e4e4e7; border-radius: 8px;">
  <h2 style="margin-top: 0;">Send Us a Message</h2>
  <p style="color: #71717a; font-size: 14px;">We usually respond within 24 business hours.</p>

  <p>
    <label for="name"><strong>Your Name:</strong></label><br>
    <input type="text" id="name" name="name" placeholder="Alex Morgan" required style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #d4d4d8; border-radius: 4px; box-sizing: border-box;" />
  </p>

  <p>
    <label for="email"><strong>Email Address:</strong></label><br>
    <input type="email" id="email" name="email" placeholder="alex@domain.com" required style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #d4d4d8; border-radius: 4px; box-sizing: border-box;" />
  </p>

  <p>
    <label for="reason"><strong>Inquiry Reason:</strong></label><br>
    <select id="reason" name="reason" style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #d4d4d8; border-radius: 4px;">
      <option value="general">General Question</option>
      <option value="support">Technical Support</option>
      <option value="partnership">Partnership Opportunity</option>
    </select>
  </p>

  <p>
    <label for="message"><strong>Message:</strong></label><br>
    <textarea id="message" name="message" rows="4" placeholder="How can we help you?" style="width: 100%; padding: 8px; margin-top: 4px; border: 1px solid #d4d4d8; border-radius: 4px; box-sizing: border-box;"></textarea>
  </p>

  <button type="submit" style="background: #0284c7; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-weight: bold; cursor: pointer;">
    Submit Form
  </button>
</form>`,
  },
];
