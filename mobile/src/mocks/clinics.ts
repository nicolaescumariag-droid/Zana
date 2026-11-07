// Copy from Figma 881:5339 (F05), 881:5432 (F06), 881:5508 (F07), 881:5560 (F08). Example data only.
import type { ImageName } from '@/assets/images.generated';

export type Clinic = { name: string; meta: string; hours: string; status: 'Open Now' | 'Closed' | 'Opens soon'; photo: ImageName };

export const clinics: Clinic[] = [
  { name: "Merrion Fertility & Women's Health", meta: 'Diagnostic Lab • 0.8 km', hours: 'Mo-Fri: 8:00 - 18:00', status: 'Open Now', photo: 'image' },
  { name: 'Beacon Hospital', meta: 'Hospital • 1.4 km', hours: 'Mo-Fri: 8:00 - 18:00', status: 'Open Now', photo: 'image2' },
  { name: 'Dundrum Medical Centre', meta: 'Rathmines Family Practice • 2.1 km', hours: 'Mo-Fri: 9:00 - 18:00', status: 'Closed', photo: 'image3' },
  { name: 'Eurofins Biomnis Laboratory', meta: 'Diagnostic Lab • 3.1 km', hours: 'Mo-Fri: 8:30 - 18:00', status: 'Opens soon', photo: 'image4' },
];

export const clinicDetail = {
  name: 'Eurofins Biomnis Laboratory',
  address: "14 Upper O'Connell St, North City, Dublin 1",
  rating: '(4.2) •',
  distance: '3.1 km',
  photo: 'image4' as ImageName,
  booking: { date: '14 Mar 2026, 10:00' },
};

export const clinicTypes = ['Labs', 'GP', 'Clinics'];
export const nearbyLocation = '31 Saint Edmunds, Dublin';
export const savedClinic = 'City Health Center, Dublin';
