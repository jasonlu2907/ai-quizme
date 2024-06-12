// import UploadDoc from '../UploadDoc';
// import { getUserSubscription } from '@/actions/userSubscriptions';
// import { Lock, Flame } from 'lucide-react';
// import { getStripe } from '@/lib/stripe-client';
import { useRouter } from 'next/navigation';
// import { PRICE_ID } from '@/lib/utils';
// import UpgradePlan from '../UpgradePlan';
import { redirect } from 'next/navigation';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/EmptyState';

const page = async () => {
  const currentUser = await getCurrentUser();
  // const router = useRouter();

  if (!currentUser) {
    return <EmptyState title='Unauthorized' subtitle='Please log in' />;
  }

  return (
    <div className='flex flex-col flex-1'>
      <main className='py-11 flex flex-col text-center gap-4 items-center flex-1 mt-24'>
        Upload your doc here!
      </main>
    </div>
  );
};

export default page;
