import getCurrentUser from '../actions/getCurrentUser';
import DashboardClient from './DashBoardClient';

interface Props {}

export const metadata = {
  title: 'Dashboard | QuizMe',
  description: 'Quiz yourself on anything!',
};

const DashboardPage = async (props: Props) => {
  const currentUser = await getCurrentUser();

  return <DashboardClient currentUser={currentUser} />;
};

export default DashboardPage;
