'use client';

import { useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';
import { PhoneIcon, EnvelopeIcon, MapPinIcon } from '@heroicons/react/24/solid';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';

export default function ContactPage() {
  const t = useTranslations('contactPage');
  const { isAuthenticated } = useAuth();
  
  // State untuk contact settings dari database
  const [whatsappNumber, setWhatsappNumber] = useState('6281588333382');
  const [whatsappNumberFormatted, setWhatsappNumberFormatted] = useState('+62 815-8833-382');
  const [email, setEmail] = useState('hawatrans@yahoo.com');
  const [address, setAddress] = useState('Jl. Swadaya II RT.001/006 No.70 Tanjung Barat, Jagakarsa, Jakarta Selatan 12530');
  
  // State untuk edit mode
  const [editingContact, setEditingContact] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    whatsappNumber: '6281588333382',
    whatsappNumberFormatted: '+62 815-8833-382',
    email: 'hawatrans@yahoo.com',
    address: 'Jl. Swadaya II RT.001/006 No.70 Tanjung Barat, Jagakarsa, Jakarta Selatan 12530'
  });

  // Load contact settings dari database
  useEffect(() => {
    const loadContactSettings = async () => {
      try {
        const response = await fetch('/api/contact-settings', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          setWhatsappNumber(data.data.whatsappNumber);
          setWhatsappNumberFormatted(data.data.whatsappNumberFormatted);
          setEmail(data.data.email || 'hawatrans@yahoo.com');
          setAddress(data.data.address || 'Jl. Swadaya II RT.001/006 No.70 Tanjung Barat, Jagakarsa, Jakarta Selatan 12530');
          setContactFormData({
            whatsappNumber: data.data.whatsappNumber,
            whatsappNumberFormatted: data.data.whatsappNumberFormatted,
            email: data.data.email || 'hawatrans@yahoo.com',
            address: data.data.address || 'Jl. Swadaya II RT.001/006 No.70 Tanjung Barat, Jagakarsa, Jakarta Selatan 12530'
          });
        }
      } catch (error) {
        console.error('Failed to load contact settings:', error);
      }
    };

    loadContactSettings();
  }, []);

  const handleSaveContactSettings = async () => {
    if (!contactFormData.whatsappNumber || !contactFormData.whatsappNumberFormatted) {
      alert('⚠️ Nomor WhatsApp harus diisi!');
      return;
    }

    try {
      const response = await fetch('/api/contact-settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactFormData)
      });

      const data = await response.json();

      if (data.success) {
        setWhatsappNumber(contactFormData.whatsappNumber);
        setWhatsappNumberFormatted(contactFormData.whatsappNumberFormatted);
        setEmail(contactFormData.email);
        setAddress(contactFormData.address);
        setEditingContact(false);
        alert('✅ Informasi kontak berhasil diperbarui!');
      } else {
        alert('❌ Gagal menyimpan: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save contact settings:', error);
      alert('❌ Gagal menyimpan informasi kontak. Silakan coba lagi.');
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${whatsappNumber}`, '_blank');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#e83d96]">{t('title')}</h1>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{t('subtitle')}</p>
            <div className="mt-4 h-1 w-24 bg-pink-200 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-stretch">
            {/* Kolom Kiri: Info Kontak */}
            <div className="w-full bg-white p-6 rounded-xl shadow-lg border border-gray-200/80 flex flex-col h-full lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <img src="/images/hawa-rbg.png" alt="Hawatrans Logo" className="h-10 w-10 object-contain" />
                  <h2 className="text-2xl font-bold text-gray-800">{t('company')}</h2>
                </div>
                {isAuthenticated && (
                  <button 
                    onClick={() => {
                      setEditingContact(!editingContact);
                      if (!editingContact) {
                        setContactFormData({
                          whatsappNumber,
                          whatsappNumberFormatted,
                          email,
                          address
                        });
                      }
                    }}
                    className="text-sm font-semibold text-[#e83d96] hover:text-pink-700 transition"
                  >
                    {editingContact ? '❌ Batal' : '✏️ Edit Kontak'}
                  </button>
                )}
              </div>
              
              {editingContact ? (
                // Form Edit untuk Admin
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Alamat Lengkap
                    </label>
                    <textarea 
                      value={contactFormData.address}
                      onChange={(e) => setContactFormData({...contactFormData, address: e.target.value})}
                      placeholder="Jl. Swadaya II RT.001/006 No.70..."
                      rows={3}
                      className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-[#e83d96]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nomor WhatsApp (untuk link, tanpa +)
                    </label>
                    <input 
                      type="text" 
                      value={contactFormData.whatsappNumber}
                      onChange={(e) => setContactFormData({...contactFormData, whatsappNumber: e.target.value})}
                      placeholder="6281588333382"
                      className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-[#e83d96]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Nomor WhatsApp (untuk display)
                    </label>
                    <input 
                      type="text" 
                      value={contactFormData.whatsappNumberFormatted}
                      onChange={(e) => setContactFormData({...contactFormData, whatsappNumberFormatted: e.target.value})}
                      placeholder="+62 815-8833-382"
                      className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-[#e83d96]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      Email
                    </label>
                    <input 
                      type="email" 
                      value={contactFormData.email}
                      onChange={(e) => setContactFormData({...contactFormData, email: e.target.value})}
                      placeholder="hawatrans@yahoo.com"
                      className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-[#e83d96]"
                    />
                  </div>
                  <button 
                    onClick={handleSaveContactSettings}
                    className="w-full bg-[#e83d96] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition"
                  >
                    💾 Simpan Perubahan
                  </button>
                </div>
              ) : (
                // Tampilan Normal - Info Kontak
                <div className="space-y-5">
                  <div className="flex items-start gap-4">
                    <MapPinIcon className="w-6 h-6 text-[#e83d96] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{t('addressTitle')}</h3>
                      <p className="text-gray-600 text-sm">{address}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <PhoneIcon className="w-6 h-6 text-[#e83d96] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{t('phone')}</h3>
                      <p className="text-gray-600 text-sm">{whatsappNumberFormatted}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <EnvelopeIcon className="w-6 h-6 text-[#e83d96] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 text-base">{t('email')}</h3>
                      <p className="text-gray-600 text-sm break-all">{email}</p>
                      <p className="text-gray-600 text-sm break-all">hawatranslations@gmail.com</p>
                    </div>
                  </div>
                </div>
              )}
              
              <div className="mt-8 flex justify-center">
                <button onClick={openWhatsApp} className="max-w-xs bg-green-500 text-white py-2.5 px-5 rounded-lg hover:bg-green-600 transition flex items-center justify-center gap-2 text-base font-semibold shadow-md">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                {t('whatsappButton')}
              </button>
              </div>
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="text-center font-semibold text-gray-700 mb-4">{t('paymentTitle')}</h4>
                <div className="flex justify-center items-center gap-4">
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-center items-center w-28 h-16">
                    <img src="/images/bca.png" alt="BCA" className="h-10 object-contain" />
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg shadow-sm flex justify-center items-center w-28 h-16">
                    <img src="/images/mandiri.png" alt="Bank Mandiri" className="h-10 object-contain" />
                  </div>
                </div>
              </div>
            </div>
            {/* Peta Lokasi */}
            <div className="rounded-xl overflow-hidden shadow-lg border border-gray-200/80 h-full lg:col-span-3">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.694668269643!2d106.83699497474616!3d-6.303944993685036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69ed5df538336d%3A0x8494241594a4374!2sJl.%20Swadaya%20II%2C%20RT.1%2FRW.6%2C%20Tj.%20Bar.%2C%20Kec.%20Jagakarsa%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012530!5e0!3m2!1sen!2sid!4v1716543210987!5m2!1sen!2sid" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={true} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}