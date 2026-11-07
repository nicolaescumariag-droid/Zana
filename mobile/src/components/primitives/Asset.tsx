import { type NumberProp, SvgXml } from 'react-native-svg';
import type { StyleProp, ViewStyle } from 'react-native';

import { svgs, type SvgName } from '@/assets/svgs.generated';

type AssetProps = {
  name: SvgName;
  width: NumberProp;
  height?: number;
  style?: StyleProp<ViewStyle>;
};

/** Renders a vector exported from Figma (see src/assets/manifest.json for source node IDs). */
export function Asset({ name, width, height = width as number, style }: AssetProps) {
  return <SvgXml xml={svgs[name]} width={width} height={height} style={style} />;
}
