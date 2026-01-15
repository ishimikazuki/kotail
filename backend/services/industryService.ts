import { supabase } from '@backend/lib/supabase';
import { Industry } from '@backend/types/company';

export async function getAllIndustries(): Promise<Industry[]> {
  const { data, error } = await supabase
    .from('industries')
    .select('id, name')
    .order('name', { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data as Industry[];
}
