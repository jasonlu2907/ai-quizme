'use client';

import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { AiOutlineCloseSquare } from 'react-icons/ai';

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/card/card';
import { SafeQuiz, SafeUser } from '@/types';
import { useCallback } from 'react';

interface QuizzesClientProps {
  currentUser?: SafeUser | null;
  quizzes: SafeQuiz[];
}

const QuizzesClient = ({ currentUser, quizzes }: QuizzesClientProps) => {
  const router = useRouter();

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // getMonth() returns 0-based month
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  };

  const handleDelete = useCallback(
    async (quizId: string) => {
      try {
        const response = await fetch(`/api/quizzes/${quizId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const result = await response.json();
        console.log('Deleted Quiz: ', result);

        router.refresh();
        toast.success('Successfully removed!');
      } catch (error) {
        console.log('Error while deleting quiz! ', error);
      }
    },
    [router]
  );

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
          <Card className='hover:opacity-75' key={quiz.id}>
            <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
              <CardTitle
                className='text-2xl font-bold hover:underline hover:cursor-pointer'
                onClick={() => {
                  router.push(`/quizzes/${quiz.id}`);
                }}
              >
                {quiz.title}
              </CardTitle>
              <AiOutlineCloseSquare
                size={28}
                className='hover:-translate-y-0.5 hover:cursor-pointer transition'
                onClick={() => handleDelete(quiz.id)}
              />
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
