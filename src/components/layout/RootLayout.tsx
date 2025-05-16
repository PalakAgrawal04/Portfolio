import Header from './Header';
import Footer from './Footer';
import { inter, playfair } from '@/lib/fonts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={`${inter.variable} ${playfair.variable} font-sans min-h-screen flex flex-col`}>
      <Header />
      <main className="flex-grow">{children}</main>
      <Footer />
    </div>
  );
}
