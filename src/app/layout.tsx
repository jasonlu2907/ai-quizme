import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';

import getCurrentUser from './actions/getCurrentUser';

const font = Nunito({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Quizme-fying',
  description:
    'AI powered software that generates quizzes based on your study notes.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <html lang='en'>
      <body className={font.className}>
        <Navbar currentUser={currentUser} />
        <LoginModal />
        <RegisterModal />
        <div className='pb-20 pt-14'>{children}</div>
      </body>
    </html>
  );
}
