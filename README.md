# Something Different Studios — Website

Premium creative agency website. All files are self-contained and work
without any build tools, server, or additional setup. Just open
`index.html` in a browser.

---

## Folder Structure

```
something_different_studio/
│
├── index.html          — Homepage (hero, about, services preview, portfolio
│                         preview, process, testimonials, CTA)
├── about.html          — Studio story, team, values, stats
├── services.html       — Full service descriptions + pricing tiers
├── portfolio.html      — Filterable portfolio grid + case studies
├── contact.html        — Contact form + FAQ
│
├── style.css           — Shared styles for all pages
├── script.js           — Shared JavaScript for all pages
│
└── images/             — Drop your images here (see Image Replacement below)
    ├── logo.svg        — ← REPLACE with your actual logo
    ├── work-01.jpg     — Portfolio image 1 (tall hero)
    ├── work-02.jpg     — Portfolio image 2
    ├── work-03.jpg     — Portfolio image 3
    ├── work-04.jpg     — Portfolio image 4
    ├── work-05.jpg     — Portfolio image 5
    ├── work-06.jpg     — Portfolio image 6 (wide)
    ├── work-07.jpg     — Portfolio image 7
    ├── work-08.jpg     — Portfolio image 8
    ├── work-09.jpg     — Portfolio image 9
    ├── case-01.jpg     — Case study hero image 1
    ├── case-02.jpg     — Case study hero image 2
    ├── team-01.jpg     — Team member photo 1
    ├── team-02.jpg     — Team member photo 2
    └── team-03.jpg     — Team member photo 3
```

---

## Image Replacement Guide

Every image that can be replaced is marked with a comment in the HTML:

```html
<!-- ▼ REPLACE: update src with your actual image file -->
<img src="images/work-01.jpg" alt="..." onerror="...">
```

The `onerror` attribute on every `<img>` means missing images degrade
gracefully — you'll see a dark placeholder instead of a broken icon.

### Steps:
1. Place your images inside the `images/` folder.
2. Name them to match the filenames listed above, **or** update the
   `src` attribute in the HTML to match your filenames.
3. Logo: replace `images/logo.svg` with your actual logo file.

---

## Text / Content Replacement

Search each HTML file for the following to update key content quickly:

| What to change          | Search for                              |
|-------------------------|-----------------------------------------|
| Email address           | `hello@somethingdifferent.studio`       |
| Social media links      | `https://instagram.com` etc.            |
| Studio stats            | `25+`, `10+`, `3+`                      |
| Testimonial quotes      | Inside `script.js` — the `T` array     |
| Footer copyright year   | `© 2025`                               |
| Team member names/bios  | `about.html` — `.team-card` sections   |

---

## Features

- Custom animated cursor (dot + ring, mix-blend-mode)
- Scroll-triggered fade-up animations on all sections
- Animated hero scan line + rotating SVG rings
- Auto-advancing testimonial carousel
- Portfolio grid with category filter (All / Film / Motion / VFX / Design / Edit)
- Contact form with simulated send state (wire up to your backend/Formspree)
- Active nav link highlight (auto-detects current page)
- Film grain noise overlay + dot-grid background
- Animated scrolling marquee
- Fully responsive (breakpoint at 900px)

---

## Connecting the Contact Form

The form currently simulates a send. To make it live, replace the
`setTimeout` block inside `script.js` with a real POST:

```javascript
// Example using Formspree (https://formspree.io)
const response = await fetch('https://formspree.io/f/YOUR_ID', {
  method: 'POST',
  body: new FormData(form),
  headers: { 'Accept': 'application/json' }
});
```

---

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge). The `cursor: none` custom
cursor requires a mouse — on touch devices the system cursor is used.
