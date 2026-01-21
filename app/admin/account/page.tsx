'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminAccountPage() {
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (newPassword !== confirmPassword) {
      setError('새 비밀번호가 일치하지 않습니다.')
      return
    }

    if (newPassword.length < 8) {
      setError('비밀번호는 최소 8자 이상이어야 합니다.')
      return
    }

    setSuccess('비밀번호가 성공적으로 변경되었습니다.')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  return (
    <AdminLayout>
      <div className="max-w-2xl space-y-6">
        <h2 className="text-heading-sm">계정 설정</h2>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">비밀번호 변경</h3>
          
          {error && (
            <div className="mb-4 p-4 bg-error-50 text-error-700 rounded-xl border border-error-200">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-4 bg-success-50 text-success-700 rounded-xl border border-success-200">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">현재 비밀번호</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="input"
                required
              />
              <p className="mt-2 text-sm text-gray-500">최소 8자 이상</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">새 비밀번호 확인</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input"
                required
              />
            </div>

            <button type="submit" className="btn-primary w-full">
              비밀번호 변경
            </button>
          </form>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">계정 정보</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-gray-100">
              <span className="text-sm text-gray-500">관리자 ID</span>
              <span className="font-medium text-gray-900">admin</span>
            </div>
            <div className="flex justify-between items-center py-3">
              <span className="text-sm text-gray-500">마지막 로그인</span>
              <span className="font-medium text-gray-900">2026-01-08 14:30</span>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
