import { useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import { Badge, Screen, StatusMessage, Text } from '@/components/ui';
import { useArticle } from '@/hooks/useArticles';
import { ApiError } from '@/services/api/errors';
import { useTheme } from '@/theme';

function readId(value: string | string[] | undefined): string {
  if (Array.isArray(value)) {
    return value[0] ?? '';
  }
  return value ?? '';
}

export default function ArticleScreen() {
  const theme = useTheme();
  const params = useLocalSearchParams<{ id?: string | string[] }>();
  const articleId = readId(params.id);
  const article = useArticle(articleId);
  const missing = article.error instanceof ApiError && article.error.status === 404;

  return (
    <Screen scroll topInset={false} testID="article-screen">
      {article.isPending ? (
        <ActivityIndicator color={theme.colors.accent} />
      ) : article.isError ? (
        <StatusMessage
          title={missing ? 'Note not found' : 'The note did not load'}
          body={missing ? 'That id is not in the mock library.' : 'Try the request again.'}
          actionLabel={missing ? undefined : 'Retry'}
          onAction={
            missing
              ? undefined
              : () => {
                  void article.refetch();
                }
          }
        />
      ) : article.data ? (
        <View style={{ gap: theme.spacing.lg }}>
          <Badge label={article.data.topic} />
          <Text variant="display">{article.data.title}</Text>
          <Text variant="caption" color="muted">
            {article.data.readingMinutes} min · {article.data.publishedOn}
          </Text>
          {article.data.body.split('\n\n').map((paragraph) => (
            <Text key={paragraph.slice(0, 32)} variant="body">
              {paragraph}
            </Text>
          ))}
        </View>
      ) : (
        <StatusMessage title="Note not found" body="That id is not in the mock library." />
      )}
    </Screen>
  );
}
