'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { Link } from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useBlog } from '@/contexts/BlogContext';
import { useAuth } from '@/contexts/AuthContext';
import { UserIcon, CalendarDaysIcon, PencilSquareIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Konfigurasi: Berapa post per halaman?
const POSTS_PER_PAGE = 6;

export default function BlogPage() {
  const t = useTranslations('blog');
  const params = useParams();
  const locale = params.locale as string;
  const { posts, loading } = useBlog();
  const { isAuthenticated } = useAuth();

  // --- STATE ---
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  // Reset ke halaman 1 setiap kali user mengetik search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // --- LOGIC FILTERING & SORTING ---
  const sortedPosts = [...posts].sort((a, b) => 
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  const filteredPosts = sortedPosts.filter(post => {
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query)) ||
      post.author.toLowerCase().includes(query)
    );
  });

  // --- LOGIC PAGINATION ---
  const totalPages = Math.ceil(filteredPosts.length / POSTS_PER_PAGE);
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const paginatedPosts = filteredPosts.slice(startIndex, startIndex + POSTS_PER_PAGE);

  // --- RENDER LOADING ---
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e83d96]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col font-sans antialiased bg-gray-50">
      <Navigation />

      <main className="flex-grow">
        {/* HEADER SECTION */}
        <div className="bg-white shadow-sm py-12 mb-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl font-extrabold text-[#e83d96] mb-4">
              {t('title')}
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {t('subtitle')}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          
          {/* --- SEARCH BAR & ACTIONS (RASIO 80:20) --- */}
          <div className="flex flex-col md:flex-row gap-4 mb-10">
            
            {/* Input Search (80% jika Admin, 100% jika Guest) */}
            <div className={`relative w-full ${isAuthenticated ? 'md:w-4/5' : 'md:w-full'}`}>
              <input
                type="text"
                placeholder="Cari artikel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#e83d96] focus:ring-2 focus:ring-pink-200 outline-none transition shadow-sm text-black"
              />
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-3.5" />
            </div>

            {/* Tombol Create (20%) - Hanya Muncul Jika Admin */}
            {isAuthenticated && (
              <Link 
                href="/blog/create" 
                className="w-full md:w-1/5 flex items-center justify-center gap-2 bg-[#e83d96] text-white px-6 py-3 rounded-xl hover:bg-pink-700 transition shadow-md font-bold whitespace-nowrap"
              >
                {/* ✅ Ikon dikembalikan ke Emoji ✏️ sesuai gambar Anda */}
                <span className="text-lg">✏️</span>
                {t('create')}
              </Link>
            )}
          </div>

          {/* --- POSTS GRID --- */}
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {paginatedPosts.map((post) => (
                <div key={post._id || post.id} className="relative group h-full">
                  
                  {/* 🔴 TOMBOL EDIT KECIL (Hanya Admin) */}
                  {isAuthenticated && (
                    <Link
                      href={`/blog/edit/${post.slug}`}
                      className="absolute top-3 right-3 z-20 bg-white/90 p-2 rounded-full text-[#e83d96] hover:bg-[#e83d96] hover:text-white transition-all shadow-md transform hover:scale-110"
                      title="Edit Article"
                    >
                      <PencilSquareIcon className="w-5 h-5" />
                    </Link>
                  )}

                  {/* Link Utama */}
                  <Link href={`/blog/${post.slug}`} className="block h-full">
                    <article className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1.5 h-full flex flex-col">
                      
                      {/* Image Thumbnail */}
                      <div className="relative overflow-hidden">
                        <img 
                          src="https://placehold.co/600x400/e83d96/white?text=Hawatrans" 
                          alt={post.title} 
                          className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105" 
                        />
                        
                        {/* Tags Overlay */}
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
                          {post.tags.slice(0, 2).map((tag) => (
                            <span key={tag} className="text-xs bg-white/90 text-[#e83d96] px-2 py-1 rounded-full font-bold shadow-sm">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-2">
                          <h2 className="text-lg font-bold line-clamp-2 text-gray-900 group-hover:text-[#e83d96] transition-colors flex-grow">
                            {post.title}
                          </h2>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded uppercase font-bold shrink-0">
                            {post.locale}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 mb-4 line-clamp-3 text-sm leading-relaxed flex-grow">
                          {post.excerpt || "Klik untuk membaca selengkapnya..."}
                        </p>
                        
                        <div className="mt-auto flex justify-between items-center text-xs text-gray-500 pt-4 border-t border-gray-100 font-medium">
                          <span className="flex items-center gap-1.5">
                            <UserIcon className="w-4 h-4" /> {post.author}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <CalendarDaysIcon className="w-4 h-4" /> {new Date(post.publishedAt).toLocaleDateString(locale)}
                          </span>
                        </div>
                      </div>
                    </article>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl border border-dashed border-gray-300">
              <p className="text-xl text-gray-400 font-medium">Belum ada artikel yang cocok dengan "{searchQuery}"</p>
              <button 
                onClick={() => setSearchQuery('')}
                className="mt-4 text-[#e83d96] font-bold hover:underline"
              >
                Reset Pencarian
              </button>
            </div>
          )}

          {/* --- PAGINATION (DENGAN HOVER EFFECT) --- */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center items-center gap-2">
              
              {/* Tombol Prev */}
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           hover:bg-pink-50 hover:text-[#e83d96] hover:border-[#e83d96] transition-all duration-200"
              >
                ← Prev
              </button>

              {/* Angka Halaman */}
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-10 h-10 rounded-lg font-bold transition-all duration-200 flex items-center justify-center ${
                      currentPage === page
                        ? 'bg-[#e83d96] text-white shadow-md transform scale-105' 
                        : 'bg-white text-gray-600 border border-gray-200 hover:bg-pink-50 hover:text-[#e83d96] hover:border-[#e83d96]'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              {/* Tombol Next */}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-600 font-medium 
                           disabled:opacity-50 disabled:cursor-not-allowed 
                           hover:bg-pink-50 hover:text-[#e83d96] hover:border-[#e83d96] transition-all duration-200"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}