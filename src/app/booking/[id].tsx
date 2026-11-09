import { router, useLocalSearchParams } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import { Button } from '../../components/Button';
import { Icon } from '../../components/Icon';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, BackHeader, Card, Divider, Row } from '../../components/ui';
import { providers } from '../../data/seed';
import { headline, STATUS_LABEL, STATUS_STEPS, stepState } from '../../logic/booking';
import { money } from '../../logic/pricing';
import { useStore } from '../../store';
import { colors, font, radius, shadow } from '../../theme/tokens';

export default function Tracking() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = useStore((s) => s.bookings.find((b) => b.id === id));
  const advance = useStore((s) => s.advanceBooking);
  const cancel = useStore((s) => s.cancelBooking);
  const convo = useStore((s) => s.conversations.find((c) => c.providerId === booking?.providerId));
  if (!booking) {
    return (
      <Screen header={<BackHeader title="Booking" />}>
        <T variant="body">This booking was cancelled.</T>
      </Screen>
    );
  }
  const p = providers.find((x) => x.id === booking.providerId)!;
  const h = headline(booking, p.firstName);
  const done = booking.status === 'completed';
  return (
    <Screen
      testID="screen-tracking"
      header={<BackHeader title={`Booking #${booking.id}`} />}
      footer={
        done ? (
          booking.rated ? (
            <Button label="Book again" testID="book-again" onPress={() => router.push(`/provider/${p.id}`)} />
          ) : (
            <Button label="Rate and tip" icon="star" testID="rate-pro" onPress={() => router.push(`/rate/${booking.id}`)} />
          )
        ) : (
          <Button label="Simulate pro update" kind="secondary" icon="fast-forward" testID="simulate-step" onPress={() => advance(booking.id)} />
        )
      }
    >
      <View style={styles.hero} testID="status-card">
        <View style={{ flex: 1 }}>
          <T variant="title" style={{ color: colors.white, fontFamily: font.display, fontSize: 22 }} testID="status-title">{h.title}</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
            <Icon name={done ? 'check-circle' : 'clock'} size={14} color={colors.white} />
            <T variant="label" style={{ color: colors.white }}>{h.sub}</T>
          </View>
        </View>
        <Avatar img={p.avatar} size={56} ring />
      </View>

      <View style={{ flexDirection: 'row', gap: 12, marginTop: 16 }}>
        <Button label="Message" kind="secondary" icon="message-circle" small style={{ flex: 1 }} testID="open-chat" onPress={() => router.push(`/chat/${convo?.id ?? `c-${p.id}`}`)} />
        <Button label="Call" kind="secondary" icon="phone" small style={{ flex: 1 }} />
      </View>

      <Card style={{ marginTop: 16 }}>
        {STATUS_STEPS.map((s, i) => {
          const st = stepState(booking, s);
          const ev = booking.events.find((e) => e.status === s);
          return (
            <View key={s} style={{ flexDirection: 'row', gap: 14 }}>
              <View style={{ alignItems: 'center' }}>
                <View style={[styles.dot, st === 'done' && styles.dotDone, st === 'current' && styles.dotCur]}>
                  {st === 'done' ? <Icon name="check" size={14} color={colors.success} /> : st === 'current' ? <View style={styles.inner} /> : null}
                </View>
                {i < STATUS_STEPS.length - 1 ? <View style={[styles.line, st === 'done' && { backgroundColor: colors.success }]} /> : null}
              </View>
              <View style={{ flex: 1, paddingBottom: i < STATUS_STEPS.length - 1 ? 18 : 0, flexDirection: 'row', justifyContent: 'space-between' }}>
                <T variant="body" style={{ fontFamily: st === 'current' ? font.semibold : font.regular, color: st === 'pending' ? colors.text3 : colors.text }}>{STATUS_LABEL[s]}</T>
                {ev?.at ? <T variant="caption" style={{ color: st === 'current' ? colors.text : colors.text2 }}>{ev.at}</T> : null}
              </View>
            </View>
          );
        })}
      </Card>

      <Card style={{ marginTop: 16 }}>
        <T variant="body" bold>{booking.serviceName}</T>
        <Row icon="calendar" text={`${booking.dateLabel}, ${booking.time}`} />
        <Row icon="map-pin" text={booking.address} />
        <Divider />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View>
            <T variant="label" style={{ color: colors.text2 }}>Total</T>
            <T variant="caption" style={{ color: colors.success }}>{done ? 'Charged to Visa 4242' : 'Charged after completion'}</T>
          </View>
          <T variant="display" style={{ fontSize: 26 }}>{money(booking.total)}</T>
        </View>
      </Card>

      {booking.status === 'requested' || booking.status === 'accepted' ? (
        <Button
          label="Cancel booking"
          kind="danger"
          icon="x-circle"
          testID="cancel-booking"
          style={{ marginTop: 8 }}
          onPress={() => {
            cancel(booking.id);
            router.back();
          }}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: colors.accentFill, borderRadius: radius.card, padding: 20, ...shadow },
  dot: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: colors.borderStrong, backgroundColor: colors.surface, alignItems: 'center', justifyContent: 'center' },
  dotDone: { borderColor: colors.successTint, backgroundColor: colors.successTint },
  dotCur: { borderColor: colors.accentFill, backgroundColor: colors.accentFill },
  inner: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.white },
  line: { width: 2, flex: 1, backgroundColor: colors.border, marginVertical: 2 },
});
