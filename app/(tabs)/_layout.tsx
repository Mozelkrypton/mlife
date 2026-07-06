import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: { backgroundColor: '#fff', borderTopColor: '#eee' },
      tabBarActiveTintColor: '#0a0a0a',
      tabBarInactiveTintColor: '#aaa',
    }}>
      <Tabs.Screen name="index" options={{ title: 'Timeline' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}
