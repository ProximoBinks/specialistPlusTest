// pages/index.js
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

// Dynamically import the Map component with SSR disabled
const Map = dynamic(() => import('@components/Map'), { ssr: false });

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
    <Layout>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold mb-4">Our Locations</h1>

        {/* Grid view for smaller screens */}
        <div className="grid grid-cols-1 gap-8 p-4 w-full md:hidden">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">Specialist Plus - St Morris</h2>
            {/* <p><strong>5.0</strong> - 2 Google reviews</p> */}
            <p>Medical center in St. Morris, South Australia</p>
            <p>Address: 1A Williams Ave, St Morris SA 5068</p>
            <p>Hours: Closed ⋅ Opens 7:30 am Mon</p>
            <p>Phone: (08) 8423 6477</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h2 className="text-2xl font-semibold">Specialist Plus - Richmond</h2>
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
      </div>
    </Layout>
  );
}
