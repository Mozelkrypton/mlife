import { View, Text, FlatList, Pressable, ActivityIndicator, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { useState, useEffect } from 'react';
import { useMemories } from '../../hooks/useMemories';
import { MemoryThumb } from '../../components/MemoryThumb';
import { ReflectionBlock } from '../../components/ReflectionBlock';
import { CoverPhoto } from '../../components/CoverPhoto';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';
import { pickAndUploadPhoto } from '../../lib/storage';
import { useAuth } from '../../hooks/useAuth';
import { yearStyles as styles } from '../../styles/year';
import { Memory } from '../../types';

export default function YearScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { user } = useAuth();
  const { data: memories, isLoading } = useMemories(id);
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [reflection, setReflection] = useState('');
  const [coverUrl, setCoverUrl] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function loadYear() {
      const { data } = await supabase.from('years').select('*').eq('id', id).single();
      if (data) {
        setTitle(data.title ?? '');
        setReflection(data.reflection ?? '');
        setCoverUrl(data.cover_image_url ?? null);
      }
    }
    loadYear();
  }, [id]);

  async function handleSave() {
    setSaving(true);
    try {
      await supabase.from('years').update({ title, reflection }).eq('id', id);
      setEditing(false);
    } catch {
      Alert.alert('Error', 'Could not save changes.');
    } finally {
      setSaving(false);
    }
  }

  async function handleCoverPhoto() {
    if (!user) return;
    setUploading(true);
    try {
      const url = await pickAndUploadPhoto(user.id);
      if (url) {
        await supabase.from('years').update({ cover_image_url: url }).eq('id', id);
        setCoverUrl(url);
      }
    } catch {
      Alert.alert('Error', 'Could not upload photo.');
    } finally {
      setUploading(false);
    }
  }

  return (
    <View style={styles.container}>
      <CoverPhoto url={coverUrl} onPress={handleCoverPhoto} uploading={uploading} />

      <View style={styles.header}>
        <Pressable onPress={() => router.back()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </Pressable>
        {editing ? (
          <View style={styles.editBlock}>
            <Input label="Chapter title" placeholder="Name this year…" value={title} onChangeText={setTitle} />
            <Input label="Reflection" placeholder="Write your reflection…" value={reflection} onChangeText={setReflection} multiline />
            <Button label="Save" onPress={handleSave} loading={saving} variant="secondary" />
          </View>
        ) : (
          <Pressable onPress={() => setEditing(true)}>
            <Text style={styles.headerTitle}>{title || 'Tap to add a title'}</Text>
            <Text style={styles.headerReflection}>{reflection || 'Tap to write your reflection…'}</Text>
          </Pressable>
        )}
      </View>

      <View style={styles.body}>
        <ReflectionBlock text={reflection} />
        <View style={styles.sectionRow}>
          <Text style={styles.sectionLabel}>Memories</Text>
          <Pressable onPress={() => router.push(`/memory/new?yearId=${id}`)}>
            <Text style={styles.addLink}>+ Add memory</Text>
          </Pressable>
        </View>
        {isLoading ? (
          <ActivityIndicator style={styles.loader} />
        ) : (
          <FlatList
            data={memories}
            keyExtractor={(item: Memory) => item.id}
            renderItem={({ item }) => (
              <MemoryThumb memory={item} onPress={() => router.push(`/memory/${item.id}`)} />
            )}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.emptyText}>No memories yet — add your first one!</Text>}
          />
        )}
      </View>
    </View>
  );
}
