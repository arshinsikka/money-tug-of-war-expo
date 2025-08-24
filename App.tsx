import React, { useState } from 'react';
import { SafeAreaView, View, StatusBar, useColorScheme } from 'react-native';
import OnboardingScreen from '@/screens/OnboardingScreen';
import PairScreen from '@/screens/PairScreen';
import HomeScreen from '@/screens/HomeScreen';
import TasksScreen from '@/screens/TasksScreen';
import HistoryScreen from '@/screens/HistoryScreen';
import Tabs from '@/navigation/Tabs';
import { getState } from '@/lib/mock';

type TabKey = 'Home' | 'Tasks' | 'History';

export default function App() {
  const theme = useColorScheme();
  const [didOnboard, setDidOnboard] = useState(false);
  const [paired, setPaired] = useState(!!getState().pair?.userB);
  const [tab, setTab] = useState<TabKey>('Home');

  if (!didOnboard) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <OnboardingScreen onDone={() => setDidOnboard(true)} />
      </SafeAreaView>
    );
  }

  if (!paired) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
        <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
        <PairScreen onPaired={() => setPaired(true)} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme === 'dark' ? '#000' : '#fff' }}>
      <StatusBar barStyle={theme === 'dark' ? 'light-content' : 'dark-content'} />
      <View style={{ flex: 1 }}>
        {tab === 'Home' && <HomeScreen />}
        {tab === 'Tasks' && <TasksScreen />}
        {tab === 'History' && <HistoryScreen />}
      </View>
      <Tabs active={tab} setActive={setTab} />
    </SafeAreaView>
  );
}
