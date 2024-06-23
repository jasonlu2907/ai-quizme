import { SafeUser } from '@/types';

// import DetailsDialog from '@/components/DetailsDialog';
import HistoryCard from '@/components/dashboard/HistoryCard';
import QuizMeCard from '@/components/dashboard/QuizMeCard';
import RecentActivityCard from '@/components/dashboard/RecentCard';
import EmptyState from '@/components/EmptyState';
import HotTopicsCard from '@/components/dashboard/HotTopicsard';

interface DashboardClientProps {
  currentUser?: SafeUser | null;
}

export const metadata = {
  title: 'Dashboard | QuizMe',
  description: 'Quiz yourself on anything!',
};

const DashboardClient: React.FC<DashboardClientProps> = ({ currentUser }) => {
  if (!currentUser) {
    return (
      <EmptyState
        title='You have not signed in yet!'
        subtitle='Please sign in before continue.'
      />
    );
  }

  return (
    <main className='p-8 mx-auto max-w-7xl'>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-bold tracking-tight'>Dashboard</h2>
        {/* <DetailsDialog /> */}
      </div>

      <div className='grid gap-4 mt-4 md:grid-cols-2'>
        <QuizMeCard />
        <HistoryCard />
      </div>
      <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'>
        <HotTopicsCard />
        <RecentActivityCard />
      </div>
    </main>
  );
};

export default DashboardClient;
