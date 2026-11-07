// Copy from Figma 881:5339 (F05), 881:5432 (F06), 881:5508 (F07), 881:5560 (F08). Example data only;
// only Eurofins' address and rating come from Figma, the others are placeholders.
import type { ImageName } from '@/assets/images.generated';

export type ClinicType = 'Labs' | 'GP' | 'Clinics';

export type Clinic = {
  name: string;
  type: ClinicType;
  meta: string;
  hours: string;
  status: 'Open Now' | 'Closed' | 'Opens soon';
  photo: ImageName;
  address: string;
  rating?: number;
};

export const clinics: Clinic[] = [
  { name: "Merrion Fertility & Women's Health", type: 'Labs', meta: 'Diagnostic Lab • 0.8 km', hours: 'Mo-Fri: 8:00 - 18:00', status: 'Open Now', photo: 'image', address: 'Dublin 2' },
  { name: 'Beacon Hospital', type: 'Clinics', meta: 'Hospital • 1.4 km', hours: 'Mo-Fri: 8:00 - 18:00', status: 'Open Now', photo: 'image2', address: 'Dublin 18' },
  { name: 'Dundrum Medical Centre', type: 'GP', meta: 'Rathmines Family Practice • 2.1 km', hours: 'Mo-Fri: 9:00 - 18:00', status: 'Closed', photo: 'image3', address: 'Dublin 14' },
  { name: 'Eurofins Biomnis Laboratory', type: 'Labs', meta: 'Diagnostic Lab • 3.1 km', hours: 'Mo-Fri: 8:30 - 18:00', status: 'Opens soon', photo: 'image4', address: "14 Upper O'Connell St, North City, Dublin 1", rating: 4.2 },
];

export const defaultClinic = clinics[3];
export const distanceOf = (c: Clinic) => c.meta.split('• ')[1] ?? '';
export const bookingDate = '14 Mar 2026, 10:00';
export const defaultScreening = 'Blood panel';
export const clinicTypes: ClinicType[] = ['Labs', 'GP', 'Clinics'];
export const nearbyLocation = '31 Saint Edmunds, Dublin';
export const savedClinic = 'City Health Center, Dublin';
