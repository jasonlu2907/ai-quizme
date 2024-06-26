import getQuizzes from '../actions/getQuizzes';
import getCurrentUser from '../actions/getCurrentUser';
import EmptyState from '@/components/EmptyState';
import QuizzesClient from './QuizzesClient';

const QuizzesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyState
        title='You have not signed in yet!'
        subtitle='Please sign in before continue.'
      />
    );

  const quizzes = await getQuizzes({ userId: currentUser.id });

  return <QuizzesClient currentUser={currentUser} quizzes={quizzes} />;
};

export default QuizzesPage;
