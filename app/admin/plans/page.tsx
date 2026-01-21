'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

interface Plan {
  id: string
  name: string
  carrier: string
  dataAmount: string
  monthlyFee: string
  category: string
  isActive: boolean
  description: string
}

const mockPlans: Plan[] = [
  { id: '1', name: '5G 베이직', carrier: 'KT', dataAmount: '110GB', monthlyFee: '69,000', category: '5G', isActive: true, description: '기본 데이터 110GB + 속도제한 없음' },
  { id: '2', name: '5G 스페셜', carrier: 'KT', dataAmount: '무제한', monthlyFee: '89,000', category: '5G', isActive: true, description: '완전 무제한 + 로밍 혜택' },
  { id: '3', name: 'LTE 라이트', carrier: 'SKT', dataAmount: '10GB', monthlyFee: '35,000', category: 'LTE', isActive: true, description: '가벼운 사용자를 위한 요금제' },
  { id: '4', name: '시니어 안심', carrier: 'LGU+', dataAmount: '5GB', monthlyFee: '25,000', category: '시니어', isActive: true, description: '65세 이상 특별 할인' },
]

export default function AdminPlansPage() {
  const [plans, setPlans] = useState(mockPlans)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCarrier, setFilterCarrier] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredPlans = plans.filter(plan => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCarrier = filterCarrier === 'all' || plan.carrier === filterCarrier
    const matchesCategory = filterCategory === 'all' || plan.category === filterCategory
    return matchesSearch && matchesCarrier && matchesCategory
  })

  const handleToggleStatus = (id: string) => {
    setPlans(plans.map(plan => 
      plan.id === id ? { ...plan, isActive: !plan.isActive } : plan
    ))
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPlans(plans.filter(plan => plan.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-sm">요금제 관리</h2>
          <Link href="/admin/plans/new" className="btn-primary">
            새 요금제 등록
          </Link>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="요금제 이름 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <select
              value={filterCarrier}
              onChange={(e) => setFilterCarrier(e.target.value)}
              className="select"
            >
              <option value="all">모든 통신사</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LGU+">LGU+</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select"
            >
              <option value="all">모든 카테고리</option>
              <option value="5G">5G</option>
              <option value="LTE">LTE</option>
              <option value="시니어">시니어</option>
              <option value="청소년">청소년</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th>요금제명</th>
                <th>통신사</th>
                <th>카테고리</th>
                <th>데이터</th>
                <th>월 요금</th>
                <th>설명</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlans.map((plan) => (
                <tr key={plan.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{plan.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{plan.carrier}</td>
                  <td className="px-6 py-4">
                    <span className="badge-blue">{plan.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{plan.dataAmount}</td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{plan.monthlyFee}원</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{plan.description}</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(plan.id)}
                      className={plan.isActive ? 'badge-green' : 'badge-red'}
                    >
                      {plan.isActive ? '활성' : '비활성'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/plans/${plan.id}/edit`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(plan.id)}
                        className="text-error-600 hover:text-error-700 font-medium text-sm transition-colors"
                      >
                        삭제
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredPlans.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
