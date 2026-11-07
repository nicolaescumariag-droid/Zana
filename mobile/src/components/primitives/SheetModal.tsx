import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Modal, Platform, StyleSheet, View } from 'react-native';

type SheetModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: 'slide' | 'fade';
  children: ReactNode;
};

const HostCtx = createContext<((node: ReactNode) => void) | null>(null);

// Web only: RN Modal portals to the full browser window, so sheets render here, over the whole phone frame (tabs included).
export function SheetHost({ children }: { children: ReactNode }) {
  const [node, setNode] = useState<ReactNode>(null);
  return (
    <HostCtx.Provider value={setNode}>
      {children}
      {node ? <View style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>{node}</View> : null}
    </HostCtx.Provider>
  );
}

export function SheetModal({ visible, onRequestClose, animationType = 'slide', children }: SheetModalProps) {
  const setHostNode = useContext(HostCtx);
  const useHost = Platform.OS === 'web' && setHostNode !== null;

  useEffect(() => {
    if (useHost) setHostNode(visible ? children : null);
  });
  useEffect(() => () => setHostNode?.(null), [setHostNode]);

  if (useHost) return null;
  return (
    <Modal visible={visible} transparent animationType={animationType} onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
}
