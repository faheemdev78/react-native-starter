import type { Article } from '@/services/api/types';

export const articles = [
  {
    id: 'auth-seam',
    title: 'Auth is a seam, not a screen',
    excerpt: 'Screens collect credentials. A service decides what they mean.',
    topic: 'Auth',
    readingMinutes: 3,
    publishedOn: '2026-02-12',
    body: [
      'Sign in, sign up, and password reset all call the same AuthService. The screens do not know that the current implementation is an in-memory map with a seeded recruiter account.',
      'The session token is opaque to the UI. It is stored with expo-secure-store on device and localStorage on web. Replacing the mock means implementing the interface and passing it to configureAuth.',
      'Password reset always returns the same sentence. The mock does not reveal whether an email is registered.',
    ].join('\n\n'),
  },
  {
    id: 'server-state',
    title: 'Server state does not belong in the client store',
    excerpt: 'Zustand keeps the session. React Query keeps everything that can be refetched.',
    topic: 'Data',
    readingMinutes: 4,
    publishedOn: '2026-03-03',
    body: [
      'The article list on Explore is a query, not a slice of global state. Loading, error, and refresh already have a home, and the cache key is the contract.',
      'The API layer is two pieces: an ApiClient that knows how to GET, and a resource module that parses the payload with Zod. The app is wired to a mock client. createHttpClient is the network version, unused on purpose.',
      'A real backend slots in by changing the client the articles provider receives. Screens keep calling useArticles.',
    ].join('\n\n'),
  },
  {
    id: 'theme-tokens',
    title: 'Name a color once',
    excerpt: 'Light and dark are a preference plus a palette, not a scatter of hex values.',
    topic: 'Theme',
    readingMinutes: 2,
    publishedOn: '2026-04-18',
    body: [
      'Components ask useTheme for ink, surface, and accent. They do not invent a third gray. The preference is system, light, or dark, and it is remembered with AsyncStorage.',
      'Navigation chrome reads the same tokens, so a stack header does not flash the default white bar when the rest of the app is paper or ink.',
    ].join('\n\n'),
  },
] as const satisfies readonly Article[];
