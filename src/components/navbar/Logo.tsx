'use client';
import Link from 'next/link';

type Props = {};

const Logo = (props: Props) => {
  return (
    <Link href={'/'} className='flex items-center gap-2'>
      <p className='rounded-lg border-2 border-b-4 border-r-4 border-black px-2 py-1 text-2xl font-bold transition-all hover:-translate-y-[2px] md:block dark:border-white'>
        Quiz Me!
      </p>
    </Link>
  );
};

export default Logo;
