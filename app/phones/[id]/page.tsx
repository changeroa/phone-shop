import { phones } from '@/lib/mockData';
import PhoneDetailClient from './PhoneDetailClient';

export function generateStaticParams() {
  return phones.map((phone) => ({ id: phone.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function PhoneDetailPage({ params }: PageProps) {
  const { id } = await params;
  return <PhoneDetailClient phoneId={id} />;
}
