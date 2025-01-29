import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/'); // Redirects to home page
  }, []);

  return (
    <div className="h-screen flex items-center justify-center">
      <p className="text-xl">Redirecting to home...</p>
    </div>
  );
}