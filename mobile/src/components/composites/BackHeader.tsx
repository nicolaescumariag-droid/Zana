// Figma: Nav Bar: Upper 211:1796 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=211-1796
import { Pressable, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

type BackHeaderProps = { title: string; onBack: () => void; showMenu?: boolean };

export function BackHeader({ title, onBack, showMenu = true }: BackHeaderProps) {
  const insets = useInsets();
  return (
    <View style={[styles.wrap, { paddingTop: insets.top + 23 }]}>
      <View style={styles.left}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} hitSlop={12}>
          <Asset name="iconsArrowLeft" width={24} />
        </Pressable>
        <Text variant="bodyLGBold" color="#27272A" accessibilityRole="header" numberOfLines={1} style={{ lineHeight: 22 }}>
          {title}
        </Text>
      </View>
      {showMenu ? (
        <Pressable accessibilityRole="button" accessibilityLabel="Menu" style={styles.menu}>
          <Asset name="iconsMenu2" width={24} />
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, paddingBottom: 8 },
  left: { flexDirection: 'row', alignItems: 'center', gap: 20, flexShrink: 1 },
  menu: { backgroundColor: 'rgba(255,255,255,0.3)', padding: 8, borderRadius: 30 },
});
