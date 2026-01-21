'use client';

import { useState } from 'react';
import Link from 'next/link';

interface OrderDetailClientProps {
  orderId: string;
}

// Mock data - replace with actual API call
const mockOrder = {
  id: '1',
  orderNumber: '2024010001',
  customerName: '김철수',
  phone: '010-1234-5678',
  email: 'kim@example.com',
  status: '접수',
  createdAt: '2024-01-15',
  phoneName: 'iPhone 15 Pro 256GB',
  phoneColor: '블랙',
  carrier: 'KT',
  planName: '5G 베이직',
  monthlyFee: '69,000',
  additionalServices: ['넷플릭스 베이직', 'Apple Care+'],
  discountType: '공시지원금',
  discountAmount: '400,000',
  existingCarrier: 'SKT',
  existingPhone: '010-8765-4321',
  birthDate: '1990-01-01',
  address: '서울시 강남구 테헤란로 123 456호',
  memo: '오후 2시 이후 연락 가능',
  happyCallCompleted: false,
  happyCallDate: null as string | null,
  happyCallMemo: '',
  paymentAmount: '800,000',
  paymentConfirmed: false,
  paymentDate: null as string | null,
  paymentMethod: '',
  activationCompleted: false,
  activationDate: null as string | null,
  activationNumber: '',
  deliveryCompleted: false,
  deliveryDate: null as string | null,
  deliveryCompany: '',
  trackingNumber: '',
  cancelReason: ''
};

const statusOptions = ['접수', '해피콜완료', '입금완료', '개통완료', '배송완료', '취소'];

const deliveryCompanies = [
  { value: 'cj', name: 'CJ대한통운', url: 'https://www.cjlogistics.com/ko/tool/parcel/tracking' },
  { value: 'lotte', name: '롯데택배', url: 'https://www.lotteglogis.com/home/reservation/tracking/linkView' },
  { value: 'hanjin', name: '한진택배', url: 'https://www.hanjin.com/kor/CMS/DeliveryMgr/WaybillResult.do' },
  { value: 'post', name: '우체국택배', url: 'https://service.epost.kr/trace.RetrieveDomRigiTraceList.comm' },
  { value: 'cvsnet', name: 'GS편의점택배', url: 'https://www.cvsnet.co.kr/invoice/tracking.do' }
];

