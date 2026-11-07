import { Tabs } from 'expo-router';

import { BottomNav, type NavTab } from '@/components/composites/BottomNav';
import { colors } from '@/tokens';

const TAB_ROUTES: NavTab[] = ['home', 'records', 'screenings', 'account'];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false, sceneStyle: { backgroundColor: colors.bgScreen } }}
      tabBar={({ state, navigateToTab }) => {
        const current = state.routes[state.index]?.name as NavTab;
        return (
          <BottomNav
            active={TAB_ROUTES.includes(current) && current !== 'home' ? current : null}
            onSelect={(tab) => {
              const route = state.routes.find((r) => r.name === tab);
              if (route) navigateToTab(route.key);
            }}
          />
        );
      }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="records" />
      <Tabs.Screen name="screenings" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
