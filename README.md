# Shiemo Portfolio

A personal portfolio for Onagaumah Emmanuel, built with SvelteKit, TypeScript, and Tailwind CSS. The site presents a focused developer profile, selected projects, an interactive terminal section, and a contact form powered by EmailJS.

## Tech Stack

- SvelteKit 2 with Svelte 5 runes
- TypeScript
- Tailwind CSS
- EmailJS for client-side contact form delivery
- AVIF project images served from `static/`
- GSAP, CSS keyframes, `IntersectionObserver`, and Svelte transitions for motion

## Setup Instructions

Install dependencies:

```sh
npm install
```

Create a local `.env` file:

```env
PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
```

Run the development server:

```sh
npm run dev
```

Run type and Svelte checks:

```sh
npm run check
```

Build for production:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Architecture

The app uses SvelteKit file-based routing:

- `src/routes/+layout.svelte` provides the shared `Navbar`, page slot, and `Footer`.
- `src/routes/+page.svelte` renders the homepage sections: `Hero`, `About`, featured `Projects`, `Skills`, and `Terminal`.
- `src/routes/projects/+page.svelte` reuses the `Projects` component to show the full project archive.
- `src/routes/contact/+page.svelte` renders the reusable `Contact` section as a dedicated page.

Most UI is split into focused components under `src/lib/components/`. Project and social data live in `src/lib/data/projects.ts`, so project cards, terminal commands, and social links can be updated from one place.

The contact form lives in `ContactForm.svelte`. It validates name, email, and message on the client, then sends `{ name, email, message }` through EmailJS using public SvelteKit environment variables.

The terminal feature is separated into:

- `Terminal.svelte` for state, command history, input behavior, and scrolling.
- `TerminalWindow.svelte` for presentation.
- `src/lib/utils/terminal.ts` for available commands and output data.

## Animation Decisions

The current motion system is intentionally lightweight:

- Hero entrance animations are CSS transitions triggered by a small `visible` state after mount.
- About, Skills, and Contact sections use `IntersectionObserver` to reveal content only when the section enters the viewport.
- Project cards, technology badges, and toolbox cards use a shared GSAP helper in `src/lib/utils/animations.ts` for viewport-triggered staggered reveals.
- The hero visual uses CSS keyframes for breathing, morphing, spinning, and floating particle effects.
- The mobile menu uses Svelte's built-in `fly` transition.
- Global `prefers-reduced-motion: reduce` support shortens animations and transitions for users who request less motion.

This keeps animation dependency-light, predictable, and easy to reason about across routes.

## Performance Optimization Techniques

- SvelteKit keeps route code organized and compiles Svelte components efficiently.
- Project content is data-driven, avoiding repeated markup and making card rendering predictable.
- Project images use AVIF assets for smaller image payloads.
- Project images are lazy-loaded with `loading="lazy"`.
- Intersection-based reveals avoid running animation logic for sections before they enter the viewport.
- Most animations use `transform` and `opacity`, which are generally cheaper to animate than layout-affecting properties.
- The CSS-first approach avoids shipping extra runtime animation code for simple effects.
- The project limits the homepage preview to three projects and moves the full archive to `/projects`.

## Accessibility Considerations

- The site uses semantic sections, headings, links, buttons, and form controls.
- Interactive controls include labels or `aria-label` values, including social links, palette buttons, and the mobile menu.
- The mobile menu exposes `aria-expanded` and `aria-controls`.
- Contact form errors are connected to inputs with `aria-invalid` and `aria-describedby`.
- Focus states are defined globally for links, buttons, inputs, and textareas.
- External links use `rel="noopener noreferrer"`.
- Images include descriptive `alt` text based on project titles.
- Reduced-motion preferences are respected globally.

## Trade-Offs Made

- The contact form uses EmailJS instead of a custom backend. This keeps deployment simple for a portfolio, but spam protection and abuse controls are not as strong as a server-side form endpoint.
- The app uses public EmailJS environment variables because EmailJS browser sending requires public client-side credentials. Private API keys should not be added to the frontend.
- GSAP is being introduced gradually. Project cards, technology badges, and toolbox cards now use it, while simpler hover, hero visual, and section reveal effects still use CSS or small Svelte state changes.
- Project data is stored locally in TypeScript rather than pulled from a CMS. This is fast and simple, but content updates require a code change.
- Fonts are loaded from Google Fonts, which is convenient but adds an external request. Self-hosting fonts would give more control over loading behavior.
