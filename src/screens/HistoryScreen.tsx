import React from 'react';
import { View, StyleSheet, Text, Pressable } from 'react-native';
import { getState, settleWeek } from '@/lib/mock';

export default function HistoryScreen() {
  const s = getState();
  const totals = {
    Work: s.tasks.filter(t => t.category === 'Work').length,
    Study: s.tasks.filter(t => t.category === 'Study').length,
    Fitness: s.tasks.filter(t => t.category === 'Fitness').length,
    Habit: s.tasks.filter(t => t.category === 'Habit').length
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weekly Recap</Text>
      <View style={styles.card}>
        <Text style={styles.h2}>Category Breakdown</Text>
        <Text>Work: {totals.Work}</Text>
        <Text>Study: {totals.Study}</Text>
        <Text>Fitness: {totals.Fitness}</Text>
        <Text>Habit: {totals.Habit}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.h2}>Balance Swings</Text>
        <Text style={{color:'#666'}}>Graph coming soon — keeps the base app lightweight.</Text>
      </View>

      <Pressable onPress={() => { settleWeek(); alert('Tally reset for next week! 🎉'); }} style={styles.settle}>
        <Text style={styles.settleText}>Settle Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 16, padding: 12, borderWidth: 1, borderColor: '#eee', marginBottom: 12 },
  h2: { fontSize: 16, fontWeight: '800', marginBottom: 6 },
  settle: { backgroundColor: '#16a34a', padding: 14, borderRadius: 14, alignItems: 'center', marginTop: 8 },
  settleText: { color: '#fff', fontWeight: '800' }
});
