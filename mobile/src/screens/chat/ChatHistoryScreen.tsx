// Not in Figma: list of past Zana chats and AI outputs, built from existing tokens and components.
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/composites/BackHeader';
import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { chatHistory } from '@/mocks/chat';
import { colors, palette, radius, spacing } from '@/tokens';

export function ChatHistoryScreen() {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <BackHeader title="Your chats" onBack={() => router.back()} showMenu={false} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text color={colors.textBody}>Your conversations with Zana and the summaries it made for you.</Text>
        {chatHistory.map((c) => (
          <Pressable key={c.title} accessibilityRole="button" accessibilityLabel={`${c.kind}: ${c.title}, ${c.date}`} onPress={() => router.push(c.href)} style={styles.card}>
            <View style={{ flex: 1, gap: spacing[1] }}>
              <Text variant="labelMD" color={colors.textSecondary}>
                {c.kind.toUpperCase()} · {c.date}
              </Text>
              <Text variant="bodyLGBold" color="#27272A" numberOfLines={2}>
                {c.title}
              </Text>
              <Text variant="labelMD" color={palette.dark[400]} numberOfLines={1}>
                {c.preview}
              </Text>
            </View>
            <Asset name="iconsChevronRight" width={20} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  content: { padding: 20, gap: spacing[3] },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    padding: spacing[4],
    backgroundColor: palette.neutral[100],
    borderWidth: 1,
    borderColor: palette.neutral[400],
    borderRadius: radius.medium,
  },
});
