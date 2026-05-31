import { supabase } from './supabase';
import { Material, TransportProvider } from './types';

const ADMIN_EMAIL = 'admin@simbiosis.com'; // ← cambiá por tu email de admin

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

  if (filters?.category) query = query.eq('category', filters.category);
  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) { console.error('Error fetching materials:', error); return []; }
  return data as Material[];
}

export async function createMaterial(
  material: Omit<Material, 'id' | 'created_at'>,
  userId: string
): Promise<Material | null> {
  const { data, error } = await supabase
    .from('materials')
    .insert([{ ...material, user_id: userId }])
    .select()
    .single();

  if (error) { console.error('Error creating material:', error); return null; }
  return data as Material;
}

export async function deleteMaterial(id: string): Promise<boolean> {
  const { error } = await supabase.from('materials').delete().eq('id', id);
  if (error) { console.error('Error deleting material:', error); return false; }
  return true;
}

// ─── TRANSPORTES ─────────────────────────────────────────────

export async function getTransports(): Promise<TransportProvider[]> {
  const { data, error } = await supabase
    .from('transports')
    .select('*')
    .order('sponsored', { ascending: false })
    .order('rating', { ascending: false });

  if (error) { console.error('Error fetching transports:', error); return []; }
  return data as TransportProvider[];
}

export async function createTransport(
  transport: Omit<TransportProvider, 'id' | 'created_at'>,
  userId: string
): Promise<TransportProvider | null> {
  const { data, error } = await supabase
    .from('transports')
    .insert([{ ...transport, user_id: userId }])
    .select()
    .single();

  if (error) { console.error('Error creating transport:', error); return null; }
  return data as TransportProvider;
}

export async function deleteTransport(id: string): Promise<boolean> {
  const { error } = await supabase.from('transports').delete().eq('id', id);
  if (error) { console.error('Error deleting transport:', error); return false; }
  return true;
}

// ─── HELPERS ─────────────────────────────────────────────────

export function isAdmin(email?: string | null): boolean {
  return email === ADMIN_EMAIL;
}
