import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '@components/Layout';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/'); // Redirect to home after delay
    }, 1000); // 2-second delay for smoother UX
  }, []);

  return (
    <Layout
      title="Page Not Found — Specialist Plus"
      description="Oops! The page you're looking for doesn't exist. Redirecting you to the homepage..."
      keywords="404 error, page not found, Specialist Plus, medical website"
      ogImage="/404-og-image.jpg"
    >
      <div className="px-2 my-[30vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl font-bold text-gray-800">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600 mt-4">Redirecting you to the homepage...</p>
        
        {/* Loading Spinner */}
        <div className="mt-6 animate-spin rounded-full h-12 w-12 border-t-4 border-red-600 border-solid"></div>
      </div>
    </Layout>
  );
}