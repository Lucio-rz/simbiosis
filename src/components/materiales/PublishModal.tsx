'use client';

import { X, Upload, Loader2, CheckCircle, ImageIcon, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { createMaterial } from '@/lib/queries';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';

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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { user } = useAuth();

  const [formData, setFormData] = useState({
    title: '', category: '', quantity: '', price: '',
    location: '', description: '', seller: '',
  });

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validaciones
    if (file.size > 5 * 1024 * 1024) {
      setError('La imagen no puede superar los 5MB.');
      return;
    }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      setError('Solo se permiten imágenes JPG, PNG o WEBP.');
      return;
    }

    setError(null);
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const ext = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    const filePath = `public/${fileName}`;

    setUploadProgress(30);

    const { error } = await supabase.storage
      .from('materials')
      .upload(filePath, file, { cacheControl: '3600', upsert: false });

    if (error) {
      console.error('Error uploading image:', error);
      return null;
    }

    setUploadProgress(80);

    const { data } = supabase.storage
      .from('materials')
      .getPublicUrl(filePath);

    setUploadProgress(100);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('saving');
    setUploadProgress(0);

    let imageUrl: string | undefined = undefined;

    if (imageFile) {
      setUploadProgress(10);
      const url = await uploadImage(imageFile);
      if (!url) {
        setError('Error al subir la imagen. Intentá de nuevo.');
        setStep('form');
        return;
      }
      imageUrl = url;
    }

    if (!user) {
      setError('Debés iniciar sesión para publicar.');
      setStep('form');
      return;
    }

    const result = await createMaterial({
      ...formData,
      featured: false,
      image: imageUrl,
    }, user.id);

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
    setImageFile(null);
    setImagePreview(null);
    setUploadProgress(0);
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
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl min-w-64">
        <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-emerald-400 animate-spin" />
        </div>
        <p className="text-white font-medium mb-3">
          {uploadProgress < 100 && imageFile ? 'Subiendo imagen...' : 'Publicando material...'}
        </p>
        {imageFile && (
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        )}
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

          {/* ── Subida de imagen ── */}
          <div>
            <label className="block mb-2 text-white text-sm">
              Imagen del material <span className="text-slate-400">(opcional)</span>
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-emerald-500/50 bg-slate-700">
                <div className="relative h-52 w-full">
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-3 right-3 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors shadow-lg"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white text-sm">
                  <ImageIcon className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300">{imageFile?.name}</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-emerald-500/60 hover:bg-emerald-500/5 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-slate-700 group-hover:bg-emerald-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-7 h-7 text-slate-400 group-hover:text-emerald-400 transition-colors" />
                </div>
                <p className="text-slate-300 group-hover:text-white transition-colors mb-1">
                  Hacé clic para subir una imagen
                </p>
                <p className="text-slate-500 text-sm">JPG, PNG o WEBP · Máximo 5MB</p>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />
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
