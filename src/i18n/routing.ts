import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';
 
export const routing = defineRouting({
  locales: ['en', 'id', 'ko', 'zh', 'ja'],
  defaultLocale: 'id',
  localePrefix: 'never'
});
 
export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
