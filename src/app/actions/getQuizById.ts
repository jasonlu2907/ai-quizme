import prisma from '@/libs/prismadb';

interface IParams {
  quizId: string;
}

export default async function getQuizById(params: IParams) {
  const { quizId } = params;
  try {
    const quiz = await prisma.quiz.findUnique({
      where: {
        id: quizId,
      },
      include: {
        questions: {
          include: {
            answers: true,
          },
        },
        // user: true,
      },
    });

    return quiz;
  } catch (e: any) {
    throw new Error(e);
  }
}
