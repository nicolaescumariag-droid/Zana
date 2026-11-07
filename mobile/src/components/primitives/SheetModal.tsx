import { createContext, useContext, useEffect, useId, useState, type ReactNode } from 'react';
import { Modal, Platform, StyleSheet, View } from 'react-native';

type SheetModalProps = {
  visible: boolean;
  onRequestClose: () => void;
  animationType?: 'slide' | 'fade';
  children: ReactNode;
};

const HostCtx = createContext<((id: string, node: ReactNode) => void) | null>(null);

// Web only: RN Modal portals to the full browser window, so sheets render here, over the whole phone frame (tabs included).
export function SheetHost({ children }: { children: ReactNode }) {
  const [nodes, setNodes] = useState<Record<string, ReactNode>>({});
  const [setNode] = useState(() => (id: string, node: ReactNode) =>
    setNodes((prev) => {
      if (!node && !(id in prev)) return prev;
      const { [id]: _, ...rest } = prev;
      return node ? { ...rest, [id]: node } : rest;
    }),
  );
  return (
    <HostCtx.Provider value={setNode}>
      {children}
      {Object.entries(nodes).map(([id, node]) => (
        <View key={id} style={[StyleSheet.absoluteFill, { zIndex: 1000 }]}>
          {node}
        </View>
      ))}
    </HostCtx.Provider>
  );
}

export function SheetModal({ visible, onRequestClose, animationType = 'slide', children }: SheetModalProps) {
  const setHostNode = useContext(HostCtx);
  const id = useId();
  const useHost = Platform.OS === 'web' && setHostNode !== null;

  useEffect(() => {
    if (useHost) setHostNode(id, visible ? children : null);
  });
  useEffect(() => () => setHostNode?.(id, null), [setHostNode, id]);
  useEffect(() => {
    if (!useHost || !visible) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onRequestClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [useHost, visible, onRequestClose]);

  if (useHost) return null;
  return (
    <Modal visible={visible} transparent animationType={animationType} onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
}
