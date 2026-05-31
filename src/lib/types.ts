export interface Material {
  id: string;
  title: string;
  category: string;
  quantity: string;
  price: string;
  location: string;
  seller: string;
  description: string;
  image?: string;
  featured?: boolean;
  user_id?: string;
  created_at?: string;
}

export interface TransportProvider {
  id: string;
  name: string;
  zone: string;
  phone: string;
  rating: number;
  sponsored: boolean;
  image: string;
  user_id?: string;
  created_at?: string;
}
