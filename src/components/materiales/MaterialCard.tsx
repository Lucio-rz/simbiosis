import Image from 'next/image';
import { MapPin, User, Package, DollarSign, Star } from 'lucide-react';
import { Material } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
  onClick?: () => void;
}

export default function MaterialCard({ material, onClick }: MaterialCardProps) {
  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden hover:shadow-xl transition-all hover:scale-[1.02] cursor-pointer ${
        material.featured
          ? 'ring-2 ring-emerald-500 shadow-lg shadow-emerald-500/10'
          : 'border-slate-200 hover:border-slate-300'
      }`}
      onClick={onClick}
    >
      {material.featured && (
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs px-3 py-1.5 text-center flex items-center justify-center gap-2">
          <Star className="w-3 h-3 fill-white" />
          <span>Destacado</span>
        </div>
      )}

      <div className="relative h-48 bg-gradient-to-br from-slate-100 to-slate-200 overflow-hidden group">
        {material.image ? (
          <Image
            src={material.image}
            alt={material.title}
            fill
            className="object-cover transition-transform group-hover:scale-110 duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <Package className="w-20 h-20 text-slate-400" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>
      </div>

      <div className="p-5">
        <div className="mb-4">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-slate-800 flex-1 line-clamp-2 font-semibold">{material.title}</h3>
            <span className="px-2.5 py-1 bg-emerald-50 text-emerald-600 text-xs rounded-lg border border-emerald-200 whitespace-nowrap">
              {material.category}
            </span>
          </div>
          <p className="text-sm text-slate-600 line-clamp-2">{material.description}</p>
        </div>

        <div className="space-y-2.5 mb-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-blue-600" />
            </div>
            <span className="text-slate-700">{material.quantity}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-emerald-600 font-semibold">{material.price}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-purple-50 rounded-lg flex items-center justify-center">
              <MapPin className="w-4 h-4 text-purple-600" />
            </div>
            <span className="text-slate-600">{material.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <div className="w-8 h-8 bg-orange-50 rounded-lg flex items-center justify-center">
              <User className="w-4 h-4 text-orange-600" />
            </div>
            <span className="text-slate-600">{material.seller}</span>
          </div>
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-2.5 rounded-xl hover:from-emerald-600 hover:to-emerald-700 transition-all shadow-md hover:shadow-lg">
          Ver detalles
        </button>
      </div>
    </div>
  );
}
