'use client';

import { useRouter } from 'next/navigation';
import Heading from './Heading';
import Button from './Button';

interface EmptyStateProps {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
  showCreateNew?: boolean;
}

const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No matches found',
  subtitle = 'Try searching for something else or modify your filter options',
  showReset,
  showCreateNew,
}) => {
  const router = useRouter();

  return (
    <div className='h-[60vh] flex flex-col gap-2 justify-center items-center '>
      <Heading center title={title} subtitle={subtitle} />
      <div className='w-48 mt-4'>
        {showReset && (
          <Button
            outline
            label='Remove all filters'
            onClick={() => router.push('/')}
          />
        )}
        {showCreateNew && (
          <Button
            outline
            label='Create New Quiz'
            onClick={() => router.push('/new')}
          />
        )}
      </div>
    </div>
  );
};

export default EmptyState;
