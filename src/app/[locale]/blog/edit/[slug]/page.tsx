'use client';

import {useState, useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useBlog} from '@/contexts/BlogContext';

function EditBlogContent() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('blog');
  const slug = params.slug as string;
  const locale = params.locale as string;
  const {getPostBySlug, updatePost, posts} = useBlog();
  const [isLoading, setIsLoading] = useState(true);

  // Coba cari post di locale saat ini
  let post = getPostBySlug(slug, locale);
  
  // Jika tidak ditemukan, cari di locale lain sebagai basis terjemahan
  if (!post) {
    post = posts.find(p => p.slug === slug);
  }

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: ''
  });

  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        tags: post.tags.join(', ')
      });
    }
    setIsLoading(false);
  }, [post]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (post) {
      // Gunakan locale asli dari post untuk update
      const success = await updatePost(slug, post.locale, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content,
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      
      if (success) {
        alert('Blog post updated successfully!');
        router.push(`/${locale}/blog/${slug}`);
      } else {
        alert('Failed to update blog post. Please try again.');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="text-2xl font-bold text-[#e83d96]">Hawatrans</p>
      </div>
    );
  }

  if (!post && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#e83d96]">Post Not Found</h1>
            <p className="text-gray-600">The original post for this slug could not be found in any language.</p>
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
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="bg-pink-50 border-l-4 border-[#e83d96] p-4 mb-6">
            <p className="text-pink-700">
              🔒 <strong>{t('adminArea')}</strong> • Editing post in <strong>{post?.locale.toUpperCase()}</strong>
            </p>
          </div>

          <h1 className="text-4xl font-bold mb-8 text-[#e83d96]">{t('edit')} Post</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('titleField')}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                // UBAH: Ditambahkan text-black dan bg-white
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('excerptField')}
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows={3}
                // UBAH: Ditambahkan text-black dan bg-white
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('contentField')}
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                rows={15}
                // UBAH: Ditambahkan text-black dan bg-white
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                // UBAH: Ditambahkan text-black dan bg-white
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
              />
            </div>

            <div className="flex gap-4">
              <button
                type="submit"
                className="bg-[#e83d96] text-white px-8 py-2 rounded-lg hover:bg-pink-700 transition"
              >
                {t('save')}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/${locale}/blog/${slug}`)}
                className="bg-gray-500 text-white px-8 py-2 rounded-lg hover:bg-gray-600 transition"
              >
                {t('cancel')}
              </button>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function EditBlogPage() {
  return (
    <ProtectedRoute>
      <EditBlogContent />
    </ProtectedRoute>
  );
}