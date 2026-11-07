// Figma: Chat Input 888:532 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=888-532
// TODO(design): purpose of free-text input on Home is unresolved (brief C7) — text is never submitted.
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { colors, palette, spacing, typography } from '@/tokens';

export function ChatInput({ placeholder = 'How else can I help' }: { placeholder?: string }) {
  const [value, setValue] = useState('');
  return (
    <View style={styles.row}>
      <View style={styles.field}>
        <TextInput
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor={colors.textPlaceholder}
          accessibilityLabel="Message Zana"
          style={[typography.bodyLG, styles.input]}
        />
        <Pressable accessibilityRole="button" accessibilityLabel="Voice input (not available in prototype)" disabled hitSlop={10}>
          <Asset name="mic" width={24} />
        </Pressable>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Send"
        accessibilityState={{ disabled: true }}
        disabled
        style={styles.send}
      >
        <Asset name="arrowUp" width={24} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], minHeight: 48 },
  field: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    backgroundColor: palette.neutral[50],
    borderRadius: 999,
    paddingLeft: 20,
    paddingRight: spacing[4],
    minHeight: 48,
  },
  input: { flex: 1, color: colors.textDisplay, paddingVertical: spacing[3], outlineStyle: 'none' } as object,
  send: { backgroundColor: palette.neutral[100], borderRadius: 999, padding: spacing[3] },
});
