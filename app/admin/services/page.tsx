'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

interface Service {
  id: string
  name: string
  category: string
  monthlyFee: string
  description: string
  isMandatory: boolean
  penaltyAmount: string
  isActive: boolean
}

const mockServices: Service[] = [
  { id: '1', name: '넷플릭스 베이직', category: 'OTT', monthlyFee: '9,500', description: '동시 1개 기기, HD 화질', isMandatory: true, penaltyAmount: '30,000', isActive: true },
  { id: '2', name: '유튜브 프리미엄', category: 'OTT', monthlyFee: '10,450', description: '광고 없는 유튜브, 백그라운드 재생', isMandatory: true, penaltyAmount: '30,000', isActive: true },
  { id: '3', name: 'Apple Care+', category: '보험', monthlyFee: '12,900', description: 'iPhone 파손/분실 보상', isMandatory: false, penaltyAmount: '0', isActive: true },
  { id: '4', name: '지니뮤직', category: '음악', monthlyFee: '7,900', description: '무제한 음악 스트리밍', isMandatory: true, penaltyAmount: '20,000', isActive: true },
]

export default function AdminServicesPage() {
  const [services, setServices] = useState(mockServices)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterCategory, setFilterCategory] = useState('all')

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || service.category === filterCategory
    return matchesSearch && matchesCategory
  })

  const handleToggleStatus = (id: string) => {
    setServices(services.map(service => 
      service.id === id ? { ...service, isActive: !service.isActive } : service
    ))
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setServices(services.filter(service => service.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-sm">부가서비스 관리</h2>
          <Link href="/admin/services/new" className="btn-primary">
            새 서비스 등록
          </Link>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="서비스 이름 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="select"
            >
              <option value="all">모든 카테고리</option>
              <option value="OTT">OTT</option>
              <option value="음악">음악</option>
              <option value="보험">보험</option>
              <option value="기타">기타</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th>서비스명</th>
                <th>카테고리</th>
                <th>월 요금</th>
                <th>설명</th>
                <th>필수여부</th>
                <th>위약금</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((service) => (
                <tr key={service.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{service.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="badge-purple">{service.category}</span>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{service.monthlyFee}원</td>
                  <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">{service.description}</td>
                  <td className="px-6 py-4">
                    {service.isMandatory ? (
                      <span className="badge-red">필수</span>
                    ) : (
                      <span className="badge-gray">선택</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {service.penaltyAmount !== '0' ? `${service.penaltyAmount}원` : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(service.id)}
                      className={service.isActive ? 'badge-green' : 'badge-red'}
                    >
                      {service.isActive ? '활성' : '비활성'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/services/${service.id}/edit`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(service.id)}
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
          
          {filteredServices.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
