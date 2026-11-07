// Figma: 881:4589 — Overview (C03)
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileHeader } from '@/components/composites/ProfileHeader';
import { Asset } from '@/components/primitives/Asset';
import { CheckboxBox } from '@/components/primitives/Checkbox';
import { Text } from '@/components/primitives/Text';
import { catalogue } from '@/mocks/screenings';
import { useAppState } from '@/state/AppState';
import { colors, palette, spacing } from '@/tokens';

export function ScreeningsOverview() {
  const { user } = useAppState();
  const [picked, setPicked] = useState<string[]>([]);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bgScreen }}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      <ScrollView contentContainerStyle={{ paddingBottom: 32 }}>
        <View style={styles.intro}>
          <Text variant="displayMD" color="#27272A" accessibilityRole="header">Stay on top of your health</Text>
          <Text variant="bodyMD" color={colors.textSecondary}>Add the screenings that matter to you. We&apos;ll handle the reminders.</Text>
        </View>
        {catalogue.map((c) => (
          <View key={c.group} style={{ gap: spacing[3], marginBottom: spacing[6] }}>
            <Text variant="bodyLGBold" color="#27272A" style={{ paddingHorizontal: 20 }} accessibilityRole="header">{c.group}</Text>
            <View>
              {c.items.map(([name, freq]) => {
                const on = picked.includes(name);
                return (
                  <Pressable
                    key={name}
                    accessibilityRole="checkbox"
                    accessibilityState={{ checked: on }}
                    accessibilityLabel={`${name}, ${freq}`}
                    onPress={() => setPicked((p) => (on ? p.filter((x) => x !== name) : [...p, name]))}
                    style={styles.item}
                  >
                    <CheckboxBox checked={on} />
                    <Text color={palette.dark[700]} style={{ flex: 1 }}>{name}</Text>
                    <View style={styles.freq}>
                      <Asset name="iconsCheck2" width={12} />
                      <Text variant="labelSM" color={palette.dark[400]}>{freq}</Text>
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  intro: { padding: 20, paddingTop: 40, gap: spacing[3], marginBottom: spacing[4] },
  item: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 20, paddingVertical: spacing[3], borderBottomWidth: 1, borderBottomColor: palette.wireframe.border, minHeight: 56 },
  freq: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, backgroundColor: palette.white },
});
