// Guided screening plan flow: Figma 962:6339 → 960:5390 (B02–B12).
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useCallback } from 'react';

import { questions } from '@/mocks/guidedPlan';
import { emptyAnswers, useAppState } from '@/state/AppState';

import { BuildingStep, ReviewStep, SeeGpStep, WhenStep } from './OtherSteps';
import { PlanResult } from './PlanResult';
import { QuestionStep } from './QuestionStep';

export const PLAN_STEPS = [
  'family-history',
  'health-history',
  'recent-tests',
  'recent-tests-when',
  'review',
  'building',
  'result',
  'see-gp',
] as const;
export type PlanStep = (typeof PLAN_STEPS)[number];

const QUESTION_FOR: Partial<Record<PlanStep, 0 | 1 | 2>> = { 'family-history': 0, 'health-history': 1, 'recent-tests': 2 };
const STEP_FOR = { family: 'family-history', health: 'health-history', checks: 'recent-tests' } as const;

export function GuidedPlanScreen() {
  const router = useRouter();
  const { step, expanded, from } = useLocalSearchParams<{ step: PlanStep; expanded?: string; from?: string }>();
  const { answers, setAnswers } = useAppState();

  const go = (s: PlanStep, params: Record<string, string> = {}) => router.push({ pathname: '/home/plan/[step]', params: { step: s, ...params } });
  const close = () => router.dismissTo('/home');
  const back = () => (router.canGoBack() ? router.back() : close());
  const hasChecks = answers.checks.some((c) => c !== 'None of these');
  const onBuilt = useCallback(() => router.replace({ pathname: '/home/plan/[step]', params: { step: 'result' } }), [router]);

  const q = QUESTION_FOR[step];
  if (q !== undefined) {
    const next = () => {
      if (from === 'review' && !(q === 2 && hasChecks)) return go('review');
      if (q === 0) return go('health-history');
      if (q === 1) return go('recent-tests');
      return go(hasChecks ? 'recent-tests-when' : 'review', from ? { from } : {});
    };
    return (
      <QuestionStep
        key={step}
        question={questions[q]}
        initiallyExpanded={expanded === '1'}
        onPrev={q > 0 ? back : undefined}
        onNext={next}
        onClose={close}
      />
    );
  }
  switch (step) {
    case 'recent-tests-when':
      return <WhenStep onPrev={back} onNext={() => go('review')} onClose={close} />;
    case 'review':
      return (
        <ReviewStep
          onPrev={back}
          onClose={close}
          onEdit={(k) => go(STEP_FOR[k], { from: 'review' })}
          onRestart={() => {
            setAnswers(() => emptyAnswers);
            router.dismissTo({ pathname: '/home/plan/[step]', params: { step: 'family-history' } });
          }}
          onConfirm={() => go('building')}
        />
      );
    case 'building':
      return <BuildingStep onDone={onBuilt} />;
    case 'result':
      return <PlanResult onDuePress={() => router.push('/clinic')} />;
    case 'see-gp':
      return <SeeGpStep onFindClinic={() => router.push('/clinic')} onContinue={() => go('family-history')} />;
    default:
      return null;
  }
}
