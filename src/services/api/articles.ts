import { z } from 'zod';

import type { ApiClient } from '@/services/api/client';
import type { Article } from '@/services/api/types';

export const articleSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  body: z.string().min(1),
  topic: z.string().min(1),
  readingMinutes: z.number().int().positive(),
  publishedOn: z.string().min(1),
});

const articleListSchema = z.array(articleSchema);

export type ArticlesApi = {
  list(): Promise<Article[]>;
  getById(id: string): Promise<Article>;
};

export function createArticlesApi(client: ApiClient): ArticlesApi {
  return {
    async list() {
      const payload: unknown = await client.get('/articles');
      return articleListSchema.parse(payload);
    },
    async getById(id) {
      const payload: unknown = await client.get(`/articles/${encodeURIComponent(id)}`);
      return articleSchema.parse(payload);
    },
  };
}
