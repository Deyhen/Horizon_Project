import { Montserrat } from 'next/font/google';

import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';
import 'tailwindcss/tailwind.css';
import { Header } from '../modules/layout';
import { Footer } from '../modules/layout';
import { ModalProvider, StoreProvider } from '../modules/providers';

// Вызов Montserrat выносим за пределы компонента
const montserrat = Montserrat({ subsets: ['latin'] });

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <GoogleTagManager gtmId="GTM-NLDFQCJH" />
      <GoogleAnalytics gaId="G-HJ6KRNLZR7" />
      <StoreProvider>
        <ModalProvider />
        <body className={`relative flex min-h-screen flex-col ` + montserrat.className}>
          {/*//<!-- Google Tag Manager (noscript) -->*/}
          <noscript>
            <iframe
              src="https://www.googletagmanager.com/ns.html?id=GTM-NLDFQCJH"
              height="0"
              width="0"
              className="invisible hidden"
            ></iframe>
          </noscript>
          {/*<!-- End Google Tag Manager (noscript) -->*/}

          <Header />
          <main className="flex grow">{children}</main>
          <Footer />
        </body>
      </StoreProvider>
    </html>
  );
};

export default RootLayout;
