import { Search, MessageCircle, Truck, CheckCircle } from 'lucide-react';

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Explorá materiales',
    description: 'Buscá por categoría, ubicación o palabra clave. Filtrá por tipo de material y precio.',
    color: 'emerald',
  },
  {
    step: '02',
    icon: MessageCircle,
    title: 'Contactá al vendedor',
    description: 'Solicitá una oferta directamente al vendedor. Negociá cantidad y precio.',
    color: 'blue',
  },
  {
    step: '03',
    icon: Truck,
    title: 'Coordiná el traslado',
    description: 'Usá nuestra sección de transportes para encontrar logística disponible en tu zona.',
    color: 'purple',
  },
  {
    step: '04',
    icon: CheckCircle,
    title: 'Cerrá la operación',
    description: 'Confirmá la compra. SIMBIOSIS cobra una comisión del 5% sobre la venta.',
    color: 'orange',
  },
];

const colorMap: Record<string, string> = {
  emerald: 'from-emerald-500 to-emerald-600',
  blue: 'from-blue-500 to-blue-600',
  purple: 'from-purple-500 to-purple-600',
  orange: 'from-orange-500 to-orange-600',
};

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-slate-900 py-20 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-white text-3xl font-bold mb-4">¿Cómo funciona SIMBIOSIS?</h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            En cuatro simples pasos conectamos a quienes tienen sobrantes con quienes los necesitan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((s, index) => {
            const Icon = s.icon;
            return (
              <div key={s.step} className="relative">
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
                )}
                <div className="relative bg-slate-800 rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all">
                  <div className="text-slate-600 text-5xl font-bold mb-4 select-none">{s.step}</div>
                  <div className={`w-12 h-12 bg-gradient-to-br ${colorMap[s.color]} rounded-xl flex items-center justify-center mb-4`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{s.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
