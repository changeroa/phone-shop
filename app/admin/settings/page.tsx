'use client'

import { useState } from 'react'
import AdminLayout from '@/components/AdminLayout'

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState({
    siteName: '신림염전',
    siteDescription: '최고의 휴대폰 구매 경험을 제공합니다',
    contactEmail: 'admin@silrimphone.com',
    contactPhone: '02-1234-5678',
    businessHours: '평일 10:00 - 20:00, 주말 11:00 - 19:00',
    address: '서울특별시 관악구 신림동 123-45',
    googleChatWebhook: '',
    enableGoogleChat: false,
    kakaoChannelId: 'silrimphone',
    bankAccount: '국민은행 123-456-789012 (예금주: 신림염전)',
    minOrderAmount: '100000',
    deliveryFee: '3000',
    freeDeliveryAmount: '500000'
  })

  const [testMessage, setTestMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

  const handleSave = async () => {
    setIsSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1000))
    setIsSaving(false)
    alert('설정이 저장되었습니다.')
  }

  const testWebhook = async () => {
    if (!settings.googleChatWebhook) {
      alert('Google Chat Webhook URL을 먼저 입력해주세요.')
      return
    }

    setTestMessage('테스트 메시지 전송 중...')
    await new Promise(resolve => setTimeout(resolve, 1500))
    setTestMessage('테스트 메시지가 전송되었습니다. Google Chat을 확인해주세요.')
    setTimeout(() => setTestMessage(''), 3000)
  }

  return (
    <AdminLayout>
      <div className="max-w-4xl space-y-6">
        <h2 className="text-heading-sm">사이트 설정</h2>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">기본 정보</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 이름</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">사이트 설명</label>
              <textarea
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                className="input"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">연락처 정보</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
              <input
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">전화번호</label>
              <input
                type="text"
                value={settings.contactPhone}
                onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                className="input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">영업시간</label>
              <input
                type="text"
                value={settings.businessHours}
                onChange={(e) => setSettings({ ...settings, businessHours: e.target.value })}
                className="input"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
              <textarea
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="input"
                rows={2}
              />
            </div>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">알림 설정</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Google Chat Webhook URL</label>
              <input
                type="url"
                value={settings.googleChatWebhook}
                onChange={(e) => setSettings({ ...settings, googleChatWebhook: e.target.value })}
                className="input"
                placeholder="https://chat.googleapis.com/v1/spaces/..."
              />
              <p className="mt-2 text-sm text-gray-500">
                새 주문 접수 시 Google Chat으로 알림을 받습니다.
              </p>
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={settings.enableGoogleChat}
                  onChange={(e) => setSettings({ ...settings, enableGoogleChat: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Google Chat 알림 활성화</span>
              </label>
              <button onClick={testWebhook} className="btn-secondary">
                테스트 메시지 전송
              </button>
            </div>
            {testMessage && (
              <p className="text-sm text-success-600">{testMessage}</p>
            )}
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">카카오톡 설정</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">카카오 채널 ID</label>
            <input
              type="text"
              value={settings.kakaoChannelId}
              onChange={(e) => setSettings({ ...settings, kakaoChannelId: e.target.value })}
              className="input"
              placeholder="_xcLqmC"
            />
            <p className="mt-2 text-sm text-gray-500">
              카카오 채널 관리자센터에서 채널 ID를 확인할 수 있습니다.
            </p>
          </div>
        </div>

        <div className="card p-6">
          <h3 className="font-semibold text-gray-900 mb-4">결제 설정</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">입금 계좌번호</label>
              <input
                type="text"
                value={settings.bankAccount}
                onChange={(e) => setSettings({ ...settings, bankAccount: e.target.value })}
                className="input"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">최소 주문금액</label>
                <input
                  type="number"
                  value={settings.minOrderAmount}
                  onChange={(e) => setSettings({ ...settings, minOrderAmount: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">배송비</label>
                <input
                  type="number"
                  value={settings.deliveryFee}
                  onChange={(e) => setSettings({ ...settings, deliveryFee: e.target.value })}
                  className="input"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">무료배송 기준금액</label>
                <input
                  type="number"
                  value={settings.freeDeliveryAmount}
                  onChange={(e) => setSettings({ ...settings, freeDeliveryAmount: e.target.value })}
                  className="input"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="btn-primary"
          >
            {isSaving ? '저장 중...' : '설정 저장'}
          </button>
        </div>
      </div>
    </AdminLayout>
  )
}
