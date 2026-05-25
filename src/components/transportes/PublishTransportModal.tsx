'use client';

import { X, Upload, Truck, Phone, Package, DollarSign, Clock, Loader2, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { createTransport } from '@/lib/queries';

interface PublishTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPublished?: () => void;
}

const vehicleTypes = ['Camioneta', 'Camión pequeño', 'Camión mediano', 'Camión grande', 'Furgoneta', 'Utilitario'];
const coverageZones = ['Bahía Blanca centro', 'Bahía Blanca y alrededores', 'Punta Alta - Bahía Blanca', 'Regional - Zona Sur', 'Provincial', 'Nacional'];

type Step = 'form' | 'saving' | 'success';

export default function PublishTransportModal({ isOpen, onClose, onPublished }: PublishTransportModalProps) {
  const [step, setStep] = useState<Step>('form');
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '', zone: '', phone: '', email: '',
    vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setStep('saving');

    const result = await createTransport({
      name: formData.name,
      zone: formData.zone,
      phone: formData.phone,
      rating: 5.0,
      sponsored: false,
      image: 'https://images.unsplash.com/photo-1616432043562-3671ea2e5242?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=400',
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
    setFormData({ name: '', zone: '', phone: '', email: '', vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '' });
    onClose();
  };

  const handleSuccessClose = () => {
    handleClose();
    onPublished?.();
  };

  if (step === 'saving') return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-12 text-center shadow-2xl">
        <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
        </div>
        <p className="text-white font-medium">Publicando servicio...</p>
      </div>
    </div>
  );

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

          <div>
            <label className="block mb-2 text-white text-sm flex items-center gap-2"><Clock className="w-4 h-4 text-orange-400" />Disponibilidad *</label>
            <input type="text" required value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} placeholder="Ej: Lunes a Viernes 8:00 - 18:00" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm">Descripción *</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describí tu servicio, experiencia, áreas de especialización..." rows={3} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-slate-400" />
          </div>

          <div>
            <label className="block mb-2 text-white text-sm">Logo o imagen (próximamente)</label>
            <div className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center bg-slate-700/30 opacity-50 cursor-not-allowed">
              <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-slate-400 text-sm">La carga de imágenes estará disponible pronto</p>
            </div>
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
