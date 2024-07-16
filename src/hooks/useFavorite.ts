import { SafeUser } from '@/types';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import toast from 'react-hot-toast';

interface IFavorite {
  quizId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ quizId, currentUser }: IFavorite) => {
  const router = useRouter();

  const hasFavorited = useMemo(() => {
    const listOfFavs = currentUser?.favoriteIds || [];

    return listOfFavs.includes(quizId);
  }, [currentUser?.favoriteIds, quizId]);

  // TODO: Check if needed e: React.MouseEvent
  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();

      try {
        let request;
        if (!hasFavorited) {
          request = () => axios.post(`/api/favorites/${quizId}`);
        } else {
          request = () => axios.delete(`/api/favorites/${quizId}`);
        }

        await request();
        router.refresh();
        toast.success('Added favorite!');
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong. Failed to add a favorite!');
      }
    },
    [hasFavorited, quizId, router]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
