import { Suspense } from 'react';
import RequestsList from '@/components/requests/requests-list';
import { Skeleton } from '@/components/ui/skeleton';
import { createClient } from '@/lib/supabase/server';

export const dynamic = 'force-dynamic';

export default async function RequestsPage({ searchParams }: { searchParams: { tab?: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const user_type = user?.user_metadata.user_type;

  const tab = searchParams.tab || 'all';

  return (
    <Suspense fallback={<Skeleton className="h-screen w-full" />}>
      <RequestsList user_type={user_type} tab={tab} />
    </Suspense>
  );
}
