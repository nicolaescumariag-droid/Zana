import type { Href } from 'expo-router';

// Example chat history (not in Figma). Static mock; no live AI.
export type ChatHistoryItem = { kind: string; title: string; preview: string; date: string; href: Href };

export const chatHistory: ChatHistoryItem[] = [
  {
    kind: 'AI summary',
    title: 'Pap Cytology & Molecular Diagnostics Report',
    preview: 'Your Pap smear shows no abnormal cervical cells.',
    date: 'Mar 2024',
    href: '/chat/summary',
  },
  {
    kind: 'Screening plan',
    title: 'Make a plan for screenings',
    preview: 'Family history, personal health history and recent tests.',
    date: 'Mar 2024',
    href: '/chat/plan/family-history',
  },
];
