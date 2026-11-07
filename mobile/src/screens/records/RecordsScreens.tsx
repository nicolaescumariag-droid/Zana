// Figma: 881:4255 No Folders (D01), 881:4302 Choose Folders (D02), 881:4427 Folder List (D03), 881:4502 Folder Empty (D04)
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import { BackHeader } from '@/components/composites/BackHeader';
import { ProfileHeader } from '@/components/composites/ProfileHeader';
import { EmptyState, FolderCard, FolderOption } from '@/components/composites/RecordsParts';
import { Button } from '@/components/primitives/Button';
import { Text } from '@/components/primitives/Text';
import { defaultFolders, folderOptions, maxFreeFolders } from '@/mocks/records';
import { useAppState } from '@/state/AppState';
import { colors, spacing } from '@/tokens';

export function RecordsHome() {
  const router = useRouter();
  const { user, folders } = useAppState();
  return (
    <View style={styles.screen}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      {folders.length === 0 ? (
        <View style={styles.emptyWrap}>
          <View style={{ flex: 1, justifyContent: 'center' }}>
            <EmptyState title="No folders yet" body="Create a category like Gynaecology or General to start sorting your results." />
          </View>
          <Button label="Create a folder" icon="iconsPlus" onPress={() => router.push('/records/choose')} />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 144, paddingBottom: 32 }}>
          {folders.map((f, i) => (
            <FolderCard
              key={f}
              index={i}
              name={f}
              icon={folderOptions.find((o) => o.name === f)?.icon ?? 'group2'}
              meta={`${i === 0 ? '' : '0'} documents  ·  Last test: Mar 13`}
              onPress={() => router.push({ pathname: '/records/folder/[name]', params: { name: f } })}
              onAdd={() => router.push('/records/upload')}
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}

export function ChooseFolders() {
  const router = useRouter();
  const { user, setFolders } = useAppState();
  const [picked, setPicked] = useState<string[]>([]);
  const next = () => {
    setFolders(picked.length ? picked : defaultFolders);
    router.replace('/records');
  };
  return (
    <View style={styles.screen}>
      <ProfileHeader name={user.profileName} age={user.ageLabel} />
      <ScrollView contentContainerStyle={{ padding: 20, gap: spacing[3] }}>
        <Text color="#27272A" style={{ marginBottom: spacing[4] }}>Choose which folders you want to add to your records hub.</Text>
        {folderOptions.map((f) => (
          <FolderOption
            key={f.name}
            name={f.name}
            icon={f.icon}
            checked={picked.includes(f.name)}
            disabled={!picked.includes(f.name) && picked.length >= maxFreeFolders}
            onToggle={() => setPicked((p) => (p.includes(f.name) ? p.filter((x) => x !== f.name) : p.length < maxFreeFolders ? [...p, f.name] : p))}
          />
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <Button label="Next" icon="iconsArrowRight" onPress={next} />
      </View>
    </View>
  );
}

export function FolderEmpty({ name }: { name: string }) {
  const router = useRouter();
  return (
    <View style={styles.screen}>
      <BackHeader title={name} onBack={() => router.back()} showMenu />
      <View style={styles.emptyWrap}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <EmptyState title="No files yet" body="Create a category like Gynaecology or General to start sorting your results." />
        </View>
        <Button label="Create a file" icon="iconsPlus" onPress={() => router.push('/records/upload')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bgScreen },
  emptyWrap: { flex: 1, padding: 20, paddingBottom: 24 },
  footer: { paddingHorizontal: 20, paddingVertical: spacing[3] },
});
