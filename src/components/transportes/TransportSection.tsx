'use client';

import Image from 'next/image';
import { Truck, MapPin, Phone, Star, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import { TransportProvider } from '@/lib/types';
import { getTransports } from '@/lib/queries';
import PublishTransportModal from './PublishTransportModal';
import ContactTransportModal from './ContactTransportModal';

export default function TransportSection() {
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<TransportProvider | null>(null);
  const [transports, setTransports] = useState<TransportProvider[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTransports = async () => {
    setLoading(true);
    const data = await getTransports();
    setTransports(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchTransports();
  }, []);

  const handleContactClick = (provider: TransportProvider) => {
    setSelectedProvider(provider);
    setIsContactModalOpen(true);
  };

  const handleTransportPublished = () => {
    setIsPublishModalOpen(false);
    fetchTransports();
  };

  return (
    <>
      <PublishTransportModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublished={handleTransportPublished}
      />
      <ContactTransportModal
        isOpen={isContactModalOpen}
        onClose={() => { setIsContactModalOpen(false); setSelectedProvider(null); }}
        provider={selectedProvider}
      />

      <section id="transportes" className="bg-slate-700 py-20 border-y border-slate-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-4 border border-white/30">
              <Truck className="w-4 h-4" />
              <span className="text-sm">Servicios de transporte</span>
            </div>
            <h2 className="text-white mb-4 text-3xl font-bold">Transportes disponibles</h2>
            <p className="text-slate-100 max-w-2xl mx-auto text-lg">
              Conectamos compradores y vendedores con servicios de logística local para facilitar el traslado de materiales.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <Loader2 className="w-10 h-10 text-blue-400 animate-spin" />
              <p className="text-slate-300">Cargando transportes...</p>
            </div>
          ) : transports.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-slate-300 text-lg mb-2">Todavía no hay transportes registrados.</p>
              <p className="text-slate-400 text-sm">¡Sé el primero en publicar tu servicio!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {transports.map((provider) => (
                <div
                  key={provider.id}
                  className={`bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-105 ${
                    provider.sponsored
                      ? 'ring-2 ring-blue-500 shadow-lg shadow-blue-500/10'
                      : 'border-slate-200'
                  }`}
                >
                  {provider.sponsored && (
                    <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-3 py-1.5 text-center">
                      Publicidad
                    </div>
                  )}

                  <div className="relative h-32 overflow-hidden bg-slate-200">
                    <Image
                      src={provider.image}
                      alt={provider.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0 border border-blue-200">
                        <Truck className="w-6 h-6 text-blue-600" />
                      </div>
                      <h3 className="text-slate-800 font-semibold">{provider.name}</h3>
                    </div>

                    <div className="space-y-3 mb-5">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin className="w-4 h-4 text-slate-600 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{provider.zone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-600">{provider.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 flex-shrink-0" />
                        <span className="text-slate-800 font-semibold">{provider.rating}/5</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleContactClick(provider)}
                      className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2.5 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
                    >
                      Contactar
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="text-center bg-white rounded-2xl p-8 border border-slate-200 shadow-lg">
            <p className="text-slate-700 mb-4 text-lg">
              ¿Sos transportista? Publicá tu servicio en nuestra plataforma
            </p>
            <button
              onClick={() => setIsPublishModalOpen(true)}
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Publicar servicio de transporte
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
