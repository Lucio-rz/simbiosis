'use client';

import { Material } from '@/lib/types';
import MaterialCard from './MaterialCard';
import MaterialDetailModal from './MaterialDetailModal';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { deleteMaterial } from '@/lib/queries';

interface MaterialsGridProps {
  materials: Material[];
  loading?: boolean;
  onRefresh?: () => void;
}

export default function MaterialsGrid({ materials, loading, onRefresh }: MaterialsGridProps) {
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const handleDelete = async (id: string) => {
    const ok = await deleteMaterial(id);
    if (ok) onRefresh?.();
  };

  return (
    <>
      <MaterialDetailModal
        material={selectedMaterial}
        isOpen={!!selectedMaterial}
        onClose={() => setSelectedMaterial(null)}
      />

      <section id="materiales" className="bg-slate-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-white text-2xl font-semibold">Materiales disponibles</h2>
              {!loading && (
                <p className="text-slate-400 text-sm mt-1">{materials.length} publicaciones encontradas</p>
              )}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <Loader2 className="w-10 h-10 text-emerald-500 animate-spin" />
              <p className="text-slate-400">Cargando materiales...</p>
            </div>
          ) : materials.length === 0 ? (
            <div className="text-center py-24">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-white text-xl mb-2">No se encontraron materiales</h3>
              <p className="text-slate-400">Probá con otros términos de búsqueda o categorías.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {materials.map((material) => (
                <MaterialCard
                  key={material.id}
                  material={material}
                  onClick={() => setSelectedMaterial(material)}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
