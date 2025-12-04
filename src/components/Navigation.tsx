'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {useParams} from 'next/navigation';
import {Link, usePathname} from '@/i18n/routing';
import {useAuth} from '@/contexts/AuthContext';

export default function Navigation() {
  const t = useTranslations('nav');
  const t_auth = useTranslations('auth');
  const pathname = usePathname();
  const {isAuthenticated, logout, user} = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const links = [
    {href: '/', label: t('home')},
    {href: '/about', label: t('about')},
    {href: '/services', label: t('services')},
    {href: '/blog', label: t('blog')},
    {href: '/contact', label: t('contact')},
  ];

  return (
    <nav className="bg-white text-black shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-900 hover:text-[#e83d96] transition-colors">
              Hawatrans.id
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex space-x-2 xl:space-x-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  pathname === link.href
                    ? 'bg-[#e83d96] text-white'
                    : 'text-gray-700 hover:bg-[#e83d96] hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop: Auth & Language */}
          <div className="hidden lg:flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-sm font-medium text-gray-800">👤 {user?.username}</span>
                   <svg
                    className={`w-4 h-4 text-gray-600 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`}
                    fill="none" stroke="currentColor" viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {userMenuOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setUserMenuOpen(false)} />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
                      <button
                        onClick={() => {
                          logout();
                          setUserMenuOpen(false);
                        }}
                        className="w-full text-left flex items-center space-x-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        <span>{t_auth('logout')}</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <Link
                href="/admin/login"
                className="px-3 py-1.5 rounded border border-[#e83d96] text-[#e83d96] hover:bg-[#e83d96] hover:text-white text-xs sm:text-sm font-semibold transition-colors"
              >
                {t_auth('login')}
              </Link>
            )}
            <LanguageSwitcher />
          </div>

          {/* Mobile: Language & Hamburger */}
          <div className="flex lg:hidden items-center space-x-2">
            <LanguageSwitcher />
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-gray-700 hover:text-[#e83d96] hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                    pathname === link.href
                      ? 'bg-[#e83d96] text-white'
                      : 'text-gray-700 hover:bg-[#e83d96] hover:text-white'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-gray-200">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-sm text-gray-700 font-medium">
                      👤 {user?.username}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-[#e83d96] hover:bg-pink-50 transition-colors"
                    >
                      {t_auth('logout')}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/admin/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="block px-3 py-2 rounded-md text-base font-medium text-[#e83d96] hover:bg-pink-50 transition-colors"
                  >
                    {t_auth('login')}
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

function LanguageSwitcher() {
  const pathname = usePathname();
  const params = useParams();
  const locale = params.locale;
  const [isOpen, setIsOpen] = useState(false);
  
  const languages = [
    { code: 'id', label: 'ID', name: 'Indonesia' },
    { code: 'en', label: 'EN', name: 'English' },
    { code: 'ko', label: 'KO', name: '한국어' },
    { code: 'zh', label: 'ZH', name: '中文' },
    { code: 'ja', label: 'JA', name: '日本語' }
  ];
  
  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];
  
  return (
    <div className="relative">
      {/* Tombol Dropdown */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-sm font-medium text-gray-700">🌐 {currentLanguage.label}</span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Overlay untuk menutup dropdown saat klik di luar */}
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu Items */}
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg border border-gray-200 py-1 z-20">
            {languages.map((lang) => (
              <Link
                key={lang.code}
                href={pathname}
                locale={lang.code}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 text-sm transition-colors ${
                  locale === lang.code
                    ? 'bg-[#e83d96] text-white font-medium'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {lang.name}
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}