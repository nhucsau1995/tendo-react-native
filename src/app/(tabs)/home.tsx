import { router } from 'expo-router';
import { useState } from 'react';
import { Image, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { ScalePressable } from '../../components/Pressable';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Card, IconButton, Rating, Section, StatusChip } from '../../components/ui';
import { images } from '../../data/images';
import { categories, customer, featured, providers } from '../../data/seed';
import { isUpcoming, searchProviders } from '../../logic/booking';
import { useStore } from '../../store';
import { colors, font, radius, shadow } from '../../theme/tokens';

export default function Home() {
  const bookings = useStore((s) => s.bookings);
  const [q, setQ] = useState('');
  const next = bookings.find(isUpcoming);
  const nextPro = next && providers.find((p) => p.id === next.providerId);
  const results = q ? searchProviders(providers, q) : [];
  return (
    <Screen testID="screen-home">
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <T variant="display">Hi {customer.firstName}</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 2 }}>
            <Icon name="map-pin" size={16} color={colors.accentFill} />
            <T variant="label" style={{ color: colors.text2 }}>{customer.area}</T>
          </View>
        </View>
        <IconButton icon="bell" label="Notifications" />
      </View>

      <View style={styles.search}>
        <Icon name="search" size={20} color={colors.text3} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="What do you need help with?"
          placeholderTextColor={colors.text3}
          accessibilityLabel="Search services"
          style={styles.searchInput}
        />
      </View>
      {results.length ? (
        <Card style={{ marginTop: 8, paddingVertical: 4 }}>
          {results.slice(0, 4).map((p) => (
            <ScalePressable key={p.id} onPress={() => router.push(`/provider/${p.id}`)} style={styles.resultRow}>
              <Avatar img={p.avatar} size={36} />
              <View style={{ flex: 1 }}>
                <T variant="label" bold>{p.name}</T>
                <T variant="caption">{p.service}</T>
              </View>
              <Icon name="chevron-right" size={18} color={colors.borderStrong} />
            </ScalePressable>
          ))}
        </Card>
      ) : null}

      <View style={styles.promo} testID="promo">
        <View style={{ flex: 1, padding: 20, justifyContent: 'center' }}>
          <View style={styles.offer}><T variant="tab" style={{ color: colors.white, fontFamily: font.semibold, letterSpacing: 0.6 }}>LIMITED OFFER</T></View>
          <T variant="display" style={{ color: colors.white, fontSize: 26, lineHeight: 32, marginTop: 8 }}>Spring deep clean</T>
          <T variant="label" style={{ color: colors.white, marginTop: 4 }}>20% off your first booking</T>
          <Button label="Book now" kind="white" small testID="promo-book" style={{ alignSelf: 'flex-start', marginTop: 14 }} onPress={() => router.push('/category/cleaning')} />
        </View>
        <Image source={images.promoSupplies} style={styles.promoImg} />
      </View>

      {next && nextPro ? (
        <Card style={{ marginTop: 16, flexDirection: 'row', alignItems: 'center', gap: 12 }} onPress={() => router.push(`/booking/${next.id}`)} testID="home-next-booking">
          <View style={styles.calIcon}><Icon name="calendar" size={20} color={colors.accentFill} /></View>
          <View style={{ flex: 1 }}>
            <T variant="label" bold>{next.serviceName}, {next.dateLabel.split(',')[0]} {next.time}</T>
            <T variant="caption">with {nextPro.firstName} {nextPro.name.split(' ')[1][0]}.</T>
          </View>
          <StatusChip status={next.status} />
        </Card>
      ) : null}

      <Section title="Categories" action="See all">
        <View style={styles.grid}>
          {categories.map((c) => (
            <ScalePressable key={c.id} testID={`cat-${c.id}`} onPress={() => router.push(`/category/${c.id}`)} containerStyle={styles.catWrap} style={styles.cat}>
              <View style={styles.catIcon}><Icon name={c.icon as never} size={22} color={colors.accentFill} /></View>
              <T variant="label" bold>{c.name}</T>
            </ScalePressable>
          ))}
        </View>
      </Section>

      <Section title="Top rated near you">
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 12, paddingRight: 20, paddingBottom: 8 }} style={{ marginHorizontal: -20, paddingLeft: 20 }}>
          {featured.map((id) => providers.find((p) => p.id === id)!).map((p) => (
            <Card key={p.id} style={styles.topCard} onPress={() => router.push(`/provider/${p.id}`)} testID={`top-${p.id}`}>
              <View>
                <Image source={images[p.portrait ?? p.avatar]} style={styles.topImg} />
                <View style={styles.ratingPill}><Rating value={p.rating} count={p.reviews} /></View>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                <T variant="body" bold>{p.name}</T>
                <T variant="label" style={{ color: colors.accentFill, fontFamily: font.semibold }}>${p.rate}<T variant="caption">/hr</T></T>
              </View>
              <T variant="caption">{p.service}</T>
            </Card>
          ))}
        </ScrollView>
      </Section>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, height: 52, borderRadius: radius.input, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, paddingHorizontal: 16 },
  searchInput: { flex: 1, fontFamily: font.regular, fontSize: 16, color: colors.text },
  resultRow: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  promo: { flexDirection: 'row', marginTop: 16, borderRadius: radius.card, backgroundColor: colors.accentFill, overflow: 'hidden', minHeight: 196, ...shadow },
  offer: { alignSelf: 'flex-start', backgroundColor: colors.onAccentChip, borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 4 },
  promoImg: { width: 128, height: '100%' },
  calIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.accentTint, alignItems: 'center', justifyContent: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12 },
  catWrap: { width: '30.5%' },
  cat: { backgroundColor: colors.surface, borderRadius: radius.card, paddingVertical: 16, alignItems: 'center', gap: 10, ...shadow },
  catIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accentTint, alignItems: 'center', justifyContent: 'center' },
  topCard: { width: 236, padding: 12 },
  topImg: { width: '100%', height: 150, borderRadius: 14 },
  ratingPill: { position: 'absolute', left: 8, bottom: 8, backgroundColor: colors.surface, borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 3 },
});
