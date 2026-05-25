'use client';

import { X, Upload, Truck, Phone, Package, DollarSign, Clock, Loader2, CheckCircle, ImageIcon, Trash2 } from 'lucide-react';
import { useState, useRef } from 'react';
import Image from 'next/image';
import { createTransport } from '@/lib/queries';
import { supabase } from '@/lib/supabase';

interface PublishTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublished?: () => void;
}

const vehicleTypes = ['Camioneta', 'Camión pequeño', 'Camión mediano', 'Camión grande', 'Furgoneta', 'Utilitario'];
const coverageZones = ['Bahía Blanca centro', 'Bahía Blanca y alrededores', 'Punta Alta - Bahía Blanca', 'Regional - Zona Sur', 'Provincial', 'Nacional'];

type Step = 'form' | 'saving' | 'success';

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400';

export default function PublishTransportModal({ isOpen, onClose, onPublished }: PublishTransportModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: '', zone: '', phone: '', email: '',
    vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '',
  });

  if (!isOpen) return null;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('La imagen no puede superar los 5MB.'); return; }
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) { setError('Solo se permiten imágenes JPG, PNG o WEBP.'); return; }
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
    const { error } = await supabase.storage.from('transports').upload(filePath, file, { cacheControl: '3600', upsert: false });
    if (error) { console.error('Error uploading image:', error); return null; }
    setUploadProgress(80);
    const { data } = supabase.storage.from('transports').getPublicUrl(filePath);
    setUploadProgress(100);
    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('saving');
    setUploadProgress(0);

    let imageUrl = DEFAULT_IMAGE;

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

    const result = await createTransport({
      name: formData.name,
      zone: formData.zone,
      phone: formData.phone,
      rating: 5.0,
      sponsored: false,
      image: imageUrl,
    });

    if (!result) {
      setError('Hubo un error al publicar. Intentá de nuevo.');
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
    setFormData({ name: '', zone: '', phone: '', email: '', vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '' });
    onClose();
  };

  const handleSuccessClose = () => { handleClose(); onPublished?.(); };

  // ── Guardando ──
  if (step === 'saving') return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl min-w-64">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
        <p className="text-white font-medium mb-3">
          {uploadProgress < 100 && imageFile ? 'Subiendo imagen...' : 'Publicando servicio...'}
        </p>
        {imageFile && (
          <div className="w-full bg-slate-700 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        )}
      </div>
    </div>
  );

  // ── Éxito ──
  if (step === 'success') return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl max-w-sm w-full">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-blue-400" />
        </div>
        <h3 className="text-white text-xl font-semibold mb-2">¡Servicio publicado!</h3>
        <p className="text-slate-400 mb-6">Ya está visible para compradores y vendedores que necesiten transporte.</p>
        <button onClick={handleSuccessClose} className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Ver transportes
        </button>
      </div>
    </div>
  );

  const priceUnitLabel = { km: 'km', viaje: 'viaje', hora: 'hora', kg: 'kg' }[formData.priceType] || 'km';

  // ── Formulario ──
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <h2 className="font-semibold">Publicar servicio de transporte</h2>
          </div>
          <button onClick={handleClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 text-red-300 text-sm">{error}</div>
          )}

          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-200">Tu servicio será visible para compradores y vendedores que necesiten transportar materiales en la región.</p>
          </div>

          {/* Info básica */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium"><Truck className="w-5 h-5 text-blue-400" />Información básica</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Nombre de la empresa o transportista *</label>
                <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Ej: Transporte Rápido BB" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Zona de cobertura *</label>
                <select required value={formData.zone} onChange={(e) => setFormData({ ...formData, zone: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="">Seleccioná una zona</option>
                  {coverageZones.map((z) => <option key={z} value={z}>{z}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium"><Phone className="w-5 h-5 text-emerald-400" />Contacto</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Teléfono *</label>
                <input type="tel" required value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+54 291 XXX-XXXX" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Email (opcional)</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="contacto@transporte.com" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
            </div>
          </div>

          {/* Servicio */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium"><Package className="w-5 h-5 text-purple-400" />Detalles del servicio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Tipo de vehículo *</label>
                <select required value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="">Seleccioná</option>
                  {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Capacidad de carga *</label>
                <input type="text" required value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="Ej: 1500 kg" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
            </div>
          </div>

          {/* Tarifa */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium"><DollarSign className="w-5 h-5 text-emerald-400" />Tarifa</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Tipo *</label>
                <select required value={formData.priceType} onChange={(e) => setFormData({ ...formData, priceType: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="km">Por km</option>
                  <option value="viaje">Por viaje</option>
                  <option value="hora">Por hora</option>
                  <option value="kg">Por kg</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-white text-sm">Precio *</label>
                <div className="flex gap-2">
                  <span className="px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-white">$</span>
                  <input type="number" required value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="500" className="flex-1 px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
                  <span className="px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-slate-400 whitespace-nowrap">/ {priceUnitLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Disponibilidad */}
          <div>
            <label className="block mb-2 text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />Disponibilidad *
            </label>
            <input type="text" required value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} placeholder="Ej: Lunes a Viernes 8:00 - 18:00" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
          </div>

          {/* Descripción */}
          <div>
            <label className="block mb-2 text-white text-sm">Descripción *</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describí tu servicio, experiencia, áreas de especialización..." rows={3} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-slate-400" />
          </div>

          {/* ── Subida de imagen ── */}
          <div>
            <label className="block mb-2 text-white text-sm">
              Logo o imagen del vehículo <span className="text-slate-400">(opcional)</span>
            </label>

            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border-2 border-blue-500/50 bg-slate-700">
                <div className="relative h-48 w-full">
                  <Image src={imagePreview} alt="Preview" fill className="object-cover" />
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
                  <ImageIcon className="w-4 h-4 text-blue-400" />
                  <span className="text-blue-300">{imageFile?.name}</span>
                </div>
              </div>
            ) : (
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center hover:border-blue-500/60 hover:bg-blue-500/5 transition-all cursor-pointer group"
              >
                <div className="w-14 h-14 bg-slate-700 group-hover:bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors">
                  <Upload className="w-7 h-7 text-slate-400 group-hover:text-blue-400 transition-colors" />
                </div>
                <p className="text-slate-300 group-hover:text-white transition-colors mb-1">
                  Hacé clic para subir logo o foto del vehículo
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

          <div className="flex gap-4 pt-2 border-t border-white/10">
            <button type="button" onClick={handleClose} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">Publicar servicio</button>
          </div>
        </form>
      </div>
    </div>
  );
}
