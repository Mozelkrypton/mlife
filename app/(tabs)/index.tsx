import { View, Text, FlatList, Pressable, ActivityIndicator, Modal, TextInput, Alert } from 'react-native';
import { router } from 'expo-router';
import { useState } from 'react';
import { useYears, useCreateYear } from '../../hooks/useYears';
import { useAuth } from '../../hooks/useAuth';
import { YearCard } from '../../components/YearCard';
import { timelineStyles as styles } from '../../styles/timeline';
import { Year } from '../../types';

export default function TimelineScreen() {
  const { user } = useAuth();
  const { data: years, isLoading } = useYears();
  const createYear = useCreateYear();
  const [modalVisible, setModalVisible] = useState(false);
  const [yearInput, setYearInput] = useState(new Date().getFullYear().toString());
  const [creating, setCreating] = useState(false);

  async function handleAddYear() {
    const yearNum = parseInt(yearInput);
    if (isNaN(yearNum) || yearNum < 1900 || yearNum > 2100) {
      Alert.alert('Invalid year', 'Please enter a valid year between 1900 and 2100.');
      return;
    }
    const existing = years?.find(y => y.year === yearNum);
    if (existing) {
      setModalVisible(false);
      router.push(`/year/${existing.id}`);
      return;
    }
    setCreating(true);
    try {
      const newYear = await createYear.mutateAsync({
        user_id: user?.id,
        year: yearNum,
        title: null,
        reflection: null,
        cover_image_url: null,
      });
      setModalVisible(false);
      router.push(`/year/${newYear.id}`);
    } catch (err: any) {
      Alert.alert('Error', err.message ?? 'Could not create year.');
    } finally {
      setCreating(false);
    }
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mlife</Text>
        <Text style={styles.headerSub}>Your life, chapter by chapter</Text>
      </View>

      <FlatList
        data={years}
        keyExtractor={(item: Year) => item.id}
        renderItem={({ item }) => (
          <YearCard year={item} onPress={() => router.push(`/year/${item.id}`)} />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>No years yet</Text>
            <Text style={styles.emptySub}>Tap the button below to start your first chapter</Text>
          </View>
        }
      />

      <Pressable style={styles.fab} onPress={() => setModalVisible(true)}>
        <Text style={styles.fabText}>+ Add year</Text>
      </Pressable>

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Add a year</Text>
            <Text style={styles.modalSub}>Enter any year from your life</Text>
            <TextInput
              style={styles.modalInput}
              value={yearInput}
              onChangeText={setYearInput}
              keyboardType="number-pad"
              maxLength={4}
              placeholder="e.g. 2019"
              placeholderTextColor="#aaa"
              autoFocus
            />
            <View style={styles.modalActions}>
              <Pressable
                style={styles.modalCancel}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalCancelText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={styles.modalConfirm}
                onPress={handleAddYear}
                disabled={creating}
              >
                <Text style={styles.modalConfirmText}>
                  {creating ? 'Adding…' : 'Add'}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
