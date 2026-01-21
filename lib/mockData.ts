// Mock Data for Phone Shop

export interface Phone {
  id: string;
  name: string;
  brand: string;
  originalPrice: number;
  salePrice: number;
  image: string;
  colors: { id: string; name: string; hex: string }[];
  storages: { id: string; name: string; priceAdd: number }[];
  carriers: ('SKT' | 'KT' | 'LGU+')[];
  specs: { label: string; value: string }[];
}

export interface Plan {
  id: string;
  carrier: 'SKT' | 'KT' | 'LGU+';
  name: string;
  monthlyPrice: number;
  data: string;
  call: string;
  message: string;
}

export interface Service {
  id: string;
  carrier: 'SKT' | 'KT' | 'LGU+';
  name: string;
  description: string;
  unsubscribeFee: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  phoneName: string;
  color: string;
  storage: string;
  carrier: 'SKT' | 'KT' | 'LGU+';
  type: '신규' | '번호이동' | '기기변경';
  planName: string;
  status: '접수' | '해피콜완료' | '입금완료' | '개통완료' | '배송완료' | '취소';
  createdAt: string;
  totalPrice: number;
}

// Mock Phones
export const phones: Phone[] = [
  {
    id: '1',
    name: '갤럭시 S24 Ultra',
    brand: '삼성',
    originalPrice: 1650000,
    salePrice: 990000,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '티타늄 블랙', hex: '#1a1a1a' },
      { id: 'c2', name: '티타늄 바이올렛', hex: '#8b7bb5' },
      { id: 'c3', name: '티타늄 그레이', hex: '#9ca3af' },
    ],
    storages: [
      { id: 's1', name: '256GB', priceAdd: 0 },
      { id: 's2', name: '512GB', priceAdd: 100000 },
      { id: 's3', name: '1TB', priceAdd: 200000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2024.01.17' },
      { label: '화면', value: '6.8인치 QHD+' },
      { label: '카메라', value: '2억 화소' },
      { label: '배터리', value: '5000mAh' },
    ],
  },
  {
    id: '2',
    name: '아이폰 15 Pro Max',
    brand: '애플',
    originalPrice: 1900000,
    salePrice: 1350000,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '내추럴 티타늄', hex: '#a8a9ad' },
      { id: 'c2', name: '블루 티타늄', hex: '#394e6a' },
      { id: 'c3', name: '화이트 티타늄', hex: '#f5f5f0' },
      { id: 'c4', name: '블랙 티타늄', hex: '#1f1f1f' },
    ],
    storages: [
      { id: 's1', name: '256GB', priceAdd: 0 },
      { id: 's2', name: '512GB', priceAdd: 150000 },
      { id: 's3', name: '1TB', priceAdd: 300000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2023.09.22' },
      { label: '화면', value: '6.7인치 Super Retina XDR' },
      { label: '카메라', value: '4800만 화소' },
      { label: '칩셋', value: 'A17 Pro' },
    ],
  },
  {
    id: '3',
    name: '갤럭시 Z 플립5',
    brand: '삼성',
    originalPrice: 1350000,
    salePrice: 850000,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '민트', hex: '#98d8c8' },
      { id: 'c2', name: '크림', hex: '#f5f5dc' },
      { id: 'c3', name: '그래파이트', hex: '#383838' },
    ],
    storages: [
      { id: 's1', name: '256GB', priceAdd: 0 },
      { id: 's2', name: '512GB', priceAdd: 100000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2023.08.11' },
      { label: '화면', value: '6.7인치 폴더블' },
      { label: '카메라', value: '1200만 화소' },
      { label: '배터리', value: '3700mAh' },
    ],
  },
  {
    id: '4',
    name: '아이폰 15',
    brand: '애플',
    originalPrice: 1250000,
    salePrice: 950000,
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '블루', hex: '#a7c7e7' },
      { id: 'c2', name: '핑크', hex: '#f8d7da' },
      { id: 'c3', name: '옐로우', hex: '#fff3cd' },
      { id: 'c4', name: '그린', hex: '#d4edda' },
    ],
    storages: [
      { id: 's1', name: '128GB', priceAdd: 0 },
      { id: 's2', name: '256GB', priceAdd: 100000 },
      { id: 's3', name: '512GB', priceAdd: 250000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2023.09.22' },
      { label: '화면', value: '6.1인치 Super Retina XDR' },
      { label: '카메라', value: '4800만 화소' },
      { label: '칩셋', value: 'A16 Bionic' },
    ],
  },
  {
    id: '5',
    name: '갤럭시 S24+',
    brand: '삼성',
    originalPrice: 1350000,
    salePrice: 890000,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '오닉스 블랙', hex: '#0f0f0f' },
      { id: 'c2', name: '마블 그레이', hex: '#b0b0b0' },
      { id: 'c3', name: '코발트 바이올렛', hex: '#5c4b8a' },
    ],
    storages: [
      { id: 's1', name: '256GB', priceAdd: 0 },
      { id: 's2', name: '512GB', priceAdd: 100000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2024.01.17' },
      { label: '화면', value: '6.7인치 QHD+' },
      { label: '카메라', value: '5000만 화소' },
      { label: '배터리', value: '4900mAh' },
    ],
  },
  {
    id: '6',
    name: '갤럭시 A54',
    brand: '삼성',
    originalPrice: 550000,
    salePrice: 350000,
    image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=500&fit=crop',
    colors: [
      { id: 'c1', name: '어썸 블랙', hex: '#1f1f1f' },
      { id: 'c2', name: '어썸 화이트', hex: '#f5f5f5' },
      { id: 'c3', name: '어썸 바이올렛', hex: '#9966cc' },
    ],
    storages: [
      { id: 's1', name: '128GB', priceAdd: 0 },
      { id: 's2', name: '256GB', priceAdd: 50000 },
    ],
    carriers: ['SKT', 'KT', 'LGU+'],
    specs: [
      { label: '출시일', value: '2023.03.24' },
      { label: '화면', value: '6.4인치 FHD+' },
      { label: '카메라', value: '5000만 화소' },
      { label: '배터리', value: '5000mAh' },
    ],
  },
];

