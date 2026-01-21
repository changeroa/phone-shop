import { phones } from '@/lib/mockData';
import ApplyClient from './ApplyClient';

export function generateStaticParams() {
  return phones.map((phone) => ({ id: phone.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ApplyPage({ params }: PageProps) {
  const { id } = await params;
  return <ApplyClient phoneId={id} />;
}
