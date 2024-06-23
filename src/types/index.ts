import { Answer, Quiz, User, Question } from '@prisma/client';

export type SafeQuiz = Quiz & {
  questions: (Question & {
    answers: Answer[];
  })[];
};

//haven't used this
export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

// haven't used this
export type SafeAnswer = Omit<Answer, 'createdAt'> & {
  createdAt: string;
};
