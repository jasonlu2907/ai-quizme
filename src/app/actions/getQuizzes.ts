import prisma from '@/libs/prismadb';

interface IParams {
  userId?: string;
  title?: String;
  category?: String;
  questionCount?: number;
  rightCount?: number;
  wrongCount?: number;
}

export default async function getQuizzes(params: IParams) {
  const { userId, title, category, questionCount, rightCount, wrongCount } =
    params;

  const query: any = {};
  if (userId) query.userId = userId;
  if (title) query.title = title;
  if (category) query.category = category;

  if (questionCount)
    query.questionCount = {
      gte: questionCount,
    };

  if (rightCount)
    query.rightCount = {
      gte: rightCount,
    };

  if (wrongCount)
    query.wrongCount = {
      gte: wrongCount,
    };

  try {
    const quizzes = await prisma.quiz.findMany({
      where: query,
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        // user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return quizzes;
  } catch (e: any) {
    throw new Error(e);
  }
}
