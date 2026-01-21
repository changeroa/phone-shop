'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface PhoneEditClientProps {
  phoneId: string;
}

const mockPhone = {
  id: '1',
  name: 'iPhone 15 Pro',
  manufacturer: 'Apple',
  storage: '256GB',
  price: '1550000',
  colors: '블랙, 화이트, 블루, 티타늄',
  stock: 15,
  description: '최신 A17 Pro 칩과 티타늄 디자인을 갖춘 프리미엄 스마트폰',
  features: '5G 지원\n트리플 카메라 시스템\n액션 버튼\n무선 충전 지원',
  isActive: true
};

export default function PhoneEditClient({ phoneId }: PhoneEditClientProps) {
  const router = useRouter();

  // TODO: Replace mockPhone with actual data fetch using phoneId
  const [formData, setFormData] = useState({ ...mockPhone, id: phoneId || mockPhone.id });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating phone:', formData);
    alert('휴대폰 정보가 수정되었습니다.');
    router.push('/admin/phones');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/phones" className="text-blue-600 hover:text-blue-800">
            ← 휴대폰 목록
          </Link>
          <h1 className="text-2xl font-bold">휴대폰 수정</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">제품명 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">제조사 *</label>
            <select
              value={formData.manufacturer}
              onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="Samsung">Samsung</option>
              <option value="Apple">Apple</option>
              <option value="LG">LG</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">저장 용량 *</label>
            <select
              value={formData.storage}
              onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="64GB">64GB</option>
              <option value="128GB">128GB</option>
              <option value="256GB">256GB</option>
              <option value="512GB">512GB</option>
              <option value="1TB">1TB</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">가격 (원) *</label>
            <input
              type="number"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">색상 (콤마로 구분) *</label>
            <input
              type="text"
              value={formData.colors}
              onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">재고 수량</label>
            <input
              type="number"
              value={formData.stock}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              min="0"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">제품 설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">주요 기능 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">제품 이미지</label>
            <div className="space-y-4">
              <div className="w-32 h-32 bg-gray-200 rounded flex items-center justify-center">
                현재 이미지
              </div>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="image-upload"
                />
                <label htmlFor="image-upload" className="cursor-pointer flex items-center gap-2">
                  <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  <span className="text-sm text-gray-600">새 이미지 업로드</span>
                </label>
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                판매 중
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link
            href="/admin/phones"
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            취소
          </Link>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            수정하기
          </button>
        </div>
      </form>
    </div>
  );
}
