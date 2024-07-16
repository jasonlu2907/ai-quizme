import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

interface IParams {
  quizId?: string;
}

export async function POST(req: NextRequest, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { quizId } = params;
  if (!quizId || typeof quizId !== 'string') {
    throw new Error('Invalid quiz ID');
  }

  const favoriteList = [...(currentUser.favoriteIds || [])];
  favoriteList.push(quizId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteList,
    },
  });

  return NextResponse.json(user);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: IParams }
) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const { quizId } = params;
  if (!quizId || typeof quizId !== 'string') {
    throw new Error('Invalid quiz ID');
  }

  const favoriteList = [...(currentUser.favoriteIds || [])];
  favoriteList.filter((qid) => qid !== quizId);

  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      favoriteIds: favoriteList,
    },
  });

  return NextResponse.json(user);
}
