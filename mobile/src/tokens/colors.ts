// Source: Figma variables (Zana Primary / Zana — Semantic / Wireframe) — DESIGN.md §10.1
export const palette = {
  white: '#FFFFFF',
  black: '#000000',
  neutral: {
    50: '#FDFCFB', 100: '#F9F8F6', 200: '#F5F2EE', 300: '#F0ECE6', 400: '#EBE6DF',
    500: '#E8E2D9', 600: '#CFC7BE', 700: '#B6ACA2', 800: '#9D9287', 900: '#84776B',
  },
  dark: {
    50: '#F5F5F5', 100: '#E0E0E0', 200: '#BDBDBD', 300: '#9E9E9E', 400: '#757575',
    500: '#616161', 600: '#424242', 700: '#303030', 800: '#212121', 900: '#121212',
  },
  red: {
    50: '#FCEAE9', 100: '#F8C9C7', 200: '#F29A97', 300: '#EC6B67', 400: '#E84B46',
    500: '#E33530', 600: '#B62A26', 700: '#88201D', 800: '#5B1513', 900: '#2D0B0A',
  },
  purple: {
    50: '#F0EAF6', 100: '#D8C7E8', 200: '#B79AD3', 300: '#966EBE', 400: '#7E50AE',
    500: '#6E3FA3', 600: '#583283', 700: '#422562', 800: '#2C1941', 900: '#160C21',
  },
  pink: {
    50: '#FCEEF5', 100: '#F7D6E7', 200: '#EFB6D3', 300: '#E993BF', 400: '#E47FB3',
    500: '#DE66A4', 600: '#B25283', 700: '#853D62', 800: '#592942', 900: '#2C1421',
  },
  success: {
    50: '#E9F7F1', 100: '#C6EBDC', 200: '#93D8BD', 300: '#5FC49D', 400: '#3BB084',
    500: '#2F9E6E', 600: '#257E58', 700: '#1C5F42', 800: '#133F2C', 900: '#0A2016',
  },
  warning: {
    50: '#FDF6E8', 100: '#FAE9C2', 200: '#F4D589', 300: '#EDBF4F', 400: '#E5B238',
    500: '#D99E22', 600: '#B07E18', 700: '#855E11', 800: '#59400B', 900: '#2E2105',
  },
  error: {
    50: '#FDECEA', 100: '#FAD2CD', 200: '#F0A89F', 300: '#E27D70', 400: '#CC5444',
    500: '#B42318', 600: '#921A10', 700: '#6E130B', 800: '#4A0C07', 900: '#260603',
  },
  // Wireframe collection — still bound in some approved frames (TODO(design): migrate in Figma).
  wireframe: {
    textPrimary: '#212121', textSecondary: '#757575', border: '#E0E0E0',
    placeholder: '#BDBDBD', background: '#F5F5F5', surface: '#FFFFFF',
  },
} as const;

export const colors = {
  bgScreen: palette.neutral[200],
  bgSurface: palette.neutral[100],
  bgSurfaceSelected: palette.neutral[300],
  bgNav: palette.neutral[50],
  bgInput: palette.white,
  actionPrimary: palette.dark[900],
  onActionPrimary: palette.neutral[50],
  textDisplay: palette.dark[900],
  textBody: palette.dark[700],
  textSecondary: palette.dark[500],
  textPlaceholder: palette.dark[200],
  borderDefault: palette.neutral[600],
  borderSubtle: palette.neutral[400],
  borderDivider: palette.neutral[500],
  statusOverdue: palette.red[500],
  toggleOn: palette.purple[400],
  toggleOff: palette.dark[100],
} as const;
