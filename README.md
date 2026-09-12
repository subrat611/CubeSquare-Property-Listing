# CubeSquare Property Listing Experience

## Tech Stack

- React.js + Vite
- TypeScript
- Bootstrap 5 + Sass
- Tanstack Query (React Query)

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
