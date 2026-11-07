// Figma: 881:4927 Blood Pressure, 881:4991 Thyroid, 881:4959 STI Screen (C04–C06); 881:5023 Cervical Screening Empty (C07)
import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';

import { DetailSheet } from '@/components/composites/DetailSheet';
import { Badge, PastResultCard, SectionLabel } from '@/components/composites/ScreeningParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { reminderDetails } from '@/mocks/screenings';
import { colors, palette, radius, spacing } from '@/tokens';

const STATUS = {
  Overdue: { tone: 'error', icon: 'iconsInfo', bar: palette.red[200], bg: palette.red[50] },
  Booked: { tone: 'success', icon: 'iconsCheckCircle2', bar: palette.success[200], bg: palette.neutral[100] },
  Upcoming: { tone: 'warning', icon: 'iconsClock3', bar: palette.warning[200], bg: palette.neutral[100] },
} as const;

export function ReminderDetail({ id }: { id: string }) {
  const router = useRouter();
  const d = reminderDetails[id];
  if (!d) return null;
  const s = STATUS[d.badge];
  const findClinic = d.primary === 'Find a clinic';
  return (
    <DetailSheet title="Screening" onClose={() => router.back()}>
      <View style={[styles.status, { backgroundColor: s.bg }]}>
        <View style={[styles.bar, { backgroundColor: s.bar }]} />
        <View style={styles.statusTop}>
          <Badge label={d.badge} tone={s.tone} icon={s.icon} />
          <Text variant="labelMD" color={d.badge === 'Overdue' ? palette.red[500] : palette.dark[300]}>Was due Dec 2024</Text>
        </View>
        <Text variant="headingLG" color="#27272A">{d.title}</Text>
      </View>
      <View style={styles.actions}>
        {/* TODO(design): Mark as booked / Add to calendar / Change date have no designed result — inert. */}
        <Button label={d.primary} size="compact" style={{ flex: 1, paddingHorizontal: 8 }} onPress={findClinic ? () => router.push('/clinic') : undefined} />
        <Button label={d.secondary} size="compact" variant="secondary" style={{ flex: 1, paddingHorizontal: 8 }} icon={d.secondary === 'Mark as booked' ? 'iconsCalendarCheck2' : undefined} />
      </View>
      <View style={{ gap: spacing[4], marginTop: spacing[12] }}>
        <SectionLabel>Past results</SectionLabel>
        <View>
          {d.results.map((r, i) => (
            <PastResultCard
              key={i}
              date={r.date}
              title={r.title}
              detail={r.detail}
              last={i === d.results.length - 1}
              badge={<Badge label={r.badge.label} tone={r.badge.tone} icon={r.badge.tone === 'warning' ? 'iconsWarning2' : 'iconsCheckCircle2'} />}
            />
          ))}
        </View>
        {/* TODO(design): "Add a result" destination undefined — inert. */}
        <Button label="Add a result" size="compact" variant="secondary" icon="iconsPlus2" style={{ alignSelf: 'flex-start' }} />
      </View>
    </DetailSheet>
  );
}

export function CervicalEmpty() {
  const router = useRouter();
  return (
    <DetailSheet
      onClose={() => router.back()}
      footer={
        <Pressable accessibilityRole="button" style={styles.addRow}>
          <Text color={colors.textBody}>Add a result</Text>
          <Asset name="iconsPlus2" width={20} />
        </Pressable>
      }
    >
      <View style={styles.backRow}>
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.back()} hitSlop={12}>
          <Asset name="iconsArrowLeft" width={24} />
        </Pressable>
        <Text variant="bodyLGBold" color="#27272A">Cervical screening (Pap + HPV)</Text>
      </View>
      <View style={styles.empty}>
        <Asset name="group116" width={120} height={110} />
        <Text variant="displayMD" color="#27272A" align="center">No files yet</Text>
        <Text variant="bodyMD" color={colors.textBody} align="center">No results yet. Add your first one.</Text>
      </View>
    </DetailSheet>
  );
}

const styles = StyleSheet.create({
  status: { borderWidth: 1, borderColor: palette.neutral[600], borderRadius: radius.medium, paddingVertical: spacing[4], paddingHorizontal: spacing[6], gap: spacing[3], overflow: 'hidden' },
  bar: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 9 },
  statusTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  actions: { flexDirection: 'row', gap: spacing[2], marginTop: spacing[4] },
  backRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[6], marginTop: -6 },
  empty: { alignItems: 'center', gap: spacing[3], marginTop: 64 },
  addRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], paddingVertical: spacing[3], alignSelf: 'flex-start' },
});
