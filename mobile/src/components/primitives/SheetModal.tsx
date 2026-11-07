import type { ReactNode } from 'react';
import { Modal, Platform, StyleSheet, View } from 'react-native';

type SheetModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: 'slide' | 'fade';
  children: ReactNode;
};

// On web, RN Modal portals to the full browser window; render inside the phone frame instead.
export function SheetModal({ visible, onRequestClose, animationType = 'slide', children }: SheetModalProps) {
  if (Platform.OS === 'web') {
    return visible ? <View style={[StyleSheet.absoluteFill, { zIndex: 10 }]}>{children}</View> : null;
  }
  return (
    <Modal visible={visible} transparent animationType={animationType} onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
}
