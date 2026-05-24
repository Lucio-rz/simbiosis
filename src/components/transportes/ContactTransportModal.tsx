'use client';

import Image from 'next/image';
import { X, Truck, User, Phone, MapPin, Package, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { TransportProvider } from '@/lib/types';

interface ContactTransportModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: TransportProvider | null;
}

export default function ContactTransportModal({ isOpen, onClose, provider }: ContactTransportModalProps) {
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '',
    pickupLocation: '', deliveryLocation: '',
    materialType: '', weight: '', preferredDate: '', message: '',
  });

  if (!isOpen || !provider) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Solicitud enviada a ${provider.name}! Te contactarán pronto. (Demo)`);
    onClose();
    setFormData({ name: '', phone: '', email: '', pickupLocation: '', deliveryLocation: '', materialType: '', weight: '', preferredDate: '', message: '' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-4 flex items-center justify-between z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-semibold">Contactar transportista</h2>
              <p className="text-sm text-blue-100">{provider.name}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Transportista info */}
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-start gap-4">
            <div className="w-16 h-16 bg-slate-700 rounded-xl overflow-hidden flex-shrink-0 relative">
              <Image src={provider.image} alt={provider.name} fill className="object-cover" />
            </div>
            <div>
              <h3 className="text-white font-semibold mb-2">{provider.name}</h3>
              <div className="space-y-1 text-sm text-slate-400">
                <div className="flex items-center gap-2"><MapPin className="w-4 h-4" />{provider.zone}</div>
                <div className="flex items-center gap-2"><Phone className="w-4 h-4" />{provider.phone}</div>
              </div>
            </div>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <User className="w-5 h-5 text-emerald-400" />Tus datos de contacto
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { id: 'name', label: 'Nombre completo *', placeholder: 'Juan Pérez', type: 'text', required: true, key: 'name' as const },
                { id: 'phone', label: 'Teléfono *', placeholder: '+54 291 XXX-XXXX', type: 'tel', required: true, key: 'phone' as const },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block mb-2 text-white text-sm">{field.label}</label>
                  <input
                    type={field.type}
                    required={field.required}
                    value={formData[field.key]}
                    onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block mb-2 text-white text-sm">Email (opcional)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="juan@ejemplo.com"
                  className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Transfer details */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <MapPin className="w-5 h-5 text-purple-400" />Detalles del traslado
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Punto de recogida *</label>
                <input type="text" required value={formData.pickupLocation} onChange={(e) => setFormData({ ...formData, pickupLocation: e.target.value })} placeholder="Ej: Calle Principal 123, Bahía Blanca" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Punto de entrega *</label>
                <input type="text" required value={formData.deliveryLocation} onChange={(e) => setFormData({ ...formData, deliveryLocation: e.target.value })} placeholder="Ej: Av. Colón 456, Punta Alta" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
            </div>
          </div>

          {/* Cargo info */}
          <div>
            <h3 className="text-white mb-4 flex items-center gap-2 font-medium">
              <Package className="w-5 h-5 text-orange-400" />Información de la carga
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block mb-2 text-white text-sm">Tipo de material *</label>
                <input type="text" required value={formData.materialType} onChange={(e) => setFormData({ ...formData, materialType: e.target.value })} placeholder="Ej: Pallets de madera" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
              <div>
                <label className="block mb-2 text-white text-sm">Peso/Volumen aproximado *</label>
                <input type="text" required value={formData.weight} onChange={(e) => setFormData({ ...formData, weight: e.target.value })} placeholder="Ej: 500 kg" className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-slate-400" />
              </div>
              <div className="md:col-span-2">
                <label className="block mb-2 text-white text-sm">Fecha preferida *</label>
                <input type="date" required value={formData.preferredDate} onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })} className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-2 text-white text-sm flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-blue-400" />Mensaje adicional (opcional)
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Detalles adicionales sobre el traslado, horarios preferidos, instrucciones especiales, etc."
              rows={4}
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-white placeholder-slate-400"
            />
          </div>

          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4">
            <h4 className="text-white mb-2 font-medium">ℹ️ Información importante</h4>
            <ul className="space-y-1 text-sm text-slate-300">
              <li>• El transportista se pondrá en contacto con vos en breve</li>
              <li>• Coordinarán directamente el precio y condiciones del servicio</li>
              <li>• Asegurate de que el material esté listo en la fecha indicada</li>
            </ul>
          </div>

          <div className="flex gap-4 pt-4 border-t border-white/10">
            <button type="button" onClick={onClose} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />Enviar solicitud
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
