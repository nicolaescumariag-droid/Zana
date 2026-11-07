// Onboarding flow, Figma 881:3368 → 881:3423 (A01–A15).
import { useLocalSearchParams, useRouter } from 'expo-router';

import { CheckEmailScreen, ConfirmScreen, CreateAccountScreen, GoalScreen, NameScreen, PrivacyScreen } from '@/screens/onboarding/FormScreens';
import { IntroScreen, SplashScreen } from '@/screens/onboarding/IntroScreens';
import { ConnectScreen, SyncScreen } from '@/screens/onboarding/SyncScreens';

const ORDER = ['splash', 'intro-records', 'intro-reminders', 'intro-clinics', 'create-account', 'check-email', 'privacy', 'name', 'confirm', 'goal', 'sync', 'connect', 'welcome'] as const;
type Step = (typeof ORDER)[number];

export default function OnboardingStep() {
  const router = useRouter();
  const { step } = useLocalSearchParams<{ step: Step }>();
  const go = (s: Step) => router.push({ pathname: '/onboarding/[step]', params: { step: s } });
  const next = () => go(ORDER[ORDER.indexOf(step) + 1] ?? 'welcome');
  const back = () => (router.canGoBack() ? router.back() : go('splash'));
  const finish = () => router.replace('/home');

  switch (step) {
    case 'splash':
      return <SplashScreen onStart={next} />;
    case 'intro-records':
      return <IntroScreen photo="union" title="All your results, in one place" body={'Store all your medical documents safely.\nNo more lost results.'} cta="Continue" onNext={next} />;
    case 'intro-reminders':
      return <IntroScreen photo="union2" title="Never miss a screening" body="Get reminders based on your age and health history." cta="Continue" onNext={next} />;
    case 'intro-clinics':
      return <IntroScreen photo="union3" title="Find the right clinic, fast" body="See nearby clinics for exactly the screening you need." cta="Continue" onNext={next} />;
    case 'create-account':
      return <CreateAccountScreen onBack={back} onNext={next} />;
    case 'check-email':
      return <CheckEmailScreen onBack={back} onNext={next} />;
    case 'privacy':
      return <PrivacyScreen onClose={back} onNext={next} />;
    case 'name':
      return <NameScreen onBack={back} onNext={next} />;
    case 'confirm':
      return <ConfirmScreen onBack={back} onNext={next} />;
    case 'goal':
      return <GoalScreen onBack={back} onNext={next} />;
    case 'sync':
      return <SyncScreen onClose={() => go('welcome')} onSync={next} onSkip={() => go('welcome')} />;
    case 'connect':
      return <ConnectScreen onClose={back} onNext={() => go('welcome')} />;
    case 'welcome':
      return <IntroScreen welcome photo="ellipse43" title="Welcome to Zana" body={'One place for screenings, records,\nand reminders.'} cta="Start my journey" onNext={finish} />;
    default:
      return null;
  }
}
