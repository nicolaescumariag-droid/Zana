// Figma: Organisms/Question Card (in 962:6339) and Organisms/Summary Card (966:4778).
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Asset } from '@/components/primitives/Asset';
import { Text } from '@/components/primitives/Text';
import { palette, radius, spacing } from '@/tokens';

type QuestionCardProps = {
  pager: string;
  onPrev?: () => void;
  onNext?: () => void;
  onClose?: () => void;
  children: ReactNode;
  footer?: ReactNode;
};

export function QuestionCard({ pager, onPrev, onNext, onClose, children, footer }: QuestionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.pager}>
          <Pressable accessibilityRole="button" accessibilityLabel="Previous question" onPress={onPrev} disabled={!onPrev} hitSlop={10}>
            <Asset name="prev" width={20} />
          </Pressable>
          <Text color={palette.dark[300]}>{pager}</Text>
          <Pressable accessibilityRole="button" accessibilityLabel="Next question" onPress={onNext} disabled={!onNext} hitSlop={10} style={{ opacity: onNext ? 1 : 0.4 }}>
            <Asset name="next" width={20} />
          </Pressable>
        </View>
        {onClose ? (
          <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={10}>
            <Asset name="close" width={20} />
          </Pressable>
        ) : null}
      </View>
      {children}
      {footer ? <View style={styles.footer}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: palette.neutral[100],
    borderRadius: radius.medium,
    paddingTop: spacing[6],
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: spacing[3],
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', height: 24 },
  pager: { flexDirection: 'row', alignItems: 'center', gap: spacing[2] },
  footer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', minHeight: 44, paddingTop: spacing[1] },
});
