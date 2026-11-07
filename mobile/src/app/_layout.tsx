import {
  DMSans_400Regular,
  DMSans_500Medium,
  DMSans_600SemiBold,
  DMSans_700Bold,
} from "@expo-google-fonts/dm-sans";
import {
  InstrumentSerif_400Regular,
  InstrumentSerif_400Regular_Italic,
} from "@expo-google-fonts/instrument-serif";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { SheetHost } from "@/components/primitives/SheetModal";
import { AppStateProvider } from "@/state/AppState";
import { colors } from "@/tokens";

export default function RootLayout() {
  const [loaded] = useFonts({
    DMSans_400Regular,
    DMSans_500Medium,
    DMSans_600SemiBold,
    DMSans_700Bold,
    InstrumentSerif_400Regular,
    InstrumentSerif_400Regular_Italic,
  });
  if (!loaded) return null;

  return (
    <SafeAreaProvider>
      <AppStateProvider>
        <StatusBar style="dark" />
        {Platform.OS === "web" ? (
          <ScrollView
            style={styles.fill}
            contentContainerStyle={styles.webBackdrop}
          >
            <View style={styles.webPhone}>
              <AppStack />
            </View>
          </ScrollView>
        ) : (
          <AppStack />
        )}
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

function AppStack() {
  return (
    <SheetHost>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: colors.bgScreen },
        }}
      >
        <Stack.Screen
          name="screening/[id]"
          options={{ animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="screening/cervical"
          options={{ animation: "slide_from_bottom" }}
        />
      </Stack>
    </SheetHost>
  );
}

// Web preview only: show the app in a fixed iPhone-sized frame (390×844); the page scrolls if the window is smaller.
const styles = StyleSheet.create({
  fill: { flex: 1 },
  webBackdrop: {
    flexGrow: 1,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4DED7",
  },
  webPhone: {
    width: 390,
    height: 844,
    flexShrink: 0,
    overflow: "hidden",
    backgroundColor: colors.bgScreen,
    borderRadius: 24,
  },
});
