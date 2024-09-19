// pages/index.js
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('@components/Map'), { ssr: false });

// Import the DoctorsCarousel component
import DoctorsCarousel from '@components/DoctorsCarousel';

export default function Home() {
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Function to handle window resizing
  const handleResize = () => {
    setIsLargeScreen(window.innerWidth >= 765);
  };

  // Set initial screen size and add resize event listener
  useEffect(() => {
    handleResize(); // Set initial size on component mount
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize); // Cleanup listener on unmount
    };
  }, []);

  return (
    <Layout
      title="Home — Specialist Plus"
      description="Welcome to Specialist Plus, providing comprehensive medical care in South Australia."
    >
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-gray-200">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Welcome to Specialist Plus</h1>
          <p className="mt-4 text-lg">
            Comprehensive care from experienced specialists
          </p>
        </div>
      </section>

      {/* Carousel of Doctors */}
      <DoctorsCarousel />

      {/* Locations Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Our Locations</h2>

        {/* Grid view for smaller screens */}
        <div className="grid grid-cols-1 gap-8 p-4 w-full md:hidden">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">
              Specialist Plus - St Morris
            </h3>
            <p>Medical center in St. Morris, South Australia</p>
            <p>Address: 1A Williams Ave, St Morris SA 5068</p>
            <p>Hours: Closed ⋅ Opens 7:30 am Mon</p>
            <p>Phone: (08) 8423 6477</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">
              Specialist Plus - Richmond
            </h3>
            <p>Medical center in Richmond, South Australia</p>
            <p>Address: 129 Marion Rd, Richmond SA 5033</p>
            <p>Hours: Closed ⋅ Opens 8:30 am Tue</p>
            <p>Phone: (08) 8423 6477</p>
          </div>
        </div>

        {/* Map view for larger screens */}
        {isLargeScreen && (
          <div className="w-full h-[500px] z-0">
            <Map />
          </div>
        )}
      </section>
    </Layout>
  );
}
