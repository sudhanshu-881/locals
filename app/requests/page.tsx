
import { Suspense } from 'react';
import RequestsList from '@/components/requests/requests-list';
import { Skeleton } from '@/components/ui/skeleton';

export default function RequestsPage() {
  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <RequestsList />
    </Suspense>
  );
}
