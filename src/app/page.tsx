'use client';
import { useRouter } from 'next/navigation';

import Button from '@/components/Button';
import Container from '@/components/Container';

interface HomeProps {
  // searchParams: IListingsParams;
}

export default function Home() {
  const router = useRouter();

  return (
    <Container>
      <div className='flex flex-col min-h-48 mt-10 items-center'>
        <h1 className='text-6xl font-bold'>Hello World 👋</h1>
        <h1 className='text-2xl font-light'>
          Generate quizzes for your exams with AI using your own notes!
        </h1>
      </div>
      <div className='w-48 mt-4 mx-auto'>
        <Button
          label='Start Now'
          onClick={() => {
            router.push('/dashboard');
          }}
        />
      </div>
    </Container>
  );
}
