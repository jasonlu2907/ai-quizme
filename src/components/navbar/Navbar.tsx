'use client';

import { SafeUser } from '@/types';

import Container from '../Container';
import Logo from './Logo';
import UserMenu from './UserMenu';

interface NavbarProps {
  currentUser?: SafeUser | null; // User model from our prisma schemas
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  return (
    <div className='w-full bg-white z-10 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex flex-row items-center justify-between gap-3 md:gap-0'>
            <Logo />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
    </div>
  );
};

export default Navbar;
