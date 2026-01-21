'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Smartphone, FileText, Building2 } from 'lucide-react';

const navItems = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/phones', icon: Smartphone, label: '단말기' },
  { href: '/mypage', icon: FileText, label: '내신청' },
  { href: '/company', icon: Building2, label: '매장안내' },
];

export default function BottomNav() {
  const pathname = usePathname();

  // admin 페이지에서는 숨김
  if (pathname?.startsWith('/admin')) return null;

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname?.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-100 pb-[env(safe-area-inset-bottom)]">
      <div className="flex justify-around items-center h-14 max-w-lg mx-auto">
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${
                active ? 'text-primary-500' : 'text-gray-400'
              }`}
            >
              <item.icon size={24} strokeWidth={active ? 2 : 1.5} />
              <span className={`text-[11px] mt-0.5 ${active ? 'font-semibold' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
