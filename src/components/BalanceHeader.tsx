import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Props = {
  meName: string;
  friendName: string;
  meDollars: number;
  friendDollars: number;
};

export default function BalanceHeader({ meName, friendName, meDollars, friendDollars }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.balance}>{meName}: ${meDollars}</Text>
      <Text style={styles.pipe}>|</Text>
      <Text style={styles.balance}>{friendName}: ${friendDollars}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8
  },
  balance: {
    fontSize: 18,
    fontWeight: '600'
  },
  pipe: {
    marginHorizontal: 8,
    color: '#888'
  }
});
