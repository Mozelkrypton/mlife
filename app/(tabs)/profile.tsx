import { View, Text, Pressable, ScrollView, Alert, TextInput } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { signOut } from '../../lib/auth';
import { useAuth } from '../../hooks/useAuth';
import { useYears } from '../../hooks/useYears';
import { useProfile, useUpdateProfile } from '../../hooks/useProfile';
import { pickAndUploadPhoto } from '../../lib/storage';
import { profileStyles as styles } from '../../styles/profile';

export default function ProfileScreen() {
  const { user } = useAuth();
  const { data: years } = useYears();
  const { data: profile, isLoading } = useProfile(user?.id);
  const updateProfile = useUpdateProfile();

  const [editing, setEditing] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bio, setBio] = useState('');
  const [location, setLocation] = useState('');
  const [saving, setSaving] = useState(false);

  const initials = profile?.full_name
    ? profile.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : user?.email?.slice(0, 2).toUpperCase() ?? 'ML';

  function startEditing() {
    setFullName(profile?.full_name ?? '');
    setBio(profile?.bio ?? '');
    setLocation(profile?.location ?? '');
    setEditing(true);
  }

  async function handleSave() {
    if (!user) return;
    setSaving(true);
    try {
      await updateProfile.mutateAsync({
        id: user.id,
        full_name: fullName.trim() || null,
        bio: bio.trim() || null,
        location: location.trim() || null,
      });
      setEditing(false);
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  }

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
        <View style={styles.avatarWrapper}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initials}</Text>
          </View>
        </View>

        {editing ? (
          <TextInput
            style={styles.editNameInput}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Your name"
            placeholderTextColor="rgba(255,255,255,0.3)"
          />
        ) : (
          <Text style={styles.name}>
            {profile?.full_name || 'Your name'}
          </Text>
        )}
        <Text style={styles.email}>{user?.email}</Text>
      </View>

      <View style={styles.body}>
        <Text style={styles.sectionLabel}>Your story</Text>
        <View style={styles.statRow}>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>{years?.length ?? 0}</Text>
            <Text style={styles.statLabel}>Years</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNum}>
              {user?.created_at
                ? new Date(user.created_at).getFullYear()
                : '—'}
            </Text>
            <Text style={styles.statLabel}>Member since</Text>
          </View>
        </View>

        {editing ? (
          <>
            <Text style={styles.sectionLabel}>Edit profile</Text>
            <View style={styles.editSection}>
              <View style={styles.editRow}>
                <Text style={styles.editLabel}>Bio</Text>
                <TextInput
                  style={styles.editInputMulti}
                  value={bio}
                  onChangeText={setBio}
                  placeholder="A little about yourself…"
                  placeholderTextColor="#aaa"
                  multiline
                />
              </View>
              <View style={styles.editRowLast}>
                <Text style={styles.editLabel}>Location</Text>
                <TextInput
                  style={styles.editInput}
                  value={location}
                  onChangeText={setLocation}
                  placeholder="Where are you based?"
                  placeholderTextColor="#aaa"
                />
              </View>
            </View>

            <View style={styles.actions}>
              <Pressable
                style={styles.cancelBtn}
                onPress={() => setEditing(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.saveBtn}
                onPress={handleSave}
                disabled={saving}
              >
                <Text style={styles.saveBtnText}>
                  {saving ? 'Saving…' : 'Save profile'}
                </Text>
              </Pressable>
            </View>
          </>
        ) : (
          <>
            <Text style={styles.sectionLabel}>About</Text>
            <Pressable style={styles.row} onPress={startEditing}>
              <Text style={styles.rowLabel}>Bio</Text>
              <Text style={profile?.bio ? styles.rowValue : styles.rowValueEmpty}>
                {profile?.bio || 'Add a bio'}
              </Text>
            </Pressable>
            <Pressable style={styles.row} onPress={startEditing}>
              <Text style={styles.rowLabel}>Location</Text>
              <Text style={profile?.location ? styles.rowValue : styles.rowValueEmpty}>
                {profile?.location || 'Add location'}
              </Text>
            </Pressable>

            <Text style={styles.sectionLabel}>Account</Text>
            <Pressable style={styles.row} onPress={startEditing}>
              <Text style={styles.rowLabel}>Edit profile</Text>
              <Text style={styles.rowValue}>→</Text>
            </Pressable>

            <Pressable style={styles.signOutBtn} onPress={handleSignOut}>
              <Text style={styles.signOutText}>Sign out</Text>
            </Pressable>
          </>
        )}
      </View>
    </ScrollView>
  );
}
