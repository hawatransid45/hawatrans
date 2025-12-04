'use client';

import {useEffect} from 'react';
import {useRouter, useParams} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';

export default function ProtectedRoute({children}: {children: React.ReactNode}) {
  const {isAuthenticated, isLoading} = useAuth();
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(`/${locale}/admin/login`);
    }
  }, [isAuthenticated, isLoading, router, locale]);

  if (isLoading || !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memverifikasi autentikasi...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
