// Copy from Figma 881:4242 (C02), 881:4589 (C03), 881:4927 / 881:4991 / 881:4959 (C04–C06). Example data only.
import type { ScreeningStatus } from '@/components/composites/ScreeningParts';

export type Reminder = { id: string; status: ScreeningStatus; title: string; subtitle: string };

export const reminders: Reminder[] = [
  { id: 'blood-pressure', status: 'overdue', title: 'Blood pressure check', subtitle: 'Was due Dec 2024' },
  { id: 'thyroid', status: 'scheduled', title: 'Thyroid function (TSH)', subtitle: 'Booked 14 Mar, 10:00' },
  { id: 'sti', status: 'upcoming', title: 'STI screen', subtitle: 'Due in 3 weeks' },
  { id: 'skin', status: 'upcoming', title: 'Skin / mole check', subtitle: 'Due next month' },
  { id: 'cervical', status: 'done', title: 'Cervical screening (Pap + HPV)', subtitle: 'Completed Mar 2024' },
  { id: 'glucose', status: 'done', title: 'Glucose / HbA1c', subtitle: 'Completed Jan 2025' },
];

export const sectionTitles: Record<ScreeningStatus, string> = { overdue: 'Overdue', scheduled: 'Scheduled', upcoming: 'Upcoming', done: 'Done' };

export type PastResult = { date: string; badge: { label: string; tone: 'success' | 'warning' }; title: string; detail: string };
export type ReminderDetail = { badge: 'Overdue' | 'Booked' | 'Upcoming'; title: string; primary: string; secondary: string; results: PastResult[] };

export const reminderDetails: Record<string, ReminderDetail> = {
  'blood-pressure': {
    badge: 'Overdue',
    title: 'Blood pressure check',
    primary: 'Find a clinic',
    secondary: 'Mark as booked',
    results: [
      { date: 'Jan 2023', badge: { label: 'Slightly high', tone: 'warning' }, title: 'Blood pressure check', detail: '128/82 mmHg • Recheck advised' },
      { date: 'Jan 2023', badge: { label: 'Normal', tone: 'success' }, title: 'Blood pressure check', detail: '120/78 mmHg • Within healthy range' },
    ],
  },
  thyroid: {
    badge: 'Booked',
    title: 'Thyroid function (TSH)',
    primary: 'Add to calendar',
    secondary: 'Change date',
    results: [
      { date: 'Mar 2023', badge: { label: 'Slightly elevated', tone: 'warning' }, title: 'Thyroid function (TSH)', detail: 'TSH 3.2 mIU/L • Retest in 2 years' },
      { date: 'Jan 2021', badge: { label: 'Normal', tone: 'success' }, title: 'Thyroid function (TSH)', detail: 'TSH 2.1 mIU/L • Within range' },
    ],
  },
  sti: {
    badge: 'Upcoming',
    title: 'STI screen',
    primary: 'Find a clinic',
    secondary: 'Mark as booked',
    results: [
      { date: 'Jan 2023', badge: { label: 'Negative', tone: 'success' }, title: 'STI screen - Chlamydia, gonorrhoea, HIV', detail: 'All negative · Routine retest yearly' },
      { date: 'May 2022', badge: { label: 'Negative', tone: 'success' }, title: 'STI screen - Full panel', detail: 'All negative · No follow-up needed' },
    ],
  },
};

export const catalogue: { group: string; items: [string, string][] }[] = [
  { group: "Women's health", items: [['Blood panel (iron, cholesterol, vitamin D)', '3–5 years'], ['Breast check / clinical exam', 'yearly self/clinical'], ['STI screen', 'yearly or per risk'], ['Pelvic ultrasound', 'as advised']] },
  { group: 'Blood & metabolic', items: [['Full blood panel (iron, CBC)', '1–2 years'], ['Cholesterol / lipids', 'every 4–5 years'], ['Glucose / HbA1c', 'every 3 years'], ['Vitamin D', 'as advised']] },
  { group: 'Hormonal', items: [['Thyroid function (TSH)', '1–5 years'], ['Hormone panel (FSH, LH, etc.)', 'as advised']] },
  { group: 'Heart', items: [['Blood pressure check', 'yearly']] },
  { group: 'Eyes & teeth', items: [['Eye exam', 'as every 2 years'], ['Dental check', 'every 6–12 mo']] },
  { group: 'Other', items: [['Vaccinations / boosters', 'per schedule'], ['Custom screening', 'user-defined']] },
];
