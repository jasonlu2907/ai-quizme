import EmptyState from '@/components/EmptyState';
import getCurrentUser from '../actions/getCurrentUser';
import ProfileClient from './ProfileClient';

interface Props {}

export const metadata = {
  title: 'Profile | QuizMe',
  description: 'My Profile',
};

const Profile = async (props: Props) => {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return (
      <EmptyState
        title='You have not signed in yet!'
        subtitle='Please sign in before continue.'
      />
    );
  }

  return <ProfileClient currentUser={currentUser} />;
};

export default Profile;
