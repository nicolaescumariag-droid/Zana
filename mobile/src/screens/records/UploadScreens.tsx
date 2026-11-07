// Figma: 881:4545 / 881:4594 / 881:4918 Upload (D05, D06, D12), 881:4688 Camera (D07), 881:4740 Uploading (D08),
// 881:4794 File details (D09), 881:4840 / 881:4884 Uploaded (D10, D11)
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import type { SvgName } from '@/assets/svgs.generated';
import { BackHeader } from '@/components/composites/BackHeader';
import { OnboardingSheet } from '@/components/composites/OnboardingSheet';
import { FileRow } from '@/components/composites/RecordsParts';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { TextField } from '@/components/primitives/TextField';
import { useInsets } from '@/hooks/useInsets';
import { document, uploadFilters } from '@/mocks/records';
import { colors, palette, radius, spacing } from '@/tokens';

const MENU: { label: string; icon: SvgName; to: '/records/uploading' | '/camera' }[] = [
  { label: 'Photo Library', icon: 'iconsFolder2', to: '/records/uploading' },
  { label: 'Take Photo or Video', icon: 'iconsCamera', to: '/camera' },
  { label: 'Choose File', icon: 'iconsFolder2', to: '/records/uploading' },
];

export function UploadScreen() {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  return (
    <View style={styles.screen}>
      <BackHeader title="Upload files" onBack={() => router.back()} showMenu />
      <View style={styles.body}>
        <Text variant="displayMD" color="#27272A" accessibilityRole="header">Ready for your files</Text>
        <Text color={colors.textBody} style={{ marginTop: spacing[3] }}>
          Keeping your health records in one place helps us provide better care for you.
        </Text>
        <View style={{ marginTop: spacing[6] }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Upload files, up to 3 MB" accessibilityState={{ expanded: menu }} onPress={() => setMenu((m) => !m)} style={styles.drop}>
            <View style={styles.plus}>
              <Asset name="iconsPlus" width={20} />
            </View>
            {!menu ? (
              <>
                <Text variant="headingMD" color="#27272A">Upload files</Text>
                <Text color={colors.textBody}>Up to 3 MB</Text>
              </>
            ) : null}
          </Pressable>
          {menu ? (
            <View style={styles.menu} accessibilityRole="menu">
              {MENU.map((m) => (
                <Pressable key={m.label} accessibilityRole="menuitem" onPress={() => { setMenu(false); router.push(m.to); }} style={styles.menuItem}>
                  <Asset name={m.icon} width={20} />
                  <Text variant="bodyMD" color={colors.textBody}>{m.label}</Text>
                </Pressable>
              ))}
            </View>
          ) : null}
        </View>
        <Text variant="bodyLGBold" color="#27272A" style={{ marginTop: 48 }}>Supported documents</Text>
        <Text variant="bodyMD" color={colors.textBody} style={{ marginTop: spacing[2] }}>PDF, PNG, JPEG, HEIC</Text>
      </View>
    </View>
  );
}

export function CameraScreen() {
  const router = useRouter();
  const insets = useInsets();
  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ height: insets.top + 60 }} />
      <View style={styles.viewfinder} accessible accessibilityLabel="Camera preview of a medical document (mock)">
        <Photo name="image101" contentFit="contain" style={{ width: '90%', height: '90%' }} />
        {(['tl', 'tr', 'bl', 'br'] as const).map((c) => (
          <View key={c} style={[styles.corner, c.includes('t') ? { top: 16 } : { bottom: 16 }, c.includes('l') ? { left: 16, borderLeftWidth: 3 } : { right: 16, borderRightWidth: 3 }, c.includes('t') ? { borderTopWidth: 3 } : { borderBottomWidth: 3 }]} />
        ))}
      </View>
      <View style={[styles.camBar, { paddingBottom: insets.bottom + 24 }]}>
        <Pressable accessibilityRole="button" accessibilityLabel="Take photo" onPress={() => router.replace('/records/uploading')} style={styles.shutter} />
        <View style={styles.camRow}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close camera" onPress={() => router.back()} style={styles.camRound}>
            <Text color="#fff">✕</Text>
          </Pressable>
          <View style={styles.modes}>
            <Text variant="labelMD" color="#fff">VIDEO</Text>
            <View style={styles.photoMode}>
              <Text variant="labelMD" color="#FFD60A">PHOTO</Text>
            </View>
          </View>
          <View style={styles.camRound} />
        </View>
      </View>
    </View>
  );
}

export function UploadingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(100, p + 10)), 150);
    return () => clearInterval(t);
  }, []);
  return (
    <OnboardingSheet onBack={() => router.back()} footer={<Button label="Next" icon="iconsArrowRight" onPress={() => router.push('/records/details')} />}>
      <Text variant="labelLG" color="#27272A" style={styles.label}>Files name</Text>
      <FileRow
        name={document.shortName}
        meta={`${document.size} · ${progress < 100 ? 'Uploading' : 'Uploaded'}`}
        progress={progress}
        trailing={progress < 100 ? <Asset name="loadingCircle" width={12} /> : undefined}
      />
    </OnboardingSheet>
  );
}

