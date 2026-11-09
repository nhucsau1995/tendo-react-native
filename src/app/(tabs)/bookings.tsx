import { router } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { ScalePressable } from '../../components/Pressable';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Card, Rating, Row, StatusChip } from '../../components/ui';
import { images } from '../../data/images';
import { providers } from '../../data/seed';
import { isUpcoming } from '../../logic/booking';
import { money } from '../../logic/pricing';
import { useStore } from '../../store';
import { colors, font, radius, shadow } from '../../theme/tokens';

export default function Bookings() {
  const bookings = useStore((s) => s.bookings);
  const conversations = useStore((s) => s.conversations);
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming');
  const list = bookings.filter((b) => (tab === 'upcoming' ? isUpcoming(b) : !isUpcoming(b)));
  const [first, ...rest] = list;
  const pro = (id: string) => providers.find((p) => p.id === id)!;
  return (
    <Screen testID="screen-bookings">
      <T variant="display">Bookings</T>
      <View style={styles.seg}>
        {(['upcoming', 'past'] as const).map((k) => (
          <ScalePressable key={k} testID={`seg-${k}`} onPress={() => setTab(k)} containerStyle={{ flex: 1 }} style={[styles.segItem, tab === k && styles.segOn]}>
            <T variant="label" style={{ fontFamily: tab === k ? font.semibold : font.medium, color: tab === k ? colors.text : colors.text2 }}>{k === 'upcoming' ? 'Upcoming' : 'Past'}</T>
          </ScalePressable>
        ))}
      </View>

      {!first ? (
        <View style={{ alignItems: 'center', marginTop: 24 }} testID="bookings-empty">
          <Image source={images.emptyEntryway} style={styles.empty} />
          <T variant="title" style={{ marginTop: 20 }}>{tab === 'upcoming' ? 'No bookings yet' : 'No past bookings'}</T>
          <T variant="body" style={{ color: colors.text2, textAlign: 'center', marginTop: 4 }}>
            {tab === 'upcoming' ? 'Your upcoming services will show up here' : 'Finished jobs and receipts will show up here'}
          </T>
          <Button label="Find a pro" testID="find-pro" style={{ marginTop: 20, alignSelf: 'stretch' }} onPress={() => router.push('/category/cleaning')} />
        </View>
      ) : (
        <>
          <T variant="caption" style={{ color: colors.text3, letterSpacing: 0.6, marginTop: 20, marginBottom: 8 }}>{tab === 'upcoming' ? 'NEXT BOOKING' : 'MOST RECENT'}</T>
          <Card testID="next-booking" onPress={() => router.push(`/booking/${first.id}`)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
              <Avatar img={pro(first.providerId).avatar} size={56} />
              <View style={{ flex: 1 }}>
                <T variant="body" bold>{pro(first.providerId).name}</T>
                <Rating value={pro(first.providerId).rating} count={pro(first.providerId).reviews} />
              </View>
              <StatusChip status={first.status} />
            </View>
            <T variant="body" bold style={{ marginTop: 12 }}>{first.serviceName}</T>
            <Row icon="calendar" text={`${first.dateLabel}, ${first.time}`} />
            <Row icon="credit-card" text={`${money(first.total)}${first.status === 'completed' ? ' paid' : ' after the job'}`} />
            <View style={{ flexDirection: 'row', gap: 10, marginTop: 14 }}>
              <Button label={first.status === 'completed' ? 'Details' : 'Track'} small style={{ flex: 1 }} testID="track-next" onPress={() => router.push(`/booking/${first.id}`)} />
              <Button
                label="Message"
                kind="secondary"
                icon="message-circle"
                small
                style={{ flex: 1 }}
                onPress={() => router.push(`/chat/${conversations.find((c) => c.providerId === first.providerId)?.id ?? 'c-support'}`)}
              />
            </View>
          </Card>
          {rest.length ? <T variant="caption" style={{ color: colors.text3, letterSpacing: 0.6, marginTop: 20, marginBottom: 8 }}>LATER</T> : null}
          {rest.map((b) => (
            <Card key={b.id} style={styles.row} onPress={() => router.push(`/booking/${b.id}`)} testID={`booking-${b.id}`}>
              <Avatar img={pro(b.providerId).avatar} size={48} />
              <View style={{ flex: 1 }}>
                <T variant="body" bold>{pro(b.providerId).name}</T>
                <T variant="caption">{b.serviceName}, {b.dateLabel}, {b.time}</T>
              </View>
              <StatusChip status={b.status} />
            </Card>
          ))}
        </>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  seg: { flexDirection: 'row', backgroundColor: colors.surfaceAlt, borderRadius: radius.input, padding: 4, marginTop: 16, height: 48 },
  segItem: { flex: 1, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  segOn: { backgroundColor: colors.surface, ...shadow },
  empty: { width: 240, height: 240, borderRadius: radius.card },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 10 },
});
