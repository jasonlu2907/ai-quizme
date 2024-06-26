'use client';

import EmptyState from '@/components/EmptyState';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/card/card';
import { SafeQuiz, SafeUser } from '@/types';
import { useRouter } from 'next/navigation';

interface QuizzesClientProps {
  currentUser?: SafeUser | null;
  quizzes?: SafeQuiz[];
}

const QuizzesClient = ({ currentUser, quizzes }: QuizzesClientProps) => {
  const router = useRouter();

  if (!quizzes || quizzes.length === 0) {
    return (
      <EmptyState
        title='No quizzes found in your profile.'
        subtitle='Create your new quiz by clicking the button below!'
      />
    );
  }

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  return (
    <main className='p-8 mx-auto max-w-7xl'>
      <div className='flex items-center'>
        <h2 className='mr-2 text-3xl font-bold tracking-tight'>
          Your Quizzes:
        </h2>
        {/* <DetailsDialog /> */}
      </div>

      <div className='grid gap-4 mt-4 lg:grid-cols-2'>
        {quizzes.map((quiz) => (
          <Card
            className='hover:cursor-pointer hover:opacity-75'
            onClick={() => {
              router.push(`/quizzes/${quiz.id}`);
            }}
            key={quiz.id}
          >
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle className='text-2xl font-bold'>{quiz.title}</CardTitle>
            </CardHeader>
            <CardContent className='flex flex-row justify-between'>
              <div className=' text-sm text-muted-foreground'>
                {quiz.description}
              </div>
              <div className='text-sm font-mono underline'>
                {formatDate(quiz.createdAt)}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* <div className='grid gap-4 mt-4 md:grid-cols-2 lg:grid-cols-7'></div> */}
    </main>
  );
};

export default QuizzesClient;
