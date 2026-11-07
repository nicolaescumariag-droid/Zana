import { useLocalSearchParams } from 'expo-router';

import { FolderEmpty } from '@/screens/records/RecordsScreens';

export default function FolderRoute() {
  const { name } = useLocalSearchParams<{ name: string }>();
  return <FolderEmpty name={name} />;
}
