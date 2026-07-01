import * as ImagePicker from 'expo-image-picker';
import { supabase } from './supabase';

export async function pickAndUploadPhoto(userId: string): Promise<string | null> {
  const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (!permission.granted) return null;

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 0.8,
  });

  if (result.canceled) return null;

  const uri = result.assets[0].uri;
  const ext = uri.split('.').pop();
  const fileName = `${userId}/${Date.now()}.${ext}`;

  const response = await fetch(uri);
  const blob = await response.blob();

  const { error } = await supabase.storage
    .from('mlife-photos')
    .upload(fileName, blob, { contentType: `image/${ext}` });

  if (error) throw error;

  const { data } = supabase.storage.from('mlife-photos').getPublicUrl(fileName);
  return data.publicUrl;
}