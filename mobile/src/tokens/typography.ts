import type { TextStyle } from 'react-native';

// DESIGN.md §3.2 text styles (text style values win over size variables, §3.3). Letter spacing is 0.
export const fontFamily = {
  display: 'InstrumentSerif_400Regular',
  displayItalic: 'InstrumentSerif_400Regular_Italic',
  regular: 'DMSans_400Regular',
  medium: 'DMSans_500Medium',
  semibold: 'DMSans_600SemiBold',
  bold: 'DMSans_700Bold',
} as const;

const t = (family: string, fontSize: number, lineHeight: number): TextStyle => ({
  fontFamily: family,
  fontSize,
  lineHeight,
  letterSpacing: 0,
});

export const typography = {
  displayXL: t(fontFamily.display, 48, 50),
  displayLG: t(fontFamily.display, 40, 48),
  displayMD: t(fontFamily.display, 32, 40),
  headingXL: t(fontFamily.bold, 28, 30),
  headingLG: t(fontFamily.medium, 24, 32),
  headingMD: t(fontFamily.medium, 20, 28),
  headingSM: t(fontFamily.semibold, 18, 20),
  bodyLG: t(fontFamily.regular, 16, 24),
  bodyLGBold: t(fontFamily.semibold, 16, 20),
  bodyMD: t(fontFamily.regular, 14, 22),
  bodySM: t(fontFamily.regular, 14, 20),
  labelLG: t(fontFamily.medium, 16, 18),
  labelMD: t(fontFamily.regular, 12, 16),
  labelSM: t(fontFamily.regular, 10, 14),
  // Observed in Menu Bottom; no text style in Figma (DESIGN.md §9.2 accessibility gap).
  navLabel: t(fontFamily.medium, 8, 14),
} as const;

export type TypographyVariant = keyof typeof typography;
