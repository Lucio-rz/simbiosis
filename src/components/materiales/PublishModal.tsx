'use client';

import { X, Upload, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { createMaterial } from '@/lib/queries';

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublished?: () => void;
}

const categories = [
  'Madera', 'Plástico', 'Vidrio', 'Metal', 'Textil', 'Papel', 'Cerámico', 'Orgánico', 'Otros',
];

type Step = 'form' | 'saving' | 'success';

export default function PublishModal({ isOpen, onClose, onPublished }: PublishModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: '', category: '', quantity: '', price: '',
    location: '', description: '', seller: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('saving');

    const result = await createMaterial({
      ...formData,
      featured: false,
      image: undefined,
    });

    if (!result) {
      setError('Hubo un error al publicar. Revisá tu conexión e intentá de nuevo.');
      setStep('form');
      return;
    }

    setStep('success');
  };

  const handleClose = () => {
    setStep('form');
    setError(null);
    setFormData({ title: '', category: '', quantity: '', price: '', location: '', description: '', seller: '' });
    onClose();
  };

  const handleSuccessClose = () => {
    handleClose();
    onPublished?.();
  };

  // ── Guardando ──
  if (step === 'saving') return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
        <p className="text-white font-medium">Publicando material...</p>
      </div>
    </div>
  );

  // ── Éxito ──
  if (step === 'success') return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-emerald-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">¡Material publicado!</h3>
        <p className="text-slate-400 mb-6">Ya está visible para compradores en la plataforma.</p>
        <button
          onClick={handleSuccessClose}
          className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
        >
          Ver publicaciones
        </button>
      </div>
    </div>
  );

  // ── Formulario ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold">Publicar material</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block mb-2 text-white text-sm">Título *</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Ej: Pallets de madera en buen estado"
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-white text-sm">Categoría *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
              >
                <option value="">Seleccioná</option>
                {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">Tu nombre o empresa *</label>
              <input
                type="text"
                required
                value={formData.seller}
                onChange={(e) => setFormData({ ...formData, seller: e.target.value })}
                placeholder="Ej: Carpintería García"
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-white text-sm">Cantidad *</label>
              <input
                type="text"
                required
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Ej: 50 kg"
                className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
              />
            </div>
            <div>
              <label className="block mb-2 text-white text-sm">Precio *</label>
              <input
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
            <label className="block mb-2 text-white text-sm">Ubicación *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="Ej: Bahía Blanca"
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm">Descripción *</label>
            <textarea
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describí el material, su estado y cualquier detalle relevante..."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-white placeholder-slate-400"
            />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm">Imágenes (próximamente)</label>
            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-slate-700/30 opacity-50 cursor-not-allowed">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">La carga de imágenes estará disponible pronto</p>
            </div>
          </div>

          <div className="flex gap-4 pt-2">
            <button
              type="button"
              onClick={handleClose}
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
