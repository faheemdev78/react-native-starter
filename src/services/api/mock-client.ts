import { delay } from '@/lib/delay';
import type { ApiClient } from '@/services/api/client';
import { ApiError } from '@/services/api/errors';
import { articles } from '@/services/api/fixtures';

type MockClientOptions = {
  latencyMs?: number;
};

export function createMockApiClient(options?: MockClientOptions): ApiClient {
  const latencyMs = options?.latencyMs ?? 0;

  return {
    async get<T>(path: string): Promise<T> {
      if (latencyMs > 0) {
        await delay(latencyMs);
      }

      if (path === '/articles') {
        return articles as T;
      }

      const prefix = '/articles/';
      if (path.startsWith(prefix)) {
        const id = decodeURIComponent(path.slice(prefix.length));
        const article = articles.find((item) => item.id === id);
        if (!article) {
          throw new ApiError('That note could not be found.', 404);
        }
        return article as T;
      }

      throw new ApiError(`No mock handler for ${path}.`, 404);
    },
  };
}