export function FileDetailsScreen() {
  const router = useRouter();
  const [name, setName] = useState(document.fullName);
  const [notes, setNotes] = useState('');
  return (
    <OnboardingSheet onClose={() => router.back()} footer={<Button label="Next" icon="iconsArrowRight" onPress={() => router.push('/records/uploaded')} />}>
      <View style={{ gap: spacing[6] }}>
        <TextField label="Files name" value={name} onChangeText={setName} multiline />
        <TextField label="Date" placeholder="Jan 6, 20222" trailingIcon="iconsCalendar" />
        {/* TODO(design): folder picker options not designed — field is display-only. */}
        <TextField label="Category / Folder" placeholder="Gynaecology / General / Bloodwork..." trailingIcon="iconsChevronDown" editable={false} />
        <View style={{ gap: spacing[2] }}>
          <Text variant="labelLG" color="#27272A" style={styles.label}>Preview</Text>
          <View style={styles.preview}>
            <Photo name="image101" contentFit="cover" style={{ width: '100%', height: 160 }} />
          </View>
        </View>
        <TextField label="Notes" placeholder="Notes" value={notes} onChangeText={setNotes} multiline />
      </View>
    </OnboardingSheet>
  );
}

export function UploadedScreen() {
  const router = useRouter();
  const [toast, setToast] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  return (
    <View style={styles.screen}>
      <BackHeader title="Upload files" onBack={() => router.back()} showMenu />
      <View style={[styles.body, { flex: 1 }]}>
        {toast ? (
          <View style={styles.toast} accessibilityRole="alert">
            <Asset name="iconsCheckCircle3" width={20} />
            <Text variant="bodyMD" color="#27272A">Document Uploaded</Text>
            <Pressable accessibilityRole="button" accessibilityLabel="Dismiss" onPress={() => setToast(false)} hitSlop={8}>
              <Asset name="iconsCancel2" width={16} />
            </Pressable>
          </View>
        ) : (
          <View style={styles.filters}>
            {uploadFilters.map((f) => (
              <Pressable key={f} accessibilityRole="button" accessibilityState={{ selected: filter === f }} onPress={() => setFilter(f)} style={[styles.filter, filter === f && { borderColor: palette.dark[900] }]}>
                <Text variant="labelMD" color={palette.dark[400]}>{f}</Text>
              </Pressable>
            ))}
          </View>
        )}
        <Text variant="labelLG" color="#27272A" style={[styles.label, { marginTop: spacing[8], marginBottom: spacing[2] }]}>Files name</Text>
        <FileRow
          name={document.mediumName}
          meta={`${document.size} ·`}
          trailing={
            <Pressable accessibilityRole="button" accessibilityLabel="Explain this document with AI" onPress={() => router.push('/chat/summary', { withAnchor: true })}>
              <Svg width={28} height={28}>
                <Defs>
                  <LinearGradient id="ai" x1="0" y1="0" x2="1" y2="1">
                    <Stop offset="0" stopColor={palette.red[500]} />
                    <Stop offset="1" stopColor={palette.purple[500]} />
                  </LinearGradient>
                </Defs>
                <Rect width={28} height={28} rx={14} fill="url(#ai)" />
              </Svg>
              <Asset name="iconsAI" width={16} style={{ position: 'absolute', left: 6, top: 6 }} />
            </Pressable>
          }
        />
        <View style={{ flex: 1 }} />
        <Button label="Upload Again" icon="iconsUpload" onPress={() => router.push('/records/upload')} style={{ marginBottom: spacing[3] }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  body: { paddingHorizontal: 20, paddingTop: 30 },
  drop: { height: 160, alignItems: 'center', justifyContent: 'center', gap: spacing[1], backgroundColor: palette.white, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small },
  plus: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.actionPrimary, alignItems: 'center', justifyContent: 'center', marginBottom: spacing[2] },
  menu: { position: 'absolute', right: 0, top: 75, width: 250, backgroundColor: palette.white, borderRadius: 12, paddingVertical: spacing[2], shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 16, elevation: 4 },
  menuItem: { flexDirection: 'row', alignItems: 'center', gap: spacing[4], paddingHorizontal: spacing[3], paddingVertical: spacing[2], minHeight: 40 },
  label: { textTransform: 'uppercase' },
  preview: { borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small, overflow: 'hidden', backgroundColor: palette.white },
  toast: { flexDirection: 'row', alignItems: 'center', alignSelf: 'center', gap: spacing[3], paddingHorizontal: spacing[3], paddingVertical: spacing[3], borderRadius: radius.small, backgroundColor: palette.success[200] },
  filters: { flexDirection: 'row', gap: spacing[2], flexWrap: 'wrap' },
  filter: { paddingHorizontal: spacing[3], paddingVertical: 6, borderRadius: 24, borderWidth: 1, borderColor: palette.neutral[300], backgroundColor: palette.neutral[100] },
  viewfinder: { flex: 1, backgroundColor: '#E8E2DA', alignItems: 'center', justifyContent: 'center' },
  corner: { position: 'absolute', width: 48, height: 48, borderColor: '#000', borderRadius: 4 },
  camBar: { alignItems: 'center', paddingTop: 24, gap: 24 },
  shutter: { width: 72, height: 72, borderRadius: 36, backgroundColor: '#fff', borderWidth: 4, borderColor: '#555' },
  camRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignSelf: 'stretch', paddingHorizontal: 20 },
  camRound: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#2A2A2A', alignItems: 'center', justifyContent: 'center' },
  modes: { flexDirection: 'row', alignItems: 'center', gap: spacing[4], paddingHorizontal: spacing[4], paddingVertical: spacing[1], borderRadius: 20, backgroundColor: '#2A2A2A' },
  photoMode: { paddingHorizontal: spacing[3], paddingVertical: spacing[1], borderRadius: 16, backgroundColor: '#3A3A3A' },
});
