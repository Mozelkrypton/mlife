import { ExperimentalStack } from 'expo-router';

export default function AuthLayout() {
  return <ExperimentalStack screenOptions={{ headerShown: false }} />;
}
