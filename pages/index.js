// pages/index.js
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Slider from 'react-slick';
import Image from 'next/image';

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

  // Carousel settings for the doctors section
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Faster autoplay speed
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center bg-gray-200">
        <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
        <div className="relative z-10 text-center text-white">
          <h1 className="text-5xl font-bold">Welcome to Specialist Plus</h1>
          <p className="mt-4 text-lg">Comprehensive care from experienced specialists</p>
        </div>
      </section>

      {/* Carousel of Doctors */}
      <section className="py-12 bg-gray-50">
        <h2 className="text-4xl font-bold text-center mb-8">Meet Our Doctors</h2>
        <div className="max-w-6xl mx-auto">
          <Slider {...sliderSettings}>
            {/* Doctor 1 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor1.jpg"
                  alt="Dr Poh Yong"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Poh Yong</h3>
                <p className="text-gray-600">Director</p>
                <p className="text-sm">Dr Poh Yong oversees the management of the clinic and providers.</p>
              </div>
            </div>

            {/* Doctor 2 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor2.jpg"
                  alt="Dr Dion Suyapto"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Dion Suyapto</h3>
                <p className="text-gray-600">Occupational Physician</p>
                <p className="text-sm">Specialist in occupational and environmental medicine.</p>
              </div>
            </div>

            {/* Doctor 3 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor3.jpg"
                  alt="Dr Arun Gupta"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Arun Gupta</h3>
                <p className="text-gray-600">Consultant Psychiatrist</p>
                <p className="text-sm">Special interest in Independent Psychiatric Examinations.</p>
              </div>
            </div>

            {/* Doctor 4 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor4.jpg"
                  alt="Dr Joshua Kartika"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Joshua Kartika</h3>
                <p className="text-gray-600">Occupational Medical Registrar</p>
                <p className="text-sm">Registrar in occupational and environmental medicine.</p>
              </div>
            </div>

            {/* Doctor 5 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor5.jpg"
                  alt="Dr Bill Papps"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Bill Papps</h3>
                <p className="text-gray-600">Occupational Medical Registrar</p>
                <p className="text-sm">Completed Bachelor of Laws and Graduate Diploma in Legal Practice.</p>
              </div>
            </div>

            {/* Doctor 6 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor6.jpg"
                  alt="Mr Gilles Hammond"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Mr Gilles Hammond</h3>
                <p className="text-gray-600">Rehabilitation Psychologist</p>
                <p className="text-sm">Expert in trauma and occupational psychology.</p>
              </div>
            </div>

            {/* Doctor 7 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor7.jpg"
                  alt="Dr Ishita Gupta"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Ishita Gupta</h3>
                <p className="text-gray-600">General Dentist</p>
                <p className="text-sm">Registered dentist in Australia since 2016.</p>
              </div>
            </div>

            {/* Doctor 8 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor8.jpg"
                  alt="Dr Aiden Tieu"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Aiden Tieu</h3>
                <p className="text-gray-600">General Surgeon</p>
                <p className="text-sm">Specialist in open and laparoscopic surgery.</p>
              </div>
            </div>

            {/* Doctor 9 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor9.jpg"
                  alt="Dr Cecilia Yong"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Cecilia Yong</h3>
                <p className="text-gray-600">General Dentist</p>
                <p className="text-sm">Experienced in both clinical dentistry and medico-legal assessments.</p>
              </div>
            </div>

            {/* Doctor 10 */}
            <div className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src="/doctor10.jpg"
                  alt="Dr Devinder Raju"
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">Dr Devinder Raju</h3>
                <p className="text-gray-600">Colorectal and General Surgeon</p>
                <p className="text-sm">Specialist in colorectal cancer and inflammatory bowel disease.</p>
              </div>
            </div>
          </Slider>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-8">Our Locations</h2>

        {/* Grid view for smaller screens */}
        <div className="grid grid-cols-1 gap-8 p-4 w-full md:hidden">
          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Specialist Plus - St Morris</h3>
            <p>Medical center in St. Morris, South Australia</p>
            <p>Address: 1A Williams Ave, St Morris SA 5068</p>
            <p>Hours: Closed ⋅ Opens 7:30 am Mon</p>
            <p>Phone: (08) 8423 6477</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-2xl font-semibold">Specialist Plus - Richmond</h3>
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
