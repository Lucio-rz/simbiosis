export interface Material {
  id: number;
  title: string;
  category: string;
  quantity: string;
  price: string;
  location: string;
  seller: string;
  description: string;
  image?: string;
  featured?: boolean;
}

export interface TransportProvider {
  id: number;
  name: string;
  zone: string;
  phone: string;
  rating: number;
  sponsored: boolean;
  image: string;
}
