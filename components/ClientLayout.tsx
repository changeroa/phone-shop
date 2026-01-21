'use client';

import { usePathname } from 'next/navigation';
import BottomNav from './ui/BottomNav';
import KakaoFAB from './ui/KakaoFAB';

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith('/admin');

  return (
    <>
      <main className={!isAdminPage ? 'pb-14' : ''}>
        {children}
      </main>
      {!isAdminPage && (
        <>
          <BottomNav />
          <KakaoFAB />
        </>
      )}
    </>
  );
}
