// Figma: Input Field (label + field), e.g. in 881:3507 Create Account.
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { colors, palette, radius, spacing, typography } from '@/tokens';

import { Asset } from './Asset';
import { Text } from './Text';

type TextFieldProps = TextInputProps & { label: string; trailingIcon?: SvgName };

export function TextField({ label, trailingIcon, style, ...rest }: TextFieldProps) {
  return (
    <View style={styles.wrap}>
      <Text variant="labelLG" color="#1D1D1D" style={{ textTransform: 'uppercase' }}>
        {label}
      </Text>
      <View style={styles.box}>
        <TextInput
          placeholderTextColor={colors.textPlaceholder}
          accessibilityLabel={label}
          {...rest}
          style={[typography.bodyLG, styles.input, style]}
        />
        {trailingIcon ? <Asset name={trailingIcon} width={20} /> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: spacing[2] },
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: palette.white,
    borderWidth: 1,
    borderColor: palette.neutral[400],
    borderRadius: radius.small,
    paddingHorizontal: spacing[3],
    minHeight: 48,
  },
  input: { flex: 1, color: colors.textDisplay, paddingVertical: spacing[3], outlineStyle: 'none' } as object,
});
