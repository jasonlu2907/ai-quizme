import prisma from '@/libs/prismadb';
import { NextResponse } from 'next/server';

export async function DELETE() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const quizzes = await prisma.quiz.deleteMany({
    where: {
      createdAt: {
        lt: today,
      },
    },
  });

  return NextResponse.json({ ...quizzes, message: 'Removed Successfully' });
}
