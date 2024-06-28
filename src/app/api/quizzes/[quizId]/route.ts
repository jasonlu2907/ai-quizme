import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  quizId: string;
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { quizId } = params;
  if (!quizId || typeof quizId !== 'string') {
    throw new Error('Invalid quizId!');
  }

  const deletedQuizzes = await prisma.quiz.deleteMany({
    where: {
      userId: currentUser.id,
      id: quizId,
    },
  });

  return NextResponse.json(deletedQuizzes);
}
