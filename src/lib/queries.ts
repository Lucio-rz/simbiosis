import { supabase } from './supabase';
import { Material, TransportProvider } from './types';

// ─── MATERIALES ───────────────────────────────────────────────

export async function getMaterials(filters?: {
  category?: string;
  search?: string;
}): Promise<Material[]> {
  let query = supabase
    .from('materials')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false });

  if (filters?.category) {
    query = query.eq('category', filters.category);
  }

  if (filters?.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    );
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching materials:', error);
    return [];
  }

  return data as Material[];
}

export async function createMaterial(
  material: Omit<Material, 'id' | 'created_at'>
): Promise<Material | null> {
  const { data, error } = await supabase
    .from('materials')
    .insert([material])
    .select()
    .single();

  if (error) {
    console.error('Error creating material:', error);
    return null;
  }

  return data as Material;
}

// ─── TRANSPORTES ─────────────────────────────────────────────

export async function getTransports(): Promise<TransportProvider[]> {
  const { data, error } = await supabase
    .from('transports')
    .select('*')
    .order('sponsored', { ascending: false })
    .order('rating', { ascending: false });

  if (error) {
    console.error('Error fetching transports:', error);
    return [];
  }

  return data as TransportProvider[];
}

export async function createTransport(
  transport: Omit<TransportProvider, 'id' | 'created_at'>
): Promise<TransportProvider | null> {
  const { data, error } = await supabase
    .from('transports')
    .insert([transport])
    .select()
    .single();

  if (error) {
    console.error('Error creating transport:', error);
    return null;
  }

  return data as TransportProvider;
}
