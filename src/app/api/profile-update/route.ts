import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

import prisma from '@/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

export async function POST(request: NextRequest) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  // console.log('Body: ', body, typeof body);

  if (typeof body === 'object') {
    const { name, password } = body;

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        name,
        hashedPassword,
      },
    });
    return NextResponse.json(user);
  }

  // typeof body === 'string'
  const user = await prisma.user.update({
    where: {
      id: currentUser.id,
    },
    data: {
      image: body,
    },
  });

  return NextResponse.json(user);
}
