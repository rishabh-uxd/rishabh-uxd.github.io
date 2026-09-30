# rishabhsingh.design

Rishabh Singh's UX portfolio. Static HTML, CSS, and vanilla JS. No build step, no
dependencies, nothing to compile.

## Preview

```
python3 -m http.server 4411
```

Then open http://127.0.0.1:4411. Use a port you have not used before while editing
CSS; browsers cache per origin and will serve stale styles.

## Deploy

Any static host. This repo is served by GitHub Pages from the root of `main`.

## Structure

| Path | What it is |
|---|---|
| `index.html` | Home page |
| `about.html`, `practice.html` | About, and standards and tools |
| `work/` | The five case studies |
| `assets/css/tokens.css` | Design tokens. Colors, sizes, and spacing are set here and nowhere else |
| `assets/css/base.css` | Reset, type primitives, layout and motion primitives |
| `assets/css/components.css` | Nav, hero, project bands, case study components, footer |
| `assets/js/site.js` | Word split, scroll reveals, stat count-up, progress bar. Progressive enhancement; the site reads fine without it |
| `assets/img/<project>/` | Screen exports, one folder per case study, WebP |
| `prototypes/` | Interactive prototypes embedded in case studies |
