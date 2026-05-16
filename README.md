# Badilni — Frontend

User-facing frontend for the **Badilni** platform, built with React 19 and Vite.

🌐 **Live:** [badilni.github.io/badilni-frontend](https://badilni.github.io/badilni-frontend)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 19 |
| Build Tool | Vite 8 |
| Routing | React Router v7 |
| Styling | Tailwind CSS v4 |
| State Management | Zustand |
| Forms & Validation | React Hook Form + Zod |
| HTTP Client | Axios |
| Notifications | React Toastify |
| Icons | Font Awesome |
| Testing | Vitest + Testing Library |
| CI/CD | GitHub Actions → GitHub Pages |

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm

### Install & Run

```bash
# Clone the repo
git clone https://github.com/Badilni/badilni-frontend.git
cd badilni-frontend

# Install dependencies
npm install

# Start dev server
npm run dev

# Run test server
npm run test

# Format code
npm run format
```

The app will be available at `http://localhost:5173`.

---
 
## Available Scripts
 
```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run preview    # Preview production build locally
npm run lint       # Run ESLint
npm run test       # Run unit tests with Vitest
npm run deploy     # Build and deploy to GitHub Pages
npm run format     # Format all files in the src folder
```
 
---
 
## Folder Overview
 
| Folder | Description |
|---|---|
| `public/` | Static files served as-is — favicon and shared SVG icon sprites |
| `src/` | All application source code |
| `src/assets/` | Images and static media imported directly by components |
| `src/layout/` | App-level layout shell — the main wrapper component and the router config |
| `src/pages/` | One file per route/page — assembled from components, connected to the router |
| `src/components/` | All reusable UI components, grouped by feature domain |
| `src/components/common/` | Truly generic, domain-agnostic UI pieces used anywhere (Button, Spinner, etc.) |
| `src/components/layout/` | Structural UI always on screen — NavBar and Footer |
| `src/components/home/` | Components specific to the landing/home page sections |
| `src/components/listings/` | Components for displaying and creating/editing listings |
| `src/components/bookings/` | Components for displaying booking information |
| `src/components/reviews/` | Components for displaying and submitting reviews |
| `src/components/notifications/` | Components for rendering the user notification feed |
| `src/services/` | All Axios API call functions, one file per backend domain (auth, AI, etc.) |
| `src/store/` | Zustand global state stores, one file per concern |
| `src/hooks/` | Custom React hooks that encapsulate reusable stateful logic |
| `src/utils/` | Pure helper functions and shared Zod validation schemas |
| `src/__test__/` | Component unit tests written with Vitest + Testing Library |
| `src/test/` | Test configuration and global setup for the test environment |
| `.github/workflows/` | GitHub Actions CI/CD pipelines for deploy and testing |
| `.vscode/` | VS Code workspace settings to enforce formatting for all team members |
 
---
 
## Project Structure
 
```
badilni-frontend/
├── public/
│   ├── favicon.svg              # App favicon
│   └── icons.svg                # Shared SVG icon sprites
│
├── src/
│   ├── main.jsx                 # App entry point — mounts React root, imports global CSS
│   ├── App.jsx                  # Root component — wraps app with providers (router, toast, theme)
│   ├── App.css                  # Root-level styles
│   ├── index.css                # Global CSS resets and Tailwind base styles
│   │
│   ├── assets/
│   │   ├── hero.png             # Hero section image for the landing page
│   │   ├── react.svg            # React logo (default Vite asset)
│   │   └── vite.svg             # Vite logo (default Vite asset)
│   │
│   ├── layout/
│   │   ├── MainLayout.jsx       # Shared page wrapper — renders NavBar + <Outlet> + Footer
│   │   └── router.jsx           # React Router config — defines all app routes
│   │
│   ├── pages/
│   │   └── Home.jsx             # Home page — composes FirstSection + SecondSection
│   │
│   ├── components/
│   │   ├── common/
│   │   │   ├── Button.jsx       # Reusable button component with variant/size props
│   │   │   └── Spinner.jsx      # Loading spinner used during async operations
│   │   │
│   │   ├── layout/
│   │   │   ├── NavBar.jsx       # Top navigation bar — links, auth state, theme toggle
│   │   │   └── Footer.jsx       # Page footer — links and branding
│   │   │
│   │   ├── home/
│   │   │   ├── FirstSection.jsx  # Landing hero section — headline, CTA, hero image
│   │   │   └── SecondSection.jsx # Landing features/highlights section
│   │   │
│   │   ├── listings/
│   │   │   ├── ListingCard.jsx  # Card component displaying a single listing preview
│   │   │   └── ListingForm.jsx  # Form to create or edit a listing (React Hook Form + Zod)
│   │   │
│   │   ├── bookings/
│   │   │   └── BookingCard.jsx  # Card displaying a booking summary for the user
│   │   │
│   │   ├── reviews/
│   │   │   ├── ReviewCard.jsx   # Displays a single user review with rating
│   │   │   └── ReviewForm.jsx   # Form to submit a review (React Hook Form + Zod)
│   │   │
│   │   └── notifications/
│   │       └── NotificationFeed.jsx  # Renders the list of user notifications
│   │
│   ├── services/
│   │   ├── authentication.js    # Axios calls for login, register, logout, token refresh
│   │   └── aiService.js         # Axios calls to AI-related backend endpoints
│   │
│   ├── store/
│   │   └── themeStore.js        # Zustand store — manages dark/light theme state
│   │
│   ├── hooks/
│   │   └── useLocalStorageState.js  # Custom hook — syncs React state with localStorage
│   │
│   ├── utils/
│   │   ├── helper.js            # General utility/helper functions (formatting, parsing, etc.)
│   │   └── validationSchema.js  # Zod schemas shared across forms
│   │
│   ├── __test__/
│   │   └── Home.test.jsx        # Unit tests for the Home page component
│   │
│   └── test/
│       └── setupTests.js        # Vitest + Testing Library global test setup
│
├── .github/
│   └── workflows/
│       ├── deploy.yml           # CI/CD — builds and deploys to GitHub Pages on push to main
│       └── unit-testing.yml     # CI — runs Vitest on push and pull requests to main
│
├── .vscode/
│   └── settings.json            # VS Code workspace settings for consistent formatting
│
├── .editorconfig                # Editor-agnostic formatting rules (indent, charset, EOL)
├── .prettierrc                  # Prettier formatting config
├── index.html                   # HTML shell — Vite entry, mounts #root div
├── vite.config.js               # Vite config — plugins, base path for GitHub Pages
├── eslint.config.js             # ESLint flat config — React hooks + refresh rules
├── package.json                 # Dependencies and npm scripts
└── .gitignore                   # Ignores node_modules, dist, editor files
```
 
---

## Deployment

The project is automatically deployed to GitHub Pages on every push to `main` via the `Deploy Badilni to GitHub Pages` workflow.

### ⚠️ Required: `vite.config.js` base path

Because the app is served from a sub-path (`/badilni-frontend/`), `vite.config.js` **must** include:

```js
export default defineConfig({
  plugins: [react()],
  base: '/badilni-frontend/',
})
```

### Without this, the deployed site will show a blank page.


---

## CI/CD Workflows

| Workflow | Trigger | What it does |
|---|---|---|
| `deploy.yml` | Push to `main` | Builds the app and publishes to `gh-pages` branch |
| `unit-testing.yml` | Push to `main` | Runs Vitest unit tests |

---

## License

This project is private. All rights reserved by the Badilni team.
