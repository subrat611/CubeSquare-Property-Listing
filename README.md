# CubeSquare Property Listing Experience

I have deployed this site on netlify: Do visit [https://cubesquare.netlify.app/](https://cubesquare.netlify.app/)

## Tech Stack

- React.js + Vite
- TypeScript
- Bootstrap 5 + Sass
- Tanstack Query (React Query)

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:
   `npm run dev`

3. Open http://localhost:5173 to view the application.

## Folder Structure

I followed a feature driven folder structure, that can scale well from mid to enterprise applications.

```text
src/
├── api/                # Global infrastructure only (e.g., base clients, global auth)
├── components/         # Shared, generic UI components
│   ├── PropertyCard/
│   │   └── PropertyCard.tsx
│   └── KYCStatusBanner/
│       └── KYCStatusBanner.tsx
├── features/           # Feature-based domain logic
│   └── properties/
│       ├── api/        # Co-located fetchers and TanStack Query hooks (e.g., getProperties.ts)
│       ├── components/ # Feature specific components (e.g., FilterPanel.tsx, PropertyGrid.tsx)
│       ├── hooks/      # Feature specific local UI hooks
│       ├── types.ts    # Domain-specific types
│       └── index.ts    # Public API barrel file for cross-feature imports
├── pages/              # Page level composition
│   └── PropertyListingPage.tsx
├── styles/             # CSS Governance and Bootstrap theming
│   ├── _variables.scss # Bootstrap variable overrides (colors, fonts, radius so on)
│   └── main.scss       # Main entry point for styles
├── types/              # Global TypeScript definitions
├── utils/              # Pure helper functions
├── App.tsx             # Root component (Providers)
└── main.tsx
```

## Architectural Decisions & Trade-offs

### 1. Co-location of Fetchers and React Query Hooks

Instead of splitting API requests into multiple files (e.g. one file for the pure fetcher and another for the TanStack Query hook), both are co-located in a single file per operation (e.g., `src/features/properties/api/getProperties.ts`).

- **Trade-off:** Slightly mixes React-specific code (`useQuery`) with pure async functions.
- **Benefit:** Eliminates file bloat and ensures high cohesion. When an endpoint changes, you only touch a single file to update the fetcher, the query key and the hook.

### 2. Feature-based Data Ownership & Barrel Files

Rather than keeping all API hooks in a root `src/api/` folder, each feature (e.g. `properties`) owns its fetching logic inside `src/features/<feature>/api/`. If another feature needs this data, it imports the hook via the feature's barrel file (`src/features/properties/index.ts`).

- **Trade-off:** Developers cannot look in one central folder to see every single network call the app makes.
- **Benefit:** Highly decoupled modules. The root `src/api/` is kept clean and is reserved _only_ for global, cross-cutting concerns (like the base Axios client, global mock data setup, authentication state, or app-wide configurations).

## CSS Governance note

### How to support white-label theming for multi operatiors client

We enforce utility classes over hardcodes CSS, we utilize Bootstrap 5 CSS custom properties (e.g `--bs-*`). To support white labeling for multiple operators we do not need to compile the sass codebase for every client instead we can inject dynamic css payload into `:root` at runtime from `server/config`.

Our components contains no hardcoded CSS, the entire applicaiton will dynamically inherit the operator specific `--bs-*` tokens.

### 3. Resiliency & Fake Network Failures

To properly demonstrate React Query's error handling and retry mechanisms, the `getProperties.ts` mock fetcher contains a deliberate 25% failure rate. This simulates real-world network instability and triggers the `PropertyErrorState` component, allowing the user to click 'Retry' which invokes TanStack Query's `refetch` method.

## App Testing

`npm run dev` or `npm run build` + `npm run preview`

Open http://localhost:5173 and just do a final sanity check:

1. Does the initial load show the skeleton cards?
2. Does the location dropdown filter correctly?
3. Does typing 7.2 in the yield box filter the cards?
4. Does typing 99 show our premium Empty State?
5. Does clicking "Reset filters" bring the cards back?

## AI Usage Review

Tool used: Google Gemini (Antigravity)

During this assessment, I utilized an AI pair-programming assistant to accelerate boilerplate generation, scaffold the Vite/TypeScript environment, and code review.

**What Worked Well:**

The AI was exceptional at scaffolding the feature-based folder architecture (`src/features/...`) and rapidly generating the native HTML5 boilerplate, such as the `PropertyCardSkeleton` component. When provided with a visual reference, the AI effectively translated the layout into strict Bootstrap 5 utility classes without resorting to custom CSS.

**Where AI Failed:**

- Sass Over-engineering: The AI initially attempted to cherry-pick every individual Bootstrap SCSS module to optimize  
  bundle size. I had to reject this approach; in a timeboxed environment, maintaining a cherry-picked list risks missing core dependencies. I enforced a simpler, safer global import strategy.

- Feature Creep: When building the `PropertyFilterPanel`, the AI attempted to introduce complex UX paradigms (like native datalists and search buttons) that were not requested. I had to explicitly reign the AI in, instructing it to revert to the strict requirements of the prompt: a simple `<select>` dropdown and a numeric `<input>`.
