import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput, View, type ScrollViewInstance } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon } from '../../components/Icon';
import { ScalePressable } from '../../components/Pressable';
import { T } from '../../components/Text';
import { Avatar, Chip, IconButton } from '../../components/ui';
import { quickReplies } from '../../data/seed';
import { useStore } from '../../store';
import { colors, font, radius, shadow } from '../../theme/tokens';

export default function Chat() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const insets = useSafeAreaInsets();
  const convo = useStore((s) => s.conversations.find((c) => c.id === id));
  const booking = useStore((s) => s.bookings.find((b) => b.id === convo?.bookingId) ?? s.bookings.find((b) => b.providerId === convo?.providerId && b.status !== 'completed'));
  const send = useStore((s) => s.sendMessage);
  const markRead = useStore((s) => s.markRead);
  const [text, setText] = useState('');
  const scroll = useRef<ScrollViewInstance>(null);

  useEffect(() => {
    if (convo?.unread) markRead(convo.id);
  }, [convo?.id]);

  if (!convo) return null;
  const submit = (t: string) => {
    if (!t.trim()) return;
    send(convo.id, t.trim());
    setText('');
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1, backgroundColor: colors.bg }} behavior={Platform.OS === 'ios' ? 'padding' : undefined} testID="screen-chat">
      <View style={[styles.header, { paddingTop: insets.top + 8 }]}>
        <IconButton icon="arrow-left" label="Back" testID="back" onPress={() => router.back()} />
        {convo.avatar ? <Avatar img={convo.avatar} size={42} /> : null}
        <View style={{ flex: 1 }}>
          <T variant="body" bold>{convo.title}</T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <View style={styles.online} />
            <T variant="caption" style={{ color: colors.success }}>Online</T>
          </View>
        </View>
        <IconButton icon="phone" label="Call" />
      </View>
      {booking ? (
        <ScalePressable onPress={() => router.push(`/booking/${booking.id}`)} style={styles.pin} testID="chat-booking">
          <Icon name="calendar" size={16} color={colors.accentFill} />
          <T variant="label" style={{ flex: 1 }}>{booking.serviceName}, {booking.dateLabel.split(',')[0]} {booking.time}</T>
          <T variant="label" style={{ color: colors.accentFill }}>View</T>
        </ScalePressable>
      ) : null}
      <ScrollView ref={scroll} onContentSizeChange={() => scroll.current?.scrollToEnd({ animated: true })} contentContainerStyle={{ padding: 20, gap: 10 }}>
        <View style={styles.today}><T variant="caption" style={{ color: colors.text3 }}>Today</T></View>
        {convo.messages.map((m) => (
          <View key={m.id} style={[styles.bubble, m.from === 'me' ? styles.me : styles.them]}>
            <T variant="body" style={{ color: m.from === 'me' ? colors.white : colors.text }}>{m.text}</T>
            <T variant="tab" style={{ color: m.from === 'me' ? 'rgba(255,255,255,0.85)' : colors.text3, alignSelf: 'flex-end', marginTop: 2 }}>{m.at}</T>
          </View>
        ))}
      </ScrollView>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, paddingHorizontal: 20, paddingBottom: 10 }} style={{ flexGrow: 0 }}>
        {quickReplies.map((r, i) => <Chip key={r} label={r} onPress={() => submit(r)} testID={`quick-${i}`} />)}
      </ScrollView>
      <View style={[styles.inputBar, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        <TextInput value={text} onChangeText={setText} placeholder="Type a message" placeholderTextColor={colors.text3} accessibilityLabel="Message" style={styles.input} onSubmitEditing={() => submit(text)} />
        <ScalePressable testID="send" onPress={() => submit(text)} accessibilityLabel="Send" style={styles.send}>
          <Icon name="send" size={20} color={colors.white} />
        </ScalePressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 20, paddingBottom: 12, backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  online: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.success },
  pin: { flexDirection: 'row', alignItems: 'center', gap: 8, marginHorizontal: 20, marginTop: 12, backgroundColor: colors.surface, borderRadius: radius.control, padding: 12, borderWidth: 1, borderColor: colors.border },
  today: { alignSelf: 'center', backgroundColor: colors.surfaceAlt, borderRadius: radius.pill, paddingHorizontal: 12, paddingVertical: 4 },
  bubble: { maxWidth: '80%', paddingHorizontal: 14, paddingVertical: 10, borderRadius: 18 },
  them: { alignSelf: 'flex-start', backgroundColor: colors.surface, borderBottomLeftRadius: 4, ...shadow },
  me: { alignSelf: 'flex-end', backgroundColor: colors.accentFill, borderBottomRightRadius: 4 },
  inputBar: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 20, paddingTop: 12, backgroundColor: colors.surface, borderTopWidth: 1, borderTopColor: colors.border },
  input: { flex: 1, height: 50, borderRadius: radius.pill, borderWidth: 1, borderColor: colors.borderStrong, paddingHorizontal: 18, fontFamily: font.regular, fontSize: 16, color: colors.text, backgroundColor: colors.bg },
  send: { width: 46, height: 46, borderRadius: 23, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' },
});
