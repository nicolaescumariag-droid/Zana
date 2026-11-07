import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { QuestionCard } from '@/components/composites/QuestionCard';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { InlineButton, TextLink } from '@/components/primitives/InlineButton';
import { Text } from '@/components/primitives/Text';
import { buildingSteps, whenOptions } from '@/mocks/guidedPlan';
import { useAppState, type PlanAnswers } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

import { PlanScaffold } from './PlanScaffold';

// Figma: 965:4663 — Recent tests When
export function WhenStep({ onPrev, onNext, onClose }: { onPrev: () => void; onNext: () => void; onClose: () => void }) {
  const { answers, setAnswers } = useAppState();
  const checks = answers.checks.filter((c) => c !== 'None of these');
  return (
    <PlanScaffold>
      <QuestionCard
        pager="3 of 3"
        onPrev={onPrev}
        onNext={onNext}
        onClose={onClose}
        footer={
          <>
            <TextLink label="Skip" onPress={onNext} />
            <InlineButton label="Continue" onPress={onNext} />
          </>
        }
      >
        <View style={{ gap: spacing[1] }}>
          <Text variant="bodyLGBold" color={colors.textDisplay} accessibilityRole="header">
            When did you have these checks?
          </Text>
          <Text variant="bodyMD" color={colors.textSecondary}>
            An estimate is fine
          </Text>
        </View>
        {checks.map((check, i) => (
          <View key={check} style={[styles.whenGroup, i < checks.length - 1 && styles.divider]}>
            <Text variant="bodyLGBold" color={colors.textDisplay}>
              {check}
            </Text>
            <View style={styles.pills} accessibilityRole="radiogroup" accessibilityLabel={`When was your ${check}`}>
              {whenOptions.map((opt) => {
                const on = answers.when[check] === opt;
                return (
                  <Pressable
                    key={opt}
                    accessibilityRole="radio"
                    accessibilityState={{ checked: on }}
                    onPress={() => setAnswers((a) => ({ ...a, when: { ...a.when, [check]: opt } }))}
                    style={[styles.pill, on && styles.pillOn]}
                  >
                    <Text variant="bodyMD" color={colors.textBody}>
                      {opt}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </QuestionCard>
    </PlanScaffold>
  );
}

const join = (xs: string[], other?: string) => [...xs, ...(other?.trim() ? [other.trim()] : [])].join(', ') || 'None';

export function summarise(a: PlanAnswers) {
  const parts = a.checks
    .filter((c) => c !== 'None of these')
    .map((c) => (a.when[c] ? `${c}, ${a.when[c].charAt(0).toLowerCase()}${a.when[c].slice(1)}` : c));
  if (a.other.checks?.trim()) parts.push(a.other.checks.trim());
  const recent = parts.join(' · ') || join(a.checks);
  return { family: join(a.family, a.other.family), health: join(a.health, a.other.health), recent };
}

// Figma: 966:4778 — Review answers
export function ReviewStep(props: {
  onPrev: () => void;
  onClose: () => void;
  onEdit: (q: 'family' | 'health' | 'checks') => void;
  onRestart: () => void;
  onConfirm: () => void;
}) {
  const { answers } = useAppState();
  const s = summarise(answers);
  const rows: { key: 'family' | 'health' | 'checks'; label: string; value: string }[] = [
    { key: 'family', label: 'Family history', value: s.family },
    { key: 'health', label: 'Your health history', value: s.health },
    { key: 'checks', label: 'Recent checks', value: s.recent },
  ];
  return (
    <PlanScaffold compact>
      <QuestionCard
        pager="Review"
        onPrev={props.onPrev}
        onClose={props.onClose}
        footer={
          <>
            <TextLink label="Start again" onPress={props.onRestart} />
            <InlineButton label="Confirm" onPress={props.onConfirm} />
          </>
        }
      >
        <Text variant="displayMD" color={colors.textDisplay} accessibilityRole="header">
          Is this right?
        </Text>
        <Text variant="bodyMD" color={colors.textSecondary}>
          We use this to build your screening plan. You can change it anytime in your profile.
        </Text>
        <View>
          {rows.map((r) => (
            <View key={r.key} style={[styles.reviewRow, styles.divider]}>
              <View style={{ flex: 1, gap: spacing[1] }}>
                <Text variant="bodyMD" color={colors.textSecondary}>
                  {r.label}
                </Text>
                <Text color={colors.textDisplay}>{r.value}</Text>
              </View>
              <Pressable accessibilityRole="button" accessibilityLabel={`Edit ${r.label}`} onPress={() => props.onEdit(r.key)} hitSlop={12}>
                <Asset name="edit" width={20} />
              </Pressable>
            </View>
          ))}
        </View>
      </QuestionCard>
    </PlanScaffold>
  );
}

// Figma: 968:4913 — Building plan (mock loading, ~2.4s)
export function BuildingStep({ onDone }: { onDone: () => void }) {
  const [done, setDone] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setDone((d) => d + 1), 800);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    if (done > buildingSteps.length) onDone();
  }, [done, onDone]);
  return (
    <PlanScaffold bottom>
      <View style={styles.buildCard} accessibilityLiveRegion="polite">
        <Asset name="aIIcon" width={28} />
        <Text variant="displayMD" color={colors.textDisplay} accessibilityRole="header">
          Building your screening plan
        </Text>
        <View style={{ gap: spacing[2] }}>
          {buildingSteps.map((step, i) => {
            const state = i < done ? 'done' : i === done ? 'active' : 'pending';
            return (
              <View key={step} style={styles.buildRow}>
                <View style={{ opacity: state === 'pending' ? 0.3 : 1 }}>
                  <Asset name={state === 'done' ? 'iconsCheckCircleFill' : 'iconsClock'} width={state === 'done' ? 20 : 20} />
                </View>
                <Text variant="bodyMD" color={state === 'pending' ? colors.textPlaceholder : colors.textBody}>
                  {step}
                </Text>
              </View>
            );
          })}
        </View>
      </View>
    </PlanScaffold>
  );
}

// Figma: 960:5390 — See your GP
export function SeeGpStep({ onFindClinic, onContinue }: { onFindClinic: () => void; onContinue: () => void }) {
  return (
    <PlanScaffold bottom>
      <View style={styles.gpCard}>
        <Asset name="iconsWarning" width={24} />
        <Text variant="displayMD" color={colors.textDisplay} accessibilityRole="header">
          Please talk to your GP
        </Text>
        <Text variant="bodyMD" color={colors.textBody}>
          A lump, unusual bleeding or pelvic pain should be checked by a doctor first. You can finish your screening plan after.
        </Text>
        <View style={{ gap: spacing[3], marginTop: spacing[1] }}>
          <Button label="Find a clinic" size="compact" onPress={onFindClinic} />
          <Button label="Continue my plan" size="compact" variant="secondary" onPress={onContinue} />
        </View>
      </View>
    </PlanScaffold>
  );
}

const styles = StyleSheet.create({
  divider: { borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  whenGroup: { gap: spacing[3], paddingBottom: spacing[4] },
  pills: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing[2] },
  pill: {
    borderWidth: 1,
    borderColor: palette.dark[300],
    borderRadius: 999,
    paddingHorizontal: spacing[2],
    paddingVertical: 4,
    minHeight: 32,
    justifyContent: 'center',
  },
  pillOn: { backgroundColor: palette.neutral[400], borderColor: palette.neutral[400] },
  reviewRow: { flexDirection: 'row', alignItems: 'flex-start', gap: spacing[3], paddingVertical: spacing[3] },
  buildCard: { backgroundColor: palette.neutral[100], borderRadius: radius.medium, padding: 20, paddingTop: spacing[6], gap: spacing[4] },
  buildRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  gpCard: { backgroundColor: palette.neutral[100], borderRadius: radius.medium, borderWidth: 1, borderColor: palette.neutral[400], padding: 20, gap: spacing[3] },
});