// Mock Plans
export const plans: Plan[] = [
  // SKT
  { id: 'p1', carrier: 'SKT', name: '5G 프리미어 에센셜', monthlyPrice: 69000, data: '무제한', call: '무제한', message: '무제한' },
  { id: 'p2', carrier: 'SKT', name: '5G 프리미어 플러스', monthlyPrice: 89000, data: '무제한+', call: '무제한', message: '무제한' },
  { id: 'p3', carrier: 'SKT', name: '5G 슬림', monthlyPrice: 55000, data: '100GB', call: '무제한', message: '무제한' },
  // KT
  { id: 'p4', carrier: 'KT', name: '5G 슈퍼플랜 베이직', monthlyPrice: 65000, data: '무제한', call: '무제한', message: '무제한' },
  { id: 'p5', carrier: 'KT', name: '5G 슈퍼플랜 스페셜', monthlyPrice: 85000, data: '무제한+', call: '무제한', message: '무제한' },
  { id: 'p6', carrier: 'KT', name: 'Y틴 5G', monthlyPrice: 49000, data: '80GB', call: '무제한', message: '무제한' },
  // LGU+
  { id: 'p7', carrier: 'LGU+', name: '5G 프리미어 레귤러', monthlyPrice: 68000, data: '무제한', call: '무제한', message: '무제한' },
  { id: 'p8', carrier: 'LGU+', name: '5G 프리미어 플러스', monthlyPrice: 88000, data: '무제한+', call: '무제한', message: '무제한' },
  { id: 'p9', carrier: 'LGU+', name: '5G 라이트', monthlyPrice: 52000, data: '60GB', call: '무제한', message: '무제한' },
];

