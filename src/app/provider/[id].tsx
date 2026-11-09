import { router, useLocalSearchParams } from 'expo-router';
import { Image, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Card, IconButton, Section } from '../../components/ui';
import Ionicons from '@expo/vector-icons/Ionicons';
import { images } from '../../data/images';
import { providers } from '../../data/seed';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

export default function ProviderProfile() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const startDraft = useStore((s) => s.startDraft);
  const p = providers.find((x) => x.id === id) ?? providers[0];
  const book = () => {
    startDraft(p.id);
    router.push('/book');
  };
  return (
    <Screen
      testID="screen-provider"
      edgeless
      contentStyle={{ paddingTop: 0 }}
      footer={
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16 }}>
          <View>
            <T variant="caption">From</T>
            <T variant="title">${p.rate}<T variant="label" style={{ color: colors.text2 }}>/hr</T></T>
          </View>
          <Button label={`Book ${p.firstName}`} iconRight="arrow-right" testID="book-pro" style={{ flex: 1 }} onPress={book} />
        </View>
      }
    >
      <View>
        <Image source={images[p.cover ?? p.work[0]]} style={styles.cover} />
        <View style={[styles.topBtns, { top: insets.top + 8 }]}>
          <IconButton icon="arrow-left" label="Back" testID="back" onPress={() => router.back()} />
          <IconButton icon="share-2" label="Share" />
        </View>
      </View>
      <View style={{ paddingHorizontal: 20 }}>
        <View style={{ marginTop: -44 }}><Avatar img={p.avatar} size={88} ring /></View>
        <T variant="display" style={{ fontSize: 28, marginTop: 8 }}>{p.name}</T>
        <T variant="body" style={{ color: colors.text2 }}>{p.service}, {p.years} years</T>
        <View style={styles.verified}><Icon name="check-circle" size={14} color={colors.success} /><T variant="caption" style={{ color: colors.success, fontFamily: font.semibold }}>ID verified</T></View>

        <View style={styles.stats}>
          {[
            { v: p.rating.toFixed(1), l: `Rating (${p.reviews})`, star: true },
            { v: String(p.jobs), l: 'Jobs done' },
            { v: `${p.onTime}%`, l: 'On time' },
          ].map((s) => (
            <Card key={s.l} style={styles.stat}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                {s.star ? <Ionicons name="star" size={16} color={colors.star} /> : null}
                <T variant="title" style={{ color: colors.accent, fontFamily: font.bold, fontSize: 24, lineHeight: 30 }}>{s.v}</T>
              </View>
              <T variant="caption">{s.l}</T>
            </Card>
          ))}
        </View>

        <Section title="Services">
          <Card style={{ paddingVertical: 4 }}>
            {p.packages.map((pkg, i) => (
              <View key={pkg.id} style={[styles.svc, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
                <View style={{ flex: 1 }}>
                  <T variant="body" bold>{pkg.name}</T>
                  <T variant="caption">{pkg.hours} {pkg.hours === 1 ? 'hr' : 'hrs'}</T>
                </View>
                <T variant="body" bold>${pkg.price}</T>
              </View>
            ))}
          </Card>
        </Section>

        <Section title="Recent work">
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {p.work.map((w) => <Image key={w} source={images[w]} style={styles.work} />)}
          </View>
        </Section>

        <Card style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <T variant="label" bold>{p.review.author}</T>
            <T variant="caption">{p.review.when}</T>
          </View>
          <View style={{ flexDirection: 'row', gap: 2, marginTop: 4 }}>
            {Array.from({ length: p.review.stars }).map((_, i) => <Ionicons key={i} name="star" size={14} color={colors.star} />)}
          </View>
          <T variant="body" style={{ marginTop: 6 }}>{p.review.text}</T>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  cover: { width: '100%', height: 220 },
  topBtns: { position: 'absolute', left: 20, right: 20, flexDirection: 'row', justifyContent: 'space-between' },
  verified: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: colors.successTint, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4, marginTop: 8 },
  stats: { flexDirection: 'row', gap: 10, marginTop: 20 },
  stat: { flex: 1, alignItems: 'center', paddingVertical: 14, paddingHorizontal: 8 },
  svc: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12 },
  work: { flex: 1, height: 92, borderRadius: 14 },
});
