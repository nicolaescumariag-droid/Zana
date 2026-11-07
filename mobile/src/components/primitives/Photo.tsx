import { Image, type ImageContentFit } from 'expo-image';
import type { StyleProp, ImageStyle } from 'react-native';

import { images, type ImageName } from '@/assets/images.generated';

type PhotoProps = {
  name: ImageName;
  style?: StyleProp<ImageStyle>;
  contentFit?: ImageContentFit;
  accessibilityLabel?: string;
};

/** Raster image exported from Figma. Decorative unless an accessibilityLabel is given. */
export function Photo({ name, style, contentFit = 'cover', accessibilityLabel }: PhotoProps) {
  return (
    <Image
      source={images[name]}
      style={style}
      contentFit={contentFit}
      accessible={!!accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
    />
  );
}
