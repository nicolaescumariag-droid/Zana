import { useEffect, useRef, useState, type ComponentRef, type ReactNode } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';

import { ChatHeader } from '@/components/composites/ChatHeader';
import { PromptChip } from '@/components/primitives/PromptChip';
import { colors, layout } from '@/tokens';

type PlanScaffoldProps = {
  children: ReactNode;
  /** Push content to the bottom (Building plan / See your GP). */
  bottom?: boolean;
  /** Tighter spacing used by Review answers (966:4778). */
  compact?: boolean;
  /** Scroll the card to the top, as in the expanded question frames (e.g. 962:6414). */
  focusCard?: boolean;
};

// Shared layout for the guided "Make a plan for screenings" conversation (B02–B10, B12).
export function PlanScaffold({ children, bottom = false, compact = false, focusCard = false }: PlanScaffoldProps) {
  const scroll = useRef<ComponentRef<typeof ScrollView>>(null);
  const [cardY, setCardY] = useState(0);
  useEffect(() => {
    if (focusCard && cardY) scroll.current?.scrollTo({ y: cardY - 16, animated: true });
  }, [focusCard, cardY]);
  return (
    <View style={styles.screen}>
      <ChatHeader />
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scroll}
          contentContainerStyle={[styles.content, compact ? styles.compact : styles.regular]}
          keyboardShouldPersistTaps="handled"
        >
          <PromptChip label="Make a plan for screenings" style={styles.bubble} />
          {bottom ? <View style={{ flexGrow: 1, minHeight: 32 }} /> : null}
          <View onLayout={(e) => setCardY(e.nativeEvent.layout.y)}>{children}</View>
          {focusCard ? <View style={{ height: 600 }} /> : null}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  content: { flexGrow: 1, paddingHorizontal: layout.chatCardMargin, paddingBottom: 24 },
  regular: { paddingTop: 70, gap: 36 },
  compact: { paddingTop: 41, gap: 19 },
  bubble: { alignSelf: 'flex-end', marginRight: 4 },
});
