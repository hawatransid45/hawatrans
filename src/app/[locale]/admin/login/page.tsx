'use client';

import {useState} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {useTranslations} from 'next-intl';
import {useAuth} from '@/contexts/AuthContext';
import {Link} from '@/i18n/routing';

export default function AdminLoginPage() {
  const router = useRouter();
  const params = useParams();
  const t = useTranslations('loginPage');
  const {login} = useAuth();
  const locale = params.locale as string;

  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const success = login(formData.username, formData.password);
    if (success) {
      router.push('/');
    } else {
      setError(t('error'));
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Kolom Kiri: Gambar */}
      <div className="relative hidden lg:block bg-cover bg-no-repeat" style={{
        backgroundImage: "url('/images/hawa.jpg')",
        // Posisi X (horizontal): 25% dari kiri
        // Posisi Y (vertikal): 80% dari atas (lebih ke bawah)
        backgroundPosition: '25% 30%'
      }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="relative h-full flex flex-col justify-end p-12 text-white">
          <h1 className="text-4xl font-bold leading-tight">Hawatrans.id</h1>
          <p className="mt-2 text-lg text-gray-200">{t('heroSlogan')}</p>
        </div>
      </div>

      {/* Kolom Kanan: Form Login */}
      <div className="flex items-center justify-center bg-gray-50 p-6 sm:p-12">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-[#e83d96] mb-2">{t('title')}</h2>
          <p className="text-gray-600 mb-8">{t('subtitle')}</p>

          {error && (
            <div className="bg-red-100 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mb-6" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">{t('usernameLabel')}</label>
              <input type="text" id="username" value={formData.username} onChange={(e) => setFormData({...formData, username: e.target.value})} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white" />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">{t('passwordLabel')}</label>
              <input type="password" id="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#e83d96] text-black bg-white" />
            </div>
            <button type="submit" className="w-full bg-[#e83d96] text-white py-3 px-6 rounded-lg hover:bg-pink-700 transition text-base font-semibold shadow-md">
              {t('loginButton')}
            </button>
          </form>
          <div className="text-center mt-6">
            <Link href="/" className="text-sm text-gray-500 hover:text-[#e83d96] hover:underline">{t('backToHome')}</Link>
          </div>
        </div>
      </div>
    </div>
  );
}