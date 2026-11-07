// Figma: Menu Bottom 488:3335 / Navigation Icon 488:3516 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=488-3335
// Labels/sizes follow the approved screen instances (Home, Folders, ♥, Screenings, Account). 8px labels are a known a11y gap.
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import type { SvgName } from '@/assets/svgs.generated';
import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette, spacing } from '@/tokens';

export type NavTab = 'home' | 'records' | 'screenings' | 'account';

const ITEMS: { key: NavTab; label: string; icon: SvgName }[] = [
  { key: 'home', label: 'Home', icon: 'iconsHome2' },
  { key: 'records', label: 'Folders', icon: 'iconsFolder' },
  { key: 'screenings', label: 'Screenings', icon: 'iconsCalendarCheck' },
  { key: 'account', label: 'Account', icon: 'iconsUser2' },
];

type BottomNavProps = {
  active?: NavTab | null;
  onSelect: (tab: NavTab) => void;
  surface?: string;
};

export function BottomNav({ active, onSelect, surface = palette.neutral[50] }: BottomNavProps) {
  const insets = useInsets();
  const item = (i: (typeof ITEMS)[number]) => {
    const selected = active === i.key;
    return (
      <Pressable
        key={i.key}
        accessibilityRole="tab"
        accessibilityLabel={i.label}
        accessibilityState={{ selected }}
        onPress={() => onSelect(i.key)}
        style={[styles.item, selected && styles.itemActive]}
      >
        <Asset name={i.icon} width={24} />
        <Text variant="navLabel" numberOfLines={1} style={styles.label}>
          {i.label}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={[styles.outer, { backgroundColor: surface, paddingBottom: Math.max(20, insets.bottom - 14) }]}>
      <View style={styles.bar} accessibilityRole="tablist">
        {ITEMS.slice(0, 2).map(item)}
        {/* TODO(design): centre heart behaviour is undefined (brief 6.2 #12) — rendered inert. */}
        <View style={styles.heart} accessibilityLabel="Zana" accessible>
          <Svg width={45} height={45} style={StyleSheet.absoluteFill}>
            <Defs>
              <LinearGradient id="zanaHeart" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0" stopColor={palette.red[500]} />
                <Stop offset="1" stopColor={palette.purple[500]} />
              </LinearGradient>
            </Defs>
            <Rect width={45} height={45} rx={22.5} fill="url(#zanaHeart)" />
          </Svg>
          <Asset name="group2" width={30} height={27} />
        </View>
        {ITEMS.slice(2).map(item)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outer: { paddingHorizontal: 20, paddingTop: 20, alignItems: 'center' },
  bar: {
    width: '100%',
    maxWidth: 350,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 11,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: palette.wireframe.border,
    backgroundColor: 'rgba(250,250,250,0.4)',
  },
  item: { width: 60, height: 60, alignItems: 'center', justifyContent: 'center', gap: spacing[1], borderRadius: 32 },
  itemActive: { backgroundColor: palette.neutral[300] },
  label: { width: 56, textAlign: 'center', color: palette.dark[700], height: 10, lineHeight: 10 },
  heart: {
    width: 45,
    height: 45,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
