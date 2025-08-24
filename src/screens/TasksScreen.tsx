import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, Pressable, FlatList } from 'react-native';
import TaskItem from '@/components/TaskItem';
import { addTask, completeTask, getState, parseQuickTask } from '@/lib/mock';

export default function TasksScreen() {
  const s = getState();
  const [quick, setQuick] = useState('');

  const onAdd = () => {
    const parsed = parseQuickTask(quick);
    addTask(parsed.title, parsed.category, parsed.hour, 100);
    setQuick('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Tasks</Text>
      <View style={styles.inputRow}>
        <TextInput
          value={quick}
          onChangeText={setQuick}
          placeholder='e.g., "Gym 7pm daily"'
          style={styles.input}
        />
        <Pressable onPress={onAdd} style={[styles.addBtn, { opacity: quick ? 1 : 0.4 }]} disabled={!quick}>
          <Text style={styles.addText}>Add</Text>
        </Pressable>
      </View>

      <FlatList
        data={s.tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <TaskItem task={item} onComplete={() => completeTask(item.id)} />
        )}
        contentContainerStyle={{ paddingVertical: 12 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '800', marginBottom: 12 },
  inputRow: { flexDirection: 'row', gap: 8 },
  input: { flex: 1, borderWidth: 1, borderColor: '#ddd', padding: 12, borderRadius: 12, backgroundColor: '#fff' },
  addBtn: { backgroundColor: '#111827', paddingHorizontal: 16, alignItems: 'center', justifyContent: 'center', borderRadius: 12 },
  addText: { color: '#fff', fontWeight: '800' }
});
