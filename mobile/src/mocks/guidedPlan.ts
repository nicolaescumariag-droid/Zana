// Copy from approved Figma frames 962:6339 – 960:5390 (B02–B12). Mock data only — no clinical logic.
export type QuestionId = 'family' | 'health' | 'checks';

export type Question = {
  id: QuestionId;
  step: string;
  title: string;
  options: string[];
  moreOptions: string[];
  otherPlaceholder: string;
};

export const questions: Question[] = [
  {
    id: 'family',
    step: '1 of 3',
    title: 'Has anyone in your close family had any of these?',
    options: ['Heart disease', 'Diabetes', 'Cancer', 'High blood pressure'],
    moreOptions: ['Stroke', 'High cholesterol', 'Thyroid problems', 'Mental health conditions', 'Dementia', 'None of these'],
    otherPlaceholder: 'Other, e.g. arthritis',
  },
  {
    id: 'health',
    step: '2 of 3',
    title: 'Have you ever had any of these?',
    options: ['High blood pressure', 'Asthma', 'Thyroid problems', 'Anxiety or depression'],
    moreOptions: ['Diabetes', 'Anaemia', 'Migraines', 'Allergies', 'Surgery', 'None of these'],
    otherPlaceholder: 'Other, e.g. back pain',
  },
  {
    id: 'checks',
    step: '3 of 3',
    title: 'Which checks have you had in the last 6 months?',
    options: ['Blood test', 'Blood pressure check', 'Smear test', 'Eye test'],
    moreOptions: ['Cholesterol check', 'Dental check-up', 'Urine test', 'Skin check', 'None of these'],
    otherPlaceholder: 'Other, e.g. hearing test',
  },
];

export const whenOptions = ['Last month', '2 to 6 months ago', 'About 1 year ago', '2+ years ago'] as const;

export const buildingSteps = ['Reading your answers', 'Matching recommended checks', 'Setting your reminders'];

export type PlanItem = { id: string; status: 'due' | 'upcoming'; title: string; why: string };

// Fixed example plan from frame 968:5030 — not derived from answers.
export const planItems: PlanItem[] = [
  { id: 'blood-pressure', status: 'due', title: 'Blood pressure check', why: 'Why: high blood pressure in your family' },
  { id: 'cholesterol', status: 'upcoming', title: 'Cholesterol check', why: 'Why: heart disease in your family' },
  { id: 'smear', status: 'upcoming', title: 'Smear test / HPV', why: 'Why: recommended for your age (25 to 65)' },
];

export const planAge = 34;
export const disclaimer = 'This is not medical advice, check it with your GP';
