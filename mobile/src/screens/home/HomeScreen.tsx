// Figma: 04 Home - Existing User 0 of 5 Duplicate — https://www.figma.com/design/Eo7DWsANnIc4IbnsYmrZX9?node-id=994-6213
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, View } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { ProfileHeader } from '@/components/composites/ProfileHeader';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { homeDashboard } from '@/mocks/home';
import { useAppState } from '@/state/AppState';
import { palette, radius, spacing } from '@/tokens';

const ROW_ICON: Record<(typeof homeDashboard.screenings)[number]['icon'], SvgName> = {
  done: 'iconsCheckCircle',
  overdue: 'iconsInfo2',
  soon: 'iconsClock6',
  scheduled: 'iconsCalendar2',
};

export function HomeScreen() {
  const router = useRouter();
  const { user } = useAppState();
  const d = homeDashboard;
  return (
    <View style={styles.screen}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.hero}>
          <Photo name="group119" style={styles.heroArt} contentFit="fill" />
          <View style={styles.days}>
            {d.week.map(([label, date]) => {
              const today = date === d.today;
              return (
                <View
                  key={label}
                  style={[styles.day, today && styles.dayToday]}
                  accessible
                  accessibilityLabel={`${label} ${date}${today ? ', today' : ''}`}
                >
                  <Text variant="labelMD" color={today ? palette.dark[900] : palette.neutral[600]} style={styles.dayText}>
                    {label}
                  </Text>
                  <Text variant="headingSM" color="#1E293B" style={[styles.dayText, { lineHeight: 26 }]}>
                    {date}
                  </Text>
                </View>
              );
            })}
          </View>
          <View style={styles.cycle}>
            <Text variant="displayXL" color={palette.dark[900]}>
              {d.cycleDay}
            </Text>
            <Text variant="headingSM" color={palette.dark[900]}>
              {d.cyclePhase}
            </Text>
          </View>
        </View>

        <View style={styles.progress}>
          <Asset name="progressGraph" width={288} height={144} />
          <View style={styles.progressText}>
            <Text variant="displayXL" color="#27272A" style={styles.center}>
              {d.completed}
            </Text>
            <Text variant="headingSM" color="#27272A" style={styles.center}>
              Screenings Completed
            </Text>
          </View>
        </View>

        <View style={styles.card}>
          <View style={styles.stats}>
            {d.stats.map(([label, value], i) => (
              <View key={label} style={[styles.stat, i < d.stats.length - 1 && styles.statDivider]}>
                <Text color="#27272A" style={styles.center}>
                  {label}
                </Text>
                <Text variant="headingLG" color="#27272A" style={styles.center}>
                  {value}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.rows}>
            {/* TODO(design): row destinations not designed — inert. */}
            {d.screenings.map((s, i) => (
              <View key={i} style={styles.row} accessible accessibilityLabel={`${s.title}, ${s.subtitle}`}>
                <Asset name={ROW_ICON[s.icon]} width={28} />
                <View style={styles.rowCard}>
                  <Text variant="bodyLGBold" color="#27272A">
                    {s.title}
                  </Text>
                  <Text variant="labelMD" color="#27272A">
                    {s.subtitle}
                  </Text>
                </View>
              </View>
            ))}
            <Button label="Find clinic for appointment" onPress={() => router.push('/clinic')} style={styles.button} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const HEADER_OVERLAP = 141; // Figma header height; the hero art starts behind it.

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: palette.neutral[200] },
  content: { alignItems: 'center', paddingBottom: spacing[6] },
  hero: { width: 390, height: 401 - HEADER_OVERLAP, alignItems: 'center' },
  heroArt: {
    position: 'absolute',
    top: -HEADER_OVERLAP - 4,
    left: -4,
    width: 398,
    height: 409,
  },
  days: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[6],
    marginTop: 20,
  },
  day: { alignItems: 'center', gap: 2 },
  dayToday: {
    backgroundColor: palette.neutral[400],
    paddingHorizontal: spacing[3],
    paddingVertical: spacing[4],
    borderRadius: 32,
  },
  dayText: { width: 24, textAlign: 'center' },
  cycle: {
    position: 'absolute',
    top: 108,
    alignItems: 'center',
    gap: spacing[2],
  },
  progress: { marginTop: 37, width: 288, height: 144 },
  progressText: {
    position: 'absolute',
    left: 33,
    top: 68,
    width: 223,
    gap: spacing[2],
  },
  center: { textAlign: 'center' },
  card: {
    width: 350,
    marginTop: spacing[4],
    backgroundColor: palette.neutral[50],
    borderWidth: 1,
    borderColor: 'rgba(249,248,246,0.2)',
    borderRadius: radius.medium,
  },
  stats: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: palette.neutral[400],
  },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing[3],
    paddingVertical: spacing[3],
  },
  statDivider: { borderRightWidth: 1, borderRightColor: palette.neutral[500] },
  rows: { paddingHorizontal: 18, paddingVertical: spacing[6], gap: spacing[4] },
  row: { flexDirection: 'row', alignItems: 'center', gap: spacing[4] },
  rowCard: {
    flex: 1,
    gap: spacing[1],
    padding: spacing[6],
    backgroundColor: palette.neutral[100],
    borderWidth: 1,
    borderColor: palette.neutral[400],
    borderRadius: radius.medium,
  },
  button: { alignSelf: 'stretch' },
});
