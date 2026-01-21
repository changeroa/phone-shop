'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminOrdersPage() {
  const [statusFilter, setStatusFilter] = useState('전체')
  const [carrierFilter, setCarrierFilter] = useState('전체')
  const [searchTerm, setSearchTerm] = useState('')

  const orders = [
    { id: 'ORD-0108-003', name: '박영희', phone: '010-9999-8888', device: '아이폰16', carrier: 'SKT', status: '접수', date: '2026-01-08' },
    { id: 'ORD-0108-002', name: '김철수', phone: '010-5555-6666', device: 'S25울트라', carrier: 'KT', status: '해피콜완료', date: '2026-01-08' },
    { id: 'ORD-0108-001', name: '홍길동', phone: '010-1234-5678', device: 'Z폴드6', carrier: 'LGU+', status: '입금완료', date: '2026-01-08' },
    { id: 'ORD-0107-015', name: '이수진', phone: '010-2222-3333', device: 'S25', carrier: 'SKT', status: '개통완료', date: '2026-01-07' },
    { id: 'ORD-0107-014', name: '최민수', phone: '010-4444-5555', device: '아이폰16', carrier: 'KT', status: '배송완료', date: '2026-01-07' },
  ]

  const filteredOrders = orders.filter(order => {
    if (statusFilter !== '전체' && order.status !== statusFilter) return false
    if (carrierFilter !== '전체' && order.carrier !== carrierFilter) return false
    if (searchTerm && !Object.values(order).some(value => 
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )) return false
    return true
  })

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      '접수': 'badge-yellow',
      '해피콜완료': 'badge-blue',
      '입금완료': 'badge-purple',
      '개통완료': 'badge-green',
      '배송완료': 'badge-gray',
      '취소': 'badge-red',
    }
    return colors[status] || 'badge-gray'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">필터</h3>
          <div className="flex flex-wrap gap-4">
            <select 
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="select w-auto"
            >
              <option value="전체">상태: 전체</option>
              <option value="접수">접수</option>
              <option value="해피콜완료">해피콜완료</option>
              <option value="입금완료">입금완료</option>
              <option value="개통완료">개통완료</option>
              <option value="배송완료">배송완료</option>
              <option value="취소">취소</option>
            </select>

            <select 
              value={carrierFilter}
              onChange={(e) => setCarrierFilter(e.target.value)}
              className="select w-auto"
            >
              <option value="전체">통신사: 전체</option>
              <option value="SKT">SKT</option>
              <option value="KT">KT</option>
              <option value="LGU+">LG U+</option>
            </select>

            <input
              type="date"
              className="input w-auto"
              defaultValue="2026-01-01"
            />
            <span className="flex items-center text-gray-400">~</span>
            <input
              type="date"
              className="input w-auto"
              defaultValue="2026-01-08"
            />
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">검색</h3>
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="이름, 연락처, 접수번호 검색"
              className="input flex-1"
            />
            <button className="btn-primary">
              검색
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <p className="text-gray-500">
            총 <span className="font-semibold text-gray-900">{filteredOrders.length}</span>건
          </p>
          <select className="select w-auto">
            <option>정렬: 최신순</option>
            <option>정렬: 오래된순</option>
          </select>
        </div>

        <div className="table-container">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th>접수번호</th>
                <th>이름</th>
                <th>연락처</th>
                <th>기종</th>
                <th>통신사</th>
                <th>상태</th>
                <th>접수일</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="table-row cursor-pointer">
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.device}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{order.carrier}</td>
                  <td className="px-6 py-4">
                    <span className={getStatusColor(order.status)}>
                      {order.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{order.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              className={`w-10 h-10 rounded-xl font-medium transition-all duration-200 ${
                page === 1 
                  ? 'bg-primary-600 text-white shadow-soft' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </AdminLayout>
  )
}
