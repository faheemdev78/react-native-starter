import { ApiError } from '@/services/api/errors';

export interface ApiClient {
  get<T>(path: string): Promise<T>;
}

type HttpClientOptions = {
  baseUrl: string;
  timeoutMs: number;
  fetchFn?: typeof fetch;
};

function joinUrl(baseUrl: string, path: string): string {
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
  const suffix = path.startsWith('/') ? path : `/${path}`;
  return `${base}${suffix}`;
}

/**
 * Fetch client kept beside the mock so a real host is a one-line swap.
 * This starter never calls it.
 */
export function createHttpClient(options: HttpClientOptions): ApiClient {
  const fetchFn = options.fetchFn ?? fetch;

  return {
    async get<T>(path: string): Promise<T> {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), options.timeoutMs);

      try {
        const response = await fetchFn(joinUrl(options.baseUrl, path), {
          method: 'GET',
          headers: { Accept: 'application/json' },
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new ApiError(`Request failed (${response.status}).`, response.status);
        }

        try {
          return (await response.json()) as T;
        } catch {
          throw new ApiError('The response was not valid JSON.', 500);
        }
      } catch (error) {
        if (error instanceof ApiError) {
          throw error;
        }
        if (error instanceof Error && error.name === 'AbortError') {
          throw new ApiError('The request timed out.', 408);
        }
        throw new ApiError('The network request failed.', 0);
      } finally {
        clearTimeout(timer);
      }
    },
  };
}
