'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { UserIcon, CalendarDaysIcon } from '@heroicons/react/24/outline';
import { useBlog } from '@/contexts/BlogContext';

export default function BlogPage() {
  const t = useTranslations('blog');
  const params = useParams();
  const locale = params.locale as string;
  const { isAuthenticated } = useAuth();
  const { posts } = useBlog();

  const displayPosts = [...posts].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          
          {/* CONTAINER HEADER */}
          <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
            
            {/* 1. TITLE: Center */}
            <h1 className="text-3xl font-bold text-[#e83d96] text-center mb-6">{t('title')}</h1>

            {/* 2. AREA SUBTITLE & TOMBOL */}
            {/* Kita gunakan 'relative' di sini agar tombol absolute mengacu pada kotak ini */}
            <div className="relative flex flex-col md:block"> 
              
              {/* SUBTITLE: 
                  - text-center: Rata tengah.
                  - mx-auto: Memastikan blok teks ada di tengah.
                  - md:px-24: Memberi padding kiri-kanan pada desktop agar teks tidak menabrak tombol jika layarnya kecil.
              */}
              <p className="text-lg text-gray-700 leading-relaxed text-center max-w-3xl mx-auto md:px-24">
                {t('subtitle')}
              </p>

              {/* TOMBOL CREATE:
                  - Mobile: Muncul di bawah teks (mt-6).
                  - Desktop (md): Posisi 'absolute' di kanan tengah. Ini kuncinya agar tidak menggeser teks subtitle.
              */}
              {isAuthenticated && (
                <div className="mt-6 flex justify-center md:mt-0 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2">
                  <Link
                    href="/blog/create"
                    className="bg-[#e83d96] text-white px-5 py-2.5 rounded-lg hover:bg-pink-700 transition shadow-md text-sm font-semibold whitespace-nowrap inline-flex items-center gap-2"
                  >
                    ✏️ {t('create')}
                  </Link>
                </div>
              )}
            </div>

          </div>

          {/* Admin Notice */}
          {isAuthenticated && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 sm:p-4 mb-8">
              <p className="text-green-700 text-sm sm:text-base">
                {t('adminNotice')}
              </p>
            </div>
          )}

          {/* Grid Postingan */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayPosts.map((post) => (
              <Link
                key={post._id || post.id}
                href={`/blog/${post.slug}`}
                className="block">
                <article className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200/80 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <img src="https://placehold.co/600x400/e83d96/white?text=Hawatrans" alt="Blog post image" className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-xs bg-white/90 text-[#e83d96] px-2 py-1 rounded-full font-semibold shadow-sm">
                          {tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center gap-2 mb-2">
                      <h2 className="text-lg font-bold line-clamp-2 text-gray-800 group-hover:text-[#e83d96] transition-colors flex-grow">{post.title}</h2>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase font-semibold shrink-0">{post.locale}</span>
                    </div>
                    <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">{post.excerpt}</p>
                    <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                      <span className="flex items-center gap-1.5"><UserIcon className="w-4 h-4" />{post.author}</span>
                      <span className="flex items-center gap-1.5"><CalendarDaysIcon className="w-4 h-4" />{new Date(post.publishedAt).toLocaleDateString(locale)}</span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}