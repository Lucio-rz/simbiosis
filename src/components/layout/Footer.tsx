import { Recycle } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-slate-900 border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Recycle className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-white">SIMBIOSIS</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Marketplace de materiales sobrantes. Conectamos empresas, talleres y emprendedores
              para dar nueva vida a los materiales y contribuir a la economía circular.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Plataforma</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/#materiales" className="hover:text-white transition-colors">Materiales</Link></li>
              <li><Link href="/#transportes" className="hover:text-white transition-colors">Transportes</Link></li>
              <li><Link href="/#como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm">Empresa</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="#" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Términos y condiciones</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} SIMBIOSIS. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
