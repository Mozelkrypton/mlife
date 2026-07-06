import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { signIn } from '../../lib/auth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { authStyles as styles } from '../../styles/auth';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleLogin() {
    if (!email || !password) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    setLoading(true);
    try {
      await signIn(email, password);
      router.replace('/(tabs)');
    } catch (err: any) {
      Alert.alert('Login failed', err.message ?? 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mlife</Text>
      <Text style={styles.subtitle}>Your life, chapter by chapter</Text>
      <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Input label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button label="Log in" onPress={handleLogin} loading={loading} />
      <Link href="/(auth)/signup" style={styles.link}>
        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
      </Link>
    </View>
  );
}
