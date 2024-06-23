import getCurrentUser from '../actions/getCurrentUser';
// import { getUserSubscription } from '@/actions/userSubscriptions';
// import { Lock, Flame } from 'lucide-react';
// import { getStripe } from '@/lib/stripe-client';
// import { PRICE_ID } from '@/lib/utils';
// import UpgradePlan from '../UpgradePlan';
import { redirect } from 'next/navigation';

import EmptyState from '@/components/EmptyState';
import DocUpload from '@/components/DocUpload';

const page = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return (
      <EmptyState
        title='Unauthorized'
        subtitle='Please sign in before continue.'
      />
    );
  }

  return (
    <div className='flex flex-col flex-1'>
      <main className='py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24'>
        <DocUpload />
      </main>
    </div>
  );
};

export default page;
