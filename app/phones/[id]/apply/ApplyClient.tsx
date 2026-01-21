'use client';

import { useState } from 'react';
import { useRouter, notFound } from 'next/navigation';
import Link from 'next/link';
import Header from '@/components/ui/Header';
import { phones, plans, services } from '@/lib/mockData';

interface ApplyClientProps {
  phoneId: string;
}

type ActivationType = '신규' | '번호이동' | '기기변경';

export default function ApplyClient({ phoneId }: ApplyClientProps) {
  const router = useRouter();

  // Find phone from mock data with proper null check
  const phone = phones.find((p) => p.id === phoneId);

  // Handle case where phone is not found
  if (!phone || phone.colors.length === 0 || phone.storages.length === 0) {
    notFound();
  }

  const [formData, setFormData] = useState({
    colorId: phone.colors[0].id,
    storageId: phone.storages[0].id,
    carrier: '' as '' | 'SKT' | 'KT' | 'LGU+',
    planId: '',
    serviceIds: [] as string[],
    activationType: '번호이동' as ActivationType,
    name: '',
    phone: '',
    request: '',
    agreeTerms: false,
    agreePrivacy: false,
  });

  const selectedColor = phone.colors.find((c) => c.id === formData.colorId) ?? phone.colors[0];
  const selectedStorage = phone.storages.find((s) => s.id === formData.storageId) ?? phone.storages[0];
  const selectedPlan = plans.find((p) => p.id === formData.planId);

  const filteredPlans = formData.carrier ? plans.filter((p) => p.carrier === formData.carrier) : [];
  const filteredServices = formData.carrier ? services.filter((s) => s.carrier === formData.carrier) : [];

  const totalPrice = phone.salePrice + (selectedStorage?.priceAdd || 0);

  const isFormValid =
    formData.carrier &&
    formData.planId &&
    formData.name &&
    formData.phone &&
    formData.agreeTerms &&
    formData.agreePrivacy;

  const handleSubmit = () => {
    if (isFormValid) {
      router.push(`/phones/${phoneId}/apply/complete`);
    }
  };

  const activationTypes: ActivationType[] = ['신규', '번호이동', '기기변경'];

  return (
    <>
      <Header title="개통 신청" showBack />

      <div className="pt-14 pb-32">
        {/* Section 1: Selected Phone */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">선택한 단말기</h2>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl">
            <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center text-3xl">
              📱
            </div>
            <div className="flex-1">
              <p className="font-semibold text-gray-900">{phone.name}</p>
              <p className="text-sm text-gray-500">
                {selectedColor.name} / {selectedStorage.name}
              </p>
              <p className="text-sm font-bold text-primary-600 mt-1">
                {totalPrice.toLocaleString()}원
              </p>
            </div>
            <Link
              href={`/phones/${phoneId}`}
              className="px-3 py-1.5 text-xs font-medium text-gray-600 bg-gray-100 rounded-lg"
            >
              변경
            </Link>
          </div>
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 2: Carrier Selection */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">통신사 선택</h2>
          <div className="grid grid-cols-3 gap-3">
            {(['SKT', 'KT', 'LGU+'] as const).map((carrier) => (
              <button
                key={carrier}
                onClick={() => setFormData({ ...formData, carrier, planId: '', serviceIds: [] })}
                className={`py-4 rounded-xl text-sm font-semibold transition-all ${
                  formData.carrier === carrier
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {carrier}
              </button>
            ))}
          </div>
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 3: Plan Selection */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">요금제 선택</h2>
          {!formData.carrier ? (
            <p className="text-sm text-gray-400 text-center py-8">먼저 통신사를 선택해주세요</p>
          ) : (
            <div className="space-y-3">
              {filteredPlans.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setFormData({ ...formData, planId: plan.id })}
                  className={`w-full p-4 rounded-xl text-left transition-all ${
                    formData.planId === plan.id
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-semibold text-gray-900">{plan.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        데이터 {plan.data} | 통화 {plan.call} | 문자 {plan.message}
                      </p>
                    </div>
                    <p className="font-bold text-primary-600">월 {plan.monthlyPrice.toLocaleString()}원</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 4: Additional Services */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-1">부가서비스 (선택)</h2>
          <p className="text-xs text-gray-400 mb-3">미가입 시 해지비용이 발생할 수 있습니다</p>
          {!formData.carrier ? (
            <p className="text-sm text-gray-400 text-center py-8">먼저 통신사를 선택해주세요</p>
          ) : (
            <div className="space-y-2">
              {filteredServices.map((service) => (
                <label
                  key={service.id}
                  className={`flex items-center justify-between p-4 rounded-xl cursor-pointer transition-all ${
                    formData.serviceIds.includes(service.id)
                      ? 'bg-primary-50 border-2 border-primary-500'
                      : 'bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={formData.serviceIds.includes(service.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, serviceIds: [...formData.serviceIds, service.id] });
                        } else {
                          setFormData({
                            ...formData,
                            serviceIds: formData.serviceIds.filter((id) => id !== service.id),
                          });
                        }
                      }}
                      className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                    />
                    <div>
                      <p className="font-medium text-gray-900">{service.name}</p>
                      <p className="text-xs text-gray-500">{service.description}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">해지비 {service.unsubscribeFee.toLocaleString()}원</span>
                </label>
              ))}
            </div>
          )}
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 5: Activation Type */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-3">개통 유형</h2>
          <div className="flex gap-2">
            {activationTypes.map((type) => (
              <button
                key={type}
                onClick={() => setFormData({ ...formData, activationType: type })}
                className={`flex-1 py-3 rounded-xl text-sm font-medium transition-all ${
                  formData.activationType === type
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 6: Customer Info */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">고객 정보</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="홍길동"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">요청사항 (선택)</label>
              <textarea
                value={formData.request}
                onChange={(e) => setFormData({ ...formData, request: e.target.value })}
                placeholder="추가 요청사항을 입력해주세요"
                rows={3}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              />
            </div>
          </div>
        </section>

        <div className="h-2 bg-gray-100" />

        {/* Section 7: Agreement */}
        <section className="px-4 py-6 bg-white">
          <h2 className="text-sm font-semibold text-gray-500 mb-4">약관 동의</h2>
          <div className="space-y-3">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreeTerms}
                onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                <span className="text-red-500">[필수]</span>{' '}
                <Link href="/terms" className="text-primary-600 underline">
                  이용약관
                </Link>
                에 동의합니다
              </span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreePrivacy}
                onChange={(e) => setFormData({ ...formData, agreePrivacy: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
              />
              <span className="text-sm text-gray-700">
                <span className="text-red-500">[필수]</span>{' '}
                <Link href="/privacy" className="text-primary-600 underline">
                  개인정보처리방침
                </Link>
                에 동의합니다
              </span>
            </label>
          </div>
        </section>
      </div>

      {/* Fixed Bottom CTA */}
      <div className="fixed bottom-14 left-0 right-0 z-40 bg-white border-t border-gray-100 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-gray-500">예상 금액</span>
          <div className="text-right">
            <span className="text-lg font-bold text-gray-900">{totalPrice.toLocaleString()}원</span>
            {selectedPlan && (
              <span className="text-sm text-gray-500 ml-2">
                + 월 {selectedPlan.monthlyPrice.toLocaleString()}원
              </span>
            )}
          </div>
        </div>
        <button
          onClick={handleSubmit}
          disabled={!isFormValid}
          className={`w-full py-4 rounded-xl font-semibold transition-all ${
            isFormValid
              ? 'bg-primary-500 text-white hover:bg-primary-600 active:scale-[0.98]'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }`}
        >
          신청하기
        </button>
      </div>
    </>
  );
}
