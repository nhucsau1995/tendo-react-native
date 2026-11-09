import { router } from 'expo-router';
import { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { Button } from '../components/Button';
import { Icon, type IconName } from '../components/Icon';
import { ScalePressable } from '../components/Pressable';
import { Screen } from '../components/Screen';
import { T } from '../components/Text';
import { IconButton } from '../components/ui';
import { customer } from '../data/seed';
import { useStore } from '../store';
import { colors, font, radius } from '../theme/tokens';

function RoleCard({ label, icon, selected, onPress, testID }: { label: string; icon: IconName; selected: boolean; onPress: () => void; testID: string }) {
  return (
    <ScalePressable
      testID={testID}
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      containerStyle={{ flex: 1 }}
      style={[styles.role, selected && { borderColor: colors.accentFill, borderWidth: 2, backgroundColor: colors.accentTint }]}
    >
      <View style={[styles.roleIcon, selected && { backgroundColor: colors.white }]}>
        <Icon name={icon} size={22} color={selected ? colors.accentFill : colors.text2} />
      </View>
      <T variant="label" style={{ fontFamily: font.semibold, marginTop: 12 }}>{label}</T>
      {selected ? (
        <View style={styles.check}><Icon name="check" size={12} color={colors.white} /></View>
      ) : null}
    </ScalePressable>
  );
}

function Field({ label, value, onChangeText, focused, keyboardType }: { label: string; value: string; onChangeText: (v: string) => void; focused?: boolean; keyboardType?: 'phone-pad' | 'email-address' }) {
  return (
    <View style={{ marginTop: 16 }}>
      <T variant="label" style={{ marginBottom: 6 }}>{label}</T>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        accessibilityLabel={label}
        style={[styles.input, focused && { borderColor: colors.accentFill, borderWidth: 2 }]}
      />
    </View>
  );
}

export default function SignUp() {
  const [role, setRole] = useState<'customer' | 'provider'>('customer');
  const [name, setName] = useState(customer.name);
  const [phone, setPhone] = useState(customer.phone);
  const [email, setEmail] = useState(customer.email);
  const signUp = useStore((s) => s.signUp);
  const setAppRole = useStore((s) => s.setRole);
  return (
    <Screen
      testID="screen-sign-up"
      footer={
        <Button
          label="Continue"
          testID="sign-up-continue"
          disabled={!name || phone.replace(/\D/g, '').length < 10}
          onPress={() => {
            signUp();
            if (role === 'provider') {
              setAppRole('provider');
              router.replace('/provider-mode');
            } else router.replace('/home');
          }}
        />
      }
    >
      <IconButton icon="arrow-left" label="Back" testID="back" onPress={() => router.back()} />
      <T variant="display" style={{ marginTop: 20 }}>Create your account</T>
      <View style={{ flexDirection: 'row', gap: 12, marginTop: 20 }}>
        <RoleCard label="I need a service" icon="home" selected={role === 'customer'} onPress={() => setRole('customer')} testID="role-customer" />
        <RoleCard label="I offer services" icon="tool" selected={role === 'provider'} onPress={() => setRole('provider')} testID="role-provider" />
      </View>
      <Field label="Full name" value={name} onChangeText={setName} />
      <Field label="Phone" value={phone} onChangeText={setPhone} focused keyboardType="phone-pad" />
      <T variant="caption" style={{ marginTop: 6 }}>We will text you a 6-digit code</T>
      <Field label="Email" value={email} onChangeText={setEmail} keyboardType="email-address" />
      <T variant="label" style={{ color: colors.text2, textAlign: 'center', marginTop: 24 }}>
        By continuing you accept the <T variant="label" style={{ color: colors.accentFill }}>Terms</T> and <T variant="label" style={{ color: colors.accentFill }}>Privacy Policy</T>
      </T>
    </Screen>
  );
}

const styles = StyleSheet.create({
  role: { backgroundColor: colors.surface, borderRadius: radius.card, padding: 16, minHeight: 128, borderWidth: 1, borderColor: colors.border },
  roleIcon: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceAlt, alignItems: 'center', justifyContent: 'center' },
  check: { position: 'absolute', top: 12, right: 12, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accentFill, alignItems: 'center', justifyContent: 'center' },
  input: { height: 52, borderRadius: radius.input, borderWidth: 1, borderColor: colors.borderStrong, backgroundColor: colors.surface, paddingHorizontal: 16, fontFamily: font.regular, fontSize: 16, color: colors.text },
});
