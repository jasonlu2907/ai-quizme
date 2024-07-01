import prisma from '@/libs/prismadb';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: { token: string };
  }
) {
  const { token } = params;

  // const user = await prisma.user.findFirst({
  //   where: {
  //     activateTokens: {
  //       some: {
  //         AND: [
  //           {
  //             activatedAt: null, //the token shall not be activated before being used
  //           },
  //           {
  //             createdAt: {
  //               gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // the token shall be generated within the last 24 hour
  //             },
  //           },
  //           {
  //             token,
  //           },
  //         ],
  //       },
  //     },
  //   },
  // });
  const user = await prisma.user.findFirst({
    where: {
      activateTokens: {
        some: {
          AND: [
            {
              token, // the matching token
              createdAt: {
                gt: new Date(Date.now() - 24 * 60 * 60 * 1000), // the past 24 hours
              },
            },
          ],
        },
      },
    },
    include: {
      activateTokens: true,
    },
  });
  if (!user) {
    console.log('No user found with an unactivated token.');
  } else {
    console.log('User found:', user);
  }

  if (!user) {
    throw new Error('Token is invalid or expired');
  }
  // TODO: Handle different errors here (e.g. token expired or use token that already been used)

  const nullToken = user.activateTokens.find((tok) => {
    return tok.token === token && tok.activatedAt === null;
  });
  if (nullToken) {
    // console.log('token succeed. Token: ', nullToken);
    // if token matches and is not activated yet -> set user active -> activate the token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        active: true,
      },
    });

    await prisma.activateToken.update({
      where: {
        token,
      },
      data: {
        activatedAt: new Date(),
      },
    });

    redirect('/');
  } else {
    console.log('Token already activated!');
    redirect('/error?error=TokenActivated');
  }
}
