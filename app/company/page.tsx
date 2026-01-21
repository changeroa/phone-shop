'use client';

import { MapPin, Phone, Clock, MessageCircle } from 'lucide-react';
import Header from '@/components/ui/Header';
import { companyInfo } from '@/lib/mockData';

export default function CompanyPage() {
  return (
    <>
      <Header title="매장안내" showBack />

      <div className="pt-14 pb-20">
        {/* Store Name & Badge */}
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">폰</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{companyInfo.name}</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded">SKT</span>
                <span className="px-2 py-0.5 bg-red-100 text-red-700 text-xs font-semibold rounded">KT</span>
                <span className="px-2 py-0.5 bg-pink-100 text-pink-600 text-xs font-semibold rounded">LGU+</span>
              </div>
            </div>
          </div>
          <p className="text-sm text-gray-500">3사 공식 대리점 | 10년+ 운영</p>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Quick Info */}
        <div className="bg-white">
          <div className="px-4 py-4 flex items-start gap-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <MapPin size={20} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">주소</p>
              <p className="text-gray-900">{companyInfo.address}</p>
              <p className="text-gray-600 text-sm">{companyInfo.addressDetail}</p>
            </div>
          </div>

          <div className="px-4 py-4 flex items-start gap-4 border-b border-gray-50">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Phone size={20} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">전화</p>
              <a href={`tel:${companyInfo.phone}`} className="text-primary-600 font-medium">
                {companyInfo.phone}
              </a>
            </div>
          </div>

          <div className="px-4 py-4 flex items-start gap-4">
            <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Clock size={20} className="text-gray-500" />
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">영업시간</p>
              <p className="text-gray-900">{companyInfo.hours}</p>
              <p className="text-sm text-red-500 mt-0.5">{companyInfo.closedDays}</p>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Map Placeholder */}
        <div className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">오시는 길</h2>
          <div className="aspect-[4/3] bg-gray-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin size={48} className="text-gray-300 mx-auto mb-2" />
              <p className="text-sm text-gray-400">지도가 표시됩니다</p>
            </div>
          </div>
          <p className="text-xs text-gray-400 mt-3 text-center">
            신림역 1번 출구에서 도보 5분
          </p>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Business Info */}
        <div className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">사업자 정보</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">상호명</span>
              <span className="text-gray-900">{companyInfo.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">대표자</span>
              <span className="text-gray-900">{companyInfo.ceo}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">사업자등록번호</span>
              <span className="text-gray-900">{companyInfo.businessNumber}</span>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Contact Buttons */}
        <div className="px-4 py-6 bg-white">
          <div className="flex gap-3">
            <a
              href={`tel:${companyInfo.phone}`}
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-gray-100 rounded-xl font-semibold text-gray-700"
            >
              <Phone size={20} />
              전화 문의
            </a>
            <a
              href={companyInfo.kakaoChannelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-4 bg-[#FEE500] rounded-xl font-semibold text-[#391B1B]"
            >
              <MessageCircle size={20} />
              카카오 상담
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="px-4 py-6 bg-gray-50">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">신림염전의 약속</h2>
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-white p-4 rounded-xl">
              <p className="text-2xl mb-2">🛡️</p>
              <p className="font-semibold text-gray-900 text-sm">안전한 거래</p>
              <p className="text-xs text-gray-500 mt-1">공식 대리점 운영</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-2xl mb-2">💰</p>
              <p className="font-semibold text-gray-900 text-sm">최저가 보장</p>
              <p className="text-xs text-gray-500 mt-1">합리적인 가격</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-2xl mb-2">🚀</p>
              <p className="font-semibold text-gray-900 text-sm">당일 개통</p>
              <p className="text-xs text-gray-500 mt-1">빠른 처리</p>
            </div>
            <div className="bg-white p-4 rounded-xl">
              <p className="text-2xl mb-2">📦</p>
              <p className="font-semibold text-gray-900 text-sm">전국 배송</p>
              <p className="text-xs text-gray-500 mt-1">무료 배송</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
