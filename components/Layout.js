// components/Layout.js
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';
import clsx from 'clsx';

export default function Layout({
  children,
  title = 'Specialist Plus',
  description = 'Comprehensive medical care at Specialist Plus.',
  keywords = 'Specialist Plus, healthcare, doctors, medical services, occupational health',
  ogImage = '/default-og-image.jpg',
}) {
  // extraOffset = 0 or 30, depending on banner status
  const [extraOffset, setExtraOffset] = useState(0);

  useEffect(() => {
    // Handler for the custom "bannerStatus" event
    function handleBannerStatus(e) {
      const isBannerOpen = e.detail; // true or false
      if (isBannerOpen) {
        setExtraOffset(30); // add 30px
      } else {
        setExtraOffset(0); // remove extra offset
      }
    }

    // Listen for "bannerStatus" event on the window object
    window.addEventListener('bannerStatus', handleBannerStatus);

    return () => {
      window.removeEventListener('bannerStatus', handleBannerStatus);
    };
  }, []);

  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head>
        {/* Primary Meta Tags */}
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="robots" content="max-snippet:320,max-image-preview:large,max-video-preview:-1" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ed181c" media="(prefers-color-scheme: light)" />
        {/* Mobile Theme Color (Sets to White or Light Gray) */}
        <meta name="theme-color" content="#f8f9fa" media="(max-width: 768px)" />
        {/* Open Graph / Facebook */}
        <meta property="og:site_name" content="Specialist Plus" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://specialistplus.com.au" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />

        {/* Preload Images
        <link rel="preload" as="image" href="/og-image.jpg" />
        <link rel="preload" as="image" href="/hero-image.jpg" /> */}

        {/* Canonical URL (SEO Best Practice) */}
        <link rel="canonical" href="https://specialistplus.com.au/" />

        {/* Favicon & Apple Icons */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />
      </Head>

      <Header />

      <main
        className={clsx(
          "flex-grow w-full z-0",
          extraOffset === 30 ? "pt-[90px] xl:pt-[125px]" : "pt-[60px] xl:pt-[95px]"
        )}
      >
        {children}
      </main>

      <Footer />
    </div>
  );
}