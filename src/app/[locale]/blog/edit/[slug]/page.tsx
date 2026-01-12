'use client';

import {useState, useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import ProtectedRoute from '@/components/ProtectedRoute';
import {useBlog} from '@/contexts/BlogContext';
// ✅ PENTING: Gunakan TextEditor, bukan Textarea biasa
import TextEditor from '@/components/TextEditor'; 

function EditBlogContent() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('blog');
  
  // Ambil slug dan locale dari URL
  const slug = params.slug as string;
  const locale = params.locale as string;

  const {getPostBySlug, updatePost, posts} = useBlog();
  const [isLoading, setIsLoading] = useState(true);

  // --- 1. CARI DATA POSTINGAN LAMA ---
  // Coba cari post di locale saat ini
  let post = getPostBySlug(slug, locale);
  
  // Jika tidak ditemukan, cari di list utama (fallback)
  if (!post) {
    post = posts.find(p => p.slug === slug);
  }

  // State untuk Form
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    tags: ''
  });

  // --- 2. ISI FORM DENGAN DATA LAMA ---
  useEffect(() => {
    if (post) {
      setFormData({
        title: post.title,
        excerpt: post.excerpt,
        content: post.content, // HTML/Markdown lama masuk ke sini
        tags: post.tags.join(', ')
      });
    }
    setIsLoading(false);
  }, [post]);

  // --- 3. SIMPAN PERUBAHAN ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validasi sederhana agar konten tidak kosong
    if (!formData.content || formData.content === '<p><br></p>') {
        alert('Konten tidak boleh kosong!');
        return;
    }

    if (post) {
      // Update data ke database
      const success = await updatePost(slug, post.locale, {
        title: formData.title,
        excerpt: formData.excerpt,
        content: formData.content, // Konten baru (HTML) dari editor
        tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean)
      });
      
      if (success) {
        alert('Berhasil diperbarui! / Updated successfully!');
        router.push(`/${locale}/blog/${slug}`); // Balik ke halaman baca
      } else {
        alert('Gagal update. Coba lagi.');
      }
    }
  };

  // --- TAMPILAN LOADING ---
  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
        <p className="text-2xl font-bold text-[#e83d96]">Hawatrans</p>
      </div>
    );
  }

  // --- TAMPILAN JIKA POST TIDAK KETEMU ---
  if (!post && !isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4 text-[#e83d96]">Post Not Found</h1>
            <button onClick={() => router.push('/blog')} className="text-blue-600 underline">
              Kembali ke Blog
            </button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // --- TAMPILAN FORM EDIT ---
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Header Info */}
          <div className="bg-pink-50 border-l-4 border-[#e83d96] p-4 mb-6">
            <p className="text-pink-700">
              🔒 <strong>{t('adminArea')}</strong> • Sedang mengedit: <strong>{formData.title}</strong>
            </p>
          </div>

          <h1 className="text-4xl font-bold mb-8 text-[#e83d96]">{t('edit')} Post</h1>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 space-y-6">
            
            {/* Input Judul */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('titleField')}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                required
              />
            </div>

            {/* Input Excerpt (Ringkasan) */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('excerptField')}
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({...formData, excerpt: e.target.value})}
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
                required
              />
            </div>

            {/* ✅ EDITOR KONTEN CANGGIH */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                {t('contentField')}
              </label>
              
              <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                <TextEditor 
                    value={formData.content}
                    onChange={(newContent) => setFormData({...formData, content: newContent})}
                    placeholder="Edit konten artikel di sini..."
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Gunakan toolbar untuk format teks & link gambar. Hapus simbol markdown manual (**, ##) jika masih ada.
              </p>
            </div>

            {/* Input Tags */}
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Tags (pisahkan dengan koma)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white"
              />
            </div>

            {/* Tombol Aksi */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                className="bg-[#e83d96] text-white px-8 py-2 rounded-lg hover:bg-pink-700 transition font-bold shadow-sm"
              >
                💾 {t('save')}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/${locale}/blog/${slug}`)}
                className="bg-gray-500 text-white px-8 py-2 rounded-lg hover:bg-gray-600 transition font-bold shadow-sm"
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