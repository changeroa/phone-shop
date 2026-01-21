'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { Phone } from '@/lib/mockData';

interface ProductCardProps {
  phone: Phone;
  carrier?: 'SKT' | 'KT' | 'LGU+';
  type?: '신규' | '번이' | '기변';
  layout?: 'vertical' | 'horizontal';
}

export default function ProductCard({
  phone,
  carrier = 'SKT',
  type = '번이',
  layout = 'vertical',
}: ProductCardProps) {
  const discountRate = Math.round((1 - phone.salePrice / phone.originalPrice) * 100);

  if (layout === 'horizontal') {
    return (
      <Link href={`/phones/${phone.id}`} className="block group h-full">
        <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/50 group-hover:border-gray-200 group-active:scale-[0.98] flex h-full">
          {/* Image */}
          <div className="relative w-28 flex-shrink-0 bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
            <Image
              src={phone.image}
              alt={phone.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="112px"
            />
            {discountRate > 0 && (
              <span className="absolute top-2 left-2 px-2 py-1 bg-gray-900 text-white text-[10px] font-semibold rounded-lg">
                {discountRate}%
              </span>
            )}
          </div>

          {/* Info */}
          <div className="p-3.5 flex flex-col justify-center min-w-0 flex-1">
            <h3 className="text-[14px] font-semibold text-gray-900 line-clamp-1 leading-snug tracking-tight">
              {phone.name}
            </h3>
            <p className="text-[12px] text-gray-400 mt-0.5 font-medium">{phone.brand}</p>

            {/* Chips */}
            <div className="flex gap-1.5 mt-2.5">
              <span className="px-2 py-0.5 bg-gray-900 text-white text-[10px] font-semibold rounded-md">
                {carrier}
              </span>
              <span className="px-2 py-0.5 border border-gray-200 text-gray-600 text-[10px] font-medium rounded-md">
                {type}
              </span>
            </div>

            {/* Price */}
            <div className="mt-2.5">
              <p className="text-[11px] text-gray-300 line-through">
                {phone.originalPrice.toLocaleString()}원
              </p>
              <p className="text-[15px] font-bold text-gray-900 tracking-tight">
                {phone.salePrice.toLocaleString()}원
              </p>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/phones/${phone.id}`} className="block group">
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300 group-hover:shadow-lg group-hover:shadow-gray-200/50 group-hover:border-gray-200 group-hover:-translate-y-1 group-active:scale-[0.98]">
        {/* Image */}
        <div className="relative aspect-[4/5] bg-gradient-to-br from-gray-50 to-gray-100 overflow-hidden">
          <Image
            src={phone.image}
            alt={phone.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
          {discountRate > 0 && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-gray-900 text-white text-xs font-semibold rounded-lg">
              {discountRate}%
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <h3 className="text-[15px] font-semibold text-gray-900 line-clamp-2 leading-snug tracking-tight">
            {phone.name}
          </h3>
          <p className="text-[13px] text-gray-400 mt-1 font-medium">{phone.brand}</p>

          {/* Price */}
          <div className="mt-3">
            <p className="text-[12px] text-gray-300 line-through">
              {phone.originalPrice.toLocaleString()}원
            </p>
            <p className="text-lg font-bold text-gray-900 tracking-tight">
              {phone.salePrice.toLocaleString()}원
            </p>
          </div>

          {/* Meta */}
          <div className="flex items-center gap-2 mt-3">
            <span className="px-2.5 py-1 bg-gray-900 text-white text-[11px] font-semibold rounded-md">
              {carrier}
            </span>
            <span className="px-2.5 py-1 border border-gray-200 text-gray-600 text-[11px] font-medium rounded-md">
              {type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
