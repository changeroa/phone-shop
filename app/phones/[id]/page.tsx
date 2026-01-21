'use client';

import { useState } from 'react';
import { useParams, notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import { phones, plans } from '@/lib/mockData';

export function generateStaticParams() {
  return phones.map((phone) => ({ id: phone.id }));
}

export default function PhoneDetailPage() {
  const params = useParams();
  const phoneId = Array.isArray(params.id) ? params.id[0] : params.id;

  // Find phone from mock data with proper null check
  const phone = phones.find((p) => p.id === phoneId);

  // Handle case where phone is not found
  if (!phone || phone.colors.length === 0 || phone.storages.length === 0) {
    notFound();
  }

  const [selectedColor, setSelectedColor] = useState(phone.colors[0]);
  const [selectedStorage, setSelectedStorage] = useState(phone.storages[0]);

  // Calculate price based on storage
  const finalPrice = phone.salePrice + selectedStorage.priceAdd;

  // Get related plans for preview
  const relatedPlans = plans.slice(0, 3);

  return (
    <>
      <Header title={phone.name} showBack />

      <div className="pt-14 pb-24">
        {/* Phone Image */}
        <div className="bg-gray-50 aspect-square flex items-center justify-center">
          <Image
            src={phone.image}
            alt={phone.name}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>

        {/* Phone Info */}
        <div className="px-4 py-6">
          <p className="text-sm text-gray-500">{phone.brand}</p>
          <h1 className="text-xl font-bold text-gray-900 mt-1">{phone.name}</h1>

          {/* Price */}
          <div className="mt-4">
            <p className="text-sm text-gray-400 line-through">
              {phone.originalPrice.toLocaleString()}원
            </p>
            <p className="text-2xl font-bold text-gray-900">
              {finalPrice.toLocaleString()}원
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100" />

        {/* Options */}
        <div className="px-4 py-6 space-y-6">
          {/* Color Selection - Text Buttons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">색상</h3>
            <div className="flex flex-wrap gap-2">
              {phone.colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedColor.id === color.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {color.name}
                </button>
              ))}
            </div>
          </div>

          {/* Storage Selection - Text Buttons */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">용량</h3>
            <div className="flex flex-wrap gap-2">
              {phone.storages.map((storage) => (
                <button
                  key={storage.id}
                  onClick={() => setSelectedStorage(storage)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedStorage.id === storage.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {storage.name}
                  {storage.priceAdd > 0 && (
                    <span className="ml-1 text-xs opacity-70">
                      (+{(storage.priceAdd / 10000).toLocaleString()}만)
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100" />

        {/* Specs */}
        <div className="px-4 py-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">상세 스펙</h3>
          <div className="space-y-3">
            {phone.specs.map((spec) => (
              <div key={spec.label} className="flex justify-between text-sm">
                <span className="text-gray-500">{spec.label}</span>
                <span className="text-gray-900 font-medium">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-2 bg-gray-100" />

        {/* Related Plans Preview */}
        <div className="px-4 py-6">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">추천 요금제</h3>
          <div className="space-y-3">
            {relatedPlans.map((plan) => (
              <div
                key={plan.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-0.5 text-xs font-semibold rounded ${
                        plan.carrier === 'SKT'
                          ? 'bg-red-100 text-red-600'
                          : plan.carrier === 'KT'
                          ? 'bg-red-100 text-red-700'
                          : 'bg-pink-100 text-pink-600'
                      }`}
                    >
                      {plan.carrier}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{plan.name}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">데이터 {plan.data}</p>
                </div>
                <p className="text-sm font-bold text-primary-600">
                  월 {plan.monthlyPrice.toLocaleString()}원
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            더 많은 요금제는 개통 신청 시 확인하실 수 있습니다
          </p>
        </div>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3">
        <Link
          href={`/phones/${phoneId}/apply`}
          className="block w-full py-4 bg-primary-500 text-white text-center font-semibold rounded-xl hover:bg-primary-600 active:scale-[0.98] transition-all"
        >
          개통 신청하기
        </Link>
      </div>
    </>
  );
}
