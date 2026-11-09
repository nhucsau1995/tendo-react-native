import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Icon } from '../../components/Icon';
import { ScalePressable } from '../../components/Pressable';
import { Screen } from '../../components/Screen';
import { T } from '../../components/Text';
import { Avatar, Card } from '../../components/ui';
import { useStore } from '../../store';
import { colors, font, radius } from '../../theme/tokens';

export default function Inbox() {
  const conversations = useStore((s) => s.conversations);
  const [q, setQ] = useState('');
  const list = conversations.filter((c) => c.title.toLowerCase().includes(q.trim().toLowerCase()));
  return (
    <Screen testID="screen-inbox">
      <T variant="display">Inbox</T>
      <View style={styles.search}>
        <Icon name="search" size={20} color={colors.text3} />
        <TextInput value={q} onChangeText={setQ} placeholder="Search messages" placeholderTextColor={colors.text3} accessibilityLabel="Search messages" style={styles.input} />
      </View>
      <Card style={{ paddingVertical: 4, marginTop: 16 }}>
        {list.map((c, i) => {
          const last = c.messages[c.messages.length - 1];
          const unread = c.unread > 0;
          return (
            <ScalePressable key={c.id} testID={`convo-${c.id}`} onPress={() => router.push(`/chat/${c.id}`)} style={[styles.row, i > 0 && { borderTopWidth: 1, borderTopColor: colors.border }]}>
              {c.avatar ? (
                <Avatar img={c.avatar} size={52} />
              ) : (
                <View style={styles.support}><Icon name="home" size={22} color={colors.white} /></View>
              )}
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <T variant="body" bold>{c.title}</T>
                  <T variant="caption" style={{ color: unread ? colors.accentFill : colors.text3 }}>{c.when}</T>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  <T variant="label" numberOfLines={1} style={{ flex: 1, color: unread ? colors.text : colors.text2, fontFamily: unread ? font.semibold : font.regular }}>{last?.text}</T>
                  {unread ? <View style={styles.badge}><T variant="tab" style={{ color: colors.white, fontFamily: font.bold }}>{c.unread}</T></View> : null}
                </View>
              </View>
            </ScalePressable>
          );
        })}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  search: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 16, height: 52, borderRadius: radius.input, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, paddingHorizontal: 16 },
  input: { flex: 1, fontFamily: font.regular, fontSize: 16, color: colors.text },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 12 },
  support: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' },
  badge: { minWidth: 22, height: 22, borderRadius: 11, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6 },
});
