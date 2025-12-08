import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import {AuthProvider} from '@/contexts/AuthContext';
import {BlogProvider} from '@/contexts/BlogContext';
import '../globals.css';

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
      <head />
      <body suppressHydrationWarning>
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
