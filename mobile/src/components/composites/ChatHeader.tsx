// Figma: Profile Container in 01 Home 881:4053 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=881-4053
import { Pressable, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

// TODO(design): menu, settings and notifications destinations are not designed — rendered inert.
export function ChatHeader({ title = 'Zana Chat' }: { title?: string }) {
  const insets = useInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 18 }]}>
      <View style={styles.side}>
        <Pressable accessibilityRole="button" accessibilityLabel="Menu" hitSlop={10}>
          <Asset name="iconsMenu" width={24} />
        </Pressable>
      </View>
      <Text variant="headingSM" color={palette.black} accessibilityRole="header">
        {title}
      </Text>
      <View style={[styles.side, styles.right]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Settings" hitSlop={10}>
          <Asset name="iconsSetting" width={20} />
        </Pressable>
        <Pressable accessibilityRole="button" accessibilityLabel="Notifications" hitSlop={10}>
          <Asset name="iconsNotifications" width={20} />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: palette.white,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[500],
  },
  side: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  right: { justifyContent: 'flex-end', gap: 15 },
});
