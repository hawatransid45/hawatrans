import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import Script from 'next/script';
import {routing} from '@/i18n/routing';
import {AuthProvider} from '@/contexts/AuthContext';
import {BlogProvider} from '@/contexts/BlogContext';
import '../globals.css';

export { metadata } from '../metadata';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  const messages = await getMessages({locale});

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="google-tag-loader" strategy="beforeInteractive" src="https://www.googletagmanager.com/gtag/js?id=AW-17860095675" />
        <Script id="google-tag" strategy="beforeInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-17860095675');`}
        </Script>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5L5XL9NK');`}
        </Script>
      </head>
      <body suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5L5XL9NK"
            height="0"
            width="0"
            style={{display: 'none', visibility: 'hidden'}}
          />
        </noscript>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <AuthProvider>
            <BlogProvider>
              {children}
            </BlogProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
