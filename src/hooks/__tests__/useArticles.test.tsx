import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { renderHook, waitFor } from '@testing-library/react-native';
import type { ReactNode } from 'react';

import { useArticle, useArticles } from '@/hooks/useArticles';
import { createArticlesApi } from '@/services/api/articles';
import { createMockApiClient } from '@/services/api/mock-client';
import { ArticlesApiProvider } from '@/services/api/provider';

function createWrapper() {
  const client = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        gcTime: Infinity,
      },
    },
  });
  const api = createArticlesApi(createMockApiClient());

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <QueryClientProvider client={client}>
        <ArticlesApiProvider api={api}>{children}</ArticlesApiProvider>
      </QueryClientProvider>
    );
  }

  return { Wrapper, client };
}

describe('article hooks', () => {
  it('loads the mock notes', async () => {
    const { Wrapper, client } = createWrapper();
    const { result, unmount } = await renderHook(() => useArticles(), { wrapper: Wrapper });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.length).toBeGreaterThan(0);
    client.clear();
    await unmount();
  });

  it('loads one note by id', async () => {
    const { Wrapper, client } = createWrapper();
    const { result, unmount } = await renderHook(() => useArticle('auth-seam'), {
      wrapper: Wrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(result.current.data?.title).toContain('Auth');
    client.clear();
    await unmount();
  });
});
