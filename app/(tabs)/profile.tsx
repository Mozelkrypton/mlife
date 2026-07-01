import { View, Text, Pressable, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { signOut } from '../../lib/auth';

export default function ProfileScreen() {
  async function handleSignOut() {
    await signOut();
    router.replace('/(auth)/login');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <Pressable style={styles.button} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign out</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '600', marginBottom: 40 },
  button: { backgroundColor: '#0a0a0a', borderRadius: 12, padding: 15, width: '100%', alignItems: 'center' },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '500' },
});
