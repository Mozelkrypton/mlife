import { useState } from 'react';
import { View, Text, Pressable, Alert, ScrollView } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useCreateMemory } from '../../hooks/useMemories';
import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { newMemoryStyles as styles } from '../../styles/newMemory';

export default function NewMemoryScreen() {
  const { yearId } = useLocalSearchParams<{ yearId: string }>();
  const { user } = useAuth();
  const createMemory = useCreateMemory();
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    if (!title.trim()) {
      Alert.alert('Title required', 'Give this memory a name.');
      return;
    }
    setLoading(true);
    try {
      await createMemory.mutateAsync({
        user_id: user?.id,
        year_id: yearId,
        title: title.trim(),
        note: note.trim() || null,
        location: location.trim() || null,
        photo_url: null,
        memory_date: new Date().toISOString().split('T')[0],
      });
      router.back();
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not save memory.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        <Text style={styles.headerTitle}>New memory</Text>
      </View>
      <Input label="Title" placeholder="Give this memory a name…" value={title} onChangeText={setTitle} />
      <Input label="Note" placeholder="What do you want to remember about this moment?" value={note} onChangeText={setNote} multiline />
      <Input label="Location" placeholder="Where were you?" value={location} onChangeText={setLocation} />
      <Button label="Save memory" onPress={handleSave} loading={loading} />
    </ScrollView>
  );
}
