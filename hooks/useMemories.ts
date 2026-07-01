import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Memory } from '../types';

export function useMemories(yearId: string) {
  return useQuery({
    queryKey: ['memories', yearId],
    queryFn: async (): Promise<Memory[]> => {
      const { data, error } = await supabase
        .from('memories')
        .select('*')
        .eq('year_id', yearId)
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!yearId,
  });
}

export function useCreateMemory() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Memory>) => {
      const { data, error } = await supabase
        .from('memories')
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['memories', variables.year_id] });
    },
  });
}