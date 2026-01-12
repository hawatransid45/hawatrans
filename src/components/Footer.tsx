import { Link } from '@/i18n/routing';
import { EnvelopeIcon, PhoneIcon, MapPinIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');

  return (
    // UBAH: Latar belakang menjadi gradien pink pastel, padding diperbesar
    <footer className="bg-gradient-to-r from-rose-50 to-pink-100 text-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-5">
        
        {/* Baris Pertama: Branding, Links, Alamat */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {/* Kolom 1: Branding */}
          <div className="flex flex-col items-center">
            <div className="flex items-center space-x-3 justify-center">
              <img src="/images/hawa-rbg.png" alt="Hawatrans Logo" className="h-12 w-12 object-contain" />
              <h3 className="text-2xl font-bold text-gray-900">{t('company')}</h3>
            </div>
            <p className="mt-2 text-gray-600 max-w-xs">
              {t('tagline')}
            </p>
          </div>

          {/* Kolom 2: Quick Links */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900">{t('quickLinks')}</h3>
            <ul className="mt-4 space-y-2">
              <li><Link href="/services" className="text-gray-600 hover:text-[#e83d96] transition-colors">{t('services')}</Link></li>
              <li><Link href="/about" className="text-gray-600 hover:text-[#e83d96] transition-colors">{t('about')}</Link></li>
              <li><Link href="/contact" className="text-gray-600 hover:text-[#e83d96] transition-colors">{t('contact')}</Link></li>
            </ul>
          </div>

          {/* Kolom 3: Alamat */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900">{t('addressTitle')}</h3>
            <p className="mt-4 text-gray-600 max-w-xs">
              {t('addressValue')}
            </p>
          </div>
        </div>

        {/* Baris Ketiga: Copyright */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {t('company')}. {t('copyright')}
          </p>
        </div>
      </div>
    </footer>
  );
}
