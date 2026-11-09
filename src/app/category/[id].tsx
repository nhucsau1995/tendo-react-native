import { router, useLocalSearchParams } from 'expo-router';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, BackHeader, Card, Chip, Rating } from '../../components/ui';
import { images } from '../../data/images';
import type { Filters } from '../../data/models';
import { categories, providers } from '../../data/seed';
import { filterProviders } from '../../logic/booking';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

const TITLES: Record<string, string> = { cleaning: 'House cleaning', plumbing: 'Plumbing', electrical: 'Electrical', handyman: 'Handyman', moving: 'Moving', beauty: 'Beauty' };
const NEARBY: Record<string, number> = { cleaning: 48, plumbing: 21, electrical: 17, handyman: 33, moving: 12, beauty: 26 };
const FILTERS: { key: keyof Filters; label: string }[] = [
  { key: 'availableToday', label: 'Available today' },
  { key: 'topRated', label: 'Top rated' },
  { key: 'under40', label: 'Under $40/hr' },
  { key: 'eco', label: 'Eco products' },
];

export default function Category() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const filters = useStore((s) => s.filters);
  const toggle = useStore((s) => s.toggleFilter);
  const cat = categories.find((c) => c.id === id) ?? categories[0];
  const list = filterProviders(providers, cat.id, filters);
  const [best, ...rest] = list;
  return (
    <Screen testID="screen-category" header={<BackHeader title={TITLES[cat.id]} caption={`${NEARBY[cat.id]} pros nearby`} />}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginHorizontal: -20 }} contentContainerStyle={{ gap: 8, paddingHorizontal: 20 }}>
        {FILTERS.map((f) => (
          <Chip key={f.key} label={f.label} selected={filters[f.key]} onPress={() => toggle(f.key)} testID={`filter-${f.key}`} />
        ))}
      </ScrollView>
      <View style={styles.sort}>
        <T variant="label" style={{ color: colors.text2 }}>Sort: <T variant="label" bold>Recommended</T></T>
        <Icon name="chevron-down" size={16} color={colors.text2} />
      </View>

      {best ? (
        <Card style={{ padding: 0, overflow: 'hidden', borderWidth: 2, borderColor: colors.accentTint }} onPress={() => router.push(`/provider/${best.id}`)} testID={`pro-${best.id}`}>
          <View style={styles.bestTag}><Icon name="award" size={14} color={colors.white} /><T variant="caption" style={{ color: colors.white, fontFamily: font.semibold }}>Best match</T></View>
          <View style={{ flexDirection: 'row', gap: 14, padding: 16 }}>
            <Image source={images[best.portrait ?? best.avatar]} style={styles.bestImg} />
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
                <T variant="body" bold>{best.name}</T>
                <Icon name="check-circle" size={16} color={colors.success} />
              </View>
              <Rating value={best.rating} count={best.reviews} />
              <T variant="label" style={{ marginTop: 6 }}><T variant="label" bold>${best.rate}/hr</T>  {best.distance} mi</T>
              <T variant="caption" style={{ color: colors.success, marginTop: 4 }}>Next slot {best.nextSlot.toLowerCase()}</T>
            </View>
          </View>
          <View style={{ paddingHorizontal: 16, paddingBottom: 16 }}>
            <Button label="View" small onPress={() => router.push(`/provider/${best.id}`)} />
          </View>
        </Card>
      ) : (
        <Card style={{ alignItems: 'center', paddingVertical: 32 }}>
          <Icon name="search" size={28} color={colors.text3} />
          <T variant="body" bold style={{ marginTop: 8 }}>No pros match these filters</T>
          <T variant="caption" style={{ textAlign: 'center', marginTop: 4 }}>Try turning off a filter to see more pros nearby</T>
        </Card>
      )}

      {rest.length ? <T variant="label" style={{ color: colors.text2, marginTop: 20, marginBottom: 8 }}>More pros nearby</T> : null}
      {rest.map((p) => (
        <Card key={p.id} style={styles.row} onPress={() => router.push(`/provider/${p.id}`)} testID={`pro-${p.id}`}>
          <Avatar img={p.avatar} size={52} />
          <View style={{ flex: 1 }}>
            <T variant="body" bold>{p.name}</T>
            <Rating value={p.rating} count={p.reviews} />
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <T variant="label" bold>${p.rate}/hr</T>
            <T variant="caption">{p.distance} mi</T>
          </View>
        </Card>
      ))}
    </Screen>
  );
}

const styles = StyleSheet.create({
  sort: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 16, marginBottom: 12 },
  bestTag: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', backgroundColor: colors.accentFill, paddingHorizontal: 12, paddingVertical: 5, borderBottomRightRadius: radius.control },
  bestImg: { width: 88, height: 88, borderRadius: 16 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
});
