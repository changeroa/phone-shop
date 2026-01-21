'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';
import Header from '@/components/ui/Header';
import ProductCard from '@/components/ui/ProductCard';
import { phones, banners, companyInfo } from '@/lib/mockData';

export default function HomePage() {
  const [currentBanner, setCurrentBanner] = useState(0);

  useEffect(() => {
    if (banners.length === 0) return;
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Header showLogo showSearch />

      <div className="bg-gray-50/50 min-h-screen">
        {/* Banner Section */}
        <section className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentBanner * 100}%)` }}
            >
              {banners.map((banner) => (
                <div
                  key={banner.id}
                  className="w-full flex-shrink-0 aspect-[4/3] sm:aspect-[2/1] relative bg-gray-200"
                >
                  <Image
                    src={banner.image}
                    alt={banner.title}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-8 left-5 right-5 text-white">
                    <p className="text-[13px] font-medium text-white/80 tracking-wide">{banner.subtitle}</p>
                    <h2 className="text-2xl font-bold mt-1.5 tracking-tight">{banner.title}</h2>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Banner Dots */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentBanner(index)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === currentBanner ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
                }`}
                aria-label={`배너 ${index + 1}`}
              />
            ))}
          </div>
        </section>

        {/* Popular Phones */}
        <section className="py-8">
          <div className="flex items-center justify-between mb-5 px-5">
            <h2 className="text-xl font-bold text-gray-900 tracking-tight">인기 단말기</h2>
            <Link
              href="/phones"
              className="flex items-center text-[13px] font-medium text-gray-400 hover:text-gray-600 transition-colors"
            >
              전체보기
              <ChevronRight size={16} strokeWidth={2.5} />
            </Link>
          </div>

          <div className="overflow-x-auto scrollbar-hide px-5 pb-2">
            <div className="grid grid-rows-2 grid-flow-col gap-3 w-max">
              {phones.slice(0, 6).map((phone) => (
                <div key={phone.id} className="w-72">
                  <ProductCard phone={phone} layout="horizontal" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Store Info Card */}
        <section className="px-5 pb-10">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h3 className="text-lg font-bold text-gray-900 tracking-tight">{companyInfo.name}</h3>
            <div className="mt-4 space-y-2.5 text-[14px] text-gray-500">
              <p>{companyInfo.address}</p>
              <p>영업시간: {companyInfo.hours}</p>
              <p>전화: {companyInfo.phone}</p>
            </div>
            <Link
              href="/company"
              className="mt-5 inline-flex items-center text-[14px] font-semibold text-gray-900 hover:text-gray-600 transition-colors"
            >
              매장 상세보기
              <ChevronRight size={18} strokeWidth={2.5} />
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
