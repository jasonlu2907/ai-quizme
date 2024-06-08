'use client';

import { useCallback, useState } from 'react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AiOutlineMenu } from 'react-icons/ai';

import useLoginModal from '@/hooks/useLoginModal';
import useRegisterModal from '@/hooks/useRegisterModal';
// import useRentModal from '@/app/hooks/useRentModal';

import { SafeUser } from '@/types';
import Avatar from './Avatar';
import MenuItem from './MenuItem';

interface UserMenuProps {
  currentUser?: SafeUser | null;
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  // const rentModal = useRentModal();
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  return (
    <div className='relative'>
      <div className='flex flex-row items-center gap-3'>
        <div
          onClick={() => {}} //TODO:
          className='hidden md:block bg-emerald-600 text-yellow-100 text-sm text-center font-semibold  py-3 px-4 rounded-full hover:shadow-md hover:bg-neutral-100 hover:text-neutral-700 hover:font-bold hover:border-[1px] hover:border-neutral-400 transition cursor-pointer'
        >
          Create new quiz
        </div>
        <div
          onClick={toggleOpen}
          className='p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition'
        >
          <AiOutlineMenu size={20} />
          <div className='hidden md:block'>
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className='absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow:hidden right-0 top-12 text-sm'>
          <div className='flex flex-col cursor-pointer'>
            {currentUser ? (
              <>
                <MenuItem onClick={() => {}} label='My Profile' />
                <MenuItem onClick={() => {}} label='My Quizzes' />
                <MenuItem
                  onClick={() => {
                    signOut();
                  }}
                  label='Sign Out'
                />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label='Log In' />
                <MenuItem onClick={registerModal.onOpen} label='Sign Up' />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
