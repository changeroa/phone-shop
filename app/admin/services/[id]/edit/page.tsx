import { services } from '@/lib/mockData';
import ServiceEditClient from './ServiceEditClient';

export function generateStaticParams() {
  return services.map((service) => ({ id: service.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminServiceEditPage({ params }: PageProps) {
  const { id } = await params;
  return <ServiceEditClient serviceId={id} />;
}
