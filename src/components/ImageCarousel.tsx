'use client';

import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function ImageCarousel() {
  // UBAH: State untuk melacak slide aktif dan memicu reset animasi
  const [activeSlide, setActiveSlide] = useState(0);
  const autoplaySpeed = 5000;
  const transitionSpeed = 800; // Kecepatan transisi fade

  const settings = {
    dots: false, // UBAH: Menonaktifkan titik navigasi
    infinite: true,
    speed: transitionSpeed,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: autoplaySpeed,
    pauseOnHover: true,
    draggable: false, // UBAH: Nonaktifkan drag/swipe
    swipe: false,     // UBAH: Nonaktifkan swipe
    fade: true, // UBAH: Mengaktifkan transisi fade
    arrows: false, // UBAH: Menonaktifkan panah navigasi
    // PERBAIKI: Gunakan `beforeChange` untuk mereset animasi TEPAT SAAT slide akan berganti
    beforeChange: (current: number, next: number) => setActiveSlide(next),
  };

  return (
    // UBAH: Tambahkan 'relative' agar progress bar bisa diposisikan absolut terhadap kontainer ini
    <div className="w-full h-full relative"> {/* Kontainer ini harus mendapatkan tinggi dari parent */}
      <Slider {...settings} className="h-full"> {/* PERBAIKI: Tambahkan h-full ke Slider */}
        {/* Slide 1: hawa trans.jpeg (tetap dipertahankan) */}
        {/* PERBAIKI: Menggunakan aspect-ratio untuk ukuran yang konsisten */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/images/hawa%20trans.jpeg"
              alt="Hawatrans.id"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Slide 2: hawatrans 1.jpeg */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/images/hawatrans%201.jpeg"
              alt="Hawatrans Profesional"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Slide 3: hawatrans 2.jpeg */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/images/hawatrans%202.jpeg"
              alt="Layanan Penerjemah Tersumpah"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Slide 4: hawatrans 4.jpeg */}
        <div className="w-full">
          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl">
            <img
              src="/images/hawatrans%204.jpeg"
              alt="Jasa Terjemahan Profesional"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </Slider>

      {/* Progress Bar Kustom */}
      {/* UBAH: Lebar progress bar dibuat tetap (w-1/3) dan diposisikan di tengah */}
      {/* UBAH: Posisi 'bottom' diubah agar berada tepat di bawah gambar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-gray-200/70 rounded-full overflow-hidden" key={activeSlide}>
        <div
          // PERBAIKI: Menggunakan animasi CSS murni untuk pergerakan yang mulus
          className="h-1 bg-[#e83d96] rounded-full origin-left"
          // PERBAIKI: Durasi animasi disesuaikan dengan autoplaySpeed untuk sinkronisasi yang lebih baik
          style={{ animation: `fill-progress ${autoplaySpeed}ms linear` }}
        ></div>
      </div>
    </div>
  );
}