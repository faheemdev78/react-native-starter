# React Native Starter

A production-shaped Expo app for reading, not for wiring up a backend. It is the starter I use to show how a React Native codebase is organized before product code arrives: typed boundaries, a mockable auth service, and CI that fails closed.

Built by [faheemdev78](https://github.com/faheemdev78), a senior full-stack developer and technical lead.

[![CI](https://github.com/faheemdev78/react-native-starter/actions/workflows/ci.yml/badge.svg)](https://github.com/faheemdev78/react-native-starter/actions/workflows/ci.yml)
[![Expo SDK](https://img.shields.io/badge/Expo_SDK-58-000020?logo=expo&logoColor=white)](https://docs.expo.dev/)
[![React Native](https://img.shields.io/badge/React_Native-0.88-61DAFB?logo=react&logoColor=black)](https://reactnative.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-strict-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Query](https://img.shields.io/badge/TanStack_Query-5-FF4154?logo=reactquery&logoColor=white)](https://tanstack.com/query)
[![Zustand](https://img.shields.io/badge/Zustand-5-443E38)](https://zustand.docs.pmnd.rs/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

## Features

- Expo Router navigation: a root stack, an auth stack, and a tab navigator inside the signed-in stack, plus a pushed note screen
- Auth flow with sign in, sign up, and forgot password
- Auth behind an `AuthService` interface. The only implementation is an in-memory mock
- Session token stored with `expo-secure-store` on device and `localStorage` on web
- Light, dark, and system theme, remembered on device
- Zustand for client state (session and theme). TanStack Query for server state
- Example API layer: a fetch client, a mock client, and a Zod-parsed articles resource
- Forms validated with React Hook Form and Zod
- Reusable UI: screen, text, button, text field, card, badge
- Public environment config via `EXPO_PUBLIC_*` values, with safe defaults
- ESLint, Prettier, Jest, and React Native Testing Library
- GitHub Actions workflow for lint, typecheck, and test

There is no real backend and no secret material. `EXPO_PUBLIC_` values are bundled into the client, so the example file only contains public placeholders.

## Tech stack

| Area            | Choice                                                       |
| --------------- | ------------------------------------------------------------ |
| Runtime         | Expo SDK 58, React Native 0.88, React 19                     |
| Language        | TypeScript in `strict` mode, plus `noUncheckedIndexedAccess` |
| Navigation      | Expo Router (stack and tabs)                                 |
| Client state    | Zustand                                                      |
| Server state    | TanStack Query                                               |
| Forms           | React Hook Form and Zod                                      |
| Tests           | Jest 30 and React Native Testing Library 14                  |
| Lint and format | ESLint (Expo flat config) and Prettier                       |

## Quick start

Requires Node.js 22 or newer.

```bash
git clone https://github.com/faheemdev78/react-native-starter.git
cd react-native-starter
npm install
cp .env.example .env
npm start
```

Then press `i` for iOS, `a` for Android, or `w` for web. The iOS simulator needs macOS. Android and web work from any desktop, and Expo Go can open the dev server on a device.

### Demo account

The sign-in screen can fill this in for you. It is a seeded user in the mock service, not a credential for anything real.

| Field    | Value                   |
| -------- | ----------------------- |
| Email    | `recruiter@example.com` |
| Password | `password123`           |

Sign-up accounts live in memory for the session. The seeded account is always there. Password reset returns one generic sentence and does not send email.

## Scripts

| Script                  | What it does                     |
| ----------------------- | -------------------------------- |
| `npm start`             | Start the Expo dev server        |
| `npm run ios`           | Open the iOS simulator           |
| `npm run android`       | Open an Android emulator         |
| `npm run web`           | Open the web build               |
| `npm run lint`          | ESLint via `expo lint`           |
| `npm run lint:fix`      | ESLint with autofix              |
| `npm run format`        | Write Prettier formatting        |
| `npm run format:check`  | Check formatting without writing |
| `npm run typecheck`     | `tsc --noEmit`                   |
| `npm test`              | Jest in CI mode                  |
| `npm run test:watch`    | Jest in watch mode               |
| `npm run test:coverage` | Jest with a coverage report      |

## Folder structure

```text
src/
  app/                         Expo Router screens
    _layout.tsx                Root stack, providers, auth guards
    (auth)/                    Sign in, sign up, forgot password
    (app)/
      (tabs)/                  Home, notes, profile
      article/[id].tsx         Stack screen pushed from a note
  components/ui/               Shared visual primitives
  components/theme/            Appearance control
  config/                      Public environment parsing
  features/auth/               Auth service, mock, schemas, session storage
  hooks/                       React Query hooks
  providers/                   Query client and app providers
  services/api/                HTTP client, mock client, article resource
  stores/                      Zustand stores
  theme/                       Palette, preference, navigation chrome
.github/workflows/ci.yml       Lint, typecheck, test
```

Routes live in `src/app`. Everything else stays out of the router so a screen file is only a screen.

## Architecture notes

**Navigation.** The root layout is a stack. Signed-in routes live in the `(app)` group: tabs for Home, Notes, and Profile, and a stack screen for a note. Signed-out routes live in `(auth)`. Expo Router protected routes send each side to a real path (`/sign-in` or `/`). The sign-in screen is not mounted at `/`, which avoids an SDK 58 redirect loop where a guarded index and the fallback share the same URL.

**Auth is an interface.** Screens call `useAuthStore`. The store calls `AuthService` and `SessionStorage`. `createMockAuthService` is the default. `configureAuth` swaps either dependency without editing a screen. Tokens are opaque to the UI. The mock token is a marked payload so a reload can restore the profile. It is not a JWT and it is not signed.

**Two kinds of state.** Zustand holds the session and the theme preference. TanStack Query holds the notes. The articles hook reads an `ArticlesApi` from context. The default API is `createArticlesApi(createMockApiClient())`. `createHttpClient` is the fetch implementation, wired through `createLiveArticlesApi` and not called by the app. Pointing the provider at the live client is the whole cutover. Responses are parsed with Zod at the resource boundary.

**Theme.** One palette, two schemes. Components read `useTheme()` and do not hard-code colors. The preference is `system`, `light`, or `dark`, stored with AsyncStorage. Navigation headers use the same tokens.

**Environment.** `src/config/env.ts` reads `EXPO_PUBLIC_APP_ENV`, `EXPO_PUBLIC_API_URL`, and `EXPO_PUBLIC_API_TIMEOUT_MS` with static `process.env` access so Expo can inline them. Missing values fall back to development defaults, so the app runs with no `.env` file. Do not put secrets in `EXPO_PUBLIC_` variables. They ship inside the bundle.

**Tests.** Jest uses the `jest-expo` preset. Component tests render through the theme provider. Service and schema tests do not mount React. The auth and theme stores are reset in `jest.setup.ts` with in-memory storage so a test never touches secure storage or the network.

## License

[MIT](LICENSE)
