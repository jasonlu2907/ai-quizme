import { Quiz, User } from '@prisma/client';

export type SafeListing = Omit<Quiz, 'createdAt'> & {
  createdAt: string;
};

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
