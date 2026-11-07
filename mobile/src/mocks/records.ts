// Copy from Figma 881:4302 (D02), 881:4427 (D03), 881:4740–881:4884 (D08–D11), 881:5161 (E01). Example data only.
import type { SvgName } from '@/assets/svgs.generated';

export type FolderDef = { name: string; icon: SvgName | 'bone' };

export const folderOptions: FolderDef[] = [
  { name: 'General', icon: 'group2' },
  { name: 'Gynaecology', icon: 'group22' },
  { name: 'Dermatology', icon: 'group32' },
  { name: 'Mental Health', icon: 'group4' },
  { name: 'Bloodwork', icon: 'xMLID203' },
  { name: 'Fertility', icon: 'group5' },
  { name: 'Breast Health', icon: 'healthcare1' },
  { name: 'Cardiometabolic', icon: 'group6' },
  { name: 'Endocrinology', icon: 'group7' },
  { name: 'Eye & Vision', icon: 'group7' },
  { name: 'Bone & Joint', icon: 'bone' },
  { name: 'Family', icon: 'add1' },
  { name: 'Other', icon: 'add12' },
];

export const defaultFolders = ['General', 'Gynaecology', 'Family'];

// Free plan limit; more folders would be paid (paid flow not designed).
export const maxFreeFolders = 3;

export const folderListIcons: Record<string, SvgName> = { General: 'group2', Gynaecology: 'uterus1', Family: 'add13' };

export const uploadFilters = ['General', 'Gynaecology', 'Bloodwork', 'Breast Health'];

export const document = {
  shortName: 'Pap Cytology & Molecular...',
  mediumName: 'Pap Cytology & Molecular Diagnostics Report...',
  fullName: 'Pap Cytology & Molecular Diagnostics Report – Smith Sophia',
  size: '0 KB of 120KB',
  doctor: 'Dr. Murphy · Mar 2024',
};

export const summary = {
  meaning:
    'Your Pap smear shows no abnormal cervical cells. The HPV test did not detect any high risk types. Together these results point to a low risk of cervical changes, and your sample quality was good enough for a reliable reading.',
  values: [
    { label: 'Cytology', value: 'NILM', status: 'Normal' },
    { label: 'High-risk HPV', value: 'Negative', status: 'Normal' },
    { label: 'Specimen', value: 'Satisfactory', status: undefined },
  ],
  notice:
    'Hi Sophia! Keep in mind that these are answers generated from the information I have and I might make mistakes. Consider consulting a doctor.',
};
