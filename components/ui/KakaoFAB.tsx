'use client';

import { MessageCircle } from 'lucide-react';
import { companyInfo } from '@/lib/mockData';

export default function KakaoFAB() {
  const handleClick = () => {
    window.open(companyInfo.kakaoChannelUrl, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-40 w-14 h-14 bg-[#FEE500] rounded-full flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-transform"
      aria-label="카카오톡 상담"
    >
      <MessageCircle size={28} className="text-[#391B1B]" fill="#391B1B" />
    </button>
  );
}
