'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import CustomerLayout from '@/components/CustomerLayout'

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // 데모용 로그인 (실제로는 API 호출)
    setTimeout(() => {
      if (formData.email === 'test@test.com' && formData.password === 'test1234') {
        router.push('/mypage')
      } else {
        setError('이메일 또는 비밀번호가 일치하지 않습니다.')
      }
      setIsLoading(false)
    }, 500)
  }

  return (
    <CustomerLayout>
      <div className="min-h-[80vh] flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-md">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <h1 className="text-heading-xl">로그인</h1>
            <p className="text-gray-600 mt-2">
              신림염전에 오신 것을 환영합니다
            </p>
          </div>

          {/* 로그인 폼 */}
          <div className="card p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  이메일
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="example@email.com"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  비밀번호
                </label>
                <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="비밀번호 입력"
                  required
                />
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
                  <span className="text-gray-600">로그인 상태 유지</span>
                </label>
                <Link href="/forgot-password" className="text-primary-600 hover:text-primary-700">
                  비밀번호 찾기
                </Link>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full btn-primary py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? '로그인 중...' : '로그인'}
              </button>
            </form>

            {/* 회원가입 링크 */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-gray-600">
                아직 회원이 아니신가요?{' '}
                <Link href="/signup" className="text-primary-600 font-medium hover:text-primary-700">
                  회원가입
                </Link>
              </p>
            </div>
          </div>

          {/* 데모 안내 */}
          <div className="mt-6 p-4 bg-gray-50 rounded-xl text-center text-sm text-gray-500">
            <p>테스트 계정: test@test.com / test1234</p>
          </div>
        </div>
      </div>
    </CustomerLayout>
  )
}
