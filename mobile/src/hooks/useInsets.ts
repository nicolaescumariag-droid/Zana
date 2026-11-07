import { Platform } from 'react-native';
import { useSafeAreaInsets, type EdgeInsets } from 'react-native-safe-area-context';

// Web is used only for visual QA at 390×844: simulate iPhone 14 safe areas so layouts line up with Figma frames.
const WEB_QA_INSETS: EdgeInsets = { top: 47, bottom: 34, left: 0, right: 0 };

export function useInsets(): EdgeInsets {
  const insets = useSafeAreaInsets();
  return Platform.OS === 'web' ? WEB_QA_INSETS : insets;
}
