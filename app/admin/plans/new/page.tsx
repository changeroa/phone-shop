'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPlanNewPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    carrier: 'KT',
    category: '5G',
    dataAmount: '',
    monthlyFee: '',
    description: '',
    features: '',
    isActive: true
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Creating plan:', formData);
    alert('요금제가 등록되었습니다.');
    router.push('/admin/plans');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/plans" className="text-blue-600 hover:text-blue-800">
            ← 요금제 목록
          </Link>
          <h1 className="text-2xl font-bold">새 요금제 등록</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">요금제명 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">통신사 *</label>
            <select
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LGU+">LGU+</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리 *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="5G">5G</option>
              <option value="LTE">LTE</option>
              <option value="시니어">시니어</option>
              <option value="청소년">청소년</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">데이터 용량 *</label>
            <input
              type="text"
              value={formData.dataAmount}
              onChange={(e) => setFormData({ ...formData, dataAmount: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="110GB 또는 무제한"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">월 요금 (원) *</label>
            <input
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              placeholder="69000"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">요금제 설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">주요 혜택 (줄바꿈으로 구분)</label>
            <textarea
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="무료 통화 무제한\n무료 문자 무제한\n데이터 소진 후 5Mbps"
            />
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
                바로 활성화
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link
            href="/admin/plans"
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