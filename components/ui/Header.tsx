'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Search, User } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showSearch?: boolean;
  showLogo?: boolean;
  transparent?: boolean;
}

export default function Header({
  title,
  showBack = false,
  showSearch = false,
  showLogo = false,
  transparent = false,
}: HeaderProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/phones?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header
      className={`h-14 flex items-center gap-3 px-4 ${
        transparent
          ? 'bg-transparent'
          : 'bg-white border-b border-gray-100'
      }`}
    >
      {/* Left - Logo or Back */}
      <div className="flex-shrink-0 flex items-center">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-9 h-9 -ml-1 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-full transition-all"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>
        )}
        {showLogo && !showBack && (
          <Link href="/" className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-900 to-gray-700 rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-sm">폰</span>
            </div>
          </Link>
        )}
      </div>

      {/* Center - Search or Title */}
      {showSearch ? (
        <form onSubmit={handleSearch} className="flex-1 max-w-md">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="기기명, 모델명으로 검색"
              className="w-full h-10 pl-10 pr-4 bg-gray-100/80 hover:bg-gray-100 rounded-2xl text-[15px] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-900/10 focus:bg-white transition-all"
            />
          </div>
        </form>
      ) : title ? (
        <h1 className="flex-1 text-center text-[17px] font-semibold text-gray-900 tracking-tight">
          {title}
        </h1>
      ) : (
        <div className="flex-1" />
      )}

      {/* Right - Login/MyPage */}
      <div className="flex-shrink-0 flex items-center">
        <Link
          href="/mypage"
          className="w-9 h-9 -mr-1 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-gray-100/80 rounded-full transition-all"
        >
          <User size={22} strokeWidth={2} />
        </Link>
      </div>
    </header>
  );
}
