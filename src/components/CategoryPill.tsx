import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Category } from '@/store/types';

export default function CategoryPill({ c }: { c: Category }) {
  return (
    <View style={[styles.pill]}>
      <Text style={styles.text}>{c}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    backgroundColor: '#eef2ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999
  },
  text: {
    color: '#3730a3',
    fontWeight: '600',
    fontSize: 12
  }
});
