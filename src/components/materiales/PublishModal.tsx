'use client';

import { X, Upload } from 'lucide-react';
import { useState } from 'react';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const categories = [
  'Madera', 'Plástico', 'Vidrio', 'Metal', 'Textil', 'Papel', 'Cerámico', 'Orgánico', 'Otros',
];

export default function PublishModal({ isOpen, onClose }: PublishModalProps) {
  const [formData, setFormData] = useState({
    title: '', category: '', quantity: '', price: '', location: '', description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Material publicado exitosamente! (Demo)');
    onClose();
    setFormData({ title: '', category: '', quantity: '', price: '', location: '', description: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold">Publicar material</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <p className="text-sm text-emerald-300">
              <strong>Publicar material para vender:</strong> Completá el formulario con la información de tu material disponible.
            </p>
          </div>

          <div>
            <label htmlFor="title" className="block mb-2 text-white text-sm">Título *</label>
            <input
              id="title"
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Pallets de madera en buen estado"
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label htmlFor="category" className="block mb-2 text-white text-sm">Categoría *</label>
            <select
              id="category"
              required
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
            >
              <option value="">Seleccioná una categoría</option>
              {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="quantity" className="block mb-2 text-white text-sm">Cantidad *</label>
              <input
                id="quantity"
                type="text"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Ej: 50 kg"
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label htmlFor="price" className="block mb-2 text-white text-sm">Precio *</label>
              <input
                id="price"
                type="text"
                required
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                placeholder="Ej: $500/kg"
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="location" className="block mb-2 text-white text-sm">Ubicación *</label>
            <input
              id="location"
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ej: Bahía Blanca"
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block mb-2 text-white text-sm">Descripción *</label>
            <textarea
              id="description"
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describí el material, su estado y cualquier detalle relevante..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm">Imágenes (opcional)</label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-emerald-500 transition-colors cursor-pointer">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-400 mb-1">Arrastrá imágenes aquí o hacé clic para seleccionar</p>
              <p className="text-sm text-slate-500">Máximo 5 imágenes, 5MB cada una</p>
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Publicar material
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
