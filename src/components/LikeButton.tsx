import React, { useState } from 'react';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

import { SafeUser } from '@/types';
import useFavorite from '@/hooks/useFavorite';

interface Props {
  quizId: string;
  currentUser?: SafeUser | null;
}

const LikeButton: React.FC<Props> = ({ quizId, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({ quizId, currentUser });

  return (
    <div
      onClick={toggleFavorite}
      className='relative hover:opacity-80 transition cursor-pointer'
    >
      <AiOutlineLike size={26} className='absolute -top-[2px] -right-[2px]' />
      <AiFillLike
        size={24}
        className={hasFavorited ? 'fill-black' : 'fill-neutral-500/40'}
      />
    </div>
  );
};

export default LikeButton;
