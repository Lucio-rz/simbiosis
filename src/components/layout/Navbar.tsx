'use client';

import { useState } from 'react';
import { Recycle, Menu, X, Plus } from 'lucide-react';
import Link from 'next/link';

interface NavbarProps {
  onPublish?: () => void;
}

export default function Navbar({ onPublish }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Recycle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white tracking-tight">SIMBIOSIS</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm">
              Inicio
            </Link>
            <Link href="/#materiales" className="text-slate-300 hover:text-white transition-colors text-sm">
              Materiales
            </Link>
            <Link href="/#transportes" className="text-slate-300 hover:text-white transition-colors text-sm">
              Transportes
            </Link>
            <Link href="/#como-funciona" className="text-slate-300 hover:text-white transition-colors text-sm">
              Cómo funciona
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button className="text-slate-300 hover:text-white transition-colors text-sm">
              Iniciar sesión
            </button>
            <button
              onClick={onPublish}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              Publicar material
            </button>
          </div>

          {/* Mobile menu btn */}
          <button
            className="md:hidden text-slate-300"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-white/10 px-4 py-4 space-y-3">
          <Link href="/" className="block text-slate-300 hover:text-white py-2">Inicio</Link>
          <Link href="/#materiales" className="block text-slate-300 hover:text-white py-2">Materiales</Link>
          <Link href="/#transportes" className="block text-slate-300 hover:text-white py-2">Transportes</Link>
          <Link href="/#como-funciona" className="block text-slate-300 hover:text-white py-2">Cómo funciona</Link>
          <button
            onClick={onPublish}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-lg font-medium"
          >
            <Plus className="w-4 h-4" />
            Publicar material
          </button>
        </div>
      )}
    </nav>
  );
}
