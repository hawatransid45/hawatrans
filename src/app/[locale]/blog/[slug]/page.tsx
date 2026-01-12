'use client';

import {useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {Link, useRouter} from '@/i18n/routing';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {useAuth} from '@/contexts/AuthContext';
import {useBlog} from '@/contexts/BlogContext';
// ✅ WAJIB ADA: marked bertugas menerjemahkan ** jadi Bold, ## jadi Heading
import { marked } from 'marked'; 

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const t = useTranslations('blog');
  const slug = params.slug as string;
  const locale = params.locale as string;
  const {isAuthenticated} = useAuth();
  const {getPostBySlug, deletePost, posts, loading} = useBlog();

  let post = getPostBySlug(slug, locale);
  if (!post) {
    post = posts.find(p => p.slug === slug);
  }

  // --- 🛠️ LOGIC HYBRID (MARKDOWN + HTML) 🛠️ ---
  const getSafeContent = (content: string) => {
    if (!content) return '';

    // KITA PAKSA SEMUA KONTEN MASUK KE 'marked'
    // Kenapa? Karena 'marked' support dua-duanya:
    // 1. Simbol **teks** akan diubah jadi <strong>teks</strong> (Tebal)
    // 2. Tag <img src="..."> akan DIBIARKAN tetap jadi gambar (Tidak error)
    
    try {
      return marked.parse(content, { 
        breaks: true, // Enter jadi baris baru
        gfm: true     // Support Tabel & Fitur modern
      }) as string;
    } catch (error) {
      console.error("Error parsing markdown:", error);
      return content;
    }
  };

  const handleDelete = async () => {
    if (confirm('Are you sure you want to delete this post?')) {
      const success = await deletePost(slug, post?.locale || locale);
      if (success) router.push('/blog');
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#e83d96]"></div></div>;
  
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#e83d96]">Post Not Found</h1>
            <Link href="/blog" className="text-[#e83d96] hover:underline">Back to Blog</Link>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col antialiased">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Back Button */}
          <Link href="/blog" className="text-[#e83d96] hover:underline mb-6 inline-block text-sm font-medium">
            ← Back to Blog
          </Link>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span key={tag} className="text-sm font-medium bg-pink-100 text-[#e83d96] px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            
            {/* JUDUL */}
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-[#e83d96] leading-tight tracking-tight">
                {post.title}
            </h1>
            
            {/* METADATA */}
            <div className="mb-6 border-b border-gray-100 pb-6">
              <div className="flex flex-col gap-1">
                <div className="text-black font-medium text-base">
                  By {post.author}
                </div>
                <div className="text-black font-medium text-sm">
                  {new Date(post.publishedAt).toLocaleDateString(locale, {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric'
                  })}
                </div>
              </div>
            </div>

            {/* ✅ KONTEN: Panggil fungsi getSafeContent yang sudah pakai marked */}
            <div 
                className="
                  w-full max-w-none text-black
                  
                  /* 1. Styling Teks (Rapat & Hitam) */
                  [&_p]:text-base [&_p]:text-black [&_p]:leading-7 [&_p]:mb-5
                  
                  /* 2. Styling Heading (Pink & Rapat) */
                  [&_h1]:text-3xl sm:[&_h1]:text-4xl [&_h1]:text-[#e83d96] [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3 [&_h1]:tracking-tight
                  [&_h2]:text-2xl [&_h2]:text-[#e83d96] [&_h2]:font-bold [&_h2]:mt-6 [&_h2]:mb-3 [&_h2]:tracking-tight
                  [&_h3]:text-xl [&_h3]:text-[#e83d96] [&_h3]:font-bold [&_h3]:mt-5 [&_h3]:mb-2 [&_h3]:tracking-tight
                  
                  /* 3. Styling List */
                  [&_ol]:list-decimal [&_ol]:ml-5 [&_ol]:mb-5
                  [&_ul]:list-disc [&_ul]:ml-5 [&_ul]:mb-5
                  [&_li]:text-base [&_li]:text-black [&_li]:pl-1 [&_li]:mb-1
                  [&_li::marker]:text-black [&_li::marker]:font-bold
                  
                  /* 4. Styling Bold */
                  [&_strong]:text-black [&_strong]:font-bold
                  
                  /* 5. GAMBAR (Penting! Agar HTML Image tampil cantik) */
                  /* Selector ini menangkap tag <img> yang Anda masukkan manual */
                  [&_img]:rounded-xl [&_img]:shadow-md [&_img]:mx-auto [&_img]:my-6 [&_img]:w-full [&_img]:max-w-full
                "
                dangerouslySetInnerHTML={{ __html: getSafeContent(post.content) }}
            />

            {isAuthenticated && (
              <div className="mt-8 pt-6 border-t flex gap-4">
                  <Link href={`/blog/edit/${post.slug}`} className="bg-[#e83d96] text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition">✏️ Edit</Link>
                  <button onClick={handleDelete} className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition">🗑️ Delete</button>
              </div>
            )}
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}