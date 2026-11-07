import { Stack } from 'expo-router';

import { colors } from '@/tokens';

// Deep links into chat (e.g. /chat/summary from Folders) keep Zana Chat underneath, so closing returns there.
export const unstable_settings = { initialRouteName: 'index' };

export default function ChatStack() {
  return <Stack screenOptions={{ headerShown: false, animation: 'fade', contentStyle: { backgroundColor: colors.bgScreen } }} />;
}
