import { phones } from '@/lib/mockData';
import CompleteClient from './CompleteClient';

export function generateStaticParams() {
  return phones.map((phone) => ({ id: phone.id }));
}

export default function CompletePage() {
  return <CompleteClient />;
}
