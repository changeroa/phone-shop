'use client';

import { useState } from 'react';
import Header from '@/components/ui/Header';
import ProductCard from '@/components/ui/ProductCard';
import { phones } from '@/lib/mockData';

type Brand = '전체' | '삼성' | '애플';
type Carrier = '전체' | 'SKT' | 'KT' | 'LGU+';

export default function PhonesPage() {
  const [brandFilter, setBrandFilter] = useState<Brand>('전체');
  const [carrierFilter, setCarrierFilter] = useState<Carrier>('전체');

  const brands: Brand[] = ['전체', '삼성', '애플'];
  const carriers: Carrier[] = ['전체', 'SKT', 'KT', 'LGU+'];

  const filteredPhones = phones.filter((phone) => {
    if (brandFilter !== '전체' && phone.brand !== brandFilter) return false;
    if (carrierFilter !== '전체' && !phone.carriers.includes(carrierFilter)) return false;
    return true;
  });

  return (
    <>
      <Header title="단말기" showBack showSearch />

      <div className="pt-14">
        {/* Fixed Filter Tabs */}
        <div className="sticky top-14 z-40 bg-white border-b border-gray-100">
          {/* Brand Filter */}
          <div className="px-4 pt-3 pb-2">
            <div className="flex gap-2">
              {brands.map((brand) => (
                <button
                  key={brand}
                  onClick={() => setBrandFilter(brand)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    brandFilter === brand
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Carrier Filter */}
          <div className="px-4 pb-3">
            <div className="flex gap-2">
              {carriers.map((carrier) => (
                <button
                  key={carrier}
                  onClick={() => setCarrierFilter(carrier)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
                    carrierFilter === carrier
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  {carrier}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="px-4 py-4">
          <p className="text-sm text-gray-500 mb-4">
            총 <span className="font-semibold text-gray-900">{filteredPhones.length}</span>개
          </p>

          {filteredPhones.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {filteredPhones.map((phone) => (
                <ProductCard key={phone.id} phone={phone} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 text-gray-400">
              <p className="text-lg font-medium">검색 결과가 없습니다</p>
              <p className="text-sm mt-1">다른 필터를 선택해 보세요</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
