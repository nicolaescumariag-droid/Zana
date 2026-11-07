// Figma: 881:3368 Splash, 881:3375 / 881:3391 / 881:3407 Intro, 881:3423 Welcome
import { StyleSheet, View } from 'react-native';

import type { ImageName } from '@/assets/images.generated';
import { GradientBackdrop } from '@/components/composites/GradientBackdrop';
import { Asset } from '@/components/primitives/Asset';
import { Button } from '@/components/primitives/Button';
import { Photo } from '@/components/primitives/Photo';
import { Text } from '@/components/primitives/Text';
import { useInsets } from '@/hooks/useInsets';
import { palette } from '@/tokens';

export function SplashScreen({ onStart }: { onStart: () => void }) {
  const insets = useInsets();
  return (
    <View style={styles.fill}>
      <GradientBackdrop id="splash" from={palette.red[500]} to={palette.purple[500]} />
      <View style={styles.center}>
        <Asset name="zANA" width={100} height={103} />
      </View>
      <View style={[styles.cta, { paddingBottom: Math.max(insets.bottom + 53, 60) }]}>
        <Button label="Start Now" icon="iconsArrowRight" onPress={onStart} />
      </View>
    </View>
  );
}

type IntroProps = { photo: ImageName; title: string; body: string; cta: string; onNext: () => void; welcome?: boolean };

export function IntroScreen({ photo, title, body, cta, onNext, welcome }: IntroProps) {
  const insets = useInsets();
  return (
    <View style={styles.fill}>
      <GradientBackdrop id="intro" from={palette.pink[100]} to={palette.purple[50]} />
      <View style={styles.art}>
        {welcome ? (
          <View style={{ width: 299, height: 343 }}>
            <Asset name="ellipse44" width={299} height={343} style={StyleSheet.absoluteFill} />
            <Photo name="ellipse43" style={{ position: 'absolute', left: 138, top: 26, width: 161, height: 291 }} />
            <Asset name="vector2" width={65} height={65} style={{ position: 'absolute', left: 70, top: 209 }} />
          </View>
        ) : (
          <Photo name={photo} contentFit="contain" style={{ width: 281, height: 305 }} />
        )}
      </View>
      <View style={[styles.card, { paddingBottom: Math.max(insets.bottom + 53, 60) }]}>
        <View style={styles.text}>
          <Text variant="displayLG" color="#27272A" align="center" accessibilityRole="header">
            {title}
          </Text>
          <Text variant="bodyMD" color="#27272A" align="center">
            {body}
          </Text>
        </View>
        <Button label={cta} icon="iconsArrowRight" onPress={onNext} style={{ alignSelf: 'stretch' }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1, backgroundColor: palette.neutral[200] },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  cta: { paddingHorizontal: 20 },
  art: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingTop: 40 },
  card: {
    minHeight: 371,
    backgroundColor: palette.neutral[200],
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    paddingTop: 61,
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 32,
  },
  text: { gap: 16, maxWidth: 350 },
});
