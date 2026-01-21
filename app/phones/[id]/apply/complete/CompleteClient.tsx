'use client';

import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
import Header from '@/components/ui/Header';

export default function CompleteClient() {
  const orderNumber = `ORD-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;

  const orderSummary = {
    phone: '갤럭시 S24 Ultra',
    color: '티타늄 블랙',
    storage: '256GB',
    carrier: 'SKT',
    plan: '5G 프리미어 에센셜',
    type: '번호이동',
    price: '990,000원',
  };

  return (
    <>
      <Header title="신청 완료" />

      <div className="pt-14 pb-20">
        {/* Success Icon */}
        <div className="flex flex-col items-center py-12 bg-green-50">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircle size={48} className="text-green-500" />
          </div>
          <h1 className="text-xl font-bold text-gray-900">접수가 완료되었습니다</h1>
          <p className="text-sm text-gray-500 mt-2">영업시간 내 순차적으로 연락드리겠습니다</p>
        </div>

        {/* Order Number */}
        <div className="px-4 py-6">
          <div className="bg-gray-50 rounded-xl p-5 text-center">
            <p className="text-sm text-gray-500 mb-2">접수번호</p>
            <p className="text-xl font-mono font-bold text-primary-600">{orderNumber}</p>
          </div>
        </div>

        {/* Notice */}
        <div className="px-4 pb-4">
          <div className="bg-blue-50 rounded-xl p-4">
            <p className="text-sm text-blue-700">
              상담 진행 시 접수번호를 말씀해주시면 빠른 확인이 가능합니다.
            </p>
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Order Summary */}
        <div className="px-4 py-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">접수 내역</h2>
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">단말기</span>
              <span className="text-gray-900 font-medium">{orderSummary.phone}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">색상 / 용량</span>
              <span className="text-gray-900 font-medium">
                {orderSummary.color} / {orderSummary.storage}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">통신사</span>
              <span className="text-gray-900 font-medium">{orderSummary.carrier}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">요금제</span>
              <span className="text-gray-900 font-medium">{orderSummary.plan}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">개통 유형</span>
              <span className="text-gray-900 font-medium">{orderSummary.type}</span>
            </div>
            <div className="h-px bg-gray-100 my-2" />
            <div className="flex justify-between">
              <span className="text-gray-500 text-sm">예상 금액</span>
              <span className="text-lg font-bold text-primary-600">{orderSummary.price}</span>
            </div>
          </div>
          <p className="text-xs text-gray-400 text-center mt-4">
            ※ 실제 금액은 상담 후 확정됩니다
          </p>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Business Hours */}
        <div className="px-4 py-6">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">영업 안내</h2>
          <div className="bg-gray-50 rounded-xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">평일</span>
              <span className="text-gray-900">10:00 - 20:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">토요일</span>
              <span className="text-gray-900">10:00 - 18:00</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">일요일/공휴일</span>
              <span className="text-gray-900">휴무</span>
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="px-4 pt-4 flex gap-3">
          <Link
            href="/"
            className="flex-1 py-4 bg-gray-100 text-gray-700 text-center font-semibold rounded-xl hover:bg-gray-200 transition-colors"
          >
            홈으로
          </Link>
          <Link
            href="/mypage"
            className="flex-1 py-4 bg-primary-500 text-white text-center font-semibold rounded-xl hover:bg-primary-600 transition-colors"
          >
            내 신청 보기
          </Link>
        </div>
      </div>
    </>
  );
}
