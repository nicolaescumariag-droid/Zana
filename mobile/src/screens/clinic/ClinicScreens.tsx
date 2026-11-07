// Figma: 881:5264 Choose city (F02), 881:5339 Clinic list (F05), 881:5432 Clinic details (F06),
// 881:5508 Mark as booked (F07), 881:5560 Appointment saved (F08)
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';

import { BackHeader } from '@/components/composites/BackHeader';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { TextField } from '@/components/primitives/TextField';
import { Toggle } from '@/components/primitives/Toggle';
import { useInsets } from '@/hooks/useInsets';
import { bookingDate, clinics, clinicTypes, defaultClinic, defaultScreening, distanceOf, nearbyLocation, savedClinic, type Clinic, type ClinicType } from '@/mocks/clinics';
import { useAppState } from '@/state/AppState';
import { colors, fontFamily, palette, radius, spacing } from '@/tokens';

export function ChooseCity() {
  const router = useRouter();
  const { setLocation } = useAppState();
  const [city, setCity] = useState('Dublin');
  const done = (v: string) => {
    setLocation(v);
    router.back();
  };
  return (
    <View style={styles.screen}>
      <BackHeader title="Choose your city" onBack={() => router.back()} showMenu />
      <View style={{ padding: 20, gap: spacing[4] }}>
        <View style={styles.cityInput}>
          <Asset name="iconsSearch2" width={20} />
          <TextInput
            value={city}
            onChangeText={setCity}
            autoFocus
            returnKeyType="go"
            onSubmitEditing={() => done(city)}
            accessibilityLabel="City"
            style={styles.cityText}
          />
        </View>
        <Pressable accessibilityRole="button" onPress={() => done(nearbyLocation)} style={styles.nearRow}>
          <Asset name="iconsLocationPlus" width={20} />
          <Text color={colors.textBody}>Find near you</Text>
        </Pressable>
      </View>
    </View>
  );
}

const STATUS_STYLE: Record<Clinic['status'], { color: string; icon: 'iconsClock3' | 'iconsClock4' | 'iconsClock5' }> = {
  'Open Now': { color: palette.success[500], icon: 'iconsClock3' },
  Closed: { color: palette.dark[400], icon: 'iconsClock4' },
  'Opens soon': { color: palette.warning[700], icon: 'iconsClock5' },
};

