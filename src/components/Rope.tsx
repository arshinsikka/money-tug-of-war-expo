import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import * as Haptics from 'expo-haptics';

type Props = {
  meEmoji: string;
  friendEmoji: string;
  balanceCents: number; // positive = your side winning
};

export default function Rope({ meEmoji, friendEmoji, balanceCents }: Props) {
  const translate = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const last = useRef(0);

  const normalized = Math.max(-1, Math.min(1, balanceCents / 1000)); // clamp
  const target = normalized * 100; // pixels

  useEffect(() => {
    Animated.timing(translate, {
      toValue: target,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true
    }).start();

    // Trigger haptics and shake on change crossing thresholds
    if ((last.current <= 0 && balanceCents > 0) || (last.current >= 0 && balanceCents < 0)) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Animated.sequence([
        Animated.timing(shake, { toValue: 1, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -1, duration: 100, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 100, useNativeDriver: true })
      ]).start();
    }
    last.current = balanceCents;
  }, [balanceCents]);

  const shakeInterpolate = shake.interpolate({
    inputRange: [-1, 1],
    outputRange: ['-2deg', '2deg']
  });

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.avatar}>{meEmoji}</Text>
        <View style={styles.ropeTrack}>
          <Animated.View style={[styles.rope, { transform: [{ rotate: shakeInterpolate }] }]} />
          <Animated.View style={[styles.moneyBag, { transform: [{ translateX: translate }] }]}>
            <Text style={{ fontSize: 22 }}>💰</Text>
          </Animated.View>
        </View>
        <Text style={styles.avatar}>{friendEmoji}</Text>
      </View>
      <Text style={styles.caption}>Tug the money by finishing tasks!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', width: '100%' },
  row: { flexDirection: 'row', alignItems: 'center', width: '100%', paddingHorizontal: 12 },
  avatar: { fontSize: 28, width: 40, textAlign: 'center' },
  ropeTrack: { flex: 1, height: 24, justifyContent: 'center' },
  rope: { height: 4, borderRadius: 2, backgroundColor: '#c9a86a' },
  moneyBag: {
    position: 'absolute',
    left: '50%',
    marginLeft: -11,
    top: 2
  },
  caption: { marginTop: 6, color: '#666' }
});