// Mock Services
export const services: Service[] = [
  // SKT
  { id: 'sv1', carrier: 'SKT', name: '스팸차단 서비스', description: '스팸 문자/전화 자동 차단', unsubscribeFee: 10000 },
  { id: 'sv2', carrier: 'SKT', name: 'T전화', description: '스마트 통화 서비스', unsubscribeFee: 5000 },
  { id: 'sv3', carrier: 'SKT', name: '분실폰 찾기', description: '분실 시 위치 추적', unsubscribeFee: 8000 },
  // KT
  { id: 'sv4', carrier: 'KT', name: '스팸차단', description: '스팸 문자/전화 자동 차단', unsubscribeFee: 10000 },
  { id: 'sv5', carrier: 'KT', name: '후후', description: '발신자 정보 확인', unsubscribeFee: 5000 },
  { id: 'sv6', carrier: 'KT', name: '안심찾기', description: '분실 시 위치 추적', unsubscribeFee: 8000 },
  // LGU+
  { id: 'sv7', carrier: 'LGU+', name: '스팸차단 플러스', description: '스팸 문자/전화 자동 차단', unsubscribeFee: 10000 },
  { id: 'sv8', carrier: 'LGU+', name: '후후+', description: '발신자 정보 확인', unsubscribeFee: 5000 },
  { id: 'sv9', carrier: 'LGU+', name: '위치찾기', description: '분실 시 위치 추적', unsubscribeFee: 8000 },
];

// Mock Orders (마이페이지용)
export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-20260121-001',
    phoneName: '갤럭시 S24 Ultra',
    color: '티타늄 블랙',
    storage: '256GB',
    carrier: 'SKT',
    type: '번호이동',
    planName: '5G 프리미어 에센셜',
    status: '해피콜완료',
    createdAt: '2026-01-21',
    totalPrice: 990000,
  },
  {
    id: '2',
    orderNumber: 'ORD-20260115-003',
    phoneName: '아이폰 15 Pro Max',
    color: '내추럴 티타늄',
    storage: '256GB',
    carrier: 'KT',
    type: '기기변경',
    planName: '5G 슈퍼플랜 베이직',
    status: '개통완료',
    createdAt: '2026-01-15',
    totalPrice: 1350000,
  },
  {
    id: '3',
    orderNumber: 'ORD-20260110-007',
    phoneName: '갤럭시 Z 플립5',
    color: '민트',
    storage: '256GB',
    carrier: 'LGU+',
    type: '신규',
    planName: '5G 라이트',
    status: '취소',
    createdAt: '2026-01-10',
    totalPrice: 850000,
  },
];

// Mock Banners
export const banners = [
  {
    id: '1',
    title: '신규 가입 이벤트',
    subtitle: '최대 30% 할인 혜택',
    bgColor: 'from-blue-500 to-purple-600',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=1200&h=600&fit=crop',
  },
  {
    id: '2',
    title: '갤럭시 S24 시리즈 출시',
    subtitle: '사전예약 특가',
    bgColor: 'from-indigo-500 to-blue-600',
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=1200&h=600&fit=crop',
  },
  {
    id: '3',
    title: '번호이동 혜택',
    subtitle: '공시지원금 최대 지급',
    bgColor: 'from-purple-500 to-pink-600',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=600&fit=crop',
  },
];

// 회사 정보
export const companyInfo = {
  name: '신림염전',
  ceo: '홍길동',
  address: '서울특별시 관악구 신림로 123',
  addressDetail: 'OO빌딩 1층',
  phone: '02-1234-5678',
  businessNumber: '123-45-67890',
  hours: '10:00 - 20:00',
  closedDays: '일요일/공휴일 휴무',
  kakaoChannelUrl: 'https://pf.kakao.com/_example',
  mapLat: 37.4849,
  mapLng: 126.9296,
};
