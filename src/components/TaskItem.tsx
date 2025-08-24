import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import CategoryPill from './CategoryPill';
import { Task } from '@/store/types';

type Props = {
  task: Task;
  onComplete: () => void;
};

export default function TaskItem({ task, onComplete }: Props) {
  return (
    <View style={styles.card}>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={styles.title}>{task.title}</Text>
        <CategoryPill c={task.category} />
      </View>
      <Text style={styles.meta}>
        Due by {task.deadlineHour}:00 • ${task.penaltyCents/100} penalty
      </Text>
      <View style={styles.actions}>
        <Pressable onPress={onComplete} style={styles.primaryBtn}>
          <Text style={styles.primaryText}>✅ Complete</Text>
        </Pressable>
        <Pressable onPress={() => alert('Photo proof coming soon. Install expo-image-picker to enable.')} style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>📷 Proof</Text>
        </Pressable>
        <Pressable onPress={() => alert('Pomodoro coming soon.')} style={styles.secondaryBtn}>
          <Text style={styles.secondaryText}>⏱️ Pomodoro</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 12,
    borderRadius: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    marginBottom: 12
  },
  title: { fontSize: 16, fontWeight: '700' },
  meta: { color: '#666', marginTop: 4 },
  actions: { flexDirection: 'row', gap: 8, marginTop: 10 },
  primaryBtn: { backgroundColor: '#16a34a', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
  primaryText: { color: '#fff', fontWeight: '700' },
  secondaryBtn: { backgroundColor: '#eef2ff', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 12 },
  secondaryText: { color: '#3730a3', fontWeight: '700' }
});
