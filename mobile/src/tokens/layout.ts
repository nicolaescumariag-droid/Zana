// DESIGN.md §4–5, §10.1
export const spacing = { 1: 4, 2: 8, 3: 12, 4: 16, 6: 24, 8: 32, 12: 48, 16: 64 } as const;
export const radius = { small: 4, medium: 8, full: 999 } as const;
export const borderWidth = { default: 1, accentBar: 9 } as const;
export const iconSize = { xs: 16, sm: 20, md: 24, lg: 28, illustration: 40 } as const;
export const layout = { frameWidth: 390, frameHeight: 844, screenMargin: 20, chatCardMargin: 16 } as const;
