// pages/index.js
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';

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

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout
      title="Home — Specialist Plus"
      description="Welcome to Specialist Plus, providing comprehensive medical care in South Australia."
    >
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/homeBackground.png')" }}>
        <div className="absolute inset-0 z-0"></div> {/* Overlay */}
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Welcome to Specialist Plus</h1>
          <p className="mt-4 text-lg">
            Comprehensive care from experienced specialists
          </p>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          {/* Responsive Grid for Other Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 relative">

            {/* Grid Item 1: Integrated Health Care (Locked to Left) */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:z-20 hover:relative duration-500 group flex flex-col origin-left">
              <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                <img
                  src="/integrated-health.jpg"
                  alt="Integrated Health Care"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-grow p-[10%]">
                <h3 className="text-lg font-semibold text-[#23528c]">Integrated Health Care</h3>
                <p className="my-6 text-[#1b2e60] font-semibold">Comprehensive, multidisciplinary support for all aspects of your health</p>
                <p className="hidden group-hover:block text-[#4d4d4d] transition-opacity transition-transform transform opacity-0 translate-y-3 duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[13px] mb-6">Our collaborative team of specialists ensures that every part of your healthcare journey is supported, providing a seamless, integrated approach to your wellbeing.</p>
                <div className="mt-auto">
                  <Link href="https://google.com" target="_blank" className="text-[#7c7c7c] hover:text-[#1b2e60]">
                    <span className="underline">Theme overview</span>
                    <span className="text-[#de5857] font-bold">&nbsp; &gt;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid Item 2: Injury Management (Normal Scaling) */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:z-20 hover:relative duration-500 group flex flex-col origin-center">
              <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                <img
                  src="/injury-management.jpg"
                  alt="Injury Management"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-grow p-[10%]">
                <h3 className="text-lg font-semibold text-[#23528c]">Injury Management</h3>
                <p className="my-6 text-[#1b2e60] font-semibold">Expert care to help you recover and get back on track</p>
                <p className="hidden group-hover:block text-[#4d4d4d] transition-opacity transition-transform transform opacity-0 translate-y-3 duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[13px] mb-6">We provide personalized rehabilitation plans to ensure you get the support and care you need after injury.</p>
                <div className="mt-auto">
                  <Link href="https://google.com" target="_blank" className="text-[#7c7c7c] hover:text-[#1b2e60]">
                    <span className="underline">Theme overview</span>
                    <span className="text-[#de5857] font-bold">&nbsp; &gt;</span>
                  </Link>
                </div>
              </div>
            </div>

            {/* Grid Item 3: Specialist Care (Locked to Right) */}
            <div className="bg-white p-4 rounded-lg shadow-md transition-transform transform hover:scale-110 hover:z-20 hover:relative duration-500 group flex flex-col origin-right">
              <div className="w-full aspect-w-16 aspect-h-9 mb-4">
                <img
                  src="/specialist-care.jpg"
                  alt="Specialist Care"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
              <div className="flex flex-col flex-grow p-[10%]">
                <h3 className="text-lg font-semibold text-[#23528c]">Specialist Care</h3>
                <p className="my-6 text-[#1b2e60] font-semibold">Personalized medical care from a diverse team of experts</p>
                <p className="hidden group-hover:block text-[#4d4d4d] transition-opacity transition-transform transform opacity-0 translate-y-3 duration-500 group-hover:opacity-100 group-hover:translate-y-0 text-[13px] mb-6">Receive dedicated attention from experienced specialists, ensuring your unique health needs are met with precision.</p>
                <div className="mt-auto">
                  <Link href="https://google.com" target="_blank" className="text-[#7c7c7c] hover:text-[#1b2e60]">
                    <span className="underline">Theme overview</span>
                    <span className="text-[#de5857] font-bold">&nbsp; &gt;</span>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Carousel of Doctors */}
      <DoctorsCarousel />

      {/* Locations Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Our Locations</h2>

        {/* Grid view for smaller screens */}
        <div className="grid grid-cols-1 gap-8 p-4 w-full md:hidden">
          {/* St Morris Location */}
          <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Specialist Plus - St Morris
            </h3>
            <p className="text-gray-600 mb-2">
              Medical center in St. Morris, South Australia
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> 1A Williams Ave, St Morris SA 5068
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Hours:</span> Closed ⋅ Opens 7:30 am Mon
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Phone:</span>{' '}
              <a href="tel:+61884236477" className="text-red-600 hover:underline">(08) 8423 6477</a>
            </p>
            <a
              href="https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 font-medium"
            >
              View on Google Maps
            </a>
          </div>

          {/* Richmond Location */}
          <div className="border border-gray-300 p-6 rounded-lg shadow-lg bg-white">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              Specialist Plus - Richmond
            </h3>
            <p className="text-gray-600 mb-2">
              Medical center in Richmond, South Australia
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Address:</span> 129 Marion Rd, Richmond SA 5033
            </p>
            <p className="text-gray-600">
              <span className="font-medium">Hours:</span> Closed ⋅ Opens 8:30 am Tue
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Phone:</span>{' '}
              <a href="tel:+61884236477" className="text-red-600 hover:underline">(08) 8423 6477</a>
            </p>
            <a
              href="https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 flex items-center space-x-2 font-medium"
            >
              View on Google Maps
            </a>
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
