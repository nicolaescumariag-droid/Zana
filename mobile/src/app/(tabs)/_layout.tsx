import { Tabs, useRouter, type Href } from 'expo-router';

import { BottomNav, type NavTab } from '@/components/composites/BottomNav';
import { colors } from '@/tokens';

const TAB_ROUTES: NavTab[] = ['home', 'records', 'screenings', 'account'];

export default function TabsLayout() {
  const router = useRouter();
  // Tapping a tab always opens its first screen, not the last screen visited in that tab.
  const openTab = (name: string) => router.navigate(`/${name}` as Href);
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bgScreen } }}
      tabBar={({ state }) => {
        const current = state.routes[state.index]?.name.split('/')[0] as NavTab;
        return (
          <BottomNav
            active={TAB_ROUTES.includes(current) ? current : null}
            onSelect={openTab}
            onHeart={() => openTab('chat')}
          />
        );
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="records" />
      <Tabs.Screen name="screenings" />
      <Tabs.Screen name="account" />
      <Tabs.Screen name="clinic" />
      <Tabs.Screen name="chat" />
    </Tabs>
  );
}
