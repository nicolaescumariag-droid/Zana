// Figma: Checkbox (State=Unchecked) used in 962:6339. No checked-state asset exists in the approved
// frames, so the checked state is drawn with tokens (see docs/DISCREPANCIES.md).
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors, palette, spacing } from '@/tokens';

import { Asset } from './Asset';
import { Text } from './Text';

export function CheckboxBox({ checked }: { checked: boolean }) {
  if (!checked) return <Asset name="stateUnchecked" width={24} />;
  return (
    <View style={styles.box}>
      <View style={styles.fill}>
        <Svg width={14} height={14} viewBox="0 0 14 14">
          <Path d="M2.5 7.5l3 3 6-7" stroke={palette.neutral[50]} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </Svg>
      </View>
    </View>
  );
}

type CheckboxRowProps = { label: string; checked: boolean; onToggle: () => void; divider?: boolean };

export function CheckboxRow({ label, checked, onToggle, divider = true }: CheckboxRowProps) {
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked }}
      accessibilityLabel={label}
      onPress={onToggle}
      style={[styles.row, divider && styles.divider]}
    >
      <CheckboxBox checked={checked} />
      <Text color={colors.textDisplay} style={{ flex: 1 }}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  box: { width: 24, height: 24, alignItems: 'center', justifyContent: 'center' },
  fill: { width: 18, height: 18, borderRadius: 2, backgroundColor: colors.actionPrimary, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing[4], paddingHorizontal: spacing[1], paddingVertical: 10, minHeight: 44 },
  divider: { borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
});
