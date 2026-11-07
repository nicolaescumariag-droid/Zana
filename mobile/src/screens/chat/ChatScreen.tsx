// Figma: 01 Home - Existing User 0 of 5 — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=881-4014
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ChatHeader } from '@/components/composites/ChatHeader';
import { ChatInput } from '@/components/composites/ChatInput';
import { PromptChip } from '@/components/primitives/PromptChip';
import { Text } from '@/components/primitives/Text';
import { useAppState } from '@/state/AppState';
import { colors, layout, spacing } from '@/tokens';

export function ChatScreen() {
  const router = useRouter();
  const { user } = useAppState();
  return (
    <View style={styles.screen}>
      <ChatHeader />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Text variant="displayLG" color={colors.textDisplay} accessibilityRole="header" style={styles.greeting}>
            What do you want to start with, {user.homeGreetingName}?
          </Text>
          <View style={styles.spacer} />
          <View style={styles.chips}>
            <PromptChip label="Make a plan for screenings" onPress={() => router.push('/chat/plan/family-history')} />
            {/* TODO(design): destinations for these two chips are unconfirmed (brief §3.3) — inert. */}
            <PromptChip
              label="Upload my health records"
              onPress={() => router.push({ pathname: '/records/upload', params: { from: 'chat' } })}
            />
            <PromptChip
              label="Understand a medical result"
              onPress={() => router.push({ pathname: '/records/upload', params: { from: 'chat' } })}
            />
          </View>
        </ScrollView>
        <View style={styles.input}>
          <ChatInput />
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  content: { flexGrow: 1, paddingHorizontal: layout.screenMargin, paddingTop: 78 },
  greeting: { maxWidth: 350 },
  spacer: { flexGrow: 1, minHeight: spacing[8] },
  chips: { gap: 10 },
  input: { paddingHorizontal: layout.screenMargin, paddingTop: 51, paddingBottom: 21 },
});
