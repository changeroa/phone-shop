'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPhoneNewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    manufacturer: 'Samsung',
    storage: '128GB',
    price: '',
    colors: '',
    stock: 0,
    description: '',
    features: '',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating phone:', formData);
    alert('휴대폰이 등록되었습니다.');
    router.push('/admin/phones');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/phones" className="text-blue-600 hover:text-blue-800">
            ← 휴대폰 목록
          </Link>
          <h1 className="text-2xl font-bold">새 휴대폰 등록</h1>
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
              placeholder="1550000"
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
              placeholder="블랙, 화이트, 블루"
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
              placeholder="제품에 대한 간단한 설명을 입력하세요"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">주요 기능 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="5G 지원\n트리플 카메라\n무선 충전"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">제품 이미지</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="image-upload"
              />
              <label htmlFor="image-upload" className="cursor-pointer">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <p className="mt-2 text-sm text-gray-600">클릭하여 이미지 업로드</p>
                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              </label>
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
                바로 판매 시작
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
            등록하기
          </button>
        </div>
      </form>
    </div>
  );
}