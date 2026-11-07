// Figma: "Component 1" sheet used by onboarding frames 881:3507 – 881:3977 (A05–A14).
import type { ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

type OnboardingSheetProps = {
  children: ReactNode;
  onBack?: () => void;
  onClose?: () => void;
  /** Filled segments of the 5-step progress bar (A10–A13). */
  progress?: number;
  footer?: ReactNode;
  /** Footer drawn on the grey action container used by A09–A12. */
  footerContainer?: boolean;
};

export function OnboardingSheet({ children, onBack, onClose, progress, footer, footerContainer }: OnboardingSheetProps) {
  const insets = useInsets();
  const top = insets.top + 68;
  return (
    <View style={styles.screen}>
      {progress !== undefined ? (
        <View style={[styles.progress, { top: insets.top + 26 }]} accessible accessibilityLabel={`Step ${progress} of 5`}>
          {[1, 2, 3, 4, 5].map((i) => (
            <View key={i} style={[styles.segment, i > progress && { opacity: 0.3 }]} />
          ))}
        </View>
      ) : null}
      <View style={[styles.ghost, { top }]} />
      <KeyboardAvoidingView style={[styles.sheet, { marginTop: top + 14 }]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          {onBack ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={onBack} hitSlop={12}>
              <Asset name="iconsChevronLeft" width={20} />
            </Pressable>
          ) : (
            <View />
          )}
          {onClose ? (
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={12}>
              <Asset name="iconsCancel" width={20} />
            </Pressable>
          ) : null}
        </View>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          {children}
        </ScrollView>
        {footer ? (
          <View style={[styles.footer, footerContainer && styles.footerContainer, { paddingBottom: Math.max(insets.bottom + 12, 24) }]}>
            {footer}
          </View>
        ) : null}
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.dark[600] },
  progress: { position: 'absolute', left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', gap: 8 },
  segment: { width: 55, height: 6, borderRadius: 8, backgroundColor: palette.neutral[100] },
  ghost: {
    position: 'absolute',
    left: '4.36%',
    right: '4.36%',
    height: 80,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: palette.neutral[200],
    opacity: 0.6,
  },
  sheet: { flex: 1, backgroundColor: palette.neutral[200], borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  header: {
    height: 57,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[400],
  },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 24, paddingBottom: 24 },
  footer: { paddingHorizontal: 20, paddingTop: 16, gap: 16 },
  footerContainer: { backgroundColor: palette.wireframe.background, borderTopWidth: 1, borderTopColor: palette.wireframe.placeholder, paddingTop: 28 },
});
