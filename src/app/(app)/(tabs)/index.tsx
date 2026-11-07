import { Link } from 'expo-router';
import { Pressable, View } from 'react-native';

import { Badge, Card, Screen, Text } from '@/components/ui';
import { env } from '@/config/env';
import { principles } from '@/content/principles';
import { useArticles } from '@/hooks/useArticles';
import { apiMeta } from '@/services/api/instance';
import { useAuthStore } from '@/stores/auth-store';
import { useTheme } from '@/theme';

function greetingName(name: string): string {
  const [head] = name.trim().split(/\s+/);
  return head && head.length > 0 ? head : 'there';
}

export default function HomeScreen() {
  const theme = useTheme();
  const session = useAuthStore((state) => state.session);
  const articles = useArticles();
  const featured = articles.data?.[0];

  return (
    <Screen scroll testID="home-screen">
      <View style={{ gap: theme.spacing.sm }}>
        <Text variant="eyebrow" color="muted">
          Workspace
        </Text>
        <Text variant="display">Hello, {greetingName(session?.user.name ?? '')}</Text>
        <Text variant="body" color="muted">
          A typed starter for product work. Auth, theme, and server state each sit behind a boundary
          you can replace.
        </Text>
      </View>

      <Card>
        <MetaRow label="Environment" value={env.appEnv} />
        <MetaRow label="API host" value={apiMeta.baseUrl} mono />
        <MetaRow label="Transport" value="In-memory mock" />
      </Card>

      <View style={{ gap: theme.spacing.md }}>
        <Text variant="heading">How this app is put together</Text>
        {principles.map((principle) => (
          <Card key={principle.title}>
            <Text variant="label">{principle.title}</Text>
            <Text variant="body" color="muted">
              {principle.body}
            </Text>
          </Card>
        ))}
      </View>

      {featured ? (
        <Link href={{ pathname: '/article/[id]', params: { id: featured.id } }} asChild>
          <Pressable accessibilityRole="link">
            <Card>
              <Badge label={featured.topic} />
              <Text variant="heading">{featured.title}</Text>
              <Text variant="caption" color="muted">
                {featured.readingMinutes} min read
              </Text>
            </Card>
          </Pressable>
        </Link>
      ) : null}
    </Screen>
  );
}

function MetaRow({ label, value, mono = false }: { label: string; value: string; mono?: boolean }) {
  return (
    <View style={{ gap: 2 }}>
      <Text variant="eyebrow" color="muted">
        {label}
      </Text>
      <Text variant={mono ? 'mono' : 'label'} numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
