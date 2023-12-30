import type { Metadata } from 'next';
import { Hepta_Slab, Zilla_Slab, Grenze_Gotisch } from 'next/font/google';
import clsx from 'clsx';
import Providers from '@/providers';
import Header from '@/components/Header';
import './globals.css';

const heptaSlab = Hepta_Slab({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-hepta',
});
const zillaSlab = Zilla_Slab({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-zilla',
});
const grenzeGotisch = Grenze_Gotisch({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-grenze',
});

export const metadata: Metadata = {
  title: 'Spelling Bee | Leithon English',
  description: 'A NY Spelling Bee Clone by Leithon English',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          heptaSlab.variable,
          zillaSlab.variable,
          grenzeGotisch.variable
        )}
      >
        <Providers>
          <div className='flex h-full flex-col'>
            <Header />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
