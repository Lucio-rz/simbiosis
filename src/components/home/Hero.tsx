import { Shield, Sparkles, CircleDollarSign, Package } from 'lucide-react';
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-slate-700 via-slate-600 to-emerald-700 py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-400 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-400 rounded-full blur-3xl"></div>
      </div>

      {/* Background Image */}
      <div className="absolute inset-0 opacity-20">
        <Image
          src="https://images.unsplash.com/photo-1587293852726-70cdb56c2866?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1920"
          alt="Industrial warehouse"
          fill
          className="object-cover"
          priority
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 text-white rounded-full mb-6 border border-white/30 backdrop-blur-sm">
            <Sparkles className="w-4 h-4" />
            <span className="text-sm">Economía Circular · Sostenibilidad</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl text-white mb-6 max-w-4xl mx-auto font-bold">
            Transforma descartes en{' '}
            <span className="bg-gradient-to-r from-emerald-300 to-blue-300 bg-clip-text text-transparent">
              oportunidades
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto mb-12 leading-relaxed">
            Marketplace regional donde empresas, talleres y emprendedores compran y venden
            materiales recuperados.{' '}
            <span className="text-emerald-200 font-semibold">Reduce costos, genera ingresos</span>{' '}
            y contribuye al medio ambiente.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-3xl text-white font-bold mb-2">500+</div>
            <div className="text-slate-100 text-sm">Materiales publicados</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-3xl text-white font-bold mb-2">150+</div>
            <div className="text-slate-100 text-sm">Empresas activas</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-3xl text-white font-bold mb-2">30%</div>
            <div className="text-slate-100 text-sm">Ahorro promedio</div>
          </div>
          <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 border border-white/30">
            <div className="text-3xl text-white font-bold mb-2">1000+</div>
            <div className="text-slate-100 text-sm">Transacciones exitosas</div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-emerald-300/50 transition-all hover:scale-105 transform">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <CircleDollarSign className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-white mb-3 text-xl font-semibold">Reduce costos</h3>
            <p className="text-slate-100 leading-relaxed">
              Accedé a materiales de calidad a precios 20-40% más bajos que el mercado formal.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-blue-300/50 transition-all hover:scale-105 transform">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Package className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-white mb-3 text-xl font-semibold">Monetizá excedentes</h3>
            <p className="text-slate-100 leading-relaxed">
              Convertí tus sobrantes en ingresos y liberá espacio en tu obrador o taller.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20 hover:border-purple-300/50 transition-all hover:scale-105 transform">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-white mb-3 text-xl font-semibold">Transacciones seguras</h3>
            <p className="text-slate-100 leading-relaxed">
              Sistema de calificaciones y verificación para comprar y vender con confianza.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