export function ClinicResults() {
  const router = useRouter();
  const { screening } = useLocalSearchParams<{ screening?: string }>();
  const [type, setType] = useState<ClinicType | null>(null);
  return (
    <View style={styles.screen}>
      <BackHeader title={`Clinics for ${screening ?? defaultScreening}`} onBack={() => router.back()} showMenu />
      <View style={styles.filters}>
        {clinicTypes.map((t) => (
          <Pressable key={t} accessibilityRole="button" accessibilityState={{ selected: type === t }} onPress={() => setType(type === t ? null : t)} style={[styles.chip, type === t && { borderColor: palette.dark[900] }]}>
            <Text variant="labelMD" color={palette.dark[400]}>{t}</Text>
          </Pressable>
        ))}
        <View style={{ flex: 1 }} />
        <Asset name="iconsMap" width={16} />
        <Text variant="labelMD" color={palette.dark[400]}>Map</Text>
        {/* TODO(design): map view not designed — toggle inert. */}
        <Toggle value={false} label="Map view" />
      </View>
      <ScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 32, gap: spacing[3] }}>
        {clinics
          .filter((c) => !type || c.type === type)
          .map((c) => (
          <Pressable key={c.name} accessibilityRole="button" accessibilityLabel={`${c.name}, ${c.meta}, ${c.status}`} onPress={() => router.push({ pathname: '/clinic/details', params: { name: c.name } })} style={styles.card}>
            <Photo name={c.photo} contentFit="cover" style={styles.cardPhoto} />
            <View style={styles.cardBody}>
              <Text variant="bodyLGBold" color="#27272A">{c.name}</Text>
              <Text variant="labelMD" color={palette.dark[400]}>{c.meta}</Text>
              <View style={styles.cardBottom}>
                <Text variant="labelMD" color={colors.textBody}>{c.hours}</Text>
                <View style={[styles.status, { borderColor: STATUS_STYLE[c.status].color }]}>
                  <Asset name={STATUS_STYLE[c.status].icon} width={12} />
                  <Text variant="labelSM" color={STATUS_STYLE[c.status].color}>{c.status}</Text>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export function ClinicDetails() {
  const router = useRouter();
  const insets = useInsets();
  const { name } = useLocalSearchParams<{ name?: string }>();
  const clinic = clinics.find((c) => c.name === name) ?? defaultClinic;
  const [sheet, setSheet] = useState(false);
  return (
    <View style={styles.screen}>
      <BackHeader title="Clinic Details" onBack={() => router.back()} showMenu />
      <ScrollView contentContainerStyle={{ padding: 20, paddingBottom: 32 }}>
        <Photo name={clinic.photo} contentFit="cover" style={styles.hero} />
        <Text variant="headingXL" color="#27272A" style={{ marginTop: spacing[6] }} accessibilityRole="header">{clinic.name}</Text>
        <View style={[styles.inline, { marginTop: spacing[2] }]}>
          <Asset name="iconsLocation2" width={16} />
          <Text variant="labelMD" color={palette.dark[400]}>{clinic.address}</Text>
        </View>
        <View style={[styles.inline, { marginTop: spacing[1] }]} accessible accessibilityLabel={clinic.rating ? `Rated ${clinic.rating}, ${distanceOf(clinic)}` : distanceOf(clinic)}>
          {clinic.rating ? <Asset name="frame1686560378" width={98} height={17} /> : null}
          <Text variant="labelMD" color={palette.dark[400]}>{clinic.rating ? `(${clinic.rating}) • ${distanceOf(clinic)}` : distanceOf(clinic)}</Text>
        </View>
        <View style={{ marginTop: spacing[8] }}>
          {/* TODO(design): services and hours detail screens not designed — rows inert. */}
          {['Available Services', 'Opening Hours'].map((r) => (
            <View key={r} style={styles.detailRow}>
              <Text variant="bodyLGBold" color="#27272A">{r}</Text>
              <Asset name="iconsChevronRight2" width={24} />
            </View>
          ))}
        </View>
        <Button label="Visit website to book" onPress={() => setSheet(true)} style={{ marginTop: spacing[8] }} />
      </ScrollView>
      <Modal visible={sheet} transparent animationType="slide" onRequestClose={() => setSheet(false)}>
        <View style={styles.scrim}>
          <View style={[styles.bookSheet, { paddingBottom: insets.bottom + 24 }]}>
            <Pressable accessibilityRole="button" accessibilityLabel="Close" onPress={() => setSheet(false)} style={{ alignSelf: 'flex-end' }} hitSlop={12}>
              <Asset name="iconsCancel" width={20} />
            </Pressable>
            <Text variant="displayMD" color="#27272A" align="center">You made your appointment?</Text>
            <Text variant="bodyMD" color={colors.textBody} align="center">Add it here and marked as booked, and we will remind you about it.</Text>
            <TextField label="Date & time" placeholder={bookingDate} trailingIcon="iconsCalendar" />
            <TextField label="Clinic" placeholder={clinic.name} />
            <Button label="Mark as booked" onPress={() => { setSheet(false); router.push({ pathname: '/clinic/saved', params: { name: clinic.name } }); }} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

export function AppointmentSaved() {
  const router = useRouter();
  const { name } = useLocalSearchParams<{ name?: string }>();
  return (
    <View style={styles.screen}>
      <BackHeader title="Clinic Details" onBack={() => router.back()} showMenu />
      <View style={styles.saved}>
        <View style={{ width: 80, height: 80 }} accessible accessibilityLabel="Success">
          <Asset name="group12" width={80} height={80} style={StyleSheet.absoluteFill} />
          <Asset name="vector6" width={40} height={80} style={{ position: 'absolute', left: 40 }} />
          <Asset name="group23" width={50.7} height={40} style={{ position: 'absolute', left: 14.6, top: 24 }} />
        </View>
        <Text variant="headingLG" color="#27272A" style={{ marginTop: spacing[6] }}>Appointment Saved</Text>
        <Text variant="bodyMD" color={colors.textBody}>{name ?? savedClinic}</Text>
        {/* TODO(design): calendar integration out of scope — inert. */}
        <Button label="Add to Calendar" icon="iconsArrowRight" style={{ alignSelf: 'stretch', marginTop: spacing[8] }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  cityInput: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: spacing[3], height: 44, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small, backgroundColor: palette.white },
  cityText: { flex: 1, fontFamily: fontFamily.regular, fontSize: 16, color: colors.textBody },
  nearRow: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], alignSelf: 'center', padding: spacing[2] },
  filters: { flexDirection: 'row', alignItems: 'center', gap: spacing[2], paddingHorizontal: 20, paddingTop: 30, paddingBottom: spacing[4] },
  chip: { paddingHorizontal: spacing[3], paddingVertical: 6, borderRadius: 24, borderWidth: 1, borderColor: palette.neutral[300], backgroundColor: palette.neutral[100] },
  card: { flexDirection: 'row', backgroundColor: palette.neutral[100], borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small, overflow: 'hidden', minHeight: 132 },
  cardPhoto: { width: 116, alignSelf: 'stretch' },
  cardBody: { flex: 1, padding: spacing[3], gap: spacing[1] },
  cardBottom: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', gap: spacing[1], flexWrap: 'wrap' },
  status: { flexDirection: 'row', alignItems: 'center', gap: 4, borderWidth: 1, borderRadius: radius.small, paddingHorizontal: 4, paddingVertical: 1 },
  hero: { width: '100%', height: 260, borderRadius: radius.small },
  inline: { flexDirection: 'row', alignItems: 'center', gap: spacing[1] },
  detailRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: spacing[4], borderBottomWidth: 1, borderBottomColor: palette.neutral[400] },
  scrim: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end' },
  bookSheet: { backgroundColor: palette.neutral[200], borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 20, gap: spacing[4] },
  saved: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20, gap: spacing[1] },
});
