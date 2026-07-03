# BuildCraft Constructions - Developer Documentation

Welcome to the internal developer guide for the **BuildCraft Constructions** premium React web application. This document serves as the guide for the code architecture, styles modularization, and future CRM/CMS API connections.

---

## 📂 1. PROJECT DIRECTORY ARCHITECTURE

```bash
urvi_project/
├── dev_documentation.md    # Developer guide details (This file)
├── src/
│   ├── components/         # Reusable layouts & UI components
│   │   ├── common/         # Error fallback states, loading spinners
│   │   ├── cards/          # Generic visual cards
│   │   ├── layout/         # Announce bars, sticky navbars, footers
│   │   └── ui/             # Accordion widgets, quote forms
│   ├── config/             # Brand details
│   ├── data/               # Mapped JSON datasets (projects, blogs, FAQs)
│   ├── hooks/              # Custom hooks (e.g. viewport listeners)
│   ├── pages/              # Routed pages (Home, About, Services, Packages)
│   └── routes/             # Lazy-loaded router setups
```

---

## 🎨 2. BRAND COLOR & DESIGN TOKENS (`src/styles/`)

We coordinate colors via HSL custom variables inside `theme.css`.
* **Primary Obsidians**: `--bg-primary` (`#0D0E12`), `--bg-secondary` (`#13141C`) represent high-end Obsidian backings.
* **Champagne Gold borders**: `--accent` (`#D4AF37`) defines luxury outline margins.
* **Layout Radii**: Custom variable bounds (`--radius-sm`, `--radius-md`, `--radius-circular`) maintain consistency.
* **Animations**: Consistent transitions (`--transition-normal: 0.3s ease`) ensure smooth visual effects.

---

## 🚦 3. LAZY-LOADED ROUTING SYSTEM (`src/routes/`)

We split route chunks using standard dynamic imports under `React.lazy` inside the React `Suspense` framework.
```javascript
const Packages = React.lazy(() => import('../pages/Packages'));
const PackageDetail = React.lazy(() => import('../pages/PackageDetail'));
```
Dynamic parameters (`/packages/:id`, `/projects/:id`) query localized datasets via `useParams()`.

---

## 📋 4. LEAD CAPTURE & MULTI-FORM SWITCHERS

* **Form controller tabs**: Switching active contact modes (`Inquiry`, `Quotation`, `Consulting`, `Site Visit`) manages state locally within `<Contact>`.
* **Thank-You Confirmation**: Success messages appear automatically upon submission, confirming next steps.
* **Future CRM integrations**: Target submission handlers (e.g., `handleFormSubmit`) are set up for future REST/GraphQL API connections.

---

## 🛠️ 5. INTERACTIVE UX ELEMENTS

* **Table of Contents (TOC) Tracker**: Uses vertical window scroll event listeners (`handleScroll`) to check bounding boxes of article headings and highlight the active anchor link.
* **Reading Progress Bar**: Updates a fixed viewport-top progress bar (`styles.progressBar`) width based on scroll percentages.
* **Material Partner Grayscale Hovers**: CSS filters (`filter: grayscale(100%); opacity: 0.6;`) transition to color (`grayscale(0%); opacity: 1;`) on mouse entry.

---

## 🚀 6. SCALABILITY FOR FUTURE DEVELOPERS

1. **Changing Content**: Edit Javascript files inside `src/data/` (e.g., `packagesData.js`, `projectsData.js`) to update text or prices without changing components.
2. **Replacing Media Assets**: Update URL targets in `src/pages/` components with live CDN URLs or WebP assets.
3. **Connecting CRM Handovers**: Replace mock form submission states in `InquiryForm` and `Contact/index.jsx` with active `fetch()` calls post-validation.
