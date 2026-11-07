// Figma: records components — Card/Folder (D02), Folder card (D03), Empty state (D01/D04), File row (D08–D11).
import type { ReactNode } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import type { SvgName } from '@/assets/svgs.generated';
import { Asset } from '@/components/primitives/Asset';
import { CheckboxBox } from '@/components/primitives/Checkbox';
import { Text } from '@/components/primitives/Text';
import { colors, palette, radius, spacing } from '@/tokens';

export function FolderIllustration({ icon, size = 40 }: { icon: SvgName | 'bone'; size?: number }) {
  if (icon === 'bone') {
    return (
      <View style={{ width: size, height: size }}>
        <Asset name="vector3" width={size * 0.12} height={size * 0.44} style={{ position: 'absolute', left: size * 0.119, top: size * 0.278 }} />
        <Asset name="vector1" width={size * 0.12} height={size * 0.44} style={{ position: 'absolute', right: size * 0.119, top: size * 0.278 }} />
        <View style={{ position: 'absolute', left: size * 0.2518, width: size * 0.4965, height: size }}>
          <Asset name="vector22" width="100%" height={size} style={StyleSheet.absoluteFill} />
          <Asset name="vector32" width="100%" height={size} style={StyleSheet.absoluteFill} />
        </View>
        <View style={{ position: 'absolute', left: size * 0.1192, width: size * 0.7617, height: size }}>
          <Asset name="vector4" width="100%" height={size} style={StyleSheet.absoluteFill} />
          <Asset name="vector5" width="100%" height={size} style={StyleSheet.absoluteFill} />
        </View>
      </View>
    );
  }
  return <Asset name={icon} width={size} height={size} />;
}

export function EmptyState({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.empty}>
      <Asset name="group124" width={113} height={101} />
      <Text variant="displayMD" color="#27272A" align="center" accessibilityRole="header" style={{ marginTop: spacing[6] }}>
        {title}
      </Text>
      <Text variant="bodyMD" color={colors.textBody} align="center">
        {body}
      </Text>
    </View>
  );
}

export function FolderOption({ name, icon, checked, disabled, onToggle }: { name: string; icon: SvgName | 'bone'; checked: boolean; disabled?: boolean; onToggle: () => void }) {
  return (
    <Pressable accessibilityRole="checkbox" accessibilityState={{ checked, disabled }} accessibilityLabel={name} disabled={disabled} onPress={onToggle} style={[styles.option, disabled && { opacity: 0.4 }]}>
      <CheckboxBox checked={checked} />
      <Text color={palette.dark[700]} style={{ flex: 1 }}>{name}</Text>
      <FolderIllustration icon={icon} size={40} />
    </Pressable>
  );
}

const CARD_BG: SvgName[] = ['folderCard', 'folderCard2', 'folderCard3'];

export function FolderCard({ index, name, icon, meta, onPress, onAdd }: { index: number; name: string; icon: SvgName | 'bone'; meta: string; onPress: () => void; onAdd?: () => void }) {
  return (
    <View style={[styles.folder, { marginTop: index === 0 ? 0 : -30 }]}>
      <Asset name={CARD_BG[index % 3]} width="100%" height={179} style={StyleSheet.absoluteFill} />
      <Pressable accessibilityRole="button" accessibilityLabel={`${name} folder`} onPress={onPress} style={styles.folderInner}>
        <View style={styles.folderIcon}>
          <Asset name="ellipse65" width={55} height={55} style={StyleSheet.absoluteFill} />
          <View style={{ zIndex: 1 }}>
            <FolderIllustration icon={icon} size={40} />
          </View>
        </View>
        <View style={{ flex: 1, gap: spacing[1] }}>
          <Text variant="displayMD" color="#27272A">{name}</Text>
          <Text variant="labelMD" color={palette.dark[400]}>{meta}</Text>
        </View>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel={`Add file to ${name}`} onPress={onAdd} style={styles.add}>
        <Asset name="iconsPlus2" width={20} />
      </Pressable>
    </View>
  );
}

type FileRowProps = { name: string; meta: string; trailing?: ReactNode; progress?: number };

export function FileRow({ name, meta, trailing, progress }: FileRowProps) {
  return (
    <View style={styles.file}>
      <View style={styles.fileTop}>
        <Asset name="property1Png" width={30} height={36} />
        <View style={{ flex: 1 }}>
          <Text variant="bodyLGBold" color="#27272A" numberOfLines={2}>{name}</Text>
          <Text variant="labelMD" color={palette.dark[400]}>{meta}</Text>
        </View>
        {trailing}
      </View>
      {progress !== undefined ? (
        <View style={styles.track} accessibilityRole="progressbar" accessibilityValue={{ min: 0, max: 100, now: progress }}>
          <View style={[styles.fill, { width: `${progress}%` }]} />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: { alignItems: 'center', gap: spacing[3], paddingHorizontal: 20 },
  option: { flexDirection: 'row', alignItems: 'center', gap: spacing[3], height: 52, paddingHorizontal: spacing[4], borderRadius: radius.medium, borderWidth: 1, borderColor: palette.neutral[600], backgroundColor: palette.neutral[100] },
  folder: { height: 179, justifyContent: 'center' },
  folderInner: { flexDirection: 'row', alignItems: 'center', gap: 20, paddingLeft: 23, paddingRight: 80, marginTop: -20 },
  folderIcon: { width: 55, height: 55, alignItems: 'center', justifyContent: 'center' },
  add: { position: 'absolute', right: 23, top: 51, padding: spacing[2], borderRadius: 32, borderWidth: 1, borderColor: palette.dark[900] },
  file: { backgroundColor: palette.white, borderWidth: 1, borderColor: palette.neutral[400], borderRadius: radius.small, padding: spacing[3], gap: spacing[3] },
  fileTop: { flexDirection: 'row', alignItems: 'center', gap: spacing[3] },
  track: { height: 4, borderRadius: 2, backgroundColor: palette.neutral[300] },
  fill: { height: 4, borderRadius: 2, backgroundColor: palette.dark[900] },
});
