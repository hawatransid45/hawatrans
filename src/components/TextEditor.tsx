// src/components/TextEditor.tsx
'use client'; 

import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';

// Import CSS
import 'react-quill-new/dist/quill.snow.css'; 

// Load React Quill
const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false }) as any;

interface TextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const TextEditor = ({ value, onChange, placeholder }: TextEditorProps) => {
  
  // Konfigurasi Toolbar dengan Handler Khusus
  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }], 
        ['bold', 'italic', 'underline', 'strike'], 
        [{ 'list': 'ordered'}, { 'list': 'bullet' }], 
        [{ 'color': [] }, { 'background': [] }], 
        ['link', 'image'], // Tombol Image tetap ada
        ['clean'] 
      ],
      
      // ✅ BAGIAN PENTING: KITA UBAH CARA KERJA TOMBOL IMAGE
      handlers: {
        image: function() {
          // 1. Munculkan Popup tanya URL
          const url = window.prompt('Masukkan URL Gambar (Link dari Google/Internet):');
          
          // 2. Jika user mengisi URL
          if (url) {
            // @ts-ignore (Abaikan error TS soal 'this')
            const quill = this.quill; 
            
            // Ambil posisi kursor saat ini
            const range = quill.getSelection();
            
            // Masukkan gambar ke editor
            quill.insertEmbed(range.index, 'image', url);
          }
        }
      }
    }
  }), []);

  return (
    <div className="text-black bg-white"> 
      <ReactQuill 
        theme="snow" 
        value={value} 
        onChange={onChange} 
        modules={modules}
        placeholder={placeholder || "Tulis sesuatu..."}
        className="h-64 mb-12" 
      />
    </div>
  );
};

export default TextEditor;