import type { Metadata } from 'next';

export const metadata: Metadata = {
  metadataBase: new URL('https://company-website.com'),
  title: {
    default: 'Company - Innovative Business Solutions',
    template: '%s | Company'
  },
  description: 'We deliver innovative solutions for your business. Digital transformation, consulting, and strategic planning services.',
  keywords: ['business solutions', 'digital transformation', 'consulting', 'innovation', 'technology', 'AI', 'machine learning', 'cloud computing', 'cybersecurity'],
  authors: [{ name: 'Company Team' }],
  creator: 'Company',
  publisher: 'Company',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    alternateLocale: 'en_US',
    url: 'https://company-website.com',
    title: 'Company - Innovative Business Solutions',
    description: 'We deliver innovative solutions for your business needs.',
    siteName: 'Company Website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Company - Innovative Business Solutions',
    description: 'We deliver innovative solutions for your business needs.',
    creator: '@company',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};
