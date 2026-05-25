import { TransportProvider } from '@/lib/types';

export const mockTransports: TransportProvider[] = [
  {
    id: "1",
    name: "Transporte Rápido BB",
    zone: "Bahía Blanca y alrededores",
    phone: "+54 291 XXX-XXXX",
    rating: 4.8,
    sponsored: true,
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "2",
    name: "Logística del Sur",
    zone: "Regional - Zona Sur",
    phone: "+54 291 XXX-XXXX",
    rating: 4.6,
    sponsored: true,
    image: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "3",
    name: "Fleteros Independientes",
    zone: "Bahía Blanca centro",
    phone: "+54 291 XXX-XXXX",
    rating: 4.5,
    sponsored: false,
    image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
  {
    id: "4",
    name: "Transporte Hormiga",
    zone: "Punta Alta - Bahía Blanca",
    phone: "+54 291 XXX-XXXX",
    rating: 4.7,
    sponsored: true,
    image: "https://images.unsplash.com/photo-1695222833131-54ee679ae8e5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400",
  },
];
