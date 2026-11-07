import { Stack } from 'expo-router';

import { colors } from '@/tokens';

export default function ChatStack() {
  return <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: colors.bgScreen } }} />;
}
