// Figma: 881:5161 — AI Summary (E01). Mock, document-scoped explanation only; no live AI.
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { DetailSheet } from '@/components/composites/DetailSheet';
import { FileRow } from '@/components/composites/RecordsParts';
import { Badge } from '@/components/composites/ScreeningParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { document, summary } from '@/mocks/records';
import { colors, palette, radius, spacing } from '@/tokens';

export function AiSummary() {
  const router = useRouter();
  const { from } = useLocalSearchParams<{ from?: string }>();
  // Opened from Folders: close to Zana Chat itself, not whatever chat screen was last open.
  const close = () => (from === 'folders' ? router.dismissTo('/chat') : router.back());
  // Not in Figma: requested save action. Mock only; nothing is stored.
  const [saved, setSaved] = useState(false);
  return (
    <DetailSheet onClose={close}>
      <View style={styles.top}>
        <Asset name="group98" width={72} height={72} />
        <Text variant="labelSM" color={colors.textBody} align="center">{summary.notice}</Text>
      </View>
      <FileRow name={document.mediumName} meta={document.doctor} />
      <View style={styles.card}>
        <Text variant="labelMD" color={colors.textSecondary}>WHAT THIS MEANS</Text>
        <Text variant="bodyMD" color={colors.textBody}>{summary.meaning}</Text>
      </View>
      <View style={styles.card}>
        <Text variant="labelMD" color={colors.textSecondary}>KEY VALUES</Text>
        {summary.values.map((v) => (
          <View key={v.label} style={styles.valueRow}>
            <Text variant="labelMD" color={colors.textBody} style={{ flex: 1 }}>{v.label}</Text>
            {v.status ? <Text variant="labelMD" color={colors.textBody}>{v.value}</Text> : null}
            <Badge label={v.status ?? v.value} tone={v.status ? 'success' : 'warning'} icon={v.status ? 'iconsCheckCircle2' : 'iconsWarning2'} />
          </View>
        ))}
      </View>
      <Button label={saved ? 'Saved' : 'Save information'} disabled={saved} onPress={() => setSaved(true)} style={{ marginTop: spacing[6] }} />
      <View style={{ gap: spacing[2], marginTop: spacing[6] }}>
        <Asset name="group114" width={67} height={14} />
        <Pressable accessibilityRole="button" onPress={() => router.push('/clinic')} style={[styles.chip, { backgroundColor: palette.purple[500] }]}>
          <Text variant="labelMD" color={palette.white}>Book / find a clinic</Text>
        </Pressable>
        <Pressable accessibilityRole="button" onPress={() => router.push('/screenings')} style={[styles.chip, { backgroundColor: palette.red[500] }]}>
          <Text variant="labelMD" color={palette.white}>Set a screening reminder</Text>
        </Pressable>
      </View>
    </DetailSheet>
  );
}

const styles = StyleSheet.create({
  top: { alignItems: 'center', gap: spacing[3], marginBottom: spacing[4], paddingHorizontal: spacing[2] },
  card: { gap: spacing[2], marginTop: spacing[4], padding: spacing[4], borderRadius: radius.small, backgroundColor: palette.pink[50] },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  chip: { alignSelf: 'flex-start', paddingHorizontal: spacing[2], paddingVertical: spacing[1], borderRadius: radius.small },
});
