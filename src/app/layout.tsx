import { Footer } from "../components/Footer/Footer.component";
import { Header } from "../components/Header/Header.component";
import { RightBar } from "../components/RightBar/RightBar.component";
import StoreProvider from "../components/StoreProvider/storeProvider.component";
import "./globals.css";
import 'tailwindcss/tailwind.css'


 const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <StoreProvider>
        <body className="md:grid-cols-[1fr,24rem] grid-cols-[1fr] md:grid-rows-[40rem,1fr,20rem] grid-rows-[15rem,22rem,1fr,10rem] grid ">
          <Header />
           <main className="md:mt-40 row-start-3 md:row-start-2 col-start-1 col-span-2 md:col-span-1 w-full px-4">
            {children}
          </main>
          <RightBar/> 
          <Footer/>
        </body>
      </StoreProvider>
    </html>
  );
}

export default RootLayout
