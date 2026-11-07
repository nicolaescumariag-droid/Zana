import { Text as RNText, type TextProps as RNTextProps, type TextStyle } from 'react-native';

import { colors, typography, type TypographyVariant } from '@/tokens';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  color?: string;
  align?: TextStyle['textAlign'];
};

export function Text({ variant = 'bodyLG', color = colors.textBody, align, style, ...rest }: TextProps) {
  return <RNText {...rest} style={[typography[variant], { color, textAlign: align }, style]} />;
}
