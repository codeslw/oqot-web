import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import {Header} from "@/components/Layout/Header";
import {QueryClient} from "@tanstack/query-core";
import {QueryClientProvider} from "@tanstack/react-query";
import {QueryProvider} from "@/components/Wrappers/QueryProvider";
import {useLocale} from "use-intl";
import {notFound} from "next/navigation";
import {NextIntlClientProvider} from "next-intl";
import ThemeRegistry from "@/components/Wrappers/MuiCacheProvider";
import {DateLocalizationWrapper} from "@/components/Wrappers/DateLocalizationWrapper";
import React from "react";
import {PageChangeListener} from "@/components/Puzzles/PageChangeListener";
import {AuthWrapper} from "@/components/Wrappers/AuthWrapper";
import {Footer} from "@/components/Layout/Footer";
import {CartSynchronizeWrapper} from "@/components/Wrappers/CartSynchronizeWrapper";
import {WithModalsWrapper} from "@/components/Wrappers/WithModalsWrapper";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'OQ-OT',
  description: 'Делайте базар, не выходя из дома!',
  icons : ['/app_logo.svg']
}



const getCategories = async () => {
    try {
        const mainCategories = await fetch(`${process.env.NEXT_PUBLIC_URL}/category`, {
            next : {
                revalidate : 20
            }
        });
        const response = await mainCategories.json();
        return response.categories;
    }
    catch (e) {

    }


}


export default async function RootLayout({
  children, params
}: {
  children: React.ReactNode,
   params : Record<string, string>
}) {

    let messages;


   let categories = await getCategories();

    try {
        messages = (await import(`../../messages/${params.locale}.json`)).default
    } catch (error) {
        notFound();
    }

  return (
    <html lang={params.locale}>

    <ThemeRegistry>
      <body className={`${inter.className} dark:!bg-black-primary`} id={"__next"}>
      <QueryProvider>
          <PageChangeListener />
            <NextIntlClientProvider locale={params.locale} messages={messages}>
                <DateLocalizationWrapper>
               <CartSynchronizeWrapper>
                <WithModalsWrapper>
                <AuthWrapper>
                    <div className="w-screen dark:bg-black-primary">
                        <Header categories = {categories}/>
                        <div className={"px-4 md:px-0 xs:w-full md:w-[90%] xl:w-[1124px] mx-auto dark:bg-black-primary"}>
                            <div className={"mt-[9rem]"}></div>
                            {children}
                            <div className={"mb-20"}></div>
                        </div>
                        <Footer/>
                    </div>
                </AuthWrapper>
                </WithModalsWrapper>
               </CartSynchronizeWrapper>
                </DateLocalizationWrapper>
            </NextIntlClientProvider>
      </QueryProvider>
      </body>
    </ThemeRegistry>
    </html>
  )
}
