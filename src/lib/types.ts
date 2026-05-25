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
  created_at?: string;
}
