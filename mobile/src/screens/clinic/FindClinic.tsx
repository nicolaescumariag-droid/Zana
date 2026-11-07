// Figma: 881:5197 Find a Clinic (F01), 881:5291 Screening picker (F03), 881:5311 Location permission (F04)
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, View } from 'react-native';

import { ProfileHeader } from '@/components/composites/ProfileHeader';
import { ScreeningRow, SectionLabel } from '@/components/composites/ScreeningParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { CheckboxBox } from '@/components/primitives/Checkbox';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { nearbyLocation } from '@/mocks/clinics';
import { catalogue, reminders, sectionTitles } from '@/mocks/screenings';
import { useAppState } from '@/state/AppState';
import { colors, palette, radius, spacing } from '@/tokens';

export function FindClinic() {
  const router = useRouter();
  const { user, location, setLocation } = useAppState();
  const [screening, setScreening] = useState('Blood pressure check');
  const [picker, setPicker] = useState(false);
  const [permission, setPermission] = useState(false);
  const priority = reminders.filter((r) => r.status !== 'done');
  return (
    <View style={styles.screen}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <View style={styles.search}>
          <Pressable accessibilityRole="button" accessibilityLabel={`Location, ${location}`} onPress={() => router.push('/clinic/city')} style={[styles.searchRow, styles.searchDivider]}>
            <Asset name="iconsLocation" width={20} />
            <Text variant="bodyMD" color={colors.textBody}>{location}</Text>
          </Pressable>
          <Pressable accessibilityRole="button" accessibilityLabel={`Screening, ${screening}`} onPress={() => setPicker(true)} style={styles.searchRow}>
            <Asset name="iconsCross" width={20} />
            <Text variant="bodyMD" color={colors.textBody}>{screening}</Text>
          </Pressable>
        </View>
        <Button label="Search" icon="iconsArrowRight" onPress={() => router.push('/clinic/results')} style={{ marginTop: spacing[4] }} />
        <Pressable accessibilityRole="button" onPress={() => setPermission(true)} style={styles.near}>
          <Text color={colors.textBody}>Find near you</Text>
        </Pressable>
        <Text variant="displayMD" color="#27272A" accessibilityRole="header" style={{ marginTop: spacing[12] }}>Your priority</Text>
        {(['overdue', 'scheduled', 'upcoming'] as const).map((s) => (
          <View key={s} style={{ gap: spacing[3], marginTop: spacing[6] }}>
            <SectionLabel>{sectionTitles[s]}</SectionLabel>
            {priority
              .filter((r) => r.status === s)
              .map((r) => (
                <ScreeningRow
                  key={r.id}
                  status={r.status}
                  title={r.title}
                  subtitle={r.subtitle}
                  action={
                    s === 'scheduled' ? (
                      <Button label="Calendar" size="inline" variant="secondary" icon="iconsCalendarPlus" />
                    ) : (
                      <Button label="Find clinic" size="inline" onPress={() => { setScreening(r.title); router.push('/clinic/results'); }} />
                    )
                  }
                />
              ))}
          </View>
        ))}
      </ScrollView>
      <ScreeningPicker visible={picker} onClose={() => setPicker(false)} onApply={(v) => { if (v) setScreening(v); setPicker(false); }} />
      <LocationPermission
        visible={permission}
        onResult={(allowed) => {
          if (allowed) setLocation(nearbyLocation);
          setPermission(false);
        }}
      />
    </View>
  );
}

function ScreeningPicker({ visible, onClose, onApply }: { visible: boolean; onClose: () => void; onApply: (v?: string) => void }) {
  const [picked, setPicked] = useState<string | undefined>();
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.scrim}>
        <View style={styles.pickerSheet}>
          <View style={styles.pickerHead}>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={onClose} hitSlop={12}>
              <Asset name="iconsCancel" width={20} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={{ paddingVertical: spacing[6] }}>
            {catalogue.map((c) => (
              <View key={c.group} style={{ marginBottom: spacing[6] }}>
                <Text variant="bodyLGBold" color="#27272A" style={{ paddingHorizontal: 20, marginBottom: spacing[3] }}>{c.group}</Text>
                {c.items.map(([name, freq]) => (
                  <Pressable key={name} accessibilityRole="radio" accessibilityState={{ checked: picked === name }} onPress={() => setPicked(name)} style={styles.pickRow}>
                    <CheckboxBox checked={picked === name} />
                    <Text color={palette.dark[700]} style={{ flex: 1 }}>{name}</Text>
                    <Text variant="labelSM" color={palette.dark[400]}>{freq}</Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </ScrollView>
          <View style={{ padding: 20 }}>
            <Button label="Apply" onPress={() => onApply(picked)} />
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Mock of the OS permission dialog shown in Figma; no real location is requested.
function LocationPermission({ visible, onResult }: { visible: boolean; onResult: (allowed: boolean) => void }) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={() => onResult(false)}>
      <View style={[styles.scrim, { justifyContent: 'center', padding: 40 }]}>
        <View style={styles.alert} accessibilityRole="alert">
          <Text variant="bodyLGBold" color="#000">Allow “Welly” to use your location?</Text>
          <Text variant="bodyMD" color="#3C3C43">Your location will be used to show you nearby places, traffic updates, and find your location.</Text>
          <View style={styles.map}>
            <Photo name="maps" contentFit="cover" style={StyleSheet.absoluteFill} />
            <Text variant="labelSM" color="#007AFF" style={styles.precise}>Precise: On</Text>
          </View>
          {['Allow Once', 'Allow While Using App', 'Don’t Allow'].map((l, i) => (
            <Pressable key={l} accessibilityRole="button" onPress={() => onResult(i < 2)} style={styles.alertBtn}>
              <Text variant="bodyLGBold" color="#000">{l}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  search: { borderWidth: 2, borderColor: palette.purple[100], borderRadius: radius.small, backgroundColor: palette.white, overflow: 'hidden' },
  searchRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], padding: spacing[3], minHeight: 44 },
  searchDivider: { borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  near: { alignSelf: 'center', padding: spacing[3], marginTop: spacing[3] },
  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  pickerSheet: { height: '75%', backgroundColor: palette.neutral[200], borderTopLeftRadius: 24, borderTopRightRadius: 24 },
  pickerHead: { height: 57, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 20, borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  pickRow: { flexDirection: 'row', alignItems: 'center', gap: 9, paddingHorizontal: 20, paddingVertical: spacing[3], borderBottomWidth: 1, borderBottomColor: palette.wireframe.border },
  alert: { backgroundColor: 'rgba(242,242,247,0.97)', borderRadius: 32, padding: 20, gap: spacing[3] },
  map: { height: 120, borderRadius: 16, overflow: 'hidden' },
  precise: { position: 'absolute', top: 8, left: 8, backgroundColor: palette.white, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 8 },
  alertBtn: { minHeight: 44, borderRadius: 24, backgroundColor: 'rgba(120,120,128,0.16)', alignItems: 'center', justifyContent: 'center' },
});
