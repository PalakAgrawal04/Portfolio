import { inter, playfair } from '@/lib/fonts';
import RootLayout from '@/components/layout/RootLayout';
import Analytics from '@/components/Analytics';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Palak - Web Developer & Designer',
  description: 'Portfolio website of Palak, a web developer and designer specializing in creating beautiful and functional websites',
  keywords: ['web developer', 'designer', 'portfolio', 'next.js', 'react', 'tailwind css'],
  authors: [{ name: 'Palak' }],
  creator: 'Palak',
  openGraph: {
    title: 'Palak - Web Developer & Designer',
    description: 'Portfolio website of Palak, a web developer and designer',
    url: 'https://www.palak-portfolio.com',
    siteName: 'Palak Portfolio',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palak - Web Developer & Designer',
    description: 'Portfolio website of Palak, a web developer and designer',
    creator: '@yourtwitterhandle',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body>
        <RootLayout>{children}</RootLayout>
        <Analytics />
      </body>
    </html>
  );
}
