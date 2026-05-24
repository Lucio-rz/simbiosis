'use client';

import { Trees, Boxes, Wine, Wrench, Shirt, Layers, Container, Leaf, MoreHorizontal } from 'lucide-react';

const categories = [
  { id: 'Madera', name: 'Madera', icon: Trees, color: 'from-amber-500/20 to-amber-600/10 border-amber-500/30 text-amber-400 hover:border-amber-500/50' },
  { id: 'Plástico', name: 'Plástico', icon: Boxes, color: 'from-blue-500/20 to-blue-600/10 border-blue-500/30 text-blue-400 hover:border-blue-500/50' },
  { id: 'Vidrio', name: 'Vidrio', icon: Wine, color: 'from-cyan-500/20 to-cyan-600/10 border-cyan-500/30 text-cyan-400 hover:border-cyan-500/50' },
  { id: 'Metal', name: 'Metal', icon: Wrench, color: 'from-gray-500/20 to-gray-600/10 border-gray-500/30 text-gray-400 hover:border-gray-500/50' },
  { id: 'Textil', name: 'Textil', icon: Shirt, color: 'from-purple-500/20 to-purple-600/10 border-purple-500/30 text-purple-400 hover:border-purple-500/50' },
  { id: 'Papel', name: 'Papel', icon: Layers, color: 'from-orange-500/20 to-orange-600/10 border-orange-500/30 text-orange-400 hover:border-orange-500/50' },
  { id: 'Cerámico', name: 'Cerámico', icon: Container, color: 'from-red-500/20 to-red-600/10 border-red-500/30 text-red-400 hover:border-red-500/50' },
  { id: 'Orgánico', name: 'Orgánico', icon: Leaf, color: 'from-green-500/20 to-green-600/10 border-green-500/30 text-green-400 hover:border-green-500/50' },
  { id: 'Otros', name: 'Otros', icon: MoreHorizontal, color: 'from-slate-500/20 to-slate-600/10 border-slate-500/30 text-slate-400 hover:border-slate-500/50' },
];

interface CategoriesProps {
  selectedCategory: string | null;
  onSelectCategory: (category: string | null) => void;
}

export default function Categories({ selectedCategory, onSelectCategory }: CategoriesProps) {
  return (
    <section className="bg-slate-900 py-12 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-white mb-8 text-center text-2xl font-semibold">Categorías de materiales</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {categories.map((category) => {
            const Icon = category.icon;
            const isSelected = selectedCategory === category.id;

            return (
              <button
                key={category.id}
                onClick={() => onSelectCategory(isSelected ? null : category.id)}
                className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all backdrop-blur-sm ${
                  isSelected
                    ? 'border-emerald-500 bg-emerald-500/20 shadow-lg shadow-emerald-500/30 scale-105'
                    : `bg-gradient-to-br ${category.color} border hover:shadow-lg hover:scale-105`
                }`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm font-medium text-white">{category.name}</span>
              </button>
            );
          })}
        </div>

        {selectedCategory && (
          <div className="text-center mt-6">
            <button
              onClick={() => onSelectCategory(null)}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              × Limpiar filtro
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
