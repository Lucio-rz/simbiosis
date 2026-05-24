'use client';

import { X, Upload, Truck, Phone, Package, DollarSign, Clock } from 'lucide-react';
import { useState } from 'react';

interface PublishTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const vehicleTypes = ['Camioneta', 'Camión pequeño', 'Camión mediano', 'Camión grande', 'Furgoneta', 'Utilitario'];
const coverageZones = ['Bahía Blanca centro', 'Bahía Blanca y alrededores', 'Punta Alta - Bahía Blanca', 'Regional - Zona Sur', 'Provincial', 'Nacional'];

export default function PublishTransportModal({ isOpen, onClose }: PublishTransportModalProps) {
  const [formData, setFormData] = useState({
    companyName: '', zone: '', phone: '', email: '',
    vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Servicio de transporte publicado exitosamente! (Demo)');
    onClose();
    setFormData({ companyName: '', zone: '', phone: '', email: '', vehicleType: '', capacity: '', priceType: 'km', price: '', availability: '', description: '' });
  };

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
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
            <p className="text-sm text-blue-200">
              <strong>Importante:</strong> Tu servicio será visible para compradores y vendedores que necesiten transportar materiales en la región.
            </p>
          </div>

          {/* Basic info */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <Truck className="w-5 h-5 text-blue-400" />Información básica
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Nombre de la empresa o transportista *</label>
                <input type="text" required value={formData.companyName} onChange={(e) => setFormData({ ...formData, companyName: e.target.value })} placeholder="Ej: Transporte Rápido BB" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
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

          {/* Contact */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <Phone className="w-5 h-5 text-emerald-400" />Información de contacto
            </h3>
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

          {/* Service details */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <Package className="w-5 h-5 text-purple-400" />Detalles del servicio
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Tipo de vehículo *</label>
                <select required value={formData.vehicleType} onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="">Seleccioná un tipo</option>
                  {vehicleTypes.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Capacidad de carga *</label>
                <input type="text" required value={formData.capacity} onChange={(e) => setFormData({ ...formData, capacity: e.target.value })} placeholder="Ej: 1500 kg" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <DollarSign className="w-5 h-5 text-emerald-400" />Tarifa
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Tipo de tarifa *</label>
                <select required value={formData.priceType} onChange={(e) => setFormData({ ...formData, priceType: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white">
                  <option value="km">Por kilómetro</option>
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

          {/* Availability */}
          <div>
            <label className="block mb-2 text-white text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-orange-400" />Disponibilidad *
            </label>
            <input type="text" required value={formData.availability} onChange={(e) => setFormData({ ...formData, availability: e.target.value })} placeholder="Ej: Lunes a Viernes 8:00 - 18:00" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 text-white text-sm">Descripción del servicio *</label>
            <textarea required value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describí tu servicio, experiencia, áreas de especialización, etc." rows={4} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-slate-400" />
          </div>

          {/* Image upload */}
          <div>
            <label className="block mb-2 text-white text-sm">Logo o imagen (opcional)</label>
            <div className="border-2 border-dashed border-white/20 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer bg-slate-700/50">
              <Upload className="w-12 h-12 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-400 mb-1">Arrastrá una imagen aquí o hacé clic</p>
              <p className="text-sm text-slate-500">PNG o JPG, máximo 2MB</p>
            </div>
          </div>

          {/* Advertising upsell */}
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <h4 className="text-white mb-2 font-medium">💡 Destacá tu servicio</h4>
            <p className="text-sm text-slate-300 mb-2">¿Querés que tu servicio aparezca destacado con el badge &quot;Publicidad&quot;?</p>
            <button type="button" className="text-sm text-emerald-400 hover:text-emerald-300 underline font-semibold">
              Conocer planes de publicidad
            </button>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg">Publicar servicio</button>
          </div>
        </form>
      </div>
    </div>
  );
}
