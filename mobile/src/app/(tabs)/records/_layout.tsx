import { Stack } from 'expo-router';

import { colors } from '@/tokens';

export default function RecordsStack() {
  return <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bgScreen } }} />;
}
