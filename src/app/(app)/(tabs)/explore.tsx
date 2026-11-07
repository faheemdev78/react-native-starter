import { Link } from 'expo-router';
import { ActivityIndicator, Pressable, View } from 'react-native';

import { Badge, Card, Screen, StatusMessage, Text } from '@/components/ui';
import { useArticles } from '@/hooks/useArticles';
import { useTheme } from '@/theme';

export default function ExploreScreen() {
  const theme = useTheme();
  const articles = useArticles();

  const notes = articles.data ?? [];

  return (
    <Screen
      scroll
      testID="explore-screen"
      refreshing={articles.isRefetching && !articles.isPending}
      onRefresh={() => {
        void articles.refetch();
      }}
    >
      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="eyebrow" color="muted">
          Notes
        </Text>
        <Text variant="display">Field notes</Text>
        <Text variant="body" color="muted">
          Sample reading loaded through React Query. Pull to refresh the mock.
        </Text>
      </View>

      {articles.isPending ? (
        <ActivityIndicator color={theme.colors.accent} />
      ) : articles.isError ? (
        <StatusMessage
          title="The notes did not load"
          body="The mock client failed. Try the request again."
          actionLabel="Retry"
          onAction={() => {
            void articles.refetch();
          }}
        />
      ) : notes.length === 0 ? (
        <StatusMessage title="Nothing here yet" body="The mock list is empty." />
      ) : (
        <View style={{ gap: theme.spacing.md }}>
          {notes.map((article) => (
            <Link
              key={article.id}
              href={{ pathname: '/article/[id]', params: { id: article.id } }}
              asChild
            >
              <Pressable accessibilityRole="link">
                <Card>
                  <Badge label={article.topic} />
                  <Text variant="heading">{article.title}</Text>
                  <Text variant="body" color="muted">
                    {article.excerpt}
                  </Text>
                  <Text variant="caption" color="muted">
                    {article.readingMinutes} min · {article.publishedOn}
                  </Text>
                </Card>
              </Pressable>
            </Link>
          ))}
        </View>
      )}
    </Screen>
  );
}
