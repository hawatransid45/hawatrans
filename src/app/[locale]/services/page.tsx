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
  
  // === DATA DEFAULT (Static) ===
  const defaultServices = [
    { id: '1', number: 1, language: 'Inggris', generalPrice: 'Rp. 75.000', swornPrice: 'Rp. 100.000' },
    { id: '2', number: 2, language: 'Arab', generalPrice: 'Rp. 80.000', swornPrice: 'Rp. 110.000' },
    { id: '3', number: 3, language: 'Mandarin - Indonesia', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '4', number: 4, language: 'Indonesia - Mandarin', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '5', number: 5, language: 'Jepang - Indonesia', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '6', number: 6, language: 'Indonesia - Jepang', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '7', number: 7, language: 'Jerman', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '8', number: 8, language: 'Belanda', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '9', number: 9, language: 'Prancis', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '10', number: 10, language: 'Spanyol', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '11', number: 11, language: 'Portugis', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '12', number: 12, language: 'Italia', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
    { id: '13', number: 13, language: 'Vietnam', generalPrice: 'Rp. 100.000', swornPrice: 'Rp. 125.000' },
  ];

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
  
  const [activeTab, setActiveTab] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // === LOAD FROM DATABASE ===
  useEffect(() => {
    setIsMounted(true);
    
    // Load services from localStorage (tetap pakai localStorage untuk table)
    const savedServices = localStorage.getItem('servicesData');
    if (savedServices) {
      try {
        const parsedServices = JSON.parse(savedServices);
        const hasOldData = parsedServices.some((s: TranslationService) => s.language === 'Italy');
        
        if (hasOldData) {
          console.log('Detected old data, resetting to default...');
          localStorage.removeItem('servicesData');
          setServices(defaultServices);
        } else {
          setServices(parsedServices);
        }
      } catch (e) {
        console.error('Error parsing services data:', e);
        setServices(defaultServices);
      }
    }

    // Load content dari database
    const loadContent = async () => {
      try {
        const response = await fetch('/api/services/content');
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

  const handleSaveService = () => {
    if (editingServiceId) {
      const updatedServices = services.map(s => 
        s.id === editingServiceId 
          ? { ...s, language: serviceFormData.language, generalPrice: serviceFormData.generalPrice, swornPrice: serviceFormData.swornPrice }
          : s
      );
      setServices(updatedServices);
      localStorage.setItem('servicesData', JSON.stringify(updatedServices));
      setEditingServiceId(null);
      setServiceFormData({ language: '', generalPrice: '', swornPrice: '' });
    }
  };

  const handleCancelService = () => {
    setEditingServiceId(null);
    setServiceFormData({ language: '', generalPrice: '', swornPrice: '' });
  };

  const handleSaveNewService = () => {
    if (!newServiceData.language || !newServiceData.generalPrice || !newServiceData.swornPrice) {
      alert(t('alertAllFields'));
      return;
    }
    const newService: TranslationService = {
      id: new Date().toISOString(),
      number: services.length + 1,
      ...newServiceData
    };
    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('servicesData', JSON.stringify(updatedServices));
    setIsAdding(false);
    setNewServiceData({ language: '', generalPrice: '', swornPrice: '' });
  };

  const handleDeleteService = (id: string) => {
    if (window.confirm(t('alertDeleteConfirm'))) {
      const updatedServices = services
        .filter(s => s.id !== id)
        .map((s, index) => ({ ...s, number: index + 1 })); // Re-number services
      
      setServices(updatedServices);
      localStorage.setItem('servicesData', JSON.stringify(updatedServices));
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
    return '??';
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
    return 'bg-gray-600';
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
                  key={index}
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
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <BanknotesIcon className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-700">{t('paymentMethod1')}</span>
                          </div>
                          <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
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
                  

                  {/* === BAGIAN BIAYA & STANDARD (PINDAHAN) === */}
                  
                  {/* Biaya Terjemahan Title */}
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e83d96] mb-4">{t('translationFees')}</h2>
                  {/* Admin Toggle & Table Section */}
                  <div className="mb-8">
                    {isAuthenticated && (
                      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-6">
                        <p className="text-green-700 text-sm">{t('adminNotice')}</p>
                      </div>
                    )}

                    {isAuthenticated && !isAdding && (
                      <div className="flex justify-end mb-4 gap-2">
                        <button 
                          onClick={() => {
                            if (confirm('Reset semua data ke default?')) {
                              localStorage.removeItem('servicesData');
                              setServices(defaultServices);
                              alert('Data berhasil di-reset!');
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
                      {services.map((service) => (
                        editingServiceId === service.id ? (
                          // Form Edit
                          <div key={service.id} className="bg-white p-4 rounded-xl border-2 border-[#e83d96] shadow-lg col-span-1 sm:col-span-2 lg:col-span-3">
                            <div className="flex items-center gap-4 mb-3">
                              <div className={`${getBadgeColor(service.language)} text-white font-bold px-3 py-2 rounded-lg text-sm min-w-[80px] text-center`}>
                                {getCountryCode(service.language)}
                              </div>
                              <input type="text" value={serviceFormData.language} onChange={(e) => setServiceFormData({...serviceFormData, language: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-gray-50 focus:ring-2 focus:ring-[#e83d96]" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <input type="text" value={serviceFormData.generalPrice} onChange={(e) => setServiceFormData({...serviceFormData, generalPrice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-gray-50 focus:ring-2 focus:ring-[#e83d96]" />
                              <input type="text" value={serviceFormData.swornPrice} onChange={(e) => setServiceFormData({...serviceFormData, swornPrice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-gray-50 focus:ring-2 focus:ring-[#e83d96]" />
                            </div>
                            <div className="flex gap-2 mt-4">
                              <button onClick={handleSaveService} className="bg-[#e83d96] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-pink-700">{t('tableSave')}</button>
                              <button onClick={handleCancelService} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">{t('tableCancel')}</button>
                            </div>
                          </div>
                        ) : (
                          // Tampilan Kartu
                          <div key={service.id} className="group relative bg-white p-4 rounded-xl border border-gray-200/80 overflow-hidden transition-all duration-300 hover:shadow-xl hover:border-[#e83d96]/50">
                            {/* Konten Utama (Selalu Terlihat) */}
                            <div className="flex items-center gap-4 transition-transform duration-300 group-hover:-translate-y-2">
                              <div className={`${getBadgeColor(service.language)} text-white font-bold px-3 py-2 rounded-lg text-sm min-w-[70px] text-center shadow-md`}>
                                {getCountryCode(service.language)}
                              </div>
                              <span className="font-semibold text-gray-800 text-md">{service.language}</span>
                            </div>

                            {/* Konten Detail (Hanya Terlihat saat Hover) */}
                            <div className="absolute bottom-0 left-0 w-full p-4 pt-10 bg-gradient-to-t from-white via-white to-transparent opacity-0 transform translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                              <div className="flex items-end justify-between">
                                <div className="flex gap-4">
                                  <div>
                                    <div className="text-xs text-gray-500">{t('tableGeneral')}</div>
                                    <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{service.generalPrice}</div>
                                  </div>
                                  <div>
                                    <div className="text-xs text-gray-500">{t('tableSworn')}</div>
                                    <div className="font-bold text-gray-900 text-sm whitespace-nowrap">{service.swornPrice}</div>
                                  </div>
                                </div>
                                {isAuthenticated && (
                                  <div className="flex gap-1">
                                    <button onClick={() => handleEditService(service)} className="text-gray-400 hover:text-[#e83d96] p-1 rounded-md transition-colors">✏️</button>
                                    <button onClick={() => handleDeleteService(service.id)} className="text-gray-400 hover:text-red-600 p-1 rounded-md transition-colors">🗑️</button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      ))}

                      {/* Form Tambah Layanan Baru */}
                      {isAdding && (
                        <div className="bg-blue-50 p-4 rounded-xl border-2 border-blue-300 shadow-lg mt-4 col-span-1 sm:col-span-2 lg:col-span-3">
                          <div className="flex items-center gap-4 mb-3">
                            <div className="bg-gray-400 text-white font-bold px-3 py-2 rounded-lg text-sm min-w-[80px] text-center">
                              NEW
                            </div>
                            <input type="text" placeholder={t('placeholderLanguage')} value={newServiceData.language} onChange={(e) => setNewServiceData({...newServiceData, language: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <input type="text" placeholder={t('placeholderGeneral')} value={newServiceData.generalPrice} onChange={(e) => setNewServiceData({...newServiceData, generalPrice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-blue-500" />
                            <input type="text" placeholder={t('placeholderSworn')} value={newServiceData.swornPrice} onChange={(e) => setNewServiceData({...newServiceData, swornPrice: e.target.value})} className="w-full px-3 py-2 border rounded-lg text-sm text-black bg-white focus:ring-2 focus:ring-blue-500" />
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button onClick={handleSaveNewService} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700">{t('tableSave')}</button>
                            <button onClick={() => setIsAdding(false)} className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">{t('tableCancel')}</button>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-6 bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm text-black italic" dangerouslySetInnerHTML={{ __html: t('negotiableNote') }} />
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