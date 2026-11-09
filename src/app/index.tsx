import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Image, StyleSheet, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { T } from '../components/Text';
import { images } from '../data/images';
import { useStore } from '../store';
import { colors, font, radius } from '../theme/tokens';

export default function Welcome() {
  const { height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const signIn = useStore((s) => s.signIn);
  const heroH = Math.round(height * 0.46);
  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }} testID="screen-welcome">
      <View style={{ height: heroH, overflow: 'hidden' }}>
        <Image source={images.welcomeHero} style={{ width: '100%', height: heroH }} resizeMode="cover" />
        <LinearGradient colors={['rgba(252,244,245,0)', colors.bg]} style={styles.fade} />
      </View>
      <View style={[styles.body, { paddingBottom: Math.max(insets.bottom, 16) }]}>
        <View style={styles.brand}>
          <View style={styles.mark}><Icon name="home" size={16} color={colors.white} /></View>
          <T variant="title" style={{ color: colors.accentFill, fontFamily: font.bold }}>Tendo</T>
        </View>
        <T variant="display" style={{ marginTop: 12 }}>Trusted help at home, in a few taps</T>
        <T variant="body" style={{ color: colors.text2, marginTop: 8 }}>Book vetted local pros for cleaning, repairs and more</T>
        <View style={styles.chips}>
          <View style={styles.chip}>
            <Ionicons name="star" size={13} color={colors.star} />
            <T variant="caption" style={styles.chipText}>4.8 average rating</T>
          </View>
          <View style={styles.chip}><T variant="caption" style={styles.chipText}>2,400+ pros</T></View>
          <View style={styles.chip}><T variant="caption" style={styles.chipText}>Same-day slots</T></View>
        </View>
        <View style={{ flex: 1 }} />
        <Button label="Get started" testID="get-started" onPress={() => router.push('/sign-up')} />
        <Button
          label="I already have an account"
          kind="ghost"
          testID="have-account"
          style={{ marginTop: 4 }}
          onPress={() => {
            signIn();
            router.replace('/home');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  fade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: 120 },
  body: { flex: 1, paddingHorizontal: 20, paddingTop: 4 },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mark: { width: 28, height: 28, borderRadius: 8, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 16 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, height: 32, paddingHorizontal: 12, borderRadius: radius.pill, backgroundColor: colors.accentTint },
  chipText: { color: colors.accentFill },
});
