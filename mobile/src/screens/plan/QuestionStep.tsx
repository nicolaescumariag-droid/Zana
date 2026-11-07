// Figma: 962:6339 / 962:6414 (Family history), 962:6626 / 962:6701 (Health history), 962:6913 / 962:6988 (Recent tests)
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { QuestionCard } from '@/components/composites/QuestionCard';
import { Asset } from '@/components/primitives/Asset';
import { CheckboxRow } from '@/components/primitives/Checkbox';
import { InlineButton, TextLink } from '@/components/primitives/InlineButton';
import { Text } from '@/components/primitives/Text';
import type { Question } from '@/mocks/guidedPlan';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing, typography } from '@/tokens';

import { PlanScaffold } from './PlanScaffold';

// TODO(design): pencil icon on "Cancer"/"Surgery" appears in Figma without a defined action — rendered inert.
const EDITABLE = new Set(['Cancer', 'Surgery']);

type QuestionStepProps = {
  question: Question;
  initiallyExpanded?: boolean;
  onPrev?: () => void;
  onNext: () => void;
  onClose: () => void;
};

export function QuestionStep({ question, initiallyExpanded = false, onPrev, onNext, onClose }: QuestionStepProps) {
  const { answers, setAnswers } = useAppState();
  const [expanded, setExpanded] = useState(initiallyExpanded);
  const selected = answers[question.id];
  const other = answers.other[question.id] ?? '';
  const hasAnswer = selected.length > 0 || other.trim().length > 0;

  const toggle = (opt: string) =>
    setAnswers((a) => {
      const cur = a[question.id];
      let next = cur.includes(opt) ? cur.filter((o) => o !== opt) : [...cur, opt];
      if (opt === 'None of these' && !cur.includes(opt)) next = [opt];
      else if (opt !== 'None of these') next = next.filter((o) => o !== 'None of these');
      return { ...a, [question.id]: next };
    });

  const visible = expanded ? [...question.options, ...question.moreOptions] : question.options;

  return (
    <PlanScaffold focusCard={expanded}>
      <QuestionCard
        pager={question.step}
        onPrev={onPrev}
        onNext={hasAnswer ? onNext : undefined}
        onClose={onClose}
        footer={
          <>
            <TextLink label="Skip" onPress={onNext} />
            <InlineButton label="Continue" disabled={!hasAnswer} onPress={onNext} />
          </>
        }
      >
        <Text variant="bodyLGBold" color={colors.textDisplay} accessibilityRole="header">
          {question.title}
        </Text>
        <View>
          {visible.map((opt) => (
            <View key={opt}>
              <CheckboxRow label={opt} checked={selected.includes(opt)} onToggle={() => toggle(opt)} />
              {EDITABLE.has(opt) ? (
                <View style={styles.edit} pointerEvents="none">
                  <Asset name="iconsEdit" width={20} />
                </View>
              ) : null}
            </View>
          ))}
          <Pressable accessibilityRole="button" onPress={() => setExpanded((e) => !e)} style={styles.more} hitSlop={6}>
            <Text variant="bodyMD" color={palette.dark[300]}>
              {expanded ? 'Show less' : `Show more (${question.moreOptions.length})`}
            </Text>
          </Pressable>
        </View>
        <View style={styles.other}>
          <Asset name="iconsPlus2" width={20} />
          <TextInput
            value={other}
            onChangeText={(t) => setAnswers((a) => ({ ...a, other: { ...a.other, [question.id]: t } }))}
            placeholder={question.otherPlaceholder}
            placeholderTextColor={colors.textPlaceholder}
            accessibilityLabel={question.otherPlaceholder}
            style={[typography.bodyLG, styles.otherInput]}
          />
        </View>
      </QuestionCard>
    </PlanScaffold>
  );
}

const styles = StyleSheet.create({
  edit: { position: 'absolute', right: 4, top: 12 },
  more: { paddingVertical: spacing[3], alignSelf: 'flex-start' },
  other: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[2],
    padding: spacing[3],
    borderWidth: 1,
    borderColor: palette.neutral[400],
    borderRadius: radius.small,
    backgroundColor: palette.white,
  },
  otherInput: { flex: 1, color: colors.textDisplay, padding: 0, outlineStyle: 'none' } as object,
});
