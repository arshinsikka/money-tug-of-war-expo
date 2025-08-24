import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { setMe } from '@/lib/mock';

type Props = { onDone: () => void };

export default function OnboardingScreen({ onDone }: Props) {
  const [name, setName] = useState('');
  const [emoji, setEmoji] = useState('💪');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Money Tug-of-War</Text>
      <Text style={styles.subtitle}>Fun accountability with a friend — no real money transfers.</Text>

      <Text style={styles.label}>Your name</Text>
      <TextInput value={name} onChangeText={setName} placeholder="e.g., Arshin" style={styles.input} />
      <Text style={styles.label}>Choose an emoji</Text>
      <TextInput value={emoji} onChangeText={setEmoji} placeholder="e.g., 💪" style={styles.input} />

      <Pressable
        style={[styles.btn, { opacity: name ? 1 : 0.4 }]}
        disabled={!name}
        onPress={() => {
          setMe(name, emoji || '💪');
          onDone();
        }}
      >
        <Text style={styles.btnText}>Continue</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#444', marginBottom: 20 },
  label: { marginTop: 12, marginBottom: 6, fontWeight: '700' },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 12, backgroundColor: '#fff' },
  btn: { marginTop: 24, backgroundColor: '#111827', padding: 14, borderRadius: 14, alignItems: 'center' },
  btnText: { color: '#fff', fontWeight: '800' }
});
