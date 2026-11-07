// Figma: Profile Container (e.g. 881:4279 in 02 Screening Reminders) — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=881-4279
import { Pressable, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

type ProfileHeaderProps = { name: string; age: string };

export function ProfileHeader({ name, age }: ProfileHeaderProps) {
  const insets = useInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 18 }]}>
      <View style={styles.info}>
        <Text variant="displayLG" color={palette.dark[800]} style={{ lineHeight: 40 }} accessibilityRole="header">
          {name}
        </Text>
        <Text color={palette.dark[800]} style={{ lineHeight: 16 }}>
          {age}
        </Text>
      </View>
      {/* TODO(design): menu destination not designed. */}
      <Pressable accessibilityRole="button" accessibilityLabel="Menu" style={styles.menu}>
        <Asset name="menuFilled1" width={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: palette.neutral[200],
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[500],
  },
  info: { gap: 4 },
  menu: { backgroundColor: 'rgba(255,255,255,0.5)', padding: 8, borderRadius: 30 },
});
