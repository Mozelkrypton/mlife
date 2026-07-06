import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { Link, router } from 'expo-router';
import { signUp } from '../../lib/auth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { authStyles as styles } from '../../styles/auth';

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
      <Input label="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} autoCapitalize="none" keyboardType="email-address" />
      <Input label="Password" placeholder="Min. 6 characters" value={password} onChangeText={setPassword} secureTextEntry />
      <Button label="Sign up" onPress={handleSignup} loading={loading} />
      <Link href="/(auth)/login" style={styles.link}>
        <Text style={styles.linkText}>Already have an account? Log in</Text>
      </Link>
    </View>
  );
}
