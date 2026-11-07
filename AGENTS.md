# Agent notes

This is an Expo SDK 58 app. Routes live in `src/app`. Shared code lives beside them under `src/`.

Before changing an Expo, Router, or React Native API, read the matching docs at `https://docs.expo.dev/versions/v58.0.0/`. SDK releases rename and remove APIs.

## Commands

```bash
npx expo install <package>   # use this for Expo and React Native packages
npm run lint
npm run typecheck
npm test
```

Do not add a real backend, secrets, or committed `.env` files. `EXPO_PUBLIC_` values are client-visible.

Native projects are generated. Do not commit `ios/` or `android/`. Change native behavior in `app.json`.
