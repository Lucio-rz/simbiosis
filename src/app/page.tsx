'use client';

import { useState, useMemo } from 'react';
import Hero from '@/components/home/Hero';
import SearchBar from '@/components/home/SearchBar';
import Categories from '@/components/home/Categories';
import MaterialsGrid from '@/components/materiales/MaterialsGrid';
import TransportSection from '@/components/transportes/TransportSection';
import HowItWorks from '@/components/home/HowItWorks';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PublishModal from '@/components/materiales/PublishModal';
import { mockMaterials } from '@/data/materials';

export default function HomePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);

  const filteredMaterials = useMemo(() => {
    return mockMaterials.filter((m) => {
      const matchesSearch =
        !searchQuery ||
        m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = !selectedCategory || m.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <>
      <PublishModal isOpen={isPublishModalOpen} onClose={() => setIsPublishModalOpen(false)} />
      <Navbar onPublish={() => setIsPublishModalOpen(true)} />
      <main>
        <Hero />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <Categories selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
        <MaterialsGrid materials={filteredMaterials} />
        <TransportSection />
        <HowItWorks />
      </main>
      <Footer />
    </>
  );
}
