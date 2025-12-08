import {getRequestConfig} from 'next-intl/server';
 
export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;
 
  // Validate locale
  const locales = ['en', 'id', 'ko', 'zh', 'ja'];
  if (!locale || !locales.includes(locale)) {
    locale = 'id';
  }
 
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
