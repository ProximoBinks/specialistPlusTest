// components/Layout.js
import Head from 'next/head';
import Header from '@components/Header';
import Footer from '@components/Footer';

export default function Layout({
  children,
  title = "Specialist Plus",
  description = "Comprehensive medical care at Specialist Plus.",
  keywords = "Specialist Plus, healthcare, doctors, medical services, occupational health",
  ogImage = "/default-og-image.jpg",
}) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://specialistplus.com.au" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={ogImage} />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Header />

      <main className="flex-grow w-full pt-[60px] xl:pt-[95px] z-0">
        {children}
      </main>

      <Footer />
    </div>
  );
}
