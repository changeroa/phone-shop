'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, User, ExternalLink } from 'lucide-react';
import Header from '@/components/ui/Header';
import { orders } from '@/lib/mockData';

const statusConfig: Record<string, { label: string; color: string }> = {
  '접수': { label: '접수', color: 'bg-gray-100 text-gray-600' },
  '해피콜완료': { label: '해피콜완료', color: 'bg-blue-100 text-blue-600' },
  '입금완료': { label: '입금완료', color: 'bg-yellow-100 text-yellow-700' },
  '개통완료': { label: '개통완료', color: 'bg-purple-100 text-purple-600' },
  '배송완료': { label: '배송완료', color: 'bg-green-100 text-green-600' },
  '취소': { label: '취소', color: 'bg-red-100 text-red-600' },
};

export default function MyPage() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const selectedOrder = orders.find((o) => o.id === selectedOrderId);

  // Mock user info
  const user = {
    name: '홍길동',
    email: 'test@test.com',
  };

  if (selectedOrder) {
    return (
      <>
        <Header title="신청 상세" showBack />
        <div className="pt-14 pb-20">
          {/* Status Badge */}
          <div className="px-4 py-6 bg-white">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm text-gray-500">접수번호</span>
              <span className="font-mono text-sm">{selectedOrder.orderNumber}</span>
            </div>
            <div
              className={`inline-flex px-3 py-1.5 rounded-full text-sm font-semibold ${
                statusConfig[selectedOrder.status]?.color || 'bg-gray-100 text-gray-600'
              }`}
            >
              {selectedOrder.status}
            </div>
          </div>

          <div className="h-2 bg-gray-100" />

          {/* Order Details */}
          <div className="px-4 py-6 bg-white">
            <h2 className="text-sm font-semibold text-gray-500 mb-4">접수 내역</h2>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">단말기</span>
                <span className="text-gray-900 font-medium">{selectedOrder.phoneName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">색상 / 용량</span>
                <span className="text-gray-900 font-medium">
                  {selectedOrder.color} / {selectedOrder.storage}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">통신사</span>
                <span className="text-gray-900 font-medium">{selectedOrder.carrier}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">요금제</span>
                <span className="text-gray-900 font-medium">{selectedOrder.planName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">개통 유형</span>
                <span className="text-gray-900 font-medium">{selectedOrder.type}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">접수일</span>
                <span className="text-gray-900 font-medium">{selectedOrder.createdAt}</span>
              </div>
              <div className="h-px bg-gray-100 my-2" />
              <div className="flex justify-between">
                <span className="text-gray-500 text-sm">예상 금액</span>
                <span className="text-lg font-bold text-primary-600">
                  {selectedOrder.totalPrice.toLocaleString()}원
                </span>
              </div>
            </div>
          </div>

          {/* Self-opening Link (only show when happy call completed) */}
          {selectedOrder.status === '해피콜완료' && (
            <>
              <div className="h-2 bg-gray-100" />
              <div className="px-4 py-6 bg-white">
                <div className="bg-blue-50 rounded-xl p-4">
                  <h3 className="font-semibold text-blue-900 mb-2">셀프개통 안내</h3>
                  <p className="text-sm text-blue-700 mb-4">
                    아래 버튼을 클릭하여 통신사 공식 페이지에서 셀프개통을 진행해주세요.
                  </p>
                  <a
                    href="https://m.shop.tworld.co.kr/buyproc/omd/usim-opening"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl font-medium"
                  >
                    <ExternalLink size={18} />
                    {selectedOrder.carrier} 셀프개통
                  </a>
                  <p className="text-xs text-blue-600 mt-3">
                    * 운영시간: 평일/토요일 08:00~20:00
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Back to List */}
          <div className="px-4 pt-6">
            <button
              onClick={() => setSelectedOrderId(null)}
              className="w-full py-4 bg-gray-100 text-gray-700 font-semibold rounded-xl"
            >
              목록으로
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header title="내 신청" showBack />

      <div className="pt-14 pb-20">
        {/* User Info */}
        <div className="px-4 py-6 bg-white">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
              <User size={28} className="text-gray-400" />
            </div>
            <div>
              <p className="font-semibold text-gray-900">{user.name}</p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Orders List */}
        <div className="bg-white">
          <div className="px-4 py-4 border-b border-gray-100">
            <h2 className="text-sm font-semibold text-gray-500">신청 내역</h2>
          </div>

          {orders.length === 0 ? (
            <div className="px-4 py-16 text-center">
              <p className="text-gray-400">신청 내역이 없습니다</p>
              <Link
                href="/phones"
                className="inline-block mt-4 text-sm text-primary-600 font-medium"
              >
                단말기 둘러보기
              </Link>
            </div>
          ) : (
            <div>
              {orders.map((order) => (
                <button
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className="w-full px-4 py-4 flex items-center justify-between border-b border-gray-50 hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-gray-400 font-mono">{order.orderNumber}</span>
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                          statusConfig[order.status]?.color || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>
                    <p className="font-medium text-gray-900 truncate">{order.phoneName}</p>
                    <p className="text-sm text-gray-500">
                      {order.color} / {order.storage} / {order.carrier}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        {order.totalPrice.toLocaleString()}원
                      </p>
                      <p className="text-xs text-gray-400">{order.createdAt}</p>
                    </div>
                    <ChevronRight size={20} className="text-gray-300" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="h-2 bg-gray-100" />

        {/* Quick Links */}
        <div className="bg-white">
          <Link
            href="/login"
            className="flex items-center justify-between px-4 py-4 border-b border-gray-50"
          >
            <span className="text-gray-900">로그인</span>
            <ChevronRight size={20} className="text-gray-300" />
          </Link>
          <Link
            href="/terms"
            className="flex items-center justify-between px-4 py-4 border-b border-gray-50"
          >
            <span className="text-gray-900">이용약관</span>
            <ChevronRight size={20} className="text-gray-300" />
          </Link>
          <Link href="/privacy" className="flex items-center justify-between px-4 py-4">
            <span className="text-gray-900">개인정보처리방침</span>
            <ChevronRight size={20} className="text-gray-300" />
          </Link>
        </div>
      </div>
    </>
  );
}
