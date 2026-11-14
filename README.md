# TheHundredFold Digitals

Isaac Olusanya’s automation portfolio, built with **Astro, strict TypeScript and custom CSS**. The approved Founder’s Edition design, original symbol-only logo, portrait and motion are preserved.

## Development

Use Node.js 24 LTS (minimum supported version: 22.23.4).

```sh
npm ci
npm run dev
```

The development preview runs at http://127.0.0.1:4174. For production validation:

```sh
npm run build
npm run preview
```

`build` runs Astro’s TypeScript checker before generating static pages in `dist/`.

## Structure

- `src/components/`: reusable page sections and case-study content.
- `src/layouts/BaseLayout.astro`: shared page metadata, stylesheet and motion script.
- `src/data/site.ts`: email, WhatsApp and brand information.
- `src/data/projects.ts`: typed project summaries and route slugs.
- `src/pages/`: homepage, project route and custom 404 page.
- `src/scripts/`: typed walkthrough controls, animations and DOM helpers.
- `src/styles/global.css`: custom editorial design and responsive styles.
- `public/assets/`: original supplied logo mark and portrait, copied without retouching.

The main case study lives at `/projects/care-outreach-automation/`. Its detailed content is shared with the homepage’s case-study dialog. To add another project, extend the typed project data and supply its own detail content before publishing it. Component demos are parts of one real system, not unrelated client projects.

## Contact and safety boundaries

Email opens `thehundredfolddigitals.isaac@gmail.com`; WhatsApp opens `https://wa.me/2349016775844`. These are direct contact links; there is no form backend or visitor tracking. Google Fonts supplies the display/body fonts with local font fallbacks.

The interactive walkthrough uses fictional data in the browser. It cannot access Gmail, n8n, lead records or live sending. No credentials or private workflow exports are included. Motion respects the operating system’s reduced-motion preference by default and provides a footer opt-in/pause control, remembered locally.

## GitHub and Vercel

Create a **new repository containing only this folder**. Do not publish the parent workspace, which includes private operational files. Commit `package-lock.json`; keep generated output, environment files and dependencies ignored.

On Vercel, choose the **Astro** framework, use `npm run build`, and publish `dist`. No VPS or server adapter is needed for this static portfolio. The Hostinger n8n server remains separate. Set the final site URL and canonical/social URLs when the production domain is selected.

Recordings and public workflow downloads remain pending privacy review. No results, recordings, testimonials or third-party client commissions have been fabricated.
