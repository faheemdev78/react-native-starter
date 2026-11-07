import { createArticlesApi } from '@/services/api/articles';
import { createHttpClient } from '@/services/api/client';
import { ApiError } from '@/services/api/errors';
import { createMockApiClient } from '@/services/api/mock-client';

const article = {
  id: 'note-1',
  title: 'A note',
  excerpt: 'Short',
  body: 'Longer body',
  topic: 'Data',
  readingMinutes: 2,
  publishedOn: '2026-01-01',
};

describe('API clients', () => {
  it('returns JSON from the http client', async () => {
    const fetchFn = jest.fn(async () => {
      return {
        ok: true,
        status: 200,
        json: async () => [article],
      } as Response;
    });

    const client = createHttpClient({
      baseUrl: 'https://api.example.com/',
      timeoutMs: 1000,
      fetchFn: fetchFn as typeof fetch,
    });

    await expect(client.get('/articles')).resolves.toEqual([article]);
    expect(fetchFn).toHaveBeenCalledWith(
      'https://api.example.com/articles',
      expect.objectContaining({ method: 'GET' }),
    );
  });

  it('turns a failed response and a timeout into ApiError', async () => {
    const failing = createHttpClient({
      baseUrl: 'https://api.example.com',
      timeoutMs: 1000,
      fetchFn: jest.fn(async () => {
        return {
          ok: false,
          status: 503,
          json: async () => ({}),
        } as Response;
      }) as typeof fetch,
    });

    await expect(failing.get('/articles')).rejects.toMatchObject({ status: 503 });

    const timingOut = createHttpClient({
      baseUrl: 'https://api.example.com',
      timeoutMs: 10,
      fetchFn: (_input, init) =>
        new Promise((_resolve, reject) => {
          init?.signal?.addEventListener('abort', () => {
            const error = new Error('Aborted');
            error.name = 'AbortError';
            reject(error);
          });
        }),
    });

    await expect(timingOut.get('/articles')).rejects.toBeInstanceOf(ApiError);
  });

  it('parses mock articles and rejects an unknown id', async () => {
    const api = createArticlesApi(createMockApiClient());
    const notes = await api.list();

    expect(notes.length).toBeGreaterThan(0);
    const first = notes[0];
    expect(first).toBeDefined();
    if (first) {
      await expect(api.getById(first.id)).resolves.toMatchObject({ id: first.id });
    }
    await expect(api.getById('missing')).rejects.toBeInstanceOf(ApiError);
  });

  it('rejects a payload that does not match the article schema', async () => {
    const api = createArticlesApi({
      async get<T>(): Promise<T> {
        return { id: '' } as T;
      },
    });

    await expect(api.list()).rejects.toThrow();
  });
});
