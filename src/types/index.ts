import { Answer, Quiz, User } from '@prisma/client';

export type SafeQuiz = Omit<Quiz, 'createdAt'> & {
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

export type SafeAnswer = Omit<Answer, 'createdAt'> & {
  createdAt: string;
};
