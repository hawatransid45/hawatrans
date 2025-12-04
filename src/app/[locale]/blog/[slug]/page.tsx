'use client';

import {useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Link, useRouter} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {useAuth} from '@/contexts/AuthContext';
import {useBlog} from '@/contexts/BlogContext';

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('blog');
  const slug = params.slug as string;
  const locale = params.locale as string;
  const {isAuthenticated} = useAuth();
  const {getPostBySlug, deletePost, posts, loading} = useBlog();

  // Coba cari post di locale saat ini
  let post = getPostBySlug(slug, locale);
  
  // Jika tidak ditemukan, cari post dengan slug yang sama di locale lain
  if (!post) {
    post = posts.find(p => p.slug === slug);
  }

  // Tampilkan loading saat data masih dimuat
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="text-2xl font-bold text-[#e83d96]">Hawatrans</p>
      </div>
    );
  }

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      // Gunakan locale asli dari post untuk delete
      const success = await deletePost(slug, post?.locale || locale);
      
      if (success) {
        alert('Post deleted successfully!');
        router.push('/blog');
      } else {
        alert('Failed to delete post. Please try again.');
      }
    }
  };

  // --- FUNGSI BARU: MENANGANI BOLD INLINE ---
  // Fungsi ini memecah teks berdasarkan '**'
  // Indeks ganjil (1, 3, 5) adalah teks di dalam bintang (Bold)
  const renderTextWithBold = (text: string) => {
    const parts = text.split('**');
    return parts.map((part, index) => 
      index % 2 === 1 ? <strong key={index} className="font-bold text-black">{part}</strong> : part
    );
  };

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#e83d96]">Post Not Found</h1>
            <Link href="/blog" className="text-[#e83d96] hover:underline" locale={locale}>
              {t('backToBlog')}
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <Link href="/blog" className="text-[#e83d96] hover:underline mb-3 sm:mb-4 inline-block text-sm sm:text-base">
            ← Back to Blog
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-3 sm:mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs sm:text-sm bg-pink-100 text-[#e83d96] px-2 sm:px-3 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
            
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-[#e83d96]">{post.title}</h1>
            
            <div className="flex flex-col xs:flex-row items-start xs:items-center gap-2 xs:gap-4 text-sm sm:text-base text-black mb-6 sm:mb-8 pb-6 sm:pb-8 border-b">
              <span>By {post.author}</span>
              <span className="hidden xs:inline">•</span>
              <span>{new Date(post.publishedAt).toLocaleDateString(locale, {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>

            <div className="prose prose-sm sm:prose-lg max-w-none text-black">
              {post.content.split('\n').map((paragraph, idx) => {
                // Handle Headers
                if (paragraph.startsWith('# ')) {
                  return <h1 key={idx} className="text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4 text-[#e83d96]">{paragraph.substring(2)}</h1>;
                } else if (paragraph.startsWith('## ')) {
                  return <h2 key={idx} className="text-xl sm:text-2xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3 text-[#e83d96]">{paragraph.substring(3)}</h2>;
                } else if (paragraph.startsWith('### ')) {
                  return <h3 key={idx} className="text-lg sm:text-xl font-bold mt-4 mb-2 text-[#e83d96]">{paragraph.substring(4)}</h3>;
                } 
                // Handle List Items
                else if (paragraph.startsWith('- ')) {
                  return <li key={idx} className="ml-4 sm:ml-6 mb-1 list-disc text-sm sm:text-base">{renderTextWithBold(paragraph.substring(2))}</li>;
                } else if (paragraph.match(/^\d+\./)) {
                  const match = paragraph.match(/^\d+\.\s+(.*)/);
                  return <li key={idx} className="ml-4 sm:ml-6 mb-1 list-decimal text-sm sm:text-base">{renderTextWithBold(match?.[1] || '')}</li>;
                } 
                // Handle Empty Lines
                else if (paragraph.trim() === '') {
                  return <br key={idx} />;
                } 
                // Handle Paragraphs (Dengan Fungsi Bold Baru)
                else {
                  return <p key={idx} className="mb-3 sm:mb-4 text-black leading-relaxed text-sm sm:text-base">{renderTextWithBold(paragraph)}</p>;
                }
              })}
            </div>

            {isAuthenticated && (
              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t">
                <div className="bg-pink-50 border-l-4 border-[#e83d96] p-3 sm:p-4 mb-3 sm:mb-4">
                  <p className="text-pink-700 text-sm sm:text-base">
                    🔒 <strong>Admin Controls</strong> - You can edit or delete this post
                  </p>
                </div>
                <div className="flex flex-col xs:flex-row gap-3 sm:gap-4">
                  <Link 
                    href={`/blog/edit/${post.slug}`}
                    className="bg-[#e83d96] text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-pink-700 transition text-sm sm:text-base text-center"
                  >
                    ✏️ {t('edit')}
                  </Link>
                  <button 
                    className="bg-red-600 text-white px-4 sm:px-6 py-2 rounded-lg hover:bg-red-700 transition text-sm sm:text-base"
                    onClick={handleDelete}
                  >
                    🗑️ {t('delete')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}