/// <reference types="jest" />
import { fireEvent, render, screen } from '@testing-library/react-native';

import { SafeAreaProvider } from 'react-native-safe-area-context';

import { questions } from '@/mocks/guidedPlan';
import { QuestionStep } from '@/screens/plan/QuestionStep';
import { AppStateProvider } from '@/state/AppState';

jest.mock('expo-router', () => ({ useRouter: () => ({ push: jest.fn(), back: jest.fn(), replace: jest.fn() }) }));

describe('Guided plan question', () => {
  it('enables Continue only after an answer is selected', async () => {
    const onNext = jest.fn();
    await render(
      <SafeAreaProvider initialMetrics={{ frame: { x: 0, y: 0, width: 390, height: 844 }, insets: { top: 47, left: 0, right: 0, bottom: 34 } }}>
      <AppStateProvider>
        <QuestionStep question={questions[0]} onNext={onNext} onPrev={jest.fn()} onClose={jest.fn()} />
      </AppStateProvider>
      </SafeAreaProvider>,
    );
    const cont = screen.getByRole('button', { name: 'Continue' });
    expect(cont).toBeDisabled();
    await fireEvent.press(screen.getByRole('checkbox', { name: 'Heart disease' }));
    expect(screen.getByRole('button', { name: 'Continue' })).toBeEnabled();
    await fireEvent.press(screen.getByRole('button', { name: 'Continue' }));
    expect(onNext).toHaveBeenCalled();
  });
});
