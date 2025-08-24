import React, { useMemo } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Rope from '@/components/Rope';
import BalanceHeader from '@/components/BalanceHeader';
import { computeBalanceCents, getState } from '@/lib/mock';

export default function HomeScreen() {
  const s = getState();
  const my = s.me?.name || 'You';
  const fr = s.pair?.userB?.name || 'Friend';
  const meEmoji = s.me?.emoji || '🙂';
  const frEmoji = s.pair?.userB?.emoji || '🙂';

  const balanceCents = useMemo(() => computeBalanceCents(), [s.tasks, s.completions]);
  const meDollars = Math.max(0, Math.floor(balanceCents/100));
  const frDollars = Math.max(0, Math.floor((-balanceCents)/100));

  return (
    <View style={styles.container}>
      <BalanceHeader meName={my} friendName={fr} meDollars={meDollars} friendDollars={frDollars} />
      <Rope meEmoji={meEmoji} friendEmoji={frEmoji} balanceCents={balanceCents} />
      <Text style={styles.tip}>Tip: Completing tasks pulls the 💰 toward you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 24 },
  tip: { textAlign: 'center', color: '#666', marginTop: 16 }
});
