'use client';
import Image from 'next/image';

interface AvatarProps {
  src?: string | null | undefined;
}

const Avatar = (props: AvatarProps) => {
  return (
    <Image
      className='rounded-full'
      height='35'
      width='35'
      alt='Avatar'
      src={props.src || '/images/placeholder.jpg'}
    />
  );
};

export default Avatar;
