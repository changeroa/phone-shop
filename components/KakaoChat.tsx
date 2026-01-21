'use client';

import { useEffect, useRef } from 'react';

interface KakaoChatProps {
  channelId?: string;
}

export default function KakaoChat({ channelId = '_xcLqmC' }: KakaoChatProps) {
  const scriptRef = useRef<HTMLScriptElement | null>(null);

  useEffect(() => {
    // Check if script already exists
    const existingScript = document.querySelector('script[src*="kakao.js"]');
    if (existingScript) {
      // Script already loaded, just initialize if needed
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
        if (appKey) {
          window.Kakao.init(appKey);
        }
      }
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.js';
    script.async = true;
    scriptRef.current = script;

    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        const appKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
        if (appKey) {
          window.Kakao.init(appKey);
        }
      }
    };

    script.onerror = () => {
      console.warn('Failed to load Kakao SDK. Falling back to direct link.');
    };

    document.head.appendChild(script);

    return () => {
      // Only remove if we added it and it's still in the DOM
      if (scriptRef.current && scriptRef.current.parentNode) {
        scriptRef.current.parentNode.removeChild(scriptRef.current);
      }
    };
  }, []);

  const handleChatClick = () => {
    if (typeof window === 'undefined') return;

    if (window.Kakao?.Channel) {
      window.Kakao.Channel.chat({
        channelPublicId: channelId
      });
    } else {
      window.open(`https://pf.kakao.com/${channelId}/chat`, '_blank');
    }
  };

  return (
    <button
      onClick={handleChatClick}
      className="fixed bottom-6 right-6 z-50 bg-yellow-400 hover:bg-yellow-500 text-black rounded-full p-4 shadow-lg transition-all hover:scale-110"
      aria-label="카카오톡 상담"
    >
      <svg
        className="w-8 h-8"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 3C6.48 3 2 6.84 2 11.5c0 2.99 1.84 5.61 4.61 7.11-.12.48-.44 1.76-.47 1.87-.05.19.07.38.26.42.06.01.11.02.17.02.13 0 .26-.05.35-.15.59-.62 2.17-2.3 2.82-3.01.41.05.83.08 1.26.08 5.52 0 10-3.84 10-8.5S17.52 3 12 3z"/>
      </svg>
    </button>
  );
}

declare global {
  interface Window {
    Kakao: any;
  }
}