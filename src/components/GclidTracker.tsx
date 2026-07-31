'use client';

import { useEffect } from 'react';
import { usePathname } from '@/i18n/routing';

const WEBAPP_URL =
  'https://script.google.com/macros/s/AKfycbzaMgcIoxX2obNGmgLmjFQpxeOXKx2kuP1eSdSi6j1AoDgHh5RCUqBrcoea2lvzuM0Pcw/exec';

function getGclid(): string | null {
  const match = /[?&]gclid=([^&]*)/.exec(window.location.search);
  const gclidUrl = match && decodeURIComponent(match[1].replace(/\+/g, ' '));

  if (gclidUrl) {
    localStorage.setItem('gclid_storage', gclidUrl);
    return gclidUrl;
  }
  return localStorage.getItem('gclid_storage') || null;
}

function runGclidTracking() {
  const gclid = getGclid();
  const allWaButtons = document.querySelectorAll<HTMLAnchorElement>(
    'a[href*="whatsapp"], a[href*="wa.me"]'
  );

  allWaButtons.forEach((btn) => {
    const rawUrl = btn.getAttribute('href');
    if (!rawUrl) return;

    // Hindari menempel dobel jika komponen ini re-run tapi tombolnya sama
    if (gclid && rawUrl.indexOf('Google_RefID') === -1) {
      const trackingTag = `[Google_RefID:_${gclid}]`;
      let newUrl = '';

      if (rawUrl.indexOf('text=') !== -1) {
        newUrl = rawUrl + '%0A%0A' + encodeURIComponent(trackingTag);
      } else if (rawUrl.indexOf('?') !== -1) {
        newUrl = rawUrl + '&text=Halo%20' + encodeURIComponent(trackingTag);
      } else {
        newUrl = rawUrl + '?text=Halo%20' + encodeURIComponent(trackingTag);
      }

      btn.setAttribute('href', newUrl);
    }

    // Tandai tombol supaya listener tidak ditempel berkali-kali
    // setiap kali komponen ini re-run (misal saat pindah halaman)
    if (btn.dataset.gclidBound === 'true') return;
    btn.dataset.gclidBound = 'true';

    btn.addEventListener(
      'click',
      () => {
        try {
          const note = 'Klik WA - ' + (btn.className || btn.innerText || 'button');
          const sendUrl =
            WEBAPP_URL +
            '?gclid=' + encodeURIComponent(gclid || 'Organic/Direct') +
            '&page=' + encodeURIComponent(window.location.href) +
            '&note=' + encodeURIComponent(note);

          fetch(sendUrl, { method: 'GET', mode: 'no-cors', keepalive: true });
        } catch (err) {
          console.log('Error logging:', err);
        }
      },
      { once: true }
    );
  });
}

export default function GclidTracker() {
  const pathname = usePathname();

  useEffect(() => {
    // Beri sedikit delay agar elemen dari client component lain
    // (mis. carousel, komponen dinamis) sempat ter-render dulu
    const timer = setTimeout(runGclidTracking, 300);
    return () => clearTimeout(timer);
  }, [pathname]); // <-- kunci utama: re-run setiap ganti halaman

  return null; // komponen ini tidak render UI apa pun
}