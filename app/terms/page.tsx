import CustomerLayout from '@/components/CustomerLayout'

export default function TermsPage() {
  return (
    <CustomerLayout>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="container-lg py-12 md:py-16">
          <h1 className="text-heading-xl mb-4">이용약관</h1>
          <p className="text-gray-500">최종 수정일: 2026년 1월 1일</p>
        </div>
      </div>

      <div className="container-lg py-12">
        <div className="prose prose-lg max-w-4xl">
          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">제1조 (목적)</h2>
            <p className="text-gray-600 leading-relaxed">
              이 약관은 (주)신림염전(이하 &quot;회사&quot;)이 제공하는 휴대폰 판매 서비스의 이용과 관련하여 
              회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">제2조 (정의)</h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p>1. &quot;서비스&quot;란 회사가 제공하는 휴대폰 판매 및 관련 서비스를 말합니다.</p>
              <p>2. &quot;이용자&quot;란 이 약관에 따라 회사가 제공하는 서비스를 이용하는 자를 말합니다.</p>
              <p>3. &quot;주문&quot;이란 이용자가 서비스를 통해 휴대폰 구매를 신청하는 것을 말합니다.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">제3조 (약관의 효력과 변경)</h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p>1. 이 약관은 서비스를 이용하고자 하는 모든 이용자에게 적용됩니다.</p>
              <p>2. 회사는 필요한 경우 약관을 변경할 수 있으며, 변경된 약관은 웹사이트에 공지합니다.</p>
              <p>3. 이용자가 변경된 약관에 동의하지 않는 경우 서비스 이용을 중단할 수 있습니다.</p>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="text-heading-sm mb-4">제4조 (서비스 이용)</h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p>1. 서비스는 연중무휴 24시간 제공함을 원칙으로 합니다.</p>
              <p>2. 회사는 시스템 점검 등의 사유로 서비스를 일시 중단할 수 있습니다.</p>
              <p>3. 상담 서비스는 영업시간 내 제공됩니다.</p>
            </div>
          </section>

          <section>
            <h2 className="text-heading-sm mb-4">제5조 (책임의 제한)</h2>
            <div className="text-gray-600 leading-relaxed space-y-2">
              <p>1. 회사는 천재지변 등 불가항력으로 인한 서비스 중단에 대해 책임을 지지 않습니다.</p>
              <p>2. 이용자의 귀책사유로 인한 서비스 이용 장애에 대해 회사는 책임을 지지 않습니다.</p>
            </div>
          </section>
        </div>
      </div>
    </CustomerLayout>
  )
}
