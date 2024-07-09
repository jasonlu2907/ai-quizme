'use client';

import Image from 'next/image';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';

import Button from '@/components/Button';
import { SafeUser } from '@/types';
import { CldUploadWidget } from 'next-cloudinary';
import { useCallback, useState } from 'react';

interface Props {
  currentUser?: SafeUser;
}

declare global {
  var cloudinary: any;
}

export const metadata = {
  title: 'Profile | QuizMe',
  description: 'My Profile',
};

const ProfileClient: React.FC<Props> = ({ currentUser }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name || '',
      password: '',
    },
  });

  const [imageSrc, setImageSrc] = useState('/images/placeholder.jpg');

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const response = await fetch('/api/profile-update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to update the profile');
    }

    const result = await response.json();
    console.log(result);

    reset({ password: '' });
  };

  const handleUpload = useCallback(async (result: any) => {
    setImageSrc(result.info.secure_url);

    const response = await fetch('/api/profile-update', {
      method: 'POST',
      body: JSON.stringify(result.info.secure_url),
    });

    if (!response.ok) {
      throw new Error('Failed to change your pfp!');
    }

    const res = await response.json();
    console.log(res);
  }, []);

  return (
    <main className='p-8 mx-auto max-w-7xl'>
      <div className='flex flex-col'>
        <h2 className='mr-2 text-3xl font-bold tracking-tight'>Profile</h2>
        <h2 className='mr-2 text-lg font-thin tracking-tight'>
          This is how others will see you on the site.
        </h2>
      </div>

      <div className='flex flex-row justify-between'>
        <form className='space-y-8 mt-6'>
          <div className='space-y-2'>
            <label className='text-lg font-medium leading-none '>Name:</label>
            <input
              className='flex h-11 w-full rounded-md border  bg-transparent px-3 py-1 text-md shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              id='name'
              {...register('name')}
              type='text'
            />
            <p className='text-[0.9rem] text-sm font-extralight'>
              This is your public display name. It can be your real name or a
              pseudonym. You can only change this once every 30 days.
            </p>
          </div>

          <div className='space-y-2'>
            <label className='text-lg font-medium leading-none '>
              Password:
            </label>
            <input
              className='flex h-11 w-full rounded-md border  bg-transparent px-3 py-1 text-md shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50'
              id='password'
              type='password'
              {...register('password', {
                minLength: {
                  value: 8,
                  message: 'Password must has at least 8 characters',
                },
                pattern: {
                  value: /[!@#$%^&*(),.?":{}|<>]/,
                  message:
                    'Password must contain at least one special character',
                },
              })}
            />
            {errors.password && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.password.message?.toString()}
              </p>
            )}
            <p className='text-[0.9rem] text-sm font-extralight'>
              Enter your new password. You can only change your password once
              every 30 days.
            </p>
          </div>

          {/* <div className='space-y-2'>
            <label className='text-lg font-medium leading-none '>Bio:</label>
            <textarea
              className='flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 resize-none'
              placeholder='Tell us a little bit about yourself'
              name='bio'
              id=':rv:-form-item'
              aria-describedby=':rv:-form-item-description'
              aria-invalid='false'
            >
              I am a student at TCC.
            </textarea>
          </div> */}

          <Button
            label={isSubmitting ? '...Loading' : 'Update Profile'}
            outline
            onClick={handleSubmit(onSubmit)}
          />
        </form>

        {/* Make change here for the image potion */}
        <div className='relative w-32 h-32'>
          <Image
            src={currentUser?.image || imageSrc}
            alt='Profile Picture'
            layout='fill'
            className='rounded-full object-cover'
          />
          <div className='absolute inset-0 bg-gray-800 bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity'>
            <CldUploadWidget
              onSuccess={handleUpload}
              uploadPreset='ouly6ybu'
              options={{
                maxFiles: 1,
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={() => open()}
                    className='text-white text-md font-medium underline leading-4'
                  >
                    Edit
                  </button>
                );
              }}
            </CldUploadWidget>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileClient;
