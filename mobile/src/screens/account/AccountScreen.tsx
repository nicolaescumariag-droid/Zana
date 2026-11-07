// Figma: 881:5605 — Account / Settings (G01)
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { GradientBackdrop } from '@/components/composites/GradientBackdrop';
import { Asset } from '@/components/primitives/Asset';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { Toggle } from '@/components/primitives/Toggle';
import { useInsets } from '@/hooks/useInsets';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

const LINKS: { title: string; rows: string[] }[] = [
  { title: 'Health profile', rows: ['Conditions', 'Cycle settings', 'Height & weight'] },
  { title: 'Care & sharing', rows: ['Share records with a doctor', 'Location for clinics'] },
];
const NOTIFS = ['Screening reminders', 'Cycle-timed reminders', 'Result ready alerts'];

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={{ gap: spacing[3], marginTop: spacing[6] }}>
      <Text variant="labelLG" color="#27272A" style={{ textTransform: 'uppercase' }} accessibilityRole="header">{title}</Text>
      <View style={styles.group}>{children}</View>
    </View>
  );
}

function Row({ label, last, right }: { label: string; last?: boolean; right?: React.ReactNode }) {
  return (
    <View style={[styles.row, !last && styles.divider]}>
      <Text variant="bodyMD" color={colors.textBody} style={{ flex: 1 }}>{label}</Text>
      {right ?? <Asset name="iconsChevronRight3" width={20} />}
    </View>
  );
}

export function AccountScreen() {
  const router = useRouter();
  const insets = useInsets();
  const { user } = useAppState();
  const [notifs, setNotifs] = useState<boolean[]>([true, false, false]);
  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={[styles.header, { paddingTop: insets.top + 24 }]}>
        <GradientBackdrop id="account" from={palette.purple[100]} to={palette.neutral[200]} />
        <Pressable accessibilityRole="button" accessibilityLabel="Back" onPress={() => router.navigate('/home')} style={styles.back}>
          <Asset name="iconsArrowLeft" width={24} />
          <Text variant="bodyLGBold" color="#27272A">Settings</Text>
        </Pressable>
        <Photo name="ellipse69" contentFit="cover" style={styles.avatar} />
        <Text variant="displayLG" color={palette.dark[800]} style={{ marginTop: spacing[3] }}>{user.profileName}</Text>
        <Text variant="bodyMD" color={palette.dark[800]}>{user.ageLabel}</Text>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        {/* TODO(design): settings detail screens not designed — rows inert. */}
        {LINKS.map((g) => (
          <Group key={g.title} title={g.title}>
            {g.rows.map((r, i) => (
              <Row key={r} label={r} last={i === g.rows.length - 1} />
            ))}
          </Group>
        ))}
        <Group title="Notifications">
          {NOTIFS.map((n, i) => (
            <Row key={n} label={n} last={i === NOTIFS.length - 1} right={<Toggle label={n} value={notifs[i]} onChange={(v) => setNotifs((a) => a.map((x, j) => (j === i ? v : x)))} />} />
          ))}
        </Group>
        <Group title="Privacy & data">
          <Row label="Export records" />
          <Row label="Manage my data" last />
        </Group>
        <Pressable accessibilityRole="button" onPress={() => router.replace('/onboarding/splash')} style={styles.logout}>
          <Text variant="bodyLGBold" color={palette.red[500]}>Log Out</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  header: { alignItems: 'center', paddingBottom: spacing[8], overflow: 'hidden' },
  back: { flexDirection: 'row', alignItems: 'center', gap: 20, alignSelf: 'stretch', paddingHorizontal: 20, marginBottom: spacing[6] },
  avatar: { width: 56, height: 56, borderRadius: 28 },
  group: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: 48, paddingHorizontal: spacing[3] },
  divider: { borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  logout: { alignSelf: 'flex-start', paddingVertical: spacing[6] },
});
