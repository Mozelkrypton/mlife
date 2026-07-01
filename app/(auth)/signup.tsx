import { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { signUp } from '../../lib/auth';

export default function SignupScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignup() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    if (password.length < 6) {
      Alert.alert('Weak password', 'Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await signUp(email, password);
      Alert.alert('Check your email', 'Confirm your email then log in.');
      router.replace('/(auth)/login');
    } catch (err: any) {
      Alert.alert('Sign up failed', err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create account</Text>
      <Text style={styles.subtitle}>Start preserving your story</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#888"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleSignup} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Creating account…' : 'Sign up'}</Text>
      </Pressable>
      <Link href="/(auth)/login" style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', justifyContent: 'center', padding: 24 },
  title: { fontSize: 28, fontWeight: '600', textAlign: 'center', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#888', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#f4f4f2', borderRadius: 12, padding: 14, fontSize: 15, marginBottom: 12 },
  button: { backgroundColor: '#0a0a0a', borderRadius: 12, padding: 15, alignItems: 'center', marginTop: 8 },
  buttonText: { color: '#fff', fontSize: 15, fontWeight: '500' },
  link: { marginTop: 20, alignSelf: 'center' },
  linkText: { color: '#555', fontSize: 13 },
});