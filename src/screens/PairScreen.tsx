import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { generatePair, joinPair, getState } from '@/lib/mock';

type Props = { onPaired: () => void };

export default function PairScreen({ onPaired }: Props) {
  const [code, setCode] = useState('');
  const [myCode, setMyCode] = useState<string | null>(null);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pair with a Friend</Text>
      <Text style={styles.subtitle}>Share an invite code or scan their QR to join the same tug.</Text>

      <Pressable style={styles.btn} onPress={() => setMyCode(generatePair())}>
        <Text style={styles.btnText}>Generate Invite Code</Text>
      </Pressable>

      {myCode && (
        <View style={styles.codeBox}>
          <Text style={styles.codeLabel}>Your code</Text>
          <Text selectable style={styles.code}>{myCode}</Text>
          <Text style={{color:'#666'}}>Ask your friend to enter this code on their device.</Text>
        </View>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>Enter friend's code</Text>
      <TextInput value={code} onChangeText={setCode} placeholder="e.g., 8FJ2K1" style={styles.input} />

      <Pressable
        style={[styles.primary, { opacity: code ? 1 : 0.4 }]}
        disabled={!code}
        onPress={() => {
          joinPair(code.toUpperCase());
          onPaired();
        }}
      >
        <Text style={styles.primaryText}>Join</Text>
      </Pressable>

      <Pressable style={styles.secondary} onPress={() => alert('QR scanning coming soon. Use code for now.')}>
        <Text style={styles.secondaryText}>Scan QR instead</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 6 },
  subtitle: { color: '#444', marginBottom: 16 },
  btn: { backgroundColor: '#eef2ff', padding: 12, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#3730a3', fontWeight: '800' },
  codeBox: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginTop: 12, borderWidth: 1, borderColor: '#eee' },
  codeLabel: { color: '#666' },
  code: { fontSize: 22, fontWeight: '800', marginVertical: 4 },
  label: { fontWeight: '700', marginBottom: 6 },
  input: { borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 12, backgroundColor: '#fff' },
  primary: { marginTop: 12, backgroundColor: '#16a34a', padding: 12, borderRadius: 12, alignItems: 'center' },
  primaryText: { color: '#fff', fontWeight: '800' },
  secondary: { marginTop: 10, backgroundColor: '#f3f4f6', padding: 12, borderRadius: 12, alignItems: 'center' },
  secondaryText: { color: '#111827', fontWeight: '800' }
});
