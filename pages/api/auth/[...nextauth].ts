import NextAuth, { AuthOptions } from 'next-auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from 'bcrypt';
import prisma from '@/libs/prismadb';

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        // 'credentials' are the user inputs
        if (!credentials?.email || !credentials?.password) {
          throw new Error('CredentialsSignin');
          // redirect('/error?error=CredentialsSignin');
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user?.hashedPassword) {
          // redirect('/error?error=CredentialsSignin');
          throw new Error('CredentialsSignin');
        }
        // After Signing up, they can't still sign in directly until after verifying their account
        if (!user.active) {
          // redirect('/error?error=UserNotActive');
          throw new Error('UserNotActive');
        }

        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isCorrectPassword) {
          // redirect('/error');
          throw new Error('CredentialsSignin');
        }

        return user;
      },
    }),
  ],
  pages: {
    signIn: '/',
    error: '/error',
  },
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);
