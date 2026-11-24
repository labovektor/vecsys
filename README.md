# VecSys

Event management platform for HIMATIKA Vektor. A Next.js frontend for organizing events, managing participants, and letting participants complete their registration and payment flow.

The app is a pure client-side frontend; all data comes from a separate backend API (default `http://localhost:8787`).

## Features

- **Public event lookup** — enter an event code on the home page to reach that event's pages.
- **Admin dashboard** (`/dashboard`) — event CRUD, participant management, charts, and per-event settings (categories, regions, institutions, vouchers/referrals, payment options).
- **Participant area** (`/e/[code]`) — register/login, then complete a step-by-step flow:
  - Profile verification → pick category/region → pick payment option → submit payment.
  - After verification: pick institution → fill team biodata → lock data (final).
- **Participant export** — download participant data and cards (XLSX / generated cards).

## Tech Stack

- **Framework:** Next.js 16 (App Router, Turbopack), React 19
- **Language:** TypeScript (strict)
- **Styling:** Tailwind CSS 3, shadcn/ui components on Radix UI primitives
- **Data:** Axios + TanStack Query (server state), React Hook Form + Zod (forms/validation), TanStack Table (tables)
- **Other:** Recharts (charts), Sonner (toasts), date-fns, json-as-xlsx, react-qr-code, lucide-react
- **Tooling:** ESLint 9 (`eslint-config-next`), Prettier, npm

## Getting Started

Requires Node.js 22+ and npm.

```bash
npm install
# add API_URL / ENV to .env.local (see below)
npm run dev
```

Open http://localhost:3000.

### Environment Variables

| Variable  | Default                 | Description                                  |
| --------- | ----------------------- | -------------------------------------------- |
| `API_URL` | `http://localhost:8787` | Base URL of the backend API                  |
| `ENV`     | `development`           | `development` \| `testing` \| `production`   |

The browser never reads these directly. `src/app/api/config/route.ts` exposes `API_URL` at runtime via `GET /api/config`, and the Axios instance (`src/axios/axios.ts`) caches it as its `baseURL`. This allows one Docker image to be deployed against different backends.

## Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `npm run dev`    | Start dev server (Turbopack)             |
| `npm run build`  | Production build (standalone output)     |
| `npm start`      | Run the production server                |
| `npm run lint`   | Run ESLint                               |
| `npm run lint:fix` | Run ESLint with `--fix`                |
| `npm run check`  | Prettier write + ESLint fix              |

There is no test framework configured.

## Architecture

```
src/
├── app/            Next.js App Router routes
│   ├── page.tsx                      Public landing / event code lookup
│   ├── (auth)/login/                 Admin login
│   ├── dashboard/                    Admin area (sidebar layout, auth provider)
│   ├── e/[code]/                     Per-event participant area
│   │   ├── (auth)/                   login, register, forgot/reset password
│   │   └── administration/           Participant registration flow
│   └── api/config/                   Runtime API base URL endpoint
├── axios/          Axios instance + request wrapper
├── components/     Shared components, shadcn/ui (`ui/`), tables
├── features/       Feature modules (see below)
├── hooks/          Shared hooks (current user, base URL, mobile)
├── lib/            Env validation, event theming/config, XLSX, assets, utils
└── provider/       React context providers (auth, participant, query client)
```

### Feature Modules

Each feature in `src/features/<name>/` follows the same layout:

- `dto.ts` — API response/request types
- `schema.ts` — Zod schemas
- `hooks/` — TanStack Query hooks (where present)
- `forms/` — create/edit/delete forms
- `components/` — columns, cards, UI pieces
- `kelola-*.tsx` — the management screen (tables + forms) used inside event tabs

Features: `auth`, `dashboard`, `event`, `event-category`, `event-instansi`, `event-payment`, `event-referral`, `event-region`, `participant`, `participant-administration`, `profile`.

### Data & Auth

- All API calls go through `handleRequest<T>(method, endpoint, body?, responseType?)` in `src/axios/request.ts`. It unwraps `response.data.data` and returns `{ data, error }` instead of throwing.
- Sessions are cookie-based (`withCredentials: true`); there is no token handling in the frontend.
- A 401 response interceptor redirects admins to `/login` and participants to `/e/[code]/login`.
- Admin auth state: `src/provider/auth-provider.tsx`. Participant auth state: `src/provider/participant-auth-provider.tsx`. Event metadata (per `code`): `src/provider/participant-page-provide.tsx`.
- Event-specific labels/theme live in `src/lib/event-config.ts` (e.g. OMVN maps category → "Jenjang & Kategori", region → "Rayon").

## Conventions

- UI copy is in Indonesian; code, comments, and types are in English.
- Feature code stays inside its feature folder; only true cross-feature UI goes in `src/components`.
- Forms: React Hook Form + `zodResolver`, with `Form` primitives from `src/components/ui/form.tsx`.
- Server data: TanStack Query, one hook per resource with a stable `queryKey` (e.g. `["categories", eventId]`).
- Use the `@/` path alias for `src/` and `@public/` for `public/`.
- `src/components/ui/**` is generated shadcn/ui code and is excluded from ESLint.

## Deployment

Multi-stage Docker build producing a Next.js standalone image (see `Dockerfile`). On every push to `main`, GitHub Actions builds and pushes:

- `ghcr.io/labovektor/vecsys:stable`
- `ghcr.io/labovektor/vecsys:<commit-sha>`

Run locally with Docker:

```bash
docker build -t vecsys .
docker run -p 3000:3000 -e API_URL=https://your-backend.example.com vecsys
```
