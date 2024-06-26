import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import QuizMeCard from '@/components/dashboard/QuizMeCard';
import HistoryCard from '@/components/dashboard/HistoryCard';
import HotTopicsCard from '@/components/dashboard/HotTopicsard';
import RecentActivityCard from '@/components/dashboard/RecentCard';

interface Props {}

export const metadata = {
  title: 'Dashboard | QuizMe',
  description: 'Quiz yourself on anything!',
};

const DashboardPage = async (props: Props) => {
  const currentUser = await getCurrentUser();
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

export default DashboardPage;
