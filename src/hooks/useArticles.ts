import { useQuery } from '@tanstack/react-query';

import { useArticlesApi } from '@/services/api/provider';

export function useArticles() {
  const api = useArticlesApi();
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => api.list(),
  });
}

export function useArticle(id: string) {
  const api = useArticlesApi();
  return useQuery({
    queryKey: ['articles', id],
    queryFn: () => api.getById(id),
    enabled: id.length > 0,
  });
}
