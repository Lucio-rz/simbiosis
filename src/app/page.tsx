'use client';

import { useState, useEffect, useCallback } from 'react';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import Categories from '@/components/home/Categories';
import MaterialsGrid from '@/components/materiales/MaterialsGrid';
import TransportSection from '@/components/transportes/TransportSection';
import HowItWorks from '@/components/home/HowItWorks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublishModal from '@/components/materiales/PublishModal';
import { getMaterials } from '@/lib/queries';
import { Material } from '@/lib/types';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = useCallback(async () => {
    setLoading(true);
    const data = await getMaterials({
      category: selectedCategory ?? undefined,
      search: searchQuery || undefined,
    });
    setMaterials(data);
    setLoading(false);
  }, [searchQuery, selectedCategory]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchMaterials();
    }, 300); // debounce de 300ms para la búsqueda
    return () => clearTimeout(timeout);
  }, [fetchMaterials]);

  const handleMaterialPublished = () => {
    setIsPublishModalOpen(false);
    fetchMaterials(); // recarga la lista después de publicar
  };

  return (
    <>
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublished={handleMaterialPublished}
      />
      <Navbar onPublish={() => setIsPublishModalOpen(true)} />
      <main>
        <Hero />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <MaterialsGrid materials={materials} loading={loading} />
        <TransportSection />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
