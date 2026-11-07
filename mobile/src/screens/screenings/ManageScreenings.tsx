// Figma: 881:4242 — Manage Screenings (C02)
import { useRouter } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileHeader } from '@/components/composites/ProfileHeader';
import { ScreeningRow, SectionLabel, type ScreeningStatus } from '@/components/composites/ScreeningParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { reminders, sectionTitles } from '@/mocks/screenings';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

const ORDER: ScreeningStatus[] = ['overdue', 'scheduled', 'upcoming', 'done'];

export function ManageScreenings() {
  const router = useRouter();
  const { user } = useAppState();
  const open = (id: string) =>
    id === 'cervical' ? router.push('/screening/cervical') : ['blood-pressure', 'thyroid', 'sti'].includes(id) ? router.push({ pathname: '/screening/[id]', params: { id } }) : undefined;
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgScreen }}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable accessibilityRole="button" onPress={() => router.push('/screenings/overview')} style={styles.banner}>
          <View style={{ flex: 1, gap: spacing[1] }}>
            <Text variant="bodyLGBold" color="#27272A">Manage your screenings</Text>
            <Text variant="bodyMD" color={colors.textBody}>Never miss a screen reminder. Set a reminder to stay on track.</Text>
          </View>
          <Asset name="group1" width={44} height={48} />
        </Pressable>
        {ORDER.map((status) => (
          <View key={status} style={{ gap: spacing[3] }}>
            <SectionLabel>{sectionTitles[status]}</SectionLabel>
            {reminders
              .filter((r) => r.status === status)
              .map((r) => (
                <ScreeningRow
                  key={r.id}
                  status={r.status}
                  title={r.title}
                  subtitle={r.subtitle}
                  onPress={() => open(r.id)}
                  action={
                    r.status === 'scheduled' ? (
                      // TODO(design): calendar integration out of scope — inert.
                      <Button label="Calendar" size="inline" variant="secondary" icon="iconsCalendarPlus" />
                    ) : r.status !== 'done' ? (
                      <Button label="Find clinic" size="inline" onPress={() => router.push('/clinic')} />
                    ) : undefined
                  }
                />
              ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  content: { padding: 20, gap: spacing[8], paddingBottom: 32 },
  banner: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], padding: spacing[4], borderRadius: radius.medium, backgroundColor: palette.pink[50] },
});
