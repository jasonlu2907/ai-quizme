import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/navbar/Navbar';
import LoginModal from '@/components/modal/LoginModal';
import RegisterModal from '@/components/modal/RegisterModal';
import ToasterProvider from '@/providers/ToasterProvider';

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
        <ToasterProvider />
        <Navbar currentUser={currentUser} />
        <LoginModal />
        <RegisterModal />

        <div className=''>{children}</div>
      </body>
    </html>
  );
}
