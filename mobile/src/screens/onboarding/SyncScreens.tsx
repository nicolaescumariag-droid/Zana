// Figma: 881:3951 Sync Data, 881:3977 Connect Apps
import { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { ImageName } from '@/assets/images.generated';
import { OnboardingSheet } from '@/components/composites/OnboardingSheet';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

export function SyncScreen({ onClose, onSync, onSkip }: { onClose: () => void; onSync: () => void; onSkip: () => void }) {
  const { user } = useAppState();
  return (
    <OnboardingSheet
      onClose={onClose}
      progress={5}
      footer={
        <>
          <Button label="I want to sync my data" icon="iconsPlus" onPress={onSync} />
          <Pressable accessibilityRole="button" onPress={onSkip} style={{ alignSelf: 'center', padding: 4 }}>
            <Text color={colors.textBody}>Skip for now</Text>
          </Pressable>
        </>
      }
    >
      <View style={{ gap: spacing[4], marginTop: spacing[6] }}>
        <Text variant="displayMD" color="#27272A" align="center" accessibilityRole="header">
          Thank you, {user.firstName}
        </Text>
        <Text color="#27272A" align="center">
          Your pofile is almost complete. Do you want it to sync with one of your cycle app?
        </Text>
      </View>
      <View style={styles.art} accessible accessibilityLabel="Zana connects with cycle tracking apps">
        <Asset name="zANA2" width={60} height={61} />
        <Asset name="vector27" width={156} height={40} style={{ marginVertical: 8 }} />
        <View style={styles.logos}>
          <Photo name="image35" style={styles.logo} />
          <Photo name="image36" style={styles.logo} />
          <Photo name="image37" style={styles.logo} />
        </View>
      </View>
    </OnboardingSheet>
  );
}

// TODO(design): partner names/logos are placeholders from Figma; no real integration exists.
const APPS: { name: string; icon: ImageName }[] = [
  { name: 'Flo Period & Pregnancy Tracker', icon: 'illustrations' },
  { name: 'Period Calendar Period Tracker', icon: 'illustrations2' },
  { name: 'Period Tracker and Calendar', icon: 'illustrations3' },
  { name: 'Ivy Period & Pregnancy Tracker', icon: 'illustrations4' },
  { name: 'Ovulation & Period Tracker', icon: 'illustrations5' },
];

export function ConnectScreen({ onClose, onNext }: { onClose: () => void; onNext: () => void }) {
  const [picked, setPicked] = useState<string | null>(null);
  return (
    <OnboardingSheet onClose={onClose} footer={<Button label="Continue to sync" icon="iconsArrowRight" onPress={onNext} />}>
      <Text variant="displayMD" color="#27272A" align="center" accessibilityRole="header" style={{ marginBottom: spacing[6] }}>
        Tap to connect to...
      </Text>
      <View style={{ gap: spacing[3] }}>
        {APPS.map((a) => (
          <Pressable
            key={a.name}
            accessibilityRole="radio"
            accessibilityState={{ checked: picked === a.name }}
            onPress={() => setPicked(a.name)}
            style={[styles.app, picked === a.name && { borderColor: colors.actionPrimary }]}
          >
            <Photo name={a.icon} style={styles.appIcon} />
            <Text variant="bodyMD" color={colors.textBody} style={{ flex: 1 }}>{a.name}</Text>
          </Pressable>
        ))}
      </View>
    </OnboardingSheet>
  );
}

const styles = StyleSheet.create({
  art: { alignItems: 'center', marginTop: 56 },
  logos: { flexDirection: 'row', gap: 23 },
  logo: { width: 55, height: 55, borderRadius: 8 },
  app: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], height: 82, padding: spacing[4], borderRadius: radius.medium, borderWidth: 1, borderColor: palette.neutral[600], backgroundColor: palette.neutral[100] },
  appIcon: { width: 50, height: 50, borderRadius: radius.medium },
});
