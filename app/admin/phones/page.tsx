'use client'

import { useState } from 'react'
import Link from 'next/link'
import AdminLayout from '@/components/AdminLayout'

interface Phone {
  id: string
  name: string
  manufacturer: string
  storage: string
  colors: string[]
  price: string
  isActive: boolean
  stock: number
}

const mockPhones: Phone[] = [
  { id: '1', name: 'iPhone 15 Pro', manufacturer: 'Apple', storage: '256GB', colors: ['블랙', '화이트', '블루', '티타늄'], price: '1,550,000', isActive: true, stock: 15 },
  { id: '2', name: 'Galaxy S24 Ultra', manufacturer: 'Samsung', storage: '512GB', colors: ['팬텀블랙', '팬텀실버', '팬텀바이올렛'], price: '1,750,000', isActive: true, stock: 8 },
  { id: '3', name: 'Galaxy Z Flip 5', manufacturer: 'Samsung', storage: '256GB', colors: ['크림', '그라파이트', '라벤더', '민트'], price: '1,400,000', isActive: true, stock: 5 },
  { id: '4', name: 'iPhone 14', manufacturer: 'Apple', storage: '128GB', colors: ['미드나이트', '퍼플', '스타라이트', '레드'], price: '1,250,000', isActive: false, stock: 0 },
]

export default function AdminPhonesPage() {
  const [phones, setPhones] = useState(mockPhones)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterManufacturer, setFilterManufacturer] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredPhones = phones.filter(phone => {
    const matchesSearch = phone.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          phone.manufacturer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesManufacturer = filterManufacturer === 'all' || phone.manufacturer === filterManufacturer
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'active' && phone.isActive) ||
                         (filterStatus === 'inactive' && !phone.isActive)
    return matchesSearch && matchesManufacturer && matchesStatus
  })

  const handleToggleStatus = (id: string) => {
    setPhones(phones.map(phone => 
      phone.id === id ? { ...phone, isActive: !phone.isActive } : phone
    ))
  }

  const handleDelete = (id: string) => {
    if (confirm('정말 삭제하시겠습니까?')) {
      setPhones(phones.filter(phone => phone.id !== id))
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-heading-sm">휴대폰 관리</h2>
          <Link href="/admin/phones/new" className="btn-primary">
            새 휴대폰 등록
          </Link>
        </div>

        <div className="card p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="휴대폰 이름 또는 제조사 검색..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="input"
            />
            <select
              value={filterManufacturer}
              onChange={(e) => setFilterManufacturer(e.target.value)}
              className="select"
            >
              <option value="all">모든 제조사</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="LG">LG</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="select"
            >
              <option value="all">모든 상태</option>
              <option value="active">판매중</option>
              <option value="inactive">판매중단</option>
            </select>
          </div>
        </div>

        <div className="table-container">
          <table className="w-full">
            <thead className="table-header">
              <tr>
                <th>이미지</th>
                <th>제품명</th>
                <th>제조사</th>
                <th>용량</th>
                <th>색상</th>
                <th>가격</th>
                <th>재고</th>
                <th>상태</th>
                <th>작업</th>
              </tr>
            </thead>
            <tbody>
              {filteredPhones.map((phone) => (
                <tr key={phone.id} className="table-row">
                  <td className="px-6 py-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-xl">
                      📱
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{phone.name}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{phone.manufacturer}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{phone.storage}</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {phone.colors.map((color) => (
                        <span key={color} className="badge-gray">{color}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">{phone.price}원</td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${phone.stock > 0 ? 'text-success-600' : 'text-error-600'}`}>
                      {phone.stock}개
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleStatus(phone.id)}
                      className={phone.isActive ? 'badge-green' : 'badge-red'}
                    >
                      {phone.isActive ? '판매중' : '판매중단'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-3">
                      <Link
                        href={`/admin/phones/${phone.id}/edit`}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors"
                      >
                        수정
                      </Link>
                      <button
                        onClick={() => handleDelete(phone.id)}
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
          
          {filteredPhones.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
