import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { Year } from '../types';

export function useYears() {
  return useQuery({
    queryKey: ['years'],
    queryFn: async (): Promise<Year[]> => {
      const { data, error } = await supabase
        .from('years')
        .select('*')
        .order('year', { ascending: false });
      if (error) throw error;
      return data;
    },
  });
}

export function useCreateYear() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (payload: Partial<Year>) => {
      const { data, error } = await supabase
        .from('years')
        .insert(payload)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['years'] }),
  });
}