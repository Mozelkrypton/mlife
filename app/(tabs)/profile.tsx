import { View, Text, Pressable, ScrollView, Alert } from 'react-native';
import { router } from 'expo-router';
import { signOut } from '../../lib/auth';
import { useAuth } from '../../hooks/useAuth';
import { useYears } from '../../hooks/useYears';
import { Button } from '../../components/Button';
import { profileStyles as styles } from '../../styles/profile';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { data: years } = useYears();

  const initials = user?.email?.slice(0, 2).toUpperCase() ?? 'ML';

  async function handleSignOut() {
    Alert.alert('Sign out', 'Are you sure you want to sign out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Sign out',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/(auth)/login');
        },
      },
    ]);
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionLabel}>Your story</Text>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Years documented</Text>
          <Text style={styles.rowValue}>{years?.length ?? 0}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>Member since</Text>
          <Text style={styles.rowValue}>
            {user?.created_at
              ? new Date(user.created_at).getFullYear().toString()
              : '—'}
          </Text>
        </View>

        <Text style={styles.sectionLabel}>Account</Text>
        <Button label="Sign out" onPress={handleSignOut} variant="secondary" />
      </View>
    </ScrollView>
  );
}
