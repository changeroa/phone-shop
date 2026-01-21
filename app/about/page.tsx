'use client'

import { useState, useEffect } from 'react'
import CustomerLayout from '@/components/CustomerLayout'

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState<{[key: string]: boolean}>({})
  const [counters, setCounters] = useState({ years: 0, customers: 0, satisfaction: 0 })

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('[data-animate]').forEach((el) => {
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible['stats']) {
      const duration = 2000
      const steps = 60
      const interval = duration / steps

      const targetValues = { years: 10, customers: 10000, satisfaction: 98 }
      let currentStep = 0

      const timer = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOut = 1 - Math.pow(1 - progress, 3)

        setCounters({
          years: Math.round(targetValues.years * easeOut),
          customers: Math.round(targetValues.customers * easeOut),
          satisfaction: Math.round(targetValues.satisfaction * easeOut)
        })

        if (currentStep >= steps) clearInterval(timer)
      }, interval)

      return () => clearInterval(timer)
    }
  }, [isVisible])

  const milestones = [
    { year: '2014', title: '회사 설립', desc: '신림동에서 첫 매장 오픈' },
    { year: '2017', title: '3사 대리점 취득', desc: 'SKT, KT, LG U+ 공식 대리점' },
    { year: '2020', title: '누적 고객 5,000명 돌파', desc: '온라인 상담 서비스 시작' },
    { year: '2024', title: '누적 고객 10,000명 돌파', desc: '온라인 몰 정식 오픈' },
  ]

  const values = [
    {
      icon: '🤝',
      title: '신뢰',
      desc: '정직한 가격과 투명한 서비스로 고객님의 신뢰를 얻겠습니다.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: '💡',
      title: '전문성',
      desc: '10년 이상의 경험으로 최적의 요금제와 기종을 추천드립니다.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: '❤️',
      title: '고객 중심',
      desc: '고객님의 입장에서 생각하고, 최선의 선택을 도와드립니다.',
      color: 'from-orange-500 to-red-500'
    },
  ]

  const teamMembers = [
    { name: '김대표', role: '대표이사', desc: '10년+ 통신업 경력', emoji: '👨‍💼' },
    { name: '이팀장', role: '영업팀장', desc: '요금제 전문 상담', emoji: '👩‍💼' },
    { name: '박상담', role: '고객상담', desc: '친절한 고객 응대', emoji: '🧑‍💻' },
  ]

  return (
    <CustomerLayout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl"></div>
        </div>
        <div className="relative container-lg py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center text-white">
            <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-6 animate-fade-in">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              About Us
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-up">
              신림염전을 소개합니다
            </h1>
            <p className="text-xl text-white/80 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              10년 이상의 경험과 진심을 담아<br/>
              고객님께 최적의 서비스를 제공합니다
            </p>
          </div>
        </div>
        {/* Wave SVG */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <section
        id="stats"
        data-animate
        className={`py-16 bg-white transition-all duration-700 ${isVisible['stats'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white">
              <div className="stat-number text-5xl">{counters.years}년+</div>
              <p className="text-gray-500 mt-2 font-medium">업력</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white">
              <div className="stat-number text-5xl">{counters.customers.toLocaleString()}+</div>
              <p className="text-gray-500 mt-2 font-medium">누적 고객</p>
            </div>
            <div className="text-center p-8 rounded-3xl bg-gradient-to-br from-gray-50 to-white">
              <div className="stat-number text-5xl">{counters.satisfaction}%</div>
              <p className="text-gray-500 mt-2 font-medium">고객 만족도</p>
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        id="story"
        data-animate
        className={`section bg-gray-50 transition-all duration-700 ${isVisible['story'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-4">Our Story</span>
              <h2 className="text-heading mb-6">우리의 이야기</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  2014년 신림동의 작은 매장에서 시작한 <strong className="text-gray-900">신림염전</strong>은
                  오늘날 <strong className="text-gray-900">10,000명 이상의 고객</strong>이 찾는
                  믿을 수 있는 휴대폰 전문점으로 성장했습니다.
                </p>
                <p>
                  SKT, KT, LG U+ 3사 모든 통신사를 취급하며,
                  <strong className="text-gray-900"> 정직한 가격</strong>과
                  <strong className="text-gray-900"> 진심 어린 상담</strong>으로
                  고객님께 최적의 선택을 도와드립니다.
                </p>
                <p>
                  이제 온라인에서도 저희 서비스를 만나보실 수 있습니다.
                  언제 어디서든 편하게 상담 신청해 주세요.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-primary-100 via-secondary-100 to-primary-100 rounded-3xl overflow-hidden shadow-2xl">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-9xl">🏪</span>
                    <p className="text-gray-500 mt-4 font-medium">신림염전 매장</p>
                  </div>
                </div>
              </div>
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">공식 대리점</p>
                    <p className="text-sm text-gray-500">SKT · KT · LG U+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section
        id="values"
        data-animate
        className={`section bg-white transition-all duration-700 ${isVisible['values'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-secondary-100 text-secondary-700 rounded-full text-sm font-medium mb-3">Core Values</span>
            <h2 className="text-heading">핵심 가치</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-3xl p-8 shadow-card hover:shadow-card-hover transition-all duration-500 overflow-hidden"
              >
                <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${value.color} opacity-10 rounded-full blur-2xl transform translate-x-1/2 -translate-y-1/2 group-hover:opacity-20 transition-opacity`}></div>
                <div className="relative z-10">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${value.color} text-white text-3xl mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-500">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        data-animate
        className={`section bg-gradient-to-b from-gray-50 to-white transition-all duration-700 ${isVisible['timeline'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-success-100 text-success-700 rounded-full text-sm font-medium mb-3">History</span>
            <h2 className="text-heading">연혁</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary-500 via-secondary-500 to-success-500"></div>

              {milestones.map((milestone, index) => (
                <div key={index} className="relative flex gap-8 pb-12 last:pb-0">
                  {/* Timeline Dot */}
                  <div className="relative z-10 flex-shrink-0">
                    <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                      <span className="text-lg font-bold text-gradient">{milestone.year}</span>
                    </div>
                  </div>
                  {/* Content */}
                  <div className="flex-1 pt-3">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{milestone.title}</h3>
                    <p className="text-gray-500">{milestone.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section
        id="team"
        data-animate
        className={`section bg-white transition-all duration-700 ${isVisible['team'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-warning-100 text-warning-700 rounded-full text-sm font-medium mb-3">Our Team</span>
            <h2 className="text-heading">팀 소개</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="group text-center bg-gradient-to-b from-gray-50 to-white rounded-3xl p-8 hover:shadow-xl transition-all duration-500"
              >
                <div className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-primary-100 to-secondary-100 rounded-full flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                  {member.emoji}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section
        id="location"
        data-animate
        className={`section bg-gray-50 transition-all duration-700 ${isVisible['location'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      >
        <div className="container-lg">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 bg-error-100 text-error-700 rounded-full text-sm font-medium mb-3">Location</span>
            <h2 className="text-heading">오시는 길</h2>
          </div>

          <div className="bg-gradient-to-br from-gray-200 to-gray-300 h-96 rounded-3xl mb-8 flex items-center justify-center shadow-inner">
            <div className="text-center">
              <span className="text-8xl">🗺️</span>
              <p className="text-gray-500 mt-4">지도 영역</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">주소</h3>
              <p className="text-gray-600">서울시 관악구 신림동 123-45</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 bg-success-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-success-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">전화</h3>
              <p className="text-gray-600">02-1234-5678</p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300">
              <div className="w-14 h-14 bg-warning-100 rounded-2xl flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-warning-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">영업시간</h3>
              <p className="text-gray-600">평일 09:00 ~ 18:00<br />(주말/공휴일 휴무)</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-primary-600 via-primary-700 to-secondary-700 text-white">
        <div className="container-lg">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              지금 바로 상담받아 보세요
            </h2>
            <p className="text-xl text-white/80 mb-8">
              10년 경력의 전문 상담원이 친절하게 안내해드립니다
            </p>
            <a href="tel:02-1234-5678" className="btn bg-white text-primary-700 hover:bg-gray-100 shadow-xl hover:shadow-2xl text-lg font-semibold">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              02-1234-5678
            </a>
          </div>
        </div>
      </section>
    </CustomerLayout>
  )
}
