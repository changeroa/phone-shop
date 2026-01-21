import { phones } from '@/lib/mockData';
import PhoneEditClient from './PhoneEditClient';

export function generateStaticParams() {
  return phones.map((phone) => ({ id: phone.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPhoneEditPage({ params }: PageProps) {
  const { id } = await params;
  return <PhoneEditClient phoneId={id} />;
}
