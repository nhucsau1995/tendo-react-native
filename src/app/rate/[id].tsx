import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../../components/Button';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Chip, IconButton, Stars } from '../../components/ui';
import { providers } from '../../data/seed';
import { money, tipTotal } from '../../logic/pricing';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

const TAGS = ['On time', 'Thorough', 'Friendly', 'Great value'];
const TIPS = [5, 10, 15];

export default function Rate() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const booking = useStore((s) => s.bookings.find((b) => b.id === id));
  const rate = useStore((s) => s.rateBooking);
  const p = providers.find((x) => x.id === booking?.providerId) ?? providers[0];
  const [stars, setStars] = useState(5);
  const [tags, setTags] = useState<string[]>(['On time', 'Thorough']);
  const [tip, setTip] = useState(10);
  const [note, setNote] = useState(`${p.firstName} did an amazing job, the kitchen looks brand new.`);
  const toggle = (t: string) => setTags((cur) => (cur.includes(t) ? cur.filter((x) => x !== t) : [...cur, t]));
  return (
    <Screen
      testID="screen-rate"
      footer={
        <Button
          label={booking ? `Submit review, pay ${money(tipTotal(booking.total, tip))}` : 'Submit review'}
          testID="submit-review"
          onPress={() => {
            if (booking) rate(booking.id);
            router.back();
          }}
        />
      }
    >
      <IconButton icon="x" label="Close" testID="close" onPress={() => router.back()} />
      <View style={{ alignItems: 'center', marginTop: 8 }}>
        <Avatar img={p.avatar} size={92} ring />
        <T variant="label" style={{ color: colors.text2, marginTop: 8 }}>{p.name}</T>
        <T variant="display" style={{ fontSize: 28, lineHeight: 34, textAlign: 'center', marginTop: 8 }}>How was your {booking?.serviceName.toLowerCase() ?? 'service'}?</T>
        <T variant="label" style={{ color: colors.text2, marginTop: 4 }}>{booking?.dateLabel}, completed 2:04 PM</T>
      </View>
      <View style={{ marginTop: 20 }}><Stars value={stars} onChange={setStars} /></View>

      <T variant="label" style={{ marginTop: 24, marginBottom: 10, fontFamily: font.semibold }}>What went well?</T>
      <View style={styles.wrap}>
        {TAGS.map((t) => <Chip key={t} label={t} selected={tags.includes(t)} onPress={() => toggle(t)} />)}
      </View>

      <TextInput value={note} onChangeText={setNote} multiline accessibilityLabel="Review" style={styles.note} />

      <T variant="title" style={{ marginTop: 24 }}>Add a tip</T>
      <T variant="caption">100% of tips go directly to {p.firstName}</T>
      <View style={[styles.wrap, { marginTop: 12 }]}>
        {TIPS.map((t) => <Chip key={t} label={`$${t}`} selected={tip === t} onPress={() => setTip(t)} testID={`tip-${t}`} />)}
        <Chip label="No tip" selected={tip === 0} onPress={() => setTip(0)} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  note: { minHeight: 88, marginTop: 16, borderRadius: radius.input, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, padding: 14, fontFamily: font.regular, fontSize: 16, color: colors.text, textAlignVertical: 'top' },
});
