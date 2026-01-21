import CustomerLayout from '@/components/CustomerLayout'

export default function PrivacyPage() {
  return (
    <CustomerLayout>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container-lg py-12 md:py-16">
          <h1 className="text-heading-xl mb-4">개인정보처리방침</h1>
          <p className="text-gray-500">최종 수정일: 2026년 1월 1일</p>
        </div>
      </div>

      <div className="container-lg py-12">
        <div className="prose prose-lg max-w-4xl">
          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">1. 개인정보의 수집 및 이용 목적</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              (주)신림염전(이하 &quot;회사&quot;)은 다음의 목적을 위해 개인정보를 처리합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2">
              <li>서비스 제공 및 계약 이행</li>
              <li>본인 확인 및 고객 상담</li>
              <li>휴대폰 개통 신청 및 배송</li>
              <li>고객 문의 응대 및 불만 처리</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">2. 수집하는 개인정보 항목</h2>
            <div className="card p-6 bg-gray-50">
              <p className="text-gray-600 leading-relaxed">
                <strong>필수항목:</strong> 이름, 연락처, 주소<br />
                <strong>선택항목:</strong> 이메일, 기존 통신사 정보
              </p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">3. 개인정보의 보유 및 이용 기간</h2>
            <p className="text-gray-600 leading-relaxed">
              회사는 개인정보 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
              단, 관계 법령에 따라 보존이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
            <ul className="list-disc pl-6 text-gray-600 space-y-2 mt-4">
              <li>계약 또는 청약철회 등에 관한 기록: 5년</li>
              <li>대금결제 및 재화 등의 공급에 관한 기록: 5년</li>
              <li>소비자의 불만 또는 분쟁처리에 관한 기록: 3년</li>
            </ul>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">4. 개인정보의 파기 절차 및 방법</h2>
            <p className="text-gray-600 leading-relaxed">
              회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가 불필요하게 되었을 때에는 
              지체 없이 해당 개인정보를 파기합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">5. 개인정보 보호책임자</h2>
            <div className="card p-6 bg-gray-50">
              <p className="text-gray-600 leading-relaxed">
                <strong>개인정보 보호책임자:</strong> 홍길동<br />
                <strong>연락처:</strong> 02-1234-5678<br />
                <strong>이메일:</strong> privacy@sinlimphone.com
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-heading-sm mb-4">6. 정보주체의 권리</h2>
            <p className="text-gray-600 leading-relaxed">
              이용자는 언제든지 자신의 개인정보에 대한 열람, 정정, 삭제, 처리 정지를 요구할 수 있습니다.
              관련 문의는 개인정보 보호책임자에게 연락해 주시기 바랍니다.
            </p>
          </section>
        </div>
      </div>
    </CustomerLayout>
  )
}
