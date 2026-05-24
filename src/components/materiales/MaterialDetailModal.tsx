'use client';

import Image from 'next/image';
import {
  X, MapPin, User, Package, DollarSign, MessageCircle,
  Star, Check, Loader2, AlertCircle, Calendar,
} from 'lucide-react';
import { useState } from 'react';
import { Material } from '@/lib/types';

interface MaterialDetailModalProps {
  material: Material | null;
  isOpen: boolean;
  onClose: () => void;
}

type FlowStep = 'details' | 'request' | 'sending' | 'review' | 'confirm' | 'confirmed';

export default function MaterialDetailModal({ material, isOpen, onClose }: MaterialDetailModalProps) {
  const [flowStep, setFlowStep] = useState<FlowStep>('details');
  const [requestData, setRequestData] = useState({ quantity: '', message: '' });
  const [buyerData, setBuyerData] = useState({
    company: '', cuit: '', contact: '', phone: '', email: '',
  });

  if (!isOpen || !material) return null;

  const handleRequestOffer = () => setFlowStep('request');

  const handleSendRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setFlowStep('sending');
    setTimeout(() => setFlowStep('review'), 2000);
  };

  const handleAcceptOffer = () => setFlowStep('confirm');
  const handleRejectOffer = () => { setFlowStep('details'); setRequestData({ quantity: '', message: '' }); };
  const handleConfirmPurchase = (e: React.FormEvent) => { e.preventDefault(); setFlowStep('confirmed'); };
  const handleBackToDetails = () => setFlowStep('details');
  const handleBackToReview = () => setFlowStep('review');

  const handleClose = () => {
    setFlowStep('details');
    setRequestData({ quantity: '', message: '' });
    setBuyerData({ company: '', cuit: '', contact: '', phone: '', email: '' });
    onClose();
  };

  const offeredPrice = 450;
  const quantityNum = parseFloat(requestData.quantity) || 800;
  const subtotal = offeredPrice * quantityNum;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  const Overlay = ({ children }: { children: React.ReactNode }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      {children}
    </div>
  );

  // Step 1: Details
  if (flowStep === 'details') return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-white text-lg font-semibold">Detalle del material</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
          <div>
            <div className="rounded-xl overflow-hidden bg-slate-700 mb-4 relative h-96">
              {material.image ? (
                <Image src={material.image} alt={material.title} fill className="object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-32 h-32 text-slate-400 opacity-50" />
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square rounded-lg bg-slate-700 border-2 border-white/10 overflow-hidden cursor-pointer hover:border-emerald-500 transition-colors relative">
                  {material.image && (
                    <Image src={material.image} alt={`${material.title} ${i}`} fill className="object-cover" />
                  )}
                </div>
              ))}
            </div>
          </div>
          <div>
            {material.featured && (
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm mb-3">
                ⭐ Destacado
              </div>
            )}
            <h1 className="text-2xl text-white mb-4 font-semibold">{material.title}</h1>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 mb-6">
              <div className="text-3xl text-emerald-400 mb-1">{material.price}</div>
              <div className="text-sm text-slate-400">Precio base (negociable)</div>
            </div>
            <div className="mb-6 flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="text-white">{material.seller}</div>
                <div className="flex items-center gap-1 text-sm text-slate-400">
                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                  <span>4.8 (23 ventas)</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-white mb-2 font-medium">Descripción</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{material.description}</p>
            </div>
            <div className="mb-6">
              <h3 className="text-white mb-3 font-medium">Especificaciones</h3>
              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                {[
                  ['Cantidad disponible', material.quantity],
                  ['Categoría', material.category],
                  ['Estado', 'Excelente'],
                  ['Ubicación', material.location],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between text-sm">
                    <span className="text-slate-400">{label}</span>
                    <span className="text-white">{value}</span>
                  </div>
                ))}
              </div>
            </div>
            <button
              onClick={handleRequestOffer}
              className="w-full bg-emerald-600 text-white py-3 rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-5 h-5" />
              Solicitar oferta
            </button>
          </div>
        </div>
      </div>
    </Overlay>
  );

  // Step 2: Request form
  if (flowStep === 'request') return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="border-b border-white/10 px-6 py-4 flex items-center justify-between">
          <h2 className="text-white font-semibold">Solicitar oferta</h2>
          <button onClick={handleBackToDetails} className="p-2 hover:bg-slate-700 rounded-lg transition-colors">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
        <form onSubmit={handleSendRequest} className="p-6 space-y-6">
          <div className="bg-slate-700 rounded-lg p-4">
            <div className="flex gap-3">
              <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden flex-shrink-0 relative">
                {material.image ? (
                  <Image src={material.image} alt={material.title} fill className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-10 h-10 text-slate-400" />
                  </div>
                )}
              </div>
              <div>
                <div className="text-white mb-1">{material.title}</div>
                <div className="text-sm text-slate-400">{material.seller}</div>
                <div className="text-emerald-400">{material.price}</div>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-white mb-2 text-sm">Cantidad deseada</label>
            <div className="flex gap-2">
              <input
                type="number"
                required
                value={requestData.quantity}
                onChange={(e) => setRequestData({ ...requestData, quantity: e.target.value })}
                placeholder="800"
                className="flex-1 px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
              />
              <div className="px-4 py-3 bg-slate-700 border border-white/10 rounded-lg text-slate-400">kg</div>
            </div>
          </div>
          <div>
            <label className="block text-white mb-2 text-sm">Mensaje opcional</label>
            <textarea
              value={requestData.message}
              onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
              placeholder="Hola, me interesa este material..."
              rows={5}
              className="w-full px-4 py-3 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 resize-none text-white"
            />
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-sm text-slate-300">Al solicitar una oferta, el vendedor recibirá la solicitud y te responderá en breve.</p>
          </div>
          <div className="flex gap-3">
            <button type="button" onClick={handleBackToDetails} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Cancelar</button>
            <button type="submit" className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Enviar solicitud</button>
          </div>
        </form>
      </div>
    </Overlay>
  );

  // Step 3: Sending
  if (flowStep === 'sending') return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-md w-full shadow-2xl p-12 text-center">
        <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <Loader2 className="w-10 h-10 text-emerald-400 animate-spin" />
        </div>
        <h2 className="text-white mb-2 font-semibold">Enviando solicitud</h2>
        <p className="text-slate-400">Estamos procesando tu solicitud...</p>
      </div>
    </Overlay>
  );

  // Step 4: Review offer
  if (flowStep === 'review') return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-white font-semibold">Revisar oferta del vendedor</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors"><X className="w-5 h-5 text-white" /></button>
        </div>
        <div className="p-6 space-y-6">
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex items-start gap-3">
            <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
            <p className="text-slate-300">El vendedor ha respondido tu solicitud. Revisá los detalles.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-700 rounded-lg p-4 flex gap-3">
              <div className="w-20 h-20 bg-slate-600 rounded-lg overflow-hidden flex-shrink-0 relative">
                {material.image && <Image src={material.image} alt={material.title} fill className="object-cover" />}
              </div>
              <div>
                <div className="text-white mb-1">{material.title}</div>
                <div className="text-slate-400 text-sm mb-2">Vendido por {material.seller}</div>
                <div className="text-2xl text-emerald-400">${offeredPrice} / kg</div>
              </div>
            </div>
            <div>
              <h3 className="text-white mb-3 font-medium">Oferta del vendedor</h3>
              <div className="bg-slate-700 rounded-lg p-4 space-y-3">
                {[
                  ['Precio ofrecido', `$${offeredPrice}/kg`],
                  ['Cantidad', `${quantityNum} kg`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between text-sm">
                    <span className="text-slate-400">{l}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white">Subtotal</span>
                  <span className="text-white text-lg">${subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Servicio SIMBIOSIS (5%)</span>
                  <span className="text-white">${serviceFee.toLocaleString()}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between">
                  <span className="text-white font-semibold">Total</span>
                  <span className="text-emerald-400 text-xl font-semibold">${total.toLocaleString()}</span>
                </div>
              </div>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 mt-4 flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-blue-400" />
                <span className="text-slate-300">Vigencia de la oferta: 7 días</span>
              </div>
            </div>
          </div>
          <div className="flex gap-3 pt-4">
            <button onClick={handleRejectOffer} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Rechazar oferta</button>
            <button onClick={handleAcceptOffer} className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Aceptar oferta</button>
          </div>
        </div>
      </div>
    </Overlay>
  );

  // Step 5: Confirm purchase
  if (flowStep === 'confirm') return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        <div className="sticky top-0 bg-slate-800 border-b border-white/10 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-white font-semibold">Confirmar compra</h2>
          <button onClick={handleClose} className="p-2 hover:bg-slate-700 rounded-lg transition-colors"><X className="w-5 h-5 text-white" /></button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-6">
          <div>
            <h3 className="text-white mb-4 font-medium">Resumen de compra</h3>
            <div className="bg-slate-700 rounded-lg p-4 mb-4">
              <div className="flex gap-3 mb-4">
                <div className="w-16 h-16 bg-slate-600 rounded-lg overflow-hidden flex-shrink-0 relative">
                  {material.image && <Image src={material.image} alt={material.title} fill className="object-cover" />}
                </div>
                <div>
                  <div className="text-white">{material.title}</div>
                  <div className="text-slate-400 text-sm">{material.seller}</div>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                {[
                  ['Cantidad', `${quantityNum} kg`],
                  ['Precio', `$${offeredPrice}/kg`],
                  ['Subtotal', `$${subtotal.toLocaleString()}`],
                  ['Servicio SIMBIOSIS (5%)', `$${serviceFee.toLocaleString()}`],
                ].map(([l, v]) => (
                  <div key={l} className="flex justify-between">
                    <span className="text-slate-400">{l}</span>
                    <span className="text-white">{v}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 flex justify-between items-center">
              <span className="text-white font-semibold">Total</span>
              <span className="text-2xl text-emerald-400 font-semibold">${total.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <h3 className="text-white mb-4 font-medium">Tus datos</h3>
            <form onSubmit={handleConfirmPurchase} className="space-y-4">
              {[
                { id: 'company', label: 'Empresa compradora', placeholder: 'EcoMat S.A.', value: buyerData.company, key: 'company' as const },
                { id: 'cuit', label: 'CUIT', placeholder: '30-71564470-5', value: buyerData.cuit, key: 'cuit' as const },
                { id: 'contact', label: 'Contacto', placeholder: 'María González', value: buyerData.contact, key: 'contact' as const },
                { id: 'phone', label: 'Teléfono', placeholder: '+54 9 351 123-4567', value: buyerData.phone, key: 'phone' as const },
                { id: 'email', label: 'Email', placeholder: 'maria@empresa.com', value: buyerData.email, key: 'email' as const },
              ].map((field) => (
                <div key={field.id}>
                  <label className="block text-sm text-white mb-2">{field.label}</label>
                  <input
                    type={field.id === 'email' ? 'email' : field.id === 'phone' ? 'tel' : 'text'}
                    required
                    value={field.value}
                    onChange={(e) => setBuyerData({ ...buyerData, [field.key]: e.target.value })}
                    placeholder={field.placeholder}
                    className="w-full px-4 py-2 bg-slate-700 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-white"
                  />
                </div>
              ))}
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-300">Al confirmar, el vendedor será notificado y podrán coordinar la entrega.</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button type="button" onClick={handleBackToReview} className="flex-1 px-6 py-3 border border-white/10 text-white rounded-lg hover:bg-slate-700 transition-colors">Volver</button>
                <button type="submit" className="flex-1 px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">Confirmar compra</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Overlay>
  );

  // Step 6: Confirmed
  return (
    <Overlay>
      <div className="bg-slate-800 border border-white/10 rounded-2xl max-w-2xl w-full shadow-2xl overflow-hidden">
        <div className="bg-emerald-600 text-white px-6 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <Check className="w-5 h-5 text-emerald-600" />
          </div>
          <h2 className="font-semibold">¡Compra confirmada!</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-emerald-400" />
            </div>
            <h3 className="text-white mb-2 font-medium">Tu compra ha sido confirmada</h3>
            <p className="text-slate-400">El vendedor fue notificado y te contactará pronto.</p>
          </div>
          <div className="bg-slate-700 rounded-lg p-4 space-y-2 text-sm">
            {[
              ['Material', material.title],
              ['Cantidad', `${quantityNum} kg`],
              ['Vendedor', material.seller],
              ['Subtotal material', `$${subtotal.toLocaleString()}`],
              ['Servicio SIMBIOSIS', `$${serviceFee.toLocaleString()}`],
            ].map(([l, v]) => (
              <div key={l} className="flex justify-between">
                <span className="text-slate-400">{l}</span>
                <span className="text-white">{v}</span>
              </div>
            ))}
            <div className="border-t border-white/10 pt-2 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-emerald-400 text-lg font-semibold">${total.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-lg p-4 space-y-2">
            {['El vendedor recibirá tus datos y te contactará', 'Coordinarán la entrega y forma de pago', 'Podrás calificar al vendedor al finalizar'].map((step) => (
              <div key={step} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span className="text-slate-300">{step}</span>
              </div>
            ))}
          </div>
          <button onClick={handleClose} className="w-full px-6 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Volver al inicio
          </button>
        </div>
      </div>
    </Overlay>
  );
}
