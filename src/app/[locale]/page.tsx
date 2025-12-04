import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
/* PERBAIKI: Mengimpor ikon dari @heroicons/react/24/outline untuk gaya yang lebih minimalis */
import { DocumentTextIcon, ChatBubbleLeftRightIcon, ShieldCheckIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ImageCarousel from '@/components/ImageCarousel';

export default function HomePage() {
  const t = useTranslations('homepage');

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navigation />
      
      <main className="flex-grow">
        {/* Hero Section */}
        
        <section className="relative bg-gradient-to-r from-pink-200/60 to-pink-300/60 text-gray-900 py-8 sm:py-10 overflow-hidden">

        {/* background blur ornament */}
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-pink-400/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-pink-300/40 rounded-full blur-2xl"></div>
        
        {/* PERBAIKI: Membungkus grid di dalam container max-w-7xl */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          {/* UBAH: Grid diubah menjadi 5 kolom untuk proporsi yang lebih baik (3 untuk teks, 2 untuk gambar) */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 sm:gap-8 items-stretch">
            {/* left text content */}
            {/* UBAH: Diberi col-span-3 agar lebih lebar */}
            <div className="md:col-span-3 backdrop-blur-md bg-white/70 rounded-2xl p-6 sm:p-8 md:p-10 shadow-xl border border-white/30 flex flex-col justify-center">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">{t('heroTitle')}</h1>
              <p className="text-base sm:text-lg md:text-xl font-medium text-pink-600 mt-3">{t('heroSubtitle')}</p>
              <p className="text-sm sm:text-base md:text-lg text-gray-700 max-w-xl leading-relaxed mt-4">
                {t('heroDescription')}
              </p>
              {/* UBAH: Tombol dibuat selalu rata tengah */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 justify-center">
                <Link 
                  href="/services"
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold bg-pink-600 text-white hover:bg-pink-700 transition shadow-md text-center text-sm sm:text-base"
                >
                  {t('viewServices')}
                </Link>
                <Link 
                  href="/contact"
                  // PERBAIKI: Menambahkan tanda kutip penutup pada className
                  className="px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold border border-pink-600 text-pink-600 hover:bg-pink-600 hover:text-white transition shadow-md text-center text-sm sm:text-base"
                >
                  {t('contactUs')}
                </Link>
              </div>
            </div>

            {/* right image content */}
            {/* UBAH: Menggunakan ImageCarousel component */}
            <div className="md:col-span-2 flex justify-center md:justify-end h-full">
              <ImageCarousel />
            </div>
          </div>
        </div>
        </section>

        {/* Main Services Grid */}
        <section className="py-8 sm:py-10 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-8 sm:mb-12 text-[#e83d96]">{t('ourServices')}</h2>
            {/* UBAH: Grid diubah menjadi 4 kolom dengan efek hover untuk menampilkan detail */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              
              {/* Service 1: Penerjemahan Dokumen */}
              {/* UBAH: Warna kartu diubah menjadi nuansa pink yang lebih pastel */}
              <div className="group relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-rose-100">
                {/* PERBAIKI: Konten yang selalu terlihat dibuat rata tengah */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <DocumentTextIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{t('documentTranslation')}</h3>
                </div>
                {/* Konten yang muncul saat hover */}
                <div className="absolute inset-0 bg-black/80 p-3 sm:p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-4">{t('documentTranslation')}</h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{t('documentTranslationDesc')}</p>
                </div>
              </div>

              {/* Service 2: Interpreting */}
              <div className="group relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-pink-400">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <ChatBubbleLeftRightIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{t('interpreting')}</h3>
                </div>
                <div className="absolute inset-0 bg-black/80 p-3 sm:p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-4">{t('interpreting')}</h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{t('interpretingDesc')}</p>
                </div>
              </div>

              {/* Service 3: Legalisasi */}
              <div className="group relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-pink-500">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <ShieldCheckIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{t('legalization')}</h3>
                </div>
                <div className="absolute inset-0 bg-black/80 p-3 sm:p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-4">{t('legalization')}</h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{t('legalizationDesc')}</p>
                </div>
              </div>

              {/* Service 4: Apostille */}
              <div className="group relative h-72 sm:h-80 lg:h-96 rounded-2xl overflow-hidden shadow-lg bg-pink-600">
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 sm:p-6 bg-gradient-to-t from-black/70 to-transparent">
                  <GlobeAltIcon className="h-12 w-12 sm:h-16 sm:w-16 text-white flex-shrink-0" />
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mt-2">{t('apostille')}</h3>
                </div>
                <div className="absolute inset-0 bg-black/80 p-3 sm:p-4 flex flex-col justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white mb-2 sm:mb-4">{t('apostille')}</h3>
                  <p className="text-white/90 text-xs sm:text-sm leading-relaxed">{t('apostilleDesc')}</p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Document Types Section */}
        <section className="py-10 bg-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-3xl font-bold text-center mb-8 text-[#e83d96]">
                {t('mostRequestedDocs')}
              </h3>
              <p className="text-gray-700 leading-relaxed text-center max-w-4xl mx-auto text-lg">
                {t('mostRequestedDocsDesc')}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-rose-100 rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-4xl mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-2.25A3.375 3.375 0 0 0 9 3.75h-1.5a3.375 3.375 0 0 0-3.375 3.375v11.25a3.375 3.375 0 0 0 3.375 3.375h9a3.375 3.375 0 0 0 3.375-3.375Zm-3-6.75a1.125 1.125 0 0 1 1.125-1.125h.008a1.125 1.125 0 0 1 1.04 1.04v.085a1.125 1.125 0 0 1-1.04 1.125h-.008a1.125 1.125 0 0 1-1.125-1.125v-.085Zm-2.625 8.25h.008v.008h-.008v-.008Zm-3 0h.008v.008h-.008v-.008Zm1.125-4.5a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5Z" /></svg></div>
                  <h4 className="font-bold text-lg mb-2 text-[#e83d96]">{t('notaryDocs')}</h4>
                  <p className="text-gray-600 text-sm">{t('notaryDocsDesc')}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-fuchsia-100 rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-4xl mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M12 14.25h-.75a2.25 2.25 0 0 1-2.25-2.25V9.75A2.25 2.25 0 0 1 11.25 7.5h.75a2.25 2.25 0 0 1 2.25 2.25v2.25a2.25 2.25 0 0 1-2.25 2.25ZM9.75 17.25v-.866a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75v.866a.75.75 0 0 1-.75.75h-3a.75.75 0 0 1-.75-.75Z" /></svg></div>
                  <h4 className="font-bold text-lg mb-2 text-[#e83d96]">{t('educationDocs')}</h4>
                  <p className="text-gray-600 text-sm">{t('educationDocsDesc')}</p>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-pink-50 to-purple-100 rounded-xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="text-4xl mb-3"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-8 h-8 mx-auto"><path strokeLinecap="round" strokeLinejoin="round" d="M18 18.721c-3.107 0-5.533.692-7.5 1.953m0-13.724c-3.107 0-5.533.692-7.5 1.953m6.608 7.553m0-1.595c3.306 0 5.909.915 5.909 2.553 0 1.639-2.603 2.553-5.909 2.553m0-13.007c3.107 0 5.533.692 7.5 1.953m-10.5-7.5c3.107 0 5.533.692 7.5 1.953m-3.854 7.5a4.847 4.847 0 0 0-2.364 0M16 12.75a4.847 4.847 0 0 1-2.364 0M8.64 12.75a4.847 4.847 0 0 0-2.364 0Z" /></svg></div>
                  <h4 className="font-bold text-lg mb-2 text-[#e83d96]">{t('civilDocs')}</h4>
                  <p className="text-gray-600 text-sm">{t('civilDocsDesc')}</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        {/* UBAH: Desain CTA Section diperbarui menjadi lebih modern dan estetik */}
        <section className="bg-gradient-to-r from-pink-100 to-rose-200 text-gray-800 py-8 sm:py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900">{t('readyToUse')}</h2>
            <p className="text-base sm:text-lg md:text-xl mt-4 mb-8 sm:mb-10 max-w-2xl mx-auto text-gray-600">
              {t('readyToUseDesc')}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md sm:max-w-none mx-auto">
              <Link 
                href="/contact"
                className="bg-white text-[#e83d96] px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 text-base sm:text-lg"
              >
                {t('contactUs')}
              </Link>
              <a 
                href="https://wa.me/628158833382"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg font-semibold hover:bg-green-600 transition-all duration-300 shadow-md hover:shadow-xl transform hover:scale-105 text-base sm:text-lg flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-6 sm:h-6">
                  <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.279-.087.431l4.257 7.373c.077.152.25.18.431.087l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C6.55 22.5 1.5 17.45 1.5 10.5V4.5Z" clipRule="evenodd" />
                </svg>
                {t('chatWhatsApp')}
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}