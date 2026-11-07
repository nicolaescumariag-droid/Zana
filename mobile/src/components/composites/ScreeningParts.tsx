// Figma: Screening reminder parts used in 881:4242 (C02) and 881:4927/4991/4959 (C04–C06).
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { colors, palette, radius, spacing } from '@/tokens';

export type ScreeningStatus = 'overdue' | 'scheduled' | 'upcoming' | 'done';

const ACCENT: Record<ScreeningStatus, string> = {
  overdue: palette.red[200],
  scheduled: palette.success[200],
  upcoming: palette.warning[200],
  done: palette.success[200],
};

export function SectionLabel({ children }: { children: string }) {
  return (
    <Text variant="labelLG" color="#27272A" style={{ textTransform: 'uppercase' }} accessibilityRole="header">
      {children}
    </Text>
  );
}

type ScreeningRowProps = { status: ScreeningStatus; title: string; subtitle: string; action?: ReactNode; onPress?: () => void };

export function ScreeningRow({ status, title, subtitle, action, onPress }: ScreeningRowProps) {
  if (status === 'done') {
    return (
      <Pressable accessibilityRole="button" accessibilityLabel={`${title}, ${subtitle}`} onPress={onPress} style={styles.doneRow}>
        <View style={styles.doneCheck}>
          <Asset name="iconsCheck" width={16} />
        </View>
        <View style={{ flex: 1 }}>
          <Text variant="bodyLGBold" color="#27272A">{title}</Text>
          <Text variant="labelMD" color={colors.textBody}>{subtitle}</Text>
        </View>
      </Pressable>
    );
  }
  return (
    <View style={styles.row}>
      <View style={[styles.accent, { backgroundColor: ACCENT[status] }]} />
      <Pressable accessibilityRole="button" accessibilityLabel={`${title}, ${subtitle}`} onPress={onPress} style={{ flex: 1 }}>
        <Text variant="bodyLGBold" color="#27272A">{title}</Text>
        <Text variant="labelMD" color={colors.textBody}>{subtitle}</Text>
      </Pressable>
      {action}
    </View>
  );
}

type Tone = 'error' | 'success' | 'warning';
const TONE = {
  error: { bg: palette.error[50], border: palette.error[400], text: palette.error[500] },
  success: { bg: palette.success[50], border: palette.success[400], text: palette.success[700] },
  warning: { bg: palette.warning[50], border: palette.warning[400], text: palette.warning[700] },
};

export function Badge({ label, tone, icon }: { label: string; tone: Tone; icon: SvgName }) {
  const t = TONE[tone];
  return (
    <View style={[styles.badge, { backgroundColor: t.bg, borderColor: t.border }]}>
      <Asset name={icon} width={12} />
      <Text variant="labelMD" color={t.text}>{label}</Text>
    </View>
  );
}

export function PastResultCard({ date, badge, title, detail, last }: { date: string; badge: ReactNode; title: string; detail: string; last?: boolean }) {
  return (
    <View style={styles.timelineRow}>
      <View style={styles.timelineCol}>
        <Asset name={last ? 'iconsCheckCircle' : 'iconsCheckCircleFill2'} width={28} />
        {!last ? <View style={styles.timelineLine} /> : null}
      </View>
      <View style={styles.pastCard}>
        <View style={styles.pastTop}>
          <Text variant="labelMD" color={palette.dark[400]}>{date}</Text>
          {badge}
        </View>
        <Text variant="headingSM" color="#27272A" style={{ marginTop: spacing[2] }}>{title}</Text>
        <Text color={colors.textSecondary}>{detail}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    backgroundColor: palette.neutral[100],
    borderWidth: 1,
    borderColor: palette.neutral[400],
    borderRadius: radius.medium,
    padding: spacing[4],
    paddingLeft: spacing[6],
    overflow: 'hidden',
  },
  accent: { position: 'absolute', left: 0, top: 0, bottom: 0, width: 9 },
  doneRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], paddingVertical: spacing[3] },
  doneCheck: { width: 28, height: 28, borderRadius: 14, backgroundColor: palette.success[200], alignItems: 'center', justifyContent: 'center' },
  badge: { flexDirection: 'row', alignItems: 'center', gap: spacing[1], paddingHorizontal: spacing[1], paddingVertical: 2, borderRadius: radius.small, borderWidth: 1, alignSelf: 'flex-start' },
  timelineRow: { flexDirection: 'row', gap: spacing[4] },
  timelineCol: { width: 28, alignItems: 'center', paddingTop: spacing[2] },
  timelineLine: { flex: 1, width: 1, backgroundColor: palette.neutral[600], marginTop: spacing[1] },
  pastCard: { flex: 1, backgroundColor: palette.neutral[100], borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.medium, padding: spacing[4], gap: spacing[1], marginBottom: spacing[4] },
  pastTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
});
