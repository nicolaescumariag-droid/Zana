// Figma: modal sheet used by 881:4927 (C04), 881:5023 (C07), records upload and AI summary frames.
import type { ReactNode } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

type DetailSheetProps = { title?: string; onClose: () => void; children: ReactNode; footer?: ReactNode };

export function DetailSheet({ title, onClose, children, footer }: DetailSheetProps) {
  const insets = useInsets();
  const top = insets.top + 36;
  return (
    <View style={styles.screen}>
      <View style={[styles.ghost, { top }]} />
      <View style={[styles.sheet, { marginTop: top + 14 }]}>
        <View style={styles.header}>
          <View style={{ width: 20 }} />
          {title ? (
            <Text variant="headingMD" color="#27272A" accessibilityRole="header">{title}</Text>
          ) : null}
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={12}>
            <Asset name="iconsCancel" width={20} />
          </Pressable>
        </View>
        <ScrollView contentContainerStyle={styles.content}>{children}</ScrollView>
        {footer ? <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom + 8, 24) }]}>{footer}</View> : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.dark[600] },
  ghost: { position: 'absolute', left: '4.36%', right: '4.36%', height: 80, borderTopLeftRadius: 24, borderTopRightRadius: 24, backgroundColor: palette.neutral[200], opacity: 0.6 },
  sheet: { flex: 1, backgroundColor: palette.neutral[200], borderTopLeftRadius: 24, borderTopRightRadius: 24, overflow: 'hidden' },
  header: { height: 57, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  content: { flexGrow: 1, paddingHorizontal: 20, paddingTop: 30, paddingBottom: 24 },
  footer: { paddingHorizontal: 20, paddingTop: 12 },
});
