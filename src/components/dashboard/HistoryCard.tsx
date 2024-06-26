'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/card/card';
import { useRouter } from 'next/navigation';
import { History } from 'lucide-react';

type Props = {};

const HistoryCard = (props: Props) => {
  const router = useRouter();
  return (
    <Card
      className='hover:cursor-pointer hover:opacity-75'
      onClick={() => {
        router.push('/quizzes');
      }}
    >
      <CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
        <CardTitle className='text-2xl font-bold'>Past Quizzes</CardTitle>
        <History size={28} strokeWidth={2.5} />
      </CardHeader>
      <CardContent>
        <p className='text-md text-muted-foreground'>
          View past quiz attempts.
        </p>
      </CardContent>
    </Card>
  );
};

export default HistoryCard;
