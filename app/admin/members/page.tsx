'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminMembersPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState<string | null>(null)

  const members = [
    { id: '1', name: '홍길동', email: 'hong@test.com', phone: '010-1234-5678', createdAt: '2026-01-09', orderCount: 3 },
    { id: '2', name: '김철수', email: 'kim@test.com', phone: '010-5555-6666', createdAt: '2026-01-08', orderCount: 1 },
    { id: '3', name: '이영희', email: 'lee@test.com', phone: '010-7777-8888', createdAt: '2026-01-07', orderCount: 2 },
    { id: '4', name: '박민수', email: 'park@test.com', phone: '010-2222-3333', createdAt: '2026-01-05', orderCount: 0 },
    { id: '5', name: '최수진', email: 'choi@test.com', phone: '010-9999-0000', createdAt: '2026-01-03', orderCount: 5 },
  ]

  const memberOrders = [
    { id: 'ORD-20260109-001', phone: '갤럭시 S24 Ultra', status: '해피콜완료', date: '2026-01-09', price: '1,320,000원' },
    { id: 'ORD-20260105-003', phone: 'iPhone 16 Pro', status: '배송완료', date: '2026-01-05', price: '1,550,000원' },
    { id: 'ORD-20260102-002', phone: '갤럭시 Z Flip6', status: '접수', date: '2026-01-02', price: '1,150,000원' },
  ]

  const filteredMembers = members.filter(member => {
    if (searchTerm && !Object.values(member).some(value =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )) return false
    return true
  })

  const selectedMemberData = members.find(m => m.id === selectedMember)

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      '접수': 'bg-yellow-100 text-yellow-700',
      '해피콜완료': 'bg-blue-100 text-blue-700',
      '입금완료': 'bg-purple-100 text-purple-700',
      '개통완료': 'bg-green-100 text-green-700',
      '배송완료': 'bg-gray-100 text-gray-700',
      '취소': 'bg-red-100 text-red-700',
    }
    return colors[status] || 'bg-gray-100 text-gray-700'
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* 헤더 */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">회원 관리</h1>
            <p className="text-gray-600 mt-1">가입 회원 목록을 조회합니다.</p>
          </div>
          <div className="text-sm text-gray-500">
            총 <span className="font-semibold text-gray-900">{members.length}</span>명
          </div>
        </div>

        {/* 검색 */}
        <div className="card p-4">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="이름, 이메일, 연락처로 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="flex gap-6">
          {/* 회원 목록 */}
          <div className={`card overflow-hidden ${selectedMember ? 'flex-1' : 'w-full'}`}>
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">이름</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">이메일</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">연락처</th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">가입일</th>
                  <th className="px-6 py-3 text-center text-sm font-medium text-gray-500">신청건수</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredMembers.map((member) => (
                  <tr
                    key={member.id}
                    onClick={() => setSelectedMember(member.id === selectedMember ? null : member.id)}
                    className={`cursor-pointer transition-colors ${
                      member.id === selectedMember
                        ? 'bg-blue-50'
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900">{member.name}</td>
                    <td className="px-6 py-4 text-gray-600">{member.email}</td>
                    <td className="px-6 py-4 text-gray-600">{member.phone}</td>
                    <td className="px-6 py-4 text-gray-600">{member.createdAt}</td>
                    <td className="px-6 py-4 text-center">
                      <span className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                        member.orderCount > 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-500'
                      }`}>
                        {member.orderCount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredMembers.length === 0 && (
              <div className="p-8 text-center text-gray-500">
                검색 결과가 없습니다.
              </div>
            )}
          </div>

          {/* 회원 상세 (신청 내역) */}
          {selectedMember && selectedMemberData && (
            <div className="w-96 card p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-900">회원 상세</h3>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* 회원 정보 */}
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">이름</span>
                  <span className="font-medium">{selectedMemberData.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">이메일</span>
                  <span className="font-medium">{selectedMemberData.email}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">연락처</span>
                  <span className="font-medium">{selectedMemberData.phone}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">가입일</span>
                  <span className="font-medium">{selectedMemberData.createdAt}</span>
                </div>
              </div>

              {/* 신청 내역 */}
              <div className="pt-4 border-t">
                <h4 className="font-medium text-gray-900 mb-3">신청 내역</h4>
                {selectedMemberData.orderCount > 0 ? (
                  <div className="space-y-3">
                    {memberOrders.slice(0, selectedMemberData.orderCount).map((order) => (
                      <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs font-mono text-gray-500">{order.id}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="font-medium text-sm">{order.phone}</p>
                        <div className="flex justify-between mt-1 text-xs text-gray-500">
                          <span>{order.date}</span>
                          <span className="font-medium text-gray-700">{order.price}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 text-center py-4">
                    신청 내역이 없습니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
