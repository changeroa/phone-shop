'use client'

import Link from 'next/link'
import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminDashboard() {
  const [timeRange, setTimeRange] = useState(7)
  
  const stats = {
    todayOrders: 12,
    statuses: {
      접수: 12,
      해피콜완료: 5,
      입금완료: 3,
      개통완료: 2,
      배송완료: 1,
    },
  }

  const recentOrders = [
    { id: 'ORD-0108-001', name: '홍길동', carrier: 'SKT', status: '접수' },
    { id: 'ORD-0108-002', name: '김철수', carrier: 'KT', status: '접수' },
    { id: 'ORD-0107-015', name: '박영희', carrier: 'LGU+', status: '해피콜완료' },
  ]

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      '접수': 'badge-yellow',
      '해피콜완료': 'badge-blue',
      '입금완료': 'badge-purple',
      '개통완료': 'badge-green',
      '배송완료': 'badge-gray',
    }
    return colors[status] || 'badge-gray'
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h2 className="text-heading-sm mb-6">오늘 현황</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {Object.entries(stats.statuses).map(([status, count]) => (
              <div key={status} className="card p-5 text-center">
                <div className="text-sm text-gray-500 mb-2">{status}</div>
                <div className="text-3xl font-bold text-gray-900">{count}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading-sm">접수 추이</h2>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(Number(e.target.value))}
              className="select w-auto"
            >
              <option value={7}>7일</option>
              <option value={30}>30일</option>
              <option value={90}>90일</option>
            </select>
          </div>
          <div className="card p-6">
            <div className="h-64 flex items-end justify-around gap-4">
              {[12, 10, 8, 8, 6, 4, 4].slice(0, Math.min(timeRange, 7)).map((height, i) => (
                <div key={i} className="flex flex-col items-center flex-1">
                  <div 
                    className="w-full max-w-12 bg-gradient-to-t from-primary-600 to-primary-400 rounded-t-lg transition-all duration-300 hover:from-primary-700 hover:to-primary-500" 
                    style={{ height: `${height * 18}px` }} 
                  />
                  <span className="text-xs text-gray-500 mt-3">1/{i + 2}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-heading-sm">미처리 접수</h2>
            <Link href="/admin/orders" className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors">
              전체보기 →
            </Link>
          </div>
          <div className="table-container">
            <table className="w-full">
              <thead className="table-header">
                <tr>
                  <th>접수번호</th>
                  <th>이름</th>
                  <th>통신사</th>
                  <th>상태</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order) => (
                  <tr key={order.id} className="table-row cursor-pointer">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.name}</td>
                    <td className="px-6 py-4 text-sm text-gray-700">{order.carrier}</td>
                    <td className="px-6 py-4">
                      <span className={getStatusColor(order.status)}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
