'use client';

import { useState } from 'react';
import { Recycle, Menu, X, Plus, LogOut, User } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import AuthModal from '@/components/auth/AuthModal';

interface NavbarProps {
  onPublish?: () => void;
}

export default function Navbar({ onPublish }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { user, signOut } = useAuth();

  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuario';

  return (
    <>
      <AuthModal isOpen={authModalOpen} onClose={() => setAuthModalOpen(false)} />

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
              <Link href="/" className="text-slate-300 hover:text-white transition-colors text-sm">Inicio</Link>
              <Link href="/#materiales" className="text-slate-300 hover:text-white transition-colors text-sm">Materiales</Link>
              <Link href="/#transportes" className="text-slate-300 hover:text-white transition-colors text-sm">Transportes</Link>
              <Link href="/#como-funciona" className="text-slate-300 hover:text-white transition-colors text-sm">Cómo funciona</Link>
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center gap-3">
              {user ? (
                <>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 rounded-lg border border-white/10">
                    <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-slate-300 text-sm">{displayName}</span>
                  </div>
                  <button
                    onClick={onPublish}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Publicar
                  </button>
                  <button
                    onClick={signOut}
                    className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                    title="Cerrar sesión"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="text-slate-300 hover:text-white transition-colors text-sm"
                  >
                    Iniciar sesión
                  </button>
                  <button
                    onClick={() => setAuthModalOpen(true)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg text-sm font-medium transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Publicar material
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu btn */}
            <button className="md:hidden text-slate-300" onClick={() => setMenuOpen(!menuOpen)}>
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
            {user ? (
              <>
                <div className="flex items-center gap-2 py-2 text-slate-300">
                  <User className="w-4 h-4" />
                  <span className="text-sm">{displayName}</span>
                </div>
                <button
                  onClick={onPublish}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-lg font-medium"
                >
                  <Plus className="w-4 h-4" />Publicar material
                </button>
                <button
                  onClick={signOut}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-white/10 text-slate-300 rounded-lg"
                >
                  <LogOut className="w-4 h-4" />Cerrar sesión
                </button>
              </>
            ) : (
              <button
                onClick={() => { setAuthModalOpen(true); setMenuOpen(false); }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-lg font-medium"
              >
                <Plus className="w-4 h-4" />Iniciar sesión / Registrarse
              </button>
            )}
          </div>
        )}
      </nav>
    </>
  );
}
