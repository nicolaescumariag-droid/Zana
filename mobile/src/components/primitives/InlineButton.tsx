// Figma: Button (Size=Small) used in card footers, e.g. "Continue" / "Confirm" in 962:6339 and 966:4778.
import { Pressable, StyleSheet } from 'react-native';

import { colors, palette, radius, spacing } from '@/tokens';

import { Text } from './Text';

type InlineButtonProps = { label: string; onPress?: () => void; disabled?: boolean };

export function InlineButton({ label, onPress, disabled }: InlineButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      onPress={onPress}
      disabled={disabled}
      hitSlop={8}
      style={[styles.btn, { backgroundColor: disabled ? palette.dark[50] : colors.actionPrimary }]}
    >
      <Text color={disabled ? palette.dark[300] : colors.onActionPrimary}>{label}</Text>
    </Pressable>
  );
}

export function TextLink({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <Pressable accessibilityRole="button" onPress={onPress} hitSlop={12}>
      <Text variant="bodyMD" color={colors.textSecondary}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: radius.small, minHeight: 32, justifyContent: 'center' },
});