export default function OrderDetailClient({ orderId }: OrderDetailClientProps) {
  // TODO: Replace mockOrder with actual data fetch using orderId
  const [order, setOrder] = useState({ ...mockOrder, id: orderId || mockOrder.id });
  const [isEditing, setIsEditing] = useState(false);

  const handleStatusChange = (newStatus: string) => {
    setOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder, status: newStatus };

      // Auto-update related fields based on status
      const today = new Date().toISOString().split('T')[0];

      switch (newStatus) {
        case '해피콜완료':
          updatedOrder.happyCallCompleted = true;
          updatedOrder.happyCallDate = today;
          break;
        case '입금완료':
          updatedOrder.paymentConfirmed = true;
          updatedOrder.paymentDate = today;
          break;
        case '개통완료':
          updatedOrder.activationCompleted = true;
          updatedOrder.activationDate = today;
          break;
        case '배송완료':
          updatedOrder.deliveryCompleted = true;
          updatedOrder.deliveryDate = today;
          break;
      }

      return updatedOrder;
    });
  };

  const handleSave = () => {
    // Save to database
    console.log('Saving order:', order);
    setIsEditing(false);
    alert('주문 정보가 업데이트되었습니다.');
  };

  const getTrackingUrl = () => {
    const company = deliveryCompanies.find(c => c.value === order.deliveryCompany);
    if (!company || !order.trackingNumber) return null;

    // Append tracking number to URL based on company
    if (order.deliveryCompany === 'cj') {
      return `${company.url}?paramInvcNo=${order.trackingNumber}`;
    } else if (order.deliveryCompany === 'lotte') {
      return `${company.url}?InvNo=${order.trackingNumber}`;
    } else if (order.deliveryCompany === 'hanjin') {
      return `${company.url}?wblnum=${order.trackingNumber}`;
    }
    return company.url;
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/orders" className="text-blue-600 hover:text-blue-800">
            ← 주문 목록
          </Link>
          <h1 className="text-2xl font-bold">주문 상세 #{order.orderNumber}</h1>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              수정
            </button>
          ) : (
            <>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                저장
              </button>
              <button
                onClick={() => {
                  setOrder(mockOrder);
                  setIsEditing(false);
                }}
                className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
              >
                취소
              </button>
            </>
          )}
        </div>
      </div>

      {/* Status Progress */}
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">주문 상태</h2>
        <div className="flex items-center gap-2 mb-4">
          {statusOptions.map((status) => (
            <button
              key={status}
              onClick={() => isEditing && handleStatusChange(status)}
              disabled={!isEditing}
              className={`px-4 py-2 rounded ${
                order.status === status
                  ? status === '취소'
                    ? 'bg-red-600 text-white'
                    : 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700'
              } ${isEditing ? 'cursor-pointer hover:opacity-80' : 'cursor-not-allowed'}`}
            >
              {status}
            </button>
          ))}
        </div>
        {order.status === '취소' && (
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">취소 사유</label>
            <textarea
              value={order.cancelReason}
              onChange={(e) => setOrder({ ...order, cancelReason: e.target.value })}
              disabled={!isEditing}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              rows={3}
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">고객 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">이름</label>
              <input
                type="text"
                value={order.customerName}
                onChange={(e) => setOrder({ ...order, customerName: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">전화번호</label>
              <input
                type="text"
                value={order.phone}
                onChange={(e) => setOrder({ ...order, phone: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">이메일</label>
              <input
                type="email"
                value={order.email}
                onChange={(e) => setOrder({ ...order, email: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">생년월일</label>
              <input
                type="date"
                value={order.birthDate}
                onChange={(e) => setOrder({ ...order, birthDate: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">배송 주소</label>
              <textarea
                value={order.address}
                onChange={(e) => setOrder({ ...order, address: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Product Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">상품 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">휴대폰</label>
              <p className="text-gray-900">{order.phoneName} ({order.phoneColor})</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">통신사</label>
              <p className="text-gray-900">{order.carrier}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">요금제</label>
              <p className="text-gray-900">{order.planName} (월 {order.monthlyFee}원)</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">부가서비스</label>
              <p className="text-gray-900">{order.additionalServices.join(', ')}</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">할인 유형</label>
              <p className="text-gray-900">{order.discountType} ({order.discountAmount}원)</p>
            </div>
          </div>
        </div>

        {/* Happy Call Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">해피콜 정보</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={order.happyCallCompleted}
                onChange={(e) => setOrder({ ...order, happyCallCompleted: e.target.checked })}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">해피콜 완료</label>
            </div>
            {order.happyCallCompleted && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">완료일</label>
                  <input
                    type="date"
                    value={order.happyCallDate || ''}
                    onChange={(e) => setOrder({ ...order, happyCallDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">메모</label>
                  <textarea
                    value={order.happyCallMemo}
                    onChange={(e) => setOrder({ ...order, happyCallMemo: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                    rows={3}
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">결제 정보</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-600">결제 금액</label>
              <input
                type="text"
                value={order.paymentAmount}
                onChange={(e) => setOrder({ ...order, paymentAmount: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={order.paymentConfirmed}
                onChange={(e) => setOrder({ ...order, paymentConfirmed: e.target.checked })}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">입금 확인</label>
            </div>
            {order.paymentConfirmed && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">입금일</label>
                  <input
                    type="date"
                    value={order.paymentDate || ''}
                    onChange={(e) => setOrder({ ...order, paymentDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">결제 방법</label>
                  <select
                    value={order.paymentMethod}
                    onChange={(e) => setOrder({ ...order, paymentMethod: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  >
                    <option value="">선택하세요</option>
                    <option value="계좌이체">계좌이체</option>
                    <option value="현금">현금</option>
                    <option value="카드">카드</option>
                  </select>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Activation Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">개통 정보</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={order.activationCompleted}
                onChange={(e) => setOrder({ ...order, activationCompleted: e.target.checked })}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">개통 완료</label>
            </div>
            {order.activationCompleted && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-600">개통일</label>
                  <input
                    type="date"
                    value={order.activationDate || ''}
                    onChange={(e) => setOrder({ ...order, activationDate: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600">개통 번호</label>
                  <input
                    type="text"
                    value={order.activationNumber}
                    onChange={(e) => setOrder({ ...order, activationNumber: e.target.value })}
                    disabled={!isEditing}
                    className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                  />
                </div>
              </>
            )}
          </div>
        </div>

        {/* Delivery Information */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">배송 정보</h2>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={order.deliveryCompleted}
                onChange={(e) => setOrder({ ...order, deliveryCompleted: e.target.checked })}
                disabled={!isEditing}
                className="w-4 h-4"
              />
              <label className="text-sm font-medium">배송 완료</label>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">택배사</label>
              <select
                value={order.deliveryCompany}
                onChange={(e) => setOrder({ ...order, deliveryCompany: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              >
                <option value="">선택하세요</option>
                {deliveryCompanies.map((company) => (
                  <option key={company.value} value={company.value}>
                    {company.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600">송장번호</label>
              <input
                type="text"
                value={order.trackingNumber}
                onChange={(e) => setOrder({ ...order, trackingNumber: e.target.value })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
              />
            </div>
            {order.deliveryCompleted && (
              <div>
                <label className="block text-sm font-medium text-gray-600">배송 완료일</label>
                <input
                  type="date"
                  value={order.deliveryDate || ''}
                  onChange={(e) => setOrder({ ...order, deliveryDate: e.target.value })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                />
              </div>
            )}
            {order.trackingNumber && order.deliveryCompany && (
              <a
                href={getTrackingUrl() || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                배송 조회
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-white rounded-lg shadow p-6 mt-6">
        <h2 className="text-lg font-semibold mb-4">메모</h2>
        <textarea
          value={order.memo}
          onChange={(e) => setOrder({ ...order, memo: e.target.value })}
          disabled={!isEditing}
          className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          rows={4}
        />
      </div>
    </div>
  );
}
