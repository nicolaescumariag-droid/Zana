// Figma: Toggle — State=Default, Position=On/Off (UI Kit)
import { Pressable } from 'react-native';

import { Asset } from '@/components/primitives/Asset';

type ToggleProps = { value: boolean; onChange?: (v: boolean) => void; label: string };

export function Toggle({ value, onChange, label }: ToggleProps) {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityLabel={label}
      accessibilityState={{ checked: value, disabled: !onChange }}
      disabled={!onChange}
      onPress={() => onChange?.(!value)}
      hitSlop={8}
    >
      <Asset name={value ? 'stateDefaultPositionOn' : 'stateDefaultPositionOff'} width={44} height={24} />
    </Pressable>
  );
}
