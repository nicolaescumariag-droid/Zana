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
import { Platform, StyleSheet, View } from "react-native";
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
        <View style={Platform.OS === "web" ? styles.webBackdrop : styles.fill}>
          <View style={Platform.OS === "web" ? styles.webPhone : styles.fill}>
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
          </View>
        </View>
      </AppStateProvider>
    </SafeAreaProvider>
  );
}

// Web preview only: show the app in an iPhone-sized frame (390×844) instead of stretching to the window.
const styles = StyleSheet.create({
  fill: { flex: 1 },
  webBackdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E4DED7",
  },
  webPhone: {
    width: 390,
    height: 844,
    maxWidth: "100%",
    maxHeight: "100%",
    overflow: "hidden",
    backgroundColor: colors.bgScreen,
    borderRadius: 24,
  },
});
