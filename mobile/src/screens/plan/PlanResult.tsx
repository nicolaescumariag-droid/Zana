// Figma: 968:5030 — Your plan
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { disclaimer, planAge, planItems, type PlanItem } from '@/mocks/guidedPlan';
import { colors, layout, palette, radius, spacing } from '@/tokens';

function Stat({ icon, value, label }: { icon: SvgName; value: number; label: string }) {
  return (
    <View style={styles.stat} accessible accessibilityLabel={`${value} ${label}`}>
      <View style={styles.statIcon}>
        <Asset name={icon} width={20} />
      </View>
      <Text variant="displayMD" color={colors.textDisplay}>
        {value}
      </Text>
      <Text color={colors.textSecondary}>{label}</Text>
    </View>
  );
}

function PlanRow({ item, onPress }: { item: PlanItem; onPress?: () => void }) {
  const due = item.status === 'due';
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${due ? 'Due now' : 'Upcoming'}: ${item.title}. ${item.why}`}
      accessibilityHint={due ? 'Find a clinic for this check' : undefined}
      onPress={onPress}
      style={styles.row}
    >
      <View style={[styles.badge, due ? styles.badgeDue : styles.badgeUpcoming]}>
        <Text variant="labelMD" color={due ? palette.white : colors.textSecondary}>
          {due ? 'Due now' : 'Upcoming'}
        </Text>
      </View>
      <Text variant="headingMD" color={colors.textDisplay}>
        {item.title}
      </Text>
      <Text variant="bodyMD" color={colors.textSecondary}>
        {item.why}
      </Text>
    </Pressable>
  );
}

// TODO(design): destination for Upcoming items is unresolved (brief) — rows are inert.
export function PlanResult({ onDuePress }: { onDuePress: () => void }) {
  const insets = useInsets();
  const due = planItems.filter((p) => p.status === 'due').length;
  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.bgScreen }} contentContainerStyle={[styles.content, { paddingTop: insets.top + 74 }]}>
      <Text variant="displayMD" color={colors.textDisplay} accessibilityRole="header">
        Your screening plan
      </Text>
      <Text variant="bodyMD" color={colors.textSecondary} style={{ marginTop: spacing[2] }}>
        For age {planAge}. Built from your answers. Check it with your GP.
      </Text>
      <View style={styles.stats}>
        <Stat icon="icon2" value={due} label="Due now" />
        <Stat icon="iconsCalendar" value={planItems.length - due} label="Upcoming" />
      </View>
      <View style={{ gap: spacing[4] }}>
        {planItems.map((item) => (
          <PlanRow key={item.id} item={item} onPress={item.status === 'due' ? onDuePress : undefined} />
        ))}
      </View>
      {/* Required by brief; not visible in the cropped Figma frame (see docs/DISCREPANCIES.md). */}
      <Text variant="bodyMD" color={colors.textSecondary} style={{ marginTop: spacing[4] }}>
        {disclaimer}
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { paddingHorizontal: layout.chatCardMargin, paddingBottom: spacing[6] },
  stats: { flexDirection: 'row', gap: 12, marginTop: 20, marginBottom: spacing[4] },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[1],
    paddingVertical: 20,
    backgroundColor: palette.neutral[100],
    borderWidth: 1,
    borderColor: palette.neutral[600],
    borderRadius: radius.medium,
  },
  statIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: palette.neutral[400], alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  row: { backgroundColor: palette.neutral[100], borderWidth: 1, borderColor: palette.neutral[600], borderRadius: radius.medium, padding: spacing[4], gap: spacing[2] },
  badge: { alignSelf: 'flex-start', paddingHorizontal: 4, paddingVertical: 2, borderRadius: radius.small },
  badgeDue: { backgroundColor: palette.red[500] },
  badgeUpcoming: { backgroundColor: palette.neutral[200] },
});
