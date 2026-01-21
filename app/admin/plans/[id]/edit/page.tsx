import { plans } from '@/lib/mockData';
import PlanEditClient from './PlanEditClient';

export function generateStaticParams() {
  return plans.map((plan) => ({ id: plan.id }));
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminPlanEditPage({ params }: PageProps) {
  const { id } = await params;
  return <PlanEditClient planId={id} />;
}
