'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ServiceEditClientProps {
  serviceId: string;
}

const mockService = {
  id: '1',
  name: '넷플릭스 베이직',
  category: 'OTT',
  monthlyFee: '9500',
  description: '동시 1개 기기, HD 화질',
  isMandatory: true,
  penaltyAmount: '30000',
  isActive: true
};

export default function ServiceEditClient({ serviceId }: ServiceEditClientProps) {
  const router = useRouter();

  // TODO: Replace mockService with actual data fetch using serviceId
  const [formData, setFormData] = useState({ ...mockService, id: serviceId || mockService.id });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating service:', formData);
    alert('부가서비스가 수정되었습니다.');
    router.push('/admin/services');
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin/services" className="text-blue-600 hover:text-blue-800">
            ← 서비스 목록
          </Link>
          <h1 className="text-2xl font-bold">부가서비스 수정</h1>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">서비스명 *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">카테고리 *</label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="OTT">OTT</option>
              <option value="음악">음악</option>
              <option value="보험">보험</option>
              <option value="기타">기타</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">월 요금 (원) *</label>
            <input
              type="number"
              value={formData.monthlyFee}
              onChange={(e) => setFormData({ ...formData, monthlyFee: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">미가입 시 위약금 (원)</label>
            <input
              type="number"
              value={formData.penaltyAmount}
              onChange={(e) => setFormData({ ...formData, penaltyAmount: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              disabled={!formData.isMandatory}
            />
            <p className="mt-1 text-sm text-gray-600">필수 서비스인 경우에만 적용</p>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2">서비스 설명</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>

          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isMandatory"
                checked={formData.isMandatory}
                onChange={(e) => setFormData({
                  ...formData,
                  isMandatory: e.target.checked,
                  penaltyAmount: e.target.checked ? formData.penaltyAmount : '0'
                })}
                className="w-4 h-4"
              />
              <label htmlFor="isMandatory" className="text-sm font-medium">
                필수 가입 서비스로 설정
              </label>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isActive"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-4 h-4"
              />
              <label htmlFor="isActive" className="text-sm font-medium">
                활성화 상태
              </label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link
            href="/admin/services"
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
