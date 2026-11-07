import { env } from '@/config/env';
import { createArticlesApi, type ArticlesApi } from '@/services/api/articles';
import { createHttpClient } from '@/services/api/client';
import { createMockApiClient } from '@/services/api/mock-client';

export const apiMeta = {
  baseUrl: env.apiUrl,
  timeoutMs: env.apiTimeoutMs,
  transport: 'mock' as const,
};

export const defaultArticlesApi: ArticlesApi = createArticlesApi(
  createMockApiClient({ latencyMs: 320 }),
);

/** Present so the network client stays compiled. The app does not call it. */
export function createLiveArticlesApi(): ArticlesApi {
  return createArticlesApi(
    createHttpClient({
      baseUrl: env.apiUrl,
      timeoutMs: env.apiTimeoutMs,
    }),
  );
}
