'use client';

import { useState, useMemo, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useAuth } from '@/contexts/AuthContext';
import { SpeakerWaveIcon, PauseCircleIcon, ShieldCheckIcon, DocumentCheckIcon, DocumentTextIcon, PencilIcon, ArrowsRightLeftIcon, BanknotesIcon, CreditCardIcon, CalendarDaysIcon, UserIcon } from '@heroicons/react/24/outline';

// Import Style CSS untuk Editor
import 'react-quill-new/dist/quill.snow.css';

// Gunakan dynamic import agar editor hanya dimuat di browser (Client Side)
const ReactQuill = dynamic(() => import('react-quill-new'), { 
  ssr: false,
  loading: () => <p className="p-4 text-black">Loading Editor...</p>
});

interface TranslationService {
  id: string;
  number: number;
  language: string;
  generalPrice: string;
  swornPrice: string;
}

export default function ServicesPage() {
  const t = useTranslations('services');
  const tc = useTranslations('servicesContact');
  const { isAuthenticated } = useAuth();
  
  // === DATA DEFAULT (Static) - Gunakan useMemo agar tidak berubah di setiap render ===
  const defaultServices = useMemo(() => [
    { id: '1', number: 1, language: 'Inggris', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '2', number: 2, language: 'Arab', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '3', number: 3, language: 'Mandarin - Indonesia', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '4', number: 4, language: 'Indonesia - Mandarin', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '5', number: 5, language: 'Jepang - Indonesia', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '6', number: 6, language: 'Indonesia - Jepang', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '7', number: 7, language: 'Jerman', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '8', number: 8, language: 'Belanda', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '9', number: 9, language: 'Prancis', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '10', number: 10, language: 'Spanyol', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '11', number: 11, language: 'Portugis', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '12', number: 12, language: 'Italia', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
    { id: '13', number: 13, language: 'Vietnam', generalPrice: 'Hubungi WA', swornPrice: 'Hubungi WA' },
  ], []);

  // Default Konten Prosedur (Sebelah Contact Us)
  const defaultProsedurContent = `
    <p>Dokumen yang akan diterjemahkan bisa melalui beberapa kemudahan sbb:</p>
    <ol>
      <li>Bahan terjemahan bisa di-scan dahulu, kemudian dikirim via WhatsApp atau e-mail. Hasil terjemahan bisa diambil di kantor kami atau diantar</li>
      <li>Bahan yang akan terjemahan bisa dikirim melalui WhatsApp atau e-mail, kemudian hasil terjemahan bisa diambil di kantor kami atau hasil terjemahan kami antar.</li>
      <li>Kami melayani antar jemput dokumen</li>
      <li>Untuk klien luar Jakarta, bahan & hasil terjemahan bisa difaks, di-email atau dikirim dengan jasa pengiriman [PT Pos Indonesia, TIKI, JNE dsb].</li>
      <li>Untuk terjemahan umum [Tidak tersumpah], pengiriman bahan dan hasil terjemahan bisa cukup melalui e-mail (Word atau PDF).</li>
    </ol>
    <p><span style="background-color: rgb(255, 255, 0);"><strong>Note:</strong> Antar Jemput Dokumen gratis untuk Jumlah Dokumen diatas 20 Halaman.</span></p>
  `;

  // Default Konten Interpreter
  const defaultInterpreterContent = `
    <p><strong>Jasa Interpreter Profesional</strong></p>
    <p>Kami menyediakan layanan interpreter profesional untuk berbagai kebutuhan bisnis dan acara Anda:</p>
    <ul>
      <li><strong>Interpreter Simultan:</strong> Penerjemahan real-time untuk konferensi, seminar, dan acara besar</li>
      <li><strong>Interpreter Konsekutif:</strong> Penerjemahan bergantian untuk pertemuan bisnis dan diskusi</li>
      <li>Tim interpreter berpengalaman di berbagai industri</li>
      <li>Dukungan untuk lebih dari 10 bahasa internasional</li>
    </ul>
  `;

  // Default Konten Legalisasi
  const defaultLegalizationContent = `
    <p><strong>Layanan Legalisasi Dokumen</strong></p>
    <p>Kami membantu proses legalisasi dokumen Anda di berbagai instansi pemerintah:</p>
    <ul>
      <li>Legalisasi Kemenkumham (Kementerian Hukum dan HAM)</li>
      <li>Legalisasi Kemenlu (Kementerian Luar Negeri)</li>
      <li>Legalisasi Kedutaan Besar berbagai negara</li>
      <li>Proses cepat dan terpercaya</li>
      <li>Konsultasi gratis untuk persyaratan legalisasi</li>
    </ul>
  `;

  // Default Konten Apostille
  const defaultApostilleContent = `
    <p><strong>Layanan Apostille</strong></p>
    <p>Apostille adalah legalisasi dokumen internasional untuk negara-negara anggota Konvensi Den Haag:</p>
    <ul>
      <li>Apostille untuk dokumen pendidikan (ijazah, transkrip)</li>
      <li>Apostille untuk dokumen pribadi (akta kelahiran, akta nikah)</li>
      <li>Apostille untuk dokumen bisnis</li>
      <li>Proses melalui Kementerian Hukum dan HAM RI</li>
      <li>Berlaku untuk lebih dari 100 negara anggota</li>
    </ul>
  `;

  // === STATE INITIALIZATION ===
  const [services, setServices] = useState<TranslationService[]>(defaultServices);
  const [prosedurHtml, setProsedurHtml] = useState(defaultProsedurContent);
  const [interpreterHtml, setInterpreterHtml] = useState(defaultInterpreterContent);
  const [legalizationHtml, setLegalizationHtml] = useState(defaultLegalizationContent);
  const [apostilleHtml, setApostilleHtml] = useState(defaultApostilleContent);
  
  // State untuk Contact Settings
  const [whatsappNumber, setWhatsappNumber] = useState('6281224000088');
  const [whatsappNumberFormatted, setWhatsappNumberFormatted] = useState('+62 812-2400-0088');
  const [editingContact, setEditingContact] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    whatsappNumber: '6281224000088',
    whatsappNumberFormatted: '+62 812-2400-0088'
  });
  
  const [activeTab, setActiveTab] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // === LOAD FROM DATABASE ===
  useEffect(() => {
    setIsMounted(true);
    
    // Load services dari database
    const loadServices = async () => {
      try {
        const response = await fetch('/api/services/prices', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0'
          }
        });
        const data = await response.json();
        
        if (data.success && data.data && data.data.length > 0) {
          // Filter dan validate data - pastikan semua punya ID
          const validServices = data.data
            .filter((s: TranslationService) => s.id && s.language) // Hanya ambil yang punya id dan language
            .map((s: TranslationService, index: number) => ({
              ...s,
              id: s.id || `fallback-${index}`, // Fallback ID jika tidak ada
              number: s.number || index + 1 // Fallback number
            }));
          
          if (validServices.length > 0) {
            setServices(validServices);
          } else {
            // Jika semua data invalid, gunakan default saja (JANGAN auto-save)
            setServices(defaultServices);
          }
        } else {
          // Jika database kosong, gunakan default saja (JANGAN auto-save)
          // Admin bisa klik "Reset Data" jika mau save default services
          setServices(defaultServices);
        }
      } catch (error) {
        console.error('Failed to load services:', error);
        setServices(defaultServices);
      }
    };

    loadServices();

    // Load content dari database
    const loadContent = async () => {
      try {
        const response = await fetch('/api/services/content', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          if (data.data.prosedur) setProsedurHtml(data.data.prosedur);
          if (data.data.interpreter) setInterpreterHtml(data.data.interpreter);
          if (data.data.legalization) setLegalizationHtml(data.data.legalization);
          if (data.data.apostille) setApostilleHtml(data.data.apostille);
        }
      } catch (error) {
        console.error('Failed to load service content:', error);
      }
    };

    loadContent();
  }, [defaultServices]);

  // Load contact settings
  useEffect(() => {
    const loadContactSettings = async () => {
      try {
        const response = await fetch('/api/contact-settings', {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        });
        const data = await response.json();
        
        if (data.success && data.data) {
          setWhatsappNumber(data.data.whatsappNumber);
          setWhatsappNumberFormatted(data.data.whatsappNumberFormatted);
          setContactFormData({
            whatsappNumber: data.data.whatsappNumber,
            whatsappNumberFormatted: data.data.whatsappNumberFormatted
          });
        }
      } catch (error) {
        console.error('Failed to load contact settings:', error);
      }
    };

    loadContactSettings();
  }, []);

  // State Edit
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [serviceFormData, setServiceFormData] = useState({ language: '', generalPrice: '', swornPrice: '' });
  
  // State untuk Tambah Layanan Baru
  const [isAdding, setIsAdding] = useState(false);
  const [newServiceData, setNewServiceData] = useState({ language: '', generalPrice: '', swornPrice: '' });

  // Toggle Edit Mode
  const [editingProsedur, setEditingProsedur] = useState(false);
  const [editingInterpreter, setEditingInterpreter] = useState(false);
  const [editingLegalization, setEditingLegalization] = useState(false);
  const [editingApostille, setEditingApostille] = useState(false);  

  const modules = useMemo(() => ({
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'color': [] }, { 'background': [] }],
      ['link', 'image'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false
    }
  }), []);

  // --- Functions Table ---
  const handleEditService = (service: TranslationService) => {
    setEditingServiceId(service.id);
    setServiceFormData({
      language: service.language,
      generalPrice: service.generalPrice,
      swornPrice: service.swornPrice
    });
  };

  const handleSaveService = async () => {
    if (!editingServiceId) {
      alert('⚠️ Tidak ada layanan yang sedang diedit');
      return;
    }

    if (!serviceFormData.language) {
      alert('⚠️ Nama bahasa harus diisi!');
      return;
    }
    
    const updatedServices = services.map(s => 
      s.id === editingServiceId 
        ? { 
            ...s, 
            language: serviceFormData.language,
            generalPrice: 'Hubungi WA', // Keep default
            swornPrice: 'Hubungi WA' // Keep default
          }
        : s
    );
    
    setServices(updatedServices);
    
    // Save to database
    try {
      const response = await fetch('/api/services/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedServices })
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('✅ Layanan berhasil diperbarui!');
        setEditingServiceId(null);
        setServiceFormData({ language: '', generalPrice: '', swornPrice: '' });
      } else {
        alert('❌ Gagal menyimpan: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save service:', error);
      alert('❌ Gagal menyimpan layanan. Silakan coba lagi.');
    }
  };

  const handleCancelService = () => {
    setEditingServiceId(null);
    setServiceFormData({ language: '', generalPrice: '', swornPrice: '' });
  };

  const handleSaveNewService = async () => {
    if (!newServiceData.language) {
      alert('⚠️ Nama bahasa harus diisi!');
      return;
    }
    const newService: TranslationService = {
      id: new Date().toISOString(),
      number: services.length + 1,
      language: newServiceData.language,
      generalPrice: 'Hubungi WA', // Default value
      swornPrice: 'Hubungi WA' // Default value
    };
    const updatedServices = [...services, newService];
    
    // Save to database
    try {
      const response = await fetch('/api/services/prices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ services: updatedServices })
      });
      
      const data = await response.json();
      
      if (data.success) {
        // Update state dengan data dari database
        setServices(updatedServices);
        setIsAdding(false);
        setNewServiceData({ language: '', generalPrice: '', swornPrice: '' });
        alert('✅ Layanan baru berhasil ditambahkan!');
      } else {
        alert('❌ Gagal menyimpan: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save new service:', error);
      alert('❌ Gagal menyimpan layanan baru. Silakan coba lagi.');
    }
  };

  const handleDeleteService = async (id: string) => {
    if (window.confirm(t('alertDeleteConfirm'))) {
      const updatedServices = services
        .filter(s => s.id !== id)
        .map((s, index) => ({ ...s, number: index + 1 })); // Re-number services
      
      setServices(updatedServices);
      
      // Save to database
      try {
        await fetch('/api/services/prices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ services: updatedServices })
        });
        alert('Service deleted successfully!');
      } catch (error) {
        console.error('Failed to delete service:', error);
        alert('Failed to delete service. Please try again.');
      }
    }
  };

  // Helper function untuk mendapatkan kode negara berdasarkan nama bahasa
  const getCountryCode = (language: string): string => {
    const lang = language.toLowerCase();
    if (lang.includes('inggris')) return 'GB';
    if (lang.includes('arab')) return 'SA';
    if (lang.includes('mandarin - indonesia')) return 'CN-ID';
    if (lang.includes('indonesia - mandarin')) return 'ID-CN';
    if (lang.includes('jepang - indonesia')) return 'JP-ID';
    if (lang.includes('indonesia - jepang')) return 'ID-JP';
    if (lang.includes('jerman')) return 'DE';
    if (lang.includes('belanda')) return 'NL';
    if (lang.includes('prancis')) return 'FR';
    if (lang.includes('spanyol')) return 'ES';
    if (lang.includes('portugis')) return 'PT';
    if (lang.includes('italia')) return 'IT';
    if (lang.includes('vietnam')) return 'VN';
    if (lang.includes('thailand')) return 'TH';
    
    // Default: ambil 2 huruf pertama dari nama bahasa (uppercase)
    return language.substring(0, 2).toUpperCase();
  };

  // Helper function untuk mendapatkan warna badge berdasarkan bahasa
  const getBadgeColor = (language: string): string => {
    const lang = language.toLowerCase();
    if (lang.includes('inggris')) return 'bg-blue-600';
    if (lang.includes('arab')) return 'bg-green-600';
    if (lang.includes('mandarin')) return 'bg-red-600';
    if (lang.includes('jepang')) return 'bg-pink-600';
    if (lang.includes('jerman')) return 'bg-yellow-600';
    if (lang.includes('belanda')) return 'bg-orange-600';
    if (lang.includes('prancis')) return 'bg-indigo-600';
    if (lang.includes('spanyol')) return 'bg-rose-600';
    if (lang.includes('portugis')) return 'bg-emerald-600';
    if (lang.includes('italia')) return 'bg-teal-600';
    if (lang.includes('vietnam')) return 'bg-cyan-600';
    if (lang.includes('thailand')) return 'bg-purple-600';
    // Default: warna acak berdasarkan panjang nama
    const colors = ['bg-blue-600', 'bg-green-600', 'bg-red-600', 'bg-yellow-600', 'bg-indigo-600', 'bg-pink-600'];
    return colors[language.length % colors.length];
  };

  const handleAddNewService = () => {
    setIsAdding(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  };

  // Fungsi untuk save content ke database
  const saveContentToDatabase = async (key: string, content: string) => {
    try {
      const response = await fetch('/api/services/content', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ key, content }),
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Content saved successfully!');
        return true;
      } else {
        alert('Failed to save content: ' + data.error);
        return false;
      }
    } catch (error) {
      console.error('Error saving content:', error);
      alert('Failed to save content. Please try again.');
      return false;
    }
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/6281588833382`, '_blank');
  };

  // Fungsi untuk save contact settings
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
        setEditingContact(false);
        alert('✅ Nomor WhatsApp berhasil diperbarui!');
      } else {
        alert('❌ Gagal menyimpan: ' + (data.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Failed to save contact settings:', error);
      alert('❌ Gagal menyimpan nomor WhatsApp. Silakan coba lagi.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-grow bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          
          {/* Header & Contact Box */}
          <div className="mb-12 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold text-[#e83d96]">{t('professionalServices')}</h1>
            <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">{t('comprehensiveSolution')}</p>
            <div className="mt-4 h-1 w-24 bg-pink-200 mx-auto rounded-full"></div>
          </div>

          {/* === BAGIAN LAYANAN (BENTUK TAB) === */}
          <div className="mb-16">
            <div className="flex space-x-1 bg-pink-100/60 rounded-full p-1 overflow-x-auto">
              {[t('tabTranslationProcess'), t('tabInterpreter'), t('tabLegalization'), t('tabApostille')].map((tab, index) => (
                <button
                  key={`tab-${index}`}
                  onClick={() => setActiveTab(index)}
                  className={`w-full py-2.5 px-4 text-center rounded-full transition-all duration-300 text-sm sm:text-base font-semibold whitespace-nowrap ${
                    activeTab === index
                      ? 'bg-white text-[#e83d96] shadow-md'
                      : 'text-gray-600 hover:bg-white/60 hover:text-[#e83d96]'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-b-lg shadow-md">
              {/* Konten Tab 1: Proses Penerjemahan */}
              {activeTab === 0 && (
                <div>
                  {/* Grid untuk dua kartu atas */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mb-12">
                    {/* Kolom Kiri */}
                    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 h-full flex flex-col">
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-pink-100 flex items-center justify-center flex-shrink-0">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#e83d96]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                            </div>                            
                            <h2 className="text-xl font-bold text-gray-800">{t('translationProcessTitle')}</h2>
                          </div>
                          {isAuthenticated && (
                            <button onClick={() => setEditingProsedur(!editingProsedur)} className="text-sm font-semibold text-[#e83d96] hover:text-pink-700 transition whitespace-nowrap">
                              {editingProsedur ? t('closeEditor') : '✏️ Edit'}
                            </button>
                          )}
                        </div>
                        {isMounted && editingProsedur ? (
                          <div className="mt-4">
                            <ReactQuill theme="snow" value={prosedurHtml} onChange={setProsedurHtml} modules={modules} className="text-black h-72 mb-16 bg-white rounded-lg" />
                            <button onClick={async () => { 
                              const success = await saveContentToDatabase('prosedur', prosedurHtml); 
                              if (success) setEditingProsedur(false); 
                            }} className="mt-4 bg-[#e83d96] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm">{t('saveProcedure')}</button>
                          </div>
                        ) : (
                          <div className="prose-container">
                            <div dangerouslySetInnerHTML={{ __html: prosedurHtml }} className="prose prose-sm max-w-none text-gray-600 mt-4" />
                            <style jsx global>{`
                              .prose-container ol {
                                list-style-type: decimal;
                                margin-left: 1.25rem; /* ml-5 */
                                margin-bottom: 1rem; /* mb-4 */
                                padding-left: 0; /* Override default Quill padding */
                              }
                              .prose-container li {
                                margin-bottom: 0.25rem; /* mb-1 */
                                color: #4b5563; /* text-gray-600 */
                              }
                              .prose-container strong {
                                color: #1f2937; /* text-gray-800 */
                              }
                              .prose-container p span[style*="background-color: rgb(255, 255, 0)"] {
                                background-color: #fffbeb; /* yellow-50 */
                                border-left: 4px solid #fcd34d; /* yellow-500 */
                                padding: 1rem; /* p-4 */
                                border-radius: 0.5rem; /* rounded-lg */
                                display: block; /* Ensure it takes full width */
                                font-style: italic;
                                margin-top: 1rem; /* mt-4 */
                                margin-bottom: 1rem; /* mb-4 */
                              }
                            `}</style>
                          </div>
                        )}
                    </div>

                    {/* Kolom Kanan */}
                    <div className="flex flex-col gap-6 lg:gap-8">
                      {/* Kartu Standard Terjemahan */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80 flex flex-col">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">{t('translationStandard')}</h2>
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <DocumentTextIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{t('formatPaper')}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <PencilIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{t('formatFont')}</span>
                          </div>
                          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <ArrowsRightLeftIcon className="w-5 h-5 text-blue-600 flex-shrink-0" />
                            <span className="text-gray-700">{t('formatSpacing')}</span>
                          </div>
                        </div>
                        <div className="mt-4 bg-red-50 border border-red-200/80 text-red-700 text-xs p-3 rounded-lg">
                          {t('bilingualNote')}
                        </div>
                      </div>

                      {/* Kartu Pembayaran */}
                      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200/80">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                          </div>
                          <h2 className="text-xl font-bold text-gray-800">{t('paymentTitle')}</h2>
                        </div>
                        <div className="mt-5 space-y-3 text-sm">
                          <div key="payment-1" className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <BanknotesIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{t('paymentMethod1')}</span>
                          </div>
                          <div key="payment-2" className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <CreditCardIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">
                              {t.rich('paymentMethod2', {
                                contactLink: (chunks) => <Link href="/contact" className="text-[#e83d96] hover:underline font-semibold">{chunks}</Link>
                              })}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Daftar Harga Section */}
                  <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">{t('priceListTitle')}</h2>
                    
                    {/* Contact Settings Editor - Admin Only */}
                    {isAuthenticated && (
                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-4 mb-6 shadow-sm">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                            </svg>
                            <h3 className="font-bold text-green-800">Pengaturan WhatsApp</h3>
                          </div>
                          <button 
                            onClick={() => {
                              setEditingContact(!editingContact);
                              if (!editingContact) {
                                setContactFormData({
                                  whatsappNumber,
                                  whatsappNumberFormatted
                                });
                              }
                            }}
                            className="text-sm font-semibold text-green-600 hover:text-green-700 transition"
                          >
                            {editingContact ? '❌ Batal' : '✏️ Edit Nomor'}
                          </button>
                        </div>
                        
                        {editingContact ? (
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Nomor WhatsApp (untuk link, tanpa +)
                              </label>
                              <input 
                                type="text" 
                                value={contactFormData.whatsappNumber}
                                onChange={(e) => setContactFormData({...contactFormData, whatsappNumber: e.target.value})}
                                placeholder="6281224000088"
                                className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-green-500"
                              />
                              <p className="text-xs text-gray-500 mt-1">Contoh: 6281224000088</p>
                            </div>
                            <div>
                              <label className="block text-xs font-semibold text-gray-700 mb-1">
                                Nomor WhatsApp (untuk display, dengan format)
                              </label>
                              <input 
                                type="text" 
                                value={contactFormData.whatsappNumberFormatted}
                                onChange={(e) => setContactFormData({...contactFormData, whatsappNumberFormatted: e.target.value})}
                                placeholder="+62 812-2400-0088"
                                className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-green-500"
                              />
                              <p className="text-xs text-gray-500 mt-1">Contoh: +62 812-2400-0088</p>
                            </div>
                            <button 
                              onClick={handleSaveContactSettings}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition"
                            >
                              💾 Simpan Nomor WhatsApp
                            </button>
                          </div>
                        ) : (
                          <div className="text-sm text-gray-700">
                            <p className="font-semibold">Nomor saat ini: <span className="text-green-600">{whatsappNumberFormatted}</span></p>
                            <p className="text-xs text-gray-500 mt-1">Nomor ini akan digunakan di semua tombol &quot;Tanya Harga&quot;</p>
                          </div>
                        )}
                      </div>
                    )}
                    
                    {isAuthenticated && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-700 text-sm">{t('adminNotice')}</p>
                      </div>
                    )}

                    {isAuthenticated && !isAdding && (
                      <div className="flex justify-end mb-4 gap-2">
                        <button 
                          onClick={async () => {
                            if (confirm('⚠️ Reset semua data ke default? Semua perubahan akan hilang!')) {
                              try {
                                // Reset state dulu
                                setServices(defaultServices);
                                setEditingServiceId(null);
                                setServiceFormData({ language: '', generalPrice: '', swornPrice: '' });
                                
                                // Kemudian save ke database
                                const response = await fetch('/api/services/prices', {
                                  method: 'POST',
                                  headers: { 'Content-Type': 'application/json' },
                                  body: JSON.stringify({ services: defaultServices })
                                });
                                
                                const data = await response.json();
                                
                                if (data.success) {
                                  alert('✅ Data berhasil di-reset ke default!');
                                  // Reload halaman untuk memastikan data fresh
                                  window.location.reload();
                                } else {
                                  alert('❌ Gagal reset data: ' + (data.error || 'Unknown error'));
                                }
                              } catch (error) {
                                console.error('Failed to reset data:', error);
                                alert('❌ Gagal reset data. Silakan coba lagi.');
                              }
                            }
                          }} 
                          className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition text-sm"
                        >
                          🔄 Reset Data
                        </button>
                        <button onClick={handleAddNewService} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition text-sm">
                          {t('addServiceBtn')}
                        </button>
                      </div>
                    )}

                    {/* Daftar Harga - Desain Kartu Baru */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {services
                        .filter(s => s.id && s.language) // Extra safety: filter out invalid services
                        .map((service) => {
                        const isEditing = editingServiceId === service.id;
                        
                        if (isEditing) {
                          // Form Edit - Tampilkan HANYA ini
                          return (
                            <div key={`edit-${service.id}`} className="bg-white p-4 rounded-xl border-2 border-[#e83d96] shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
                              <div className="bg-pink-50 px-4 py-2 -mx-4 -mt-4 mb-4 rounded-t-xl border-b-2 border-[#e83d96]">
                                <p className="text-sm font-semibold text-[#e83d96]">✏️ Edit Layanan: {service.language}</p>
                              </div>
                              <div className="space-y-4">
                                <div>
                                  <label className="block text-xs font-semibold text-gray-700 mb-1">Nama Bahasa</label>
                                  <input 
                                    type="text" 
                                    value={serviceFormData.language} 
                                    onChange={(e) => setServiceFormData({...serviceFormData, language: e.target.value})} 
                                    placeholder="Contoh: Inggris" 
                                    className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-[#e83d96] focus:outline-none" 
                                  />
                                  <p className="text-xs text-gray-500 mt-1">💡 Harga sudah dihilangkan. Customer bisa langsung tanya via WhatsApp</p>
                                </div>
                              </div>
                              <div className="flex gap-2 mt-4 pt-4 border-t">
                                <button onClick={handleSaveService} className="bg-[#e83d96] text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700 transition">💾 {t('tableSave')}</button>
                                <button onClick={handleCancelService} className="bg-gray-200 text-gray-800 px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 transition">❌ {t('tableCancel')}</button>
                              </div>
                            </div>
                          );
                        }
                        
                        // Tampilan Kartu Normal
                        return (
                          <div key={`card-${service.id}`} className="group relative bg-white p-4 rounded-xl border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#e83d96]/50">
                            {/* Konten Utama */}
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex items-center gap-4">
                                <div className={`${getBadgeColor(service.language)} text-white font-bold px-3 py-2 rounded-lg text-sm min-w-[70px] text-center shadow-md`}>
                                  {getCountryCode(service.language)}
                                </div>
                                <span className="font-semibold text-gray-800 text-md">{service.language}</span>
                              </div>
                              
                              {/* Tombol WhatsApp - Selalu Terlihat */}
                              <a 
                                href={`https://wa.me/${whatsappNumber}?text=Halo,%20saya%20ingin%20tanya%20harga%20terjemahan%20bahasa%20${encodeURIComponent(service.language)}`}
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-all duration-300 text-sm font-semibold shadow-md hover:shadow-lg"
                              >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                <span>{t('askPrice')}</span>
                              </a>
                            </div>

                            {/* Admin Controls - Hanya untuk Admin */}
                            {isAuthenticated && (
                              <div className="flex gap-2 mt-3 pt-3 border-t">
                                <button onClick={() => handleEditService(service)} className="text-gray-400 hover:text-[#e83d96] p-1 rounded-md transition-colors text-sm">✏️ Edit</button>
                                <button onClick={() => handleDeleteService(service.id)} className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors text-sm">🗑️ Hapus</button>
                              </div>
                            )}
                          </div>
                        );
                      })}

                      {/* Form Tambah Layanan Baru */}
                      {isAdding && (
                        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300 shadow-lg mt-4 col-span-1 sm:col-span-2 lg:col-span-3">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="bg-gray-400 text-white font-bold px-3 py-2 rounded-lg text-sm min-w-[80px] text-center">
                              NEW
                            </div>
                            <input type="text" placeholder={t('placeholderLanguage')} value={newServiceData.language} onChange={(e) => setNewServiceData({...newServiceData, language: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <p className="text-xs text-gray-600 mb-3">💡 Harga tidak perlu diisi. Customer akan tanya langsung via WhatsApp</p>
                          <div className="flex gap-2 mt-4">
                            <button onClick={handleSaveNewService} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">{t('tableSave')}</button>
                            <button onClick={() => setIsAdding(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">{t('tableCancel')}</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 bg-green-50 border-l-4 border-green-500 p-4">
                      <p className="text-sm text-gray-800 font-semibold">
                        💬 Untuk informasi harga terjemahan, silakan hubungi kami via WhatsApp di{' '}
                        <a 
                          href={`https://wa.me/${whatsappNumber}`}
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="text-green-600 hover:underline font-bold"
                        >
                          {whatsappNumberFormatted}
                        </a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Konten Tab 2: Jasa Interpreter */}
              {activeTab === 1 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#e83d96]">{t('tabInterpreter')}</h2>
                    {isAuthenticated && (
                      <button 
                        onClick={() => setEditingInterpreter(!editingInterpreter)} 
                        className="text-sm font-semibold text-[#e83d96] hover:text-pink-700 transition"
                      >
                        {editingInterpreter ? t('closeEditor') : '✏️ Edit'}
                      </button>
                    )}
                  </div>
                  
                  {isMounted && editingInterpreter ? (
                    <div>
                      <ReactQuill 
                        theme="snow" 
                        value={interpreterHtml} 
                        onChange={setInterpreterHtml} 
                        modules={modules} 
                        className="text-black h-72 mb-16 bg-white rounded-lg" 
                      />
                      <button 
                        onClick={async () => { 
                          const success = await saveContentToDatabase('interpreter', interpreterHtml); 
                          if (success) setEditingInterpreter(false); 
                        }} 
                        className="mt-4 bg-[#e83d96] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm"
                      >
                        {t('saveProcedure')}
                      </button>
                    </div>
                  ) : (
                    <div className="prose-container bg-gray-50 p-6 rounded-lg border">
                      <div dangerouslySetInnerHTML={{ __html: interpreterHtml }} className="prose prose-sm max-w-none text-gray-600" />
                    </div>
                  )}
                </div>
              )}

              {/* Konten Tab 3: Legalisasi Dokumen */}
              {activeTab === 2 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#e83d96]">{t('tabLegalization')}</h2>
                    {isAuthenticated && (
                      <button 
                        onClick={() => setEditingLegalization(!editingLegalization)} 
                        className="text-sm font-semibold text-[#e83d96] hover:text-pink-700 transition"
                      >
                        {editingLegalization ? t('closeEditor') : '✏️ Edit'}
                      </button>
                    )}
                  </div>
                  
                  {isMounted && editingLegalization ? (
                    <div>
                      <ReactQuill 
                        theme="snow" 
                        value={legalizationHtml} 
                        onChange={setLegalizationHtml} 
                        modules={modules} 
                        className="text-black h-72 mb-16 bg-white rounded-lg" 
                      />
                      <button 
                        onClick={async () => { 
                          const success = await saveContentToDatabase('legalization', legalizationHtml); 
                          if (success) setEditingLegalization(false); 
                        }} 
                        className="mt-4 bg-[#e83d96] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm"
                      >
                        {t('saveProcedure')}
                      </button>
                    </div>
                  ) : (
                    <div className="prose-container bg-gray-50 p-6 rounded-lg border">
                      <div dangerouslySetInnerHTML={{ __html: legalizationHtml }} className="prose prose-sm max-w-none text-gray-600" />
                    </div>
                  )}
                </div>
              )}

              {/* Konten Tab 4: Layanan Apostille */}
              {activeTab === 3 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-[#e83d96]">{t('tabApostille')}</h2>
                    {isAuthenticated && (
                      <button 
                        onClick={() => setEditingApostille(!editingApostille)} 
                        className="text-sm font-semibold text-[#e83d96] hover:text-pink-700 transition"
                      >
                        {editingApostille ? t('closeEditor') : '✏️ Edit'}
                      </button>
                    )}
                  </div>
                  
                  {isMounted && editingApostille ? (
                    <div>
                      <ReactQuill 
                        theme="snow" 
                        value={apostilleHtml} 
                        onChange={setApostilleHtml} 
                        modules={modules} 
                        className="text-black h-72 mb-16 bg-white rounded-lg" 
                      />
                      <button 
                        onClick={async () => { 
                          const success = await saveContentToDatabase('apostille', apostilleHtml); 
                          if (success) setEditingApostille(false); 
                        }} 
                        className="mt-4 bg-[#e83d96] text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition text-sm"
                      >
                        {t('saveProcedure')}
                      </button>
                    </div>
                  ) : (
                    <div className="prose-container bg-gray-50 p-6 rounded-lg border">
                      <div dangerouslySetInnerHTML={{ __html: apostilleHtml }} className="prose prose-sm max-w-none text-gray-600" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}