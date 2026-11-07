import { useLocalSearchParams } from 'expo-router';

import { ReminderDetail } from '@/screens/screenings/ReminderDetail';

export default function ScreeningDetailRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <ReminderDetail id={id} />;
}
