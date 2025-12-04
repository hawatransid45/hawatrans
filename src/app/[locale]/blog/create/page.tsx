'use client';

import {useState} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useBlog} from '@/contexts/BlogContext';
import {useAuth} from '@/contexts/AuthContext';

function CreateBlogContent() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('blog');
  const locale = params.locale as string;
  const {addPost} = useBlog();
  const {user} = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const success = await addPost({
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      author: user?.username || 'Admin',
      slug: `${slug}-${Date.now()}`,
      locale: locale as 'en' | 'id' | 'ko' | 'zh' | 'ja',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      publishedAt: new Date().toISOString().split('T')[0]
    });
    
    if (success) {
      alert('Blog post created successfully!');
      router.push(`/${locale}/blog`);
    } else {
      alert('Failed to create blog post. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-2 text-[#e83d96]">{t('create')}</h1>
          <p className="text-gray-600 mb-8">{t('adminArea')}</p>
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Kolom Kiri: Konten Utama */}
            <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('titleField')}
                </label>
                <input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('excerptField')}
                </label>
                <textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                  required
                />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-semibold text-gray-800 mb-2">
                  {t('contentField')}
                </label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  rows={18}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                  required
                />
                <p className="text-xs text-gray-500 mt-2">{t('markdownHelper')}</p>
              </div>
            </div>

            {/* Kolom Kanan: Metadata & Aksi */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 space-y-6">
                <div>
                  <label htmlFor="tags" className="block text-sm font-semibold text-gray-800 mb-2">
                    Tags
                  </label>
                  <input
                    id="tags"
                    type="text"
                    value={formData.tags}
                    onChange={(e) => setFormData({...formData, tags: e.target.value})}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                    placeholder="Edukasi, LPDP, Bisnis"
                  />
                  <p className="text-xs text-gray-500 mt-2">{t('tagsHelper')}</p>
                </div>

                <div className="border-t pt-6 space-y-3">
                  <button
                    type="submit"
                    className="w-full bg-[#e83d96] text-white px-6 py-2.5 rounded-lg hover:bg-pink-700 transition font-semibold"
                  >
                    {t('save')}
                  </button>
                  <button
                    type="button"
                    onClick={() => router.push('/blog')}
                    className="w-full bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 transition font-semibold"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default function CreateBlogPage() {
  return (
    <ProtectedRoute>
      <CreateBlogContent />
    </ProtectedRoute>
  );
}