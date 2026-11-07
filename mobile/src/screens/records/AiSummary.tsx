// Figma: 881:5161 — AI Summary (E01). Mock, document-scoped explanation only; no live AI.
import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { DetailSheet } from '@/components/composites/DetailSheet';
import { Badge } from '@/components/composites/ScreeningParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { document, summary } from '@/mocks/records';
import { colors, palette, radius, spacing } from '@/tokens';

export function AiSummary() {
  const router = useRouter();
  return (
    <DetailSheet onClose={() => router.back()}>
      <View style={styles.docRow}>
        <Asset name="property1Png" width={30} height={36} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyLGBold" color="#27272A" numberOfLines={1}>{document.mediumName}</Text>
          <Text variant="labelMD" color={palette.dark[400]}>{document.doctor}</Text>
        </View>
      </View>
      <View style={styles.section}>
        <View style={styles.sectionHead}>
          <Asset name="iconsAI" width={16} />
          <Text variant="labelLG" color="#27272A">WHAT THIS MEANS</Text>
        </View>
        <Text color={colors.textBody}>{summary.meaning}</Text>
      </View>
      <View style={styles.section}>
        <Text variant="labelLG" color="#27272A">KEY VALUES</Text>
        <View style={styles.values}>
          {summary.values.map((v, i) => (
            <View key={v.label} style={[styles.valueRow, i > 0 && { borderTopWidth: 1, borderTopColor: palette.neutral[400] }]}>
              <Text variant="bodyMD" color={colors.textSecondary} style={{ flex: 1 }}>{v.label}</Text>
              <Text variant="bodyLGBold" color="#27272A">{v.value}</Text>
              {v.status ? <Badge label={v.status} tone="success" icon="iconsCheckCircle2" /> : null}
            </View>
          ))}
        </View>
      </View>
      <View style={{ gap: spacing[2], marginTop: spacing[6] }}>
        <Button label="Book / find a clinic" variant="secondary" size="compact" onPress={() => router.push('/clinic')} />
        <Button label="Set a screening reminder" variant="secondary" size="compact" onPress={() => router.push('/screenings')} />
      </View>
      <View style={styles.notice} accessibilityRole="text">
        <Asset name="group98" width={40} height={40} />
        <Text variant="labelMD" color={colors.textBody} style={{ flex: 1 }}>{summary.notice}</Text>
      </View>
      {/* TODO(design): feedback icons have no defined behaviour — inert. */}
      <View style={styles.feedback} accessibilityLabel="Rate this explanation">
        <Asset name="iconsHappy" width={20} />
        <Asset name="iconsNeutral" width={20} />
      </View>
    </DetailSheet>
  );
}

const styles = StyleSheet.create({
  docRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  section: { gap: spacing[3], marginTop: spacing[8] },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  values: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[3] },
  notice: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], marginTop: spacing[6], padding: spacing[3], borderRadius: radius.medium, backgroundColor: palette.neutral[100], borderWidth: 1, borderColor: palette.neutral[400] },
  feedback: { flexDirection: 'row', gap: spacing[3], marginTop: spacing[3], alignSelf: 'flex-end' },
});
