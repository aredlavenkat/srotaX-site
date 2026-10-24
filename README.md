# SrotaX public website

Static product website, served directly by the existing GitHub Pages workflow. No build step or framework runtime is required.

## Pages

- `index.html`: product overview, editor tour, shared capabilities, workspace model, and use cases.
- `guide.html`: practical authoring guide and the documented order fulfillment example.
- `architecture.html`: single-document architecture, compilation boundaries, and current capability status.
- `styles.css` / `site.js`: shared presentation, accessible tabs, responsive navigation, screenshot viewer, and sample-copy interaction.

## Product sources

Content was reconciled against the adjacent `srotax-studio` project and its running UI on October 2, 2026:

- `AGENTS.md` and `docs/APP_CONTEXT.md`: product direction and current terminology.
- ADRs 0001–0005: shared editors, single-document compilation, API-owned operator metadata, reusable Flow boundaries, and organisation/workspace membership.
- `src/App.tsx` and the Flow, Table, Tree, Contract, Reference Data, and Workspace components: implemented navigation and user flows.
- `src/api/decisions.ts`, `src/api/orderFulfillmentExamples.ts`, and `src/components/LookupReferenceConfig.tsx`: active service mode, example semantics, and lookup authoring.
- `docs/BACKEND_IMPLEMENTATION.md`, `docs/EXPRESSION_API.md`, `docs/REFERENCE_DATA_API.md`, and `examples/order-fulfillment/README.md`: backend boundaries and supported data shapes.

Older paragraphs in API docs sometimes describe now-completed frontend work as pending. Current code and the latest app-context updates take precedence. The website does not claim production runtime, authentication, or API availability based solely on frontend controls or adapters.

`assets/studio-*.jpg` are actual local Studio captures of seeded sample assets. `assets/studio-logo.png` is the existing Studio lockup. No user-authored rules were saved, published, or changed to create these images. Screenshots are static product illustrations, not embedded live admin controls.

## Preview

Serve this directory with any static HTTP server. A local preview is normally available at `http://127.0.0.1:8080/` during development. Open `index.html`, `guide.html`, and `architecture.html` through that server. The app on port 5174 is a separate project, not a website dependency.

The site uses Google Fonts with system fallbacks. All product images, scripts, and styles are local. Public CTAs open an email draft to the existing `hello@srotax.com` address; no submissions are sent automatically.

## Checks

- Run `node --check site.js` and `git diff --check`.
- Verify all three pages and internal anchors, plus every local image reference.
- Test tabs with arrows/Home/End, image dialogs with Escape and focus return, mobile menu, native details, and copying the sample request.
- Inspect desktop and mobile layouts; verify no horizontal page overflow.

Deployment remains the repository's existing push-to-main GitHub Pages workflow. Local editing does not deploy the website.

Screenshots refreshed from the running Studio on October 2, 2026. Editor captures focus on the feature canvas; lifecycle labels in Catalog retain their actual state. No assets were published or saved during capture. Image URLs include content hashes to refresh browser caches.

## Authoring UX refresh (2026-10-16)

The home page now includes a browser-only shipping decision example with explicit input/rule/output. It is not connected to a customer workspace. The walkthrough form opens a mailto draft and does not claim to submit a request. The guide describes change sets, Admin review/merge, Main releases, environment activation and API-key integration. The longer shipments example is the checked-in Studio fixture, not a promise of seeded data in new workspaces.

Preview on port 5180 when Management occupies 8080. Browser checks from the sibling Studio repo: `node scripts/public-site-ux-smoke.cjs` (requires its Playwright dependency and Chrome).

## Use-case library (2026-10-24)

`use-cases.html` lists nine business decision use cases and four application-integration scenarios. Industry filtering includes cross-industry examples. The homepage features four cases; navigation and footer links open the full library. Examples describe potential applications, not customer deployments or prebuilt templates. Integration scenarios distinguish rule evaluation from messaging, OCR, clinical systems, and bulk data orchestration. Only the existing fulfillment walkthrough is linked as a worked example.

### Screenshot refresh — 2026-10-24

Updated Flow, Decision Table, Decision Tree, Data Contract, and Catalog images from the latest Studio captures in `srotax-docs/docs/images`. Captured Reference Data directly from current Studio using the published sample regional handling fees. Preserved full headers, updated captions and intrinsic dimensions, and refreshed image cache keys.

### How it works — 2026-10-24

Replaced the detailed guide with a product overview covering editors, contracts and models, a shipping policy, reusable subflows, and release/integration. Detailed instructions link to docs.srotax.com. Navigation now says How it works; guide.html remains the page URL.

### Integration page — 2026-10-24

Replaced architecture content with Runtime API, Java HTTP integration, immutable inputs and Local/Output data, reusable dependencies, and release activation. Retained architecture.html URL and updated navigation. Direct engine embedding is not advertised as a verified integration.
