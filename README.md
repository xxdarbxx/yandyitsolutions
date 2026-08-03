# Y & Y IT Solutions — Agency Website

A premium, responsive marketing website for Y & Y IT Solutions, a website development agency serving Manila, Candelaria, and Quezon Province, Philippines.

**Phone:** 0998-298-6745
**Manila Office:** 2021 Mindanao Ave., Sampaloc, Manila
**Quezon Office:** Brgy. Pahinga Norte, Candelaria, Quezon
**Facebook:** https://www.facebook.com/yandysolutions/

## Tech Stack

- HTML5 (semantic, single-page layout)
- Tailwind CSS (via CDN Play script — see note below)
- Vanilla JavaScript (no frameworks)
- [Lucide Icons](https://lucide.dev) (small CDN icon library)

## Project Structure

```
index.html            Main site (all sections)
privacy-policy.html   Standalone privacy policy page
css/style.css          Custom animations, scroll-reveal, header states
js/main.js             All interactivity (nav, counters, modal, FAQ, form, etc.)
assets/images/portfolio/   Real screenshots from past client projects
assets/images/og-image.png Social share preview image
robots.txt / sitemap.xml   SEO crawling files
```

## Running Locally

This is a static site — no build step required. Open `index.html` directly in a browser, or serve it with any static server, e.g.:

```powershell
npx serve .
```

## Things to Configure Before Going Live

1. **Contact form** — submits via [Formspree](https://formspree.io) (`https://formspree.io/f/meeyyqda`, tied to `renzmaturino28@gmail.com`) using a `fetch` POST with no page reload; success/error state shows inline via `#formNote`. To change where submissions go, create a new Formspree form and update the `action` attribute on `#contactForm` in `index.html`.
2. **Facebook Messenger Chat Plugin** — the plugin markup is in place (`#fb-customer-chat` in `index.html`) but needs your numeric Facebook **Page ID** in the `page_id` attribute, plus your domain whitelisted in Meta Business Suite → Messenger settings, before it will render. Until then, the floating **Messenger button** (linking to `https://m.me/yandysolutions`) works immediately with no setup and is the primary way visitors reach you on Messenger.
3. **Canonical URL / sitemap** — currently set to the GitHub Pages URL pattern `https://xxdarbxx.github.io/yandyitsolutions/`. Update `<link rel="canonical">`, Open Graph tags, `robots.txt`, and `sitemap.xml` if you deploy to a custom domain.
4. **Pricing** — the ₱15,000 / ₱30,000 / ₱55,000 starting prices are placeholders. Adjust in the Pricing section of `index.html` to match your actual rates.
5. **Testimonials** — sample/placeholder testimonials are included for layout purposes. Replace with real client quotes as they come in.
6. **Google Maps embed** — currently points to the Manila office address. No API key required for the basic embed used.

## Deployment (GitHub Pages)

1. Push this repository to `https://github.com/xxdarbxx/yandyitsolutions`.
2. In repo Settings → Pages, set source to the `main` branch (root).
3. Site will be live at `https://xxdarbxx.github.io/yandyitsolutions/`.

## Performance Note

Tailwind is loaded via the CDN Play script for a zero-build, single-file-friendly workflow. This is convenient for static hosting but is not Tailwind's recommended production setup (it compiles utility classes in the browser and logs a console warning). For the best Lighthouse score, consider installing the Tailwind CLI locally and compiling a purged `css/tailwind.css` file at build time, then swapping the `<script>` tag for a `<link>` to that compiled file.

## Portfolio Screenshots

The screenshots in `assets/images/portfolio/` are real captures from past projects (Aerith Vet Clinic, Brew Can Do It, Odeworks Motorshop, Opta Eye Clinic, Yuna's Dental Clinic, Mystique Spa, CNM Pharmacy, Yuna's Flower Shop, Yumi's Cake Shop, Sunrise Valley Academy Portal), used here to showcase actual work.
