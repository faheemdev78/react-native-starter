export const principles = [
  {
    title: 'Auth is an interface',
    body: 'Screens talk to a service. The mock is the only implementation in this repo.',
  },
  {
    title: 'Split the state',
    body: 'Zustand holds the session and theme. React Query holds data that can be refetched.',
  },
  {
    title: 'Tokens, not stray hex',
    body: 'Light and dark come from one palette. Components do not invent colors.',
  },
] as const;
