// Figma: Button 274:425 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=274-425
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { colors, palette, radius, spacing } from '@/tokens';

import { Asset } from './Asset';
import { Text } from './Text';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'large' | 'compact' | 'inline';
  icon?: SvgName;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  accessibilityHint?: string;
};

export function Button({
  label,
  onPress,
  variant = 'primary',
  size = 'large',
  icon,
  disabled,
  style,
  accessibilityHint,
}: ButtonProps) {
  const primary = variant === 'primary';
  const textColor = disabled ? palette.dark[200] : primary ? colors.onActionPrimary : colors.actionPrimary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: !!disabled }}
      accessibilityHint={accessibilityHint}
      disabled={disabled}
      onPress={onPress}
      hitSlop={size === 'inline' ? 8 : undefined}
      style={({ pressed }) => [
        styles.base,
        styles[size],
        primary && { backgroundColor: disabled ? palette.neutral[300] : colors.actionPrimary },
        variant === 'secondary' && styles.secondary,
        pressed && !disabled && { opacity: 0.8 },
        style,
      ]}
    >
      <Text color={textColor} numberOfLines={1}>
        {label}
      </Text>
      {icon ? (
        <View style={{ opacity: disabled ? 0.4 : 1 }}>
          <Asset name={icon} width={size === 'inline' ? 16 : 20} />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing[1],
    borderRadius: radius.small,
  },
  large: { minHeight: 48, paddingHorizontal: spacing[6], paddingVertical: spacing[3] },
  compact: { minHeight: 36, paddingHorizontal: spacing[6], paddingVertical: 6 },
  inline: { paddingHorizontal: spacing[3], paddingVertical: spacing[1] },
  secondary: { borderWidth: 1, borderColor: colors.actionPrimary },
});
