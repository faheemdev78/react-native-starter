import { createContext, useContext, type ReactNode } from 'react';

import type { ArticlesApi } from '@/services/api/articles';
import { defaultArticlesApi } from '@/services/api/instance';

const ArticlesApiContext = createContext<ArticlesApi | null>(null);

type ArticlesApiProviderProps = {
  children: ReactNode;
  api?: ArticlesApi;
};

export function ArticlesApiProvider({
  children,
  api = defaultArticlesApi,
}: ArticlesApiProviderProps) {
  return <ArticlesApiContext.Provider value={api}>{children}</ArticlesApiContext.Provider>;
}

export function useArticlesApi(): ArticlesApi {
  const api = useContext(ArticlesApiContext);
  if (!api) {
    throw new Error('useArticlesApi must be used within ArticlesApiProvider');
  }
  return api;
}
