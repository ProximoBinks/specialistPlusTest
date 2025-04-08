// pages/index.js
import Layout from '@components/Layout';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import Link from 'next/link';

// Dynamically import the new Map component (no SSR)
const CustomMap = dynamic(() => import('@components/CustomMap'), { ssr: false });

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

  const cards = [
    {
      imgSrc: '/integrated-health.jpg',
      title: 'Integrated Health Care',
      description: 'Comprehensive, multidisciplinary support for all aspects of your health',
      hoverText: 'Our collaborative team of specialists ensures that every part of your healthcare journey is supported, providing a seamless, integrated approach to your wellbeing.',
      link: '/about',
    },
    {
      imgSrc: '/injury-management.jpg',
      title: 'Injury Management',
      description: 'Expert care to help you recover and get back on track',
      hoverText: 'We provide personalised rehabilitation plans to ensure you get the support and care you need after injury.',
      link: '/about',
    },
    {
      imgSrc: '/specialist-care.jpg',
      title: 'Specialist Care',
      description: 'Personalised medical care from a diverse team of experts',
      hoverText: 'Receive dedicated attention from experienced specialists, ensuring your unique health needs are met with precision.',
      link: '/about',
    },
  ];

  return (
    <Layout
      title="Specialist Plus — Comprehensive Medical Care in South Australia"
      description="Specialist Plus provides expert healthcare solutions, including occupational health, medico-legal services, and specialist consultations."
      keywords="medical care, occupational health, specialist consultations, medico-legal services, healthcare South Australia"
      ogImage="/og-image.jpg"
    >
      {/* Hero Section - Modernized */}
      <section className="relative w-full min-h-[700px] md:min-h-[800px] bg-cover bg-center overflow-hidden" 
        style={{ backgroundImage: "url('/homeBackground.jpg')" }}
      >
        {/* Gradient Overlays - Multiple layers for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent"></div>
        
        {/* Animated particles effect (optional) */}
        <div className="absolute inset-0 opacity-30">
          <div className="particles-container">
            <div className="particle particle-1"></div>
            <div className="particle particle-2"></div>
            <div className="particle particle-3"></div>
            <div className="particle particle-4"></div>
            <div className="particle particle-5"></div>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-col md:flex-row h-full max-w-7xl mx-auto px-6 py-20">
          {/* Left Side - Text Content */}
          <div className="md:w-1/2 flex flex-col justify-center items-start text-white">
            <div className="inline-block bg-red-600/90 px-4 py-1 rounded-full text-sm font-semibold mb-5 animate-slideRight">
              South Australia's Premier Healthcare Provider
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-slideUp">
              Expert Care <br/>
              <span className="relative inline-block mt-2">
                When You 
                <span className="text-red-500"> Need It</span>
                <svg className="absolute -bottom-2 left-0 w-full" height="12" viewBox="0 0 400 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0 0L400 12H0V0Z" fill="#ef4444" fillOpacity="0.3" />
                </svg>
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl mt-8 text-gray-200 max-w-lg animate-slideUp animation-delay-300">
              Comprehensive healthcare solutions from a multidisciplinary team of specialists dedicated to your wellbeing.
            </p>
            
            {/* CTA Buttons - Multiple options */}
            <div className="flex flex-col sm:flex-row gap-4 mt-10 animate-slideUp animation-delay-500">
              <Link
                href="/contact"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all shadow-lg flex items-center"
              >
                <span>Book an Appointment</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
              <Link
                href="/doctors"
                className="bg-transparent border-2 border-white hover:bg-white/10 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all"
              >
                Meet Our Specialists
              </Link>
            </div>
          </div>
          
          {/* Right Side - Floating Stats/Features */}
          <div className="hidden md:flex md:w-1/2 items-center justify-end">
            <div className="grid grid-cols-2 gap-4 relative">
              {/* Stat Box 1 */}
              <div className="stat-box bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all border border-white/20 animate-float">
                <div className="rounded-full bg-red-600/20 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">10+ Specialists</h3>
                <p className="text-gray-300 mt-2 text-sm">Expert doctors across multiple disciplines</p>
              </div>
              
              {/* Stat Box 2 */}
              <div className="stat-box bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all border border-white/20 animate-float animation-delay-200 mt-8">
                <div className="rounded-full bg-blue-600/20 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">2 Locations</h3>
                <p className="text-gray-300 mt-2 text-sm">Conveniently serving South Australia</p>
              </div>
              
              {/* Stat Box 3 */}
              <div className="stat-box bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all border border-white/20 animate-float animation-delay-400">
                <div className="rounded-full bg-green-600/20 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Fast Appointments</h3>
                <p className="text-gray-300 mt-2 text-sm">Quick access to the care you need</p>
              </div>
              
              {/* Stat Box 4 */}
              <div className="stat-box bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all border border-white/20 animate-float animation-delay-600 mt-8">
                <div className="rounded-full bg-purple-600/20 w-12 h-12 flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-white">Advanced Care</h3>
                <p className="text-gray-300 mt-2 text-sm">Using the latest medical technologies</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1440,58.7L1440,120L1360,120C1280,120,1120,120,960,120C800,120,640,120,480,120C320,120,160,120,80,120L0,120Z"></path>
          </svg>
        </div>

        {/* Enhanced animations */}
        <style jsx>{`
          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes slideRight {
            from {
              opacity: 0;
              transform: translateX(-30px);
            }
            to {
              opacity: 1;
              transform: translateX(0);
            }
          }
          
          @keyframes float {
            0% {
              transform: translateY(0px);
            }
            50% {
              transform: translateY(-10px);
            }
            100% {
              transform: translateY(0px);
            }
          }
          
          @keyframes moveParticle {
            0% {
              transform: translate(0, 0);
            }
            25% {
              transform: translate(100px, 100px);
            }
            50% {
              transform: translate(200px, 0);
            }
            75% {
              transform: translate(100px, -100px);
            }
            100% {
              transform: translate(0, 0);
            }
          }
          
          .animate-slideUp {
            opacity: 0;
            animation: slideUp 1s ease-out forwards;
          }
          
          .animate-slideRight {
            opacity: 0;
            animation: slideRight 1s ease-out forwards;
          }
          
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }
          
          .animation-delay-200 {
            animation-delay: 0.2s;
          }
          
          .animation-delay-300 {
            animation-delay: 0.3s;
          }
          
          .animation-delay-400 {
            animation-delay: 0.4s;
          }
          
          .animation-delay-500 {
            animation-delay: 0.5s;
          }
          
          .animation-delay-600 {
            animation-delay: 0.6s;
          }
          
          /* Particles */
          .particles-container {
            position: absolute;
            inset: 0;
            overflow: hidden;
          }
          
          .particle {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            animation: moveParticle 15s linear infinite;
          }
          
          .particle-1 {
            width: 100px;
            height: 100px;
            left: 10%;
            top: 20%;
            animation-duration: 25s;
          }
          
          .particle-2 {
            width: 70px;
            height: 70px;
            left: 50%;
            top: 70%;
            animation-duration: 35s;
            animation-delay: 2s;
          }
          
          .particle-3 {
            width: 50px;
            height: 50px;
            left: 70%;
            top: 30%;
            animation-duration: 30s;
            animation-delay: 4s;
          }
          
          .particle-4 {
            width: 80px;
            height: 80px;
            left: 30%;
            top: 50%;
            animation-duration: 40s;
            animation-delay: 1s;
          }
          
          .particle-5 {
            width: 60px;
            height: 60px;
            left: 80%;
            top: 60%;
            animation-duration: 20s;
            animation-delay: 3s;
          }
        `}</style>
      </section>

      {/* Why Choose Us Section (Shown only on md and up) */}
      <section className="py-16 bg-white hidden md:block">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3 text-[#1b2e60]">Why Choose Us</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">Our comprehensive approach to healthcare ensures that all your needs are met with expertise and compassion</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Card 1 */}
            <div className="relative">
              <div className="card-container">
                <div className="card">
                  {/* Card Front */}
                  <div className="card-front bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                    <div>
                      <img
                        src="/integrated-health.jpg"
                        alt="Integrated Health Care"
                        className="w-full h-52 object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-[#1b2e60]">Integrated Health Care</h3>
                      <p className="text-gray-700 mb-4">
                        Comprehensive, multidisciplinary support for all aspects of your health
                      </p>
                      <div className="mt-auto flex justify-between items-center pt-2">
                        <span className="text-[#de5857] text-sm font-semibold">Learn More</span>
                        <span className="bg-[#f8f8f8] rounded-full w-8 h-8 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1b2e60]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className="card-back bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#de5857]">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1b2e60] mb-4">Integrated Health Care</h3>
                      <p className="text-gray-600 mb-5">
                        Our collaborative team of specialists ensures that every part of your healthcare journey is supported, providing a seamless, integrated approach to your wellbeing.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Coordinated care across specialties</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Holistic approach to wellbeing</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Personalized treatment plans</span>
                        </li>
                      </ul>
                      <div className="mt-auto pt-2">
                        <Link href="/about" className="inline-flex items-center text-[#1b2e60] font-medium hover:text-[#de5857] transition-colors">
                          <span>Further info</span>
                          <span className="text-[#de5857] font-bold ml-1">&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative">
              <div className="card-container">
                <div className="card">
                  {/* Card Front */}
                  <div className="card-front bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                    <div>
                      <img
                        src="/injury-management.jpg"
                        alt="Injury Management"
                        className="w-full h-52 object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-[#1b2e60]">Injury Management</h3>
                      <p className="text-gray-700 mb-4">
                        Expert care to help you recover and get back on track
                      </p>
                      <div className="mt-auto flex justify-between items-center pt-2">
                        <span className="text-[#de5857] text-sm font-semibold">Learn More</span>
                        <span className="bg-[#f8f8f8] rounded-full w-8 h-8 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1b2e60]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className="card-back bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#de5857]">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1b2e60] mb-4">Injury Management</h3>
                      <p className="text-gray-600 mb-5">
                        We provide personalised rehabilitation plans to ensure you get the support and care you need after injury, helping you return to your normal activities as soon as possible.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Comprehensive rehabilitation</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Sports injury expertise</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Return-to-work programs</span>
                        </li>
                      </ul>
                      <div className="mt-auto pt-2">
                        <Link href="/about" className="inline-flex items-center text-[#1b2e60] font-medium hover:text-[#de5857] transition-colors">
                          <span>Further info</span>
                          <span className="text-[#de5857] font-bold ml-1">&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative">
              <div className="card-container">
                <div className="card">
                  {/* Card Front */}
                  <div className="card-front bg-white rounded-xl shadow-md overflow-hidden flex flex-col h-full">
                    <div>
                      <img
                        src="/specialist-care.jpg"
                        alt="Specialist Care"
                        className="w-full h-52 object-cover"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-xl font-bold mb-2 text-[#1b2e60]">Specialist Care</h3>
                      <p className="text-gray-700 mb-4">
                        Personalised medical care from a diverse team of experts
                      </p>
                      <div className="mt-auto flex justify-between items-center pt-2">
                        <span className="text-[#de5857] text-sm font-semibold">Learn More</span>
                        <span className="bg-[#f8f8f8] rounded-full w-8 h-8 flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#1b2e60]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Card Back */}
                  <div className="card-back bg-white rounded-xl shadow-lg overflow-hidden border-t-4 border-[#de5857]">
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-[#1b2e60] mb-4">Specialist Care</h3>
                      <p className="text-gray-600 mb-5">
                        Receive dedicated attention from experienced specialists, ensuring your unique health needs are met with precision and the highest standard of care.
                      </p>
                      <ul className="space-y-2 mb-6">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Expert consultations</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Advanced diagnostic services</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-[#de5857] mt-0.5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span className="text-sm">Tailored treatment plans</span>
                        </li>
                      </ul>
                      <div className="mt-auto pt-2">
                        <Link href="/about" className="inline-flex items-center text-[#1b2e60] font-medium hover:text-[#de5857] transition-colors">
                          <span>Further info</span>
                          <span className="text-[#de5857] font-bold ml-1">&gt;</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          .card-container {
            perspective: 1000px;
            height: 100%;
          }
          
          .card {
            position: relative;
            width: 100%;
            height: 100%;
            min-height: 420px;
            transform-style: preserve-3d;
            transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          }
          
          .card-container:hover .card {
            transform: rotateY(180deg);
          }
          
          .card-front, .card-back {
            position: absolute;
            width: 100%;
            height: 100%;
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            overflow: hidden;
          }
          
          .card-back {
            transform: rotateY(180deg);
          }
        `}</style>
      </section>

      {/* Mobile Carousel (Shown only on small screens) */}
      <MobileWhyChooseUsCarousel cards={cards} />

      {/* Carousel of Doctors */}
      <DoctorsCarousel />

      {/* Locations Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 text-[#1b2e60]">Our Locations</h2>
          <p className="text-center text-gray-600 mb-8 max-w-2xl mx-auto px-4">Conveniently located in St. Morris and Richmond to serve patients across South Australia</p>

          {/* Mobile locations (shown only on small screens) */}
          <div className="px-4 md:hidden">
            {/* Location cards container */}
            <div className="space-y-6">
              {/* St Morris Location */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 w-full bg-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                  <img
                    src="/st-morris-location.png"
                    alt="St Morris Location"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=St+Morris" }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="inline-block bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded mb-2">
                      Main Location
                    </div>
                    <h3 className="text-xl font-bold drop-shadow-md">Specialist Plus - St Morris</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700">1A Williams Ave, St Morris SA 5068</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700">Opens 7:30 am Monday</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href="tel:+61884236477" className="ml-2 text-red-600 hover:text-red-800 transition-colors">
                        (08) 8423 6477
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <a
                      href="https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition-colors shadow-md flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 mb-[0.125rem]"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M304,448h-16V32c0-17.672-14.324-32-32-32c-17.672,0-32,14.328-32,32v416h-16c-17.672,0-32,14.328-32,32v32h48h64h48v-32C336,462.328,321.675,448,304,448z" />
                        <path d="M509.316,119.125l-32-48C474.343,66.672,469.343,64,464,64H320v128h144c5.344,0,10.344-2.672,13.316-7.125l32-48C512.89,131.5,512.89,124.5,509.316,119.125z" />
                        <path d="M192,128H48c-5.344,0-10.344,2.672-13.313,7.125l-32,48c-3.578,5.375-3.578,12.375,0,17.75l32,48C37.656,253.328,42.656,256,48,256h144V128z" />
                      </svg>
                      Directions
                    </a>
                    <a
                      href="tel:+61884236477"
                      className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-center py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Call
                    </a>
                  </div>
                </div>
              </div>

              {/* Richmond Location */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="relative h-48 w-full bg-blue-100">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/30"></div>
                  <img
                    src="/richmond-location.jpg"
                    alt="Richmond Location"
                    onError={(e) => { e.target.src = "https://via.placeholder.com/600x400?text=Richmond" }}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold drop-shadow-md">Specialist Plus - Richmond</h3>
                  </div>
                </div>

                <div className="p-5">
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700">129 Marion Rd, Richmond SA 5033</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="ml-2 text-gray-700">Opens 8:30 am Tuesday</span>
                    </div>
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      <a href="tel:+61884236477" className="ml-2 text-red-600 hover:text-red-800 transition-colors">
                        (08) 8423 6477
                      </a>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <a
                      href="https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-center py-2 rounded-lg transition-colors shadow-md flex items-center justify-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 mr-2 mb-[0.125rem]"
                        viewBox="0 0 512 512"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path d="M304,448h-16V32c0-17.672-14.324-32-32-32c-17.672,0-32,14.328-32,32v416h-16c-17.672,0-32,14.328-32,32v32h48h64h48v-32C336,462.328,321.675,448,304,448z" />
                        <path d="M509.316,119.125l-32-48C474.343,66.672,469.343,64,464,64H320v128h144c5.344,0,10.344-2.672,13.316-7.125l32-48C512.89,131.5,512.89,124.5,509.316,119.125z" />
                        <path d="M192,128H48c-5.344,0-10.344,2.672-13.313,7.125l-32,48c-3.578,5.375-3.578,12.375,0,17.75l32,48C37.656,253.328,42.656,256,48,256h144V128z" />
                      </svg>
                      Directions
                    </a>
                    <a
                      href="tel:+61884236477"
                      className="flex-1 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-center py-2 rounded-lg transition-colors shadow-sm flex items-center justify-center"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Map view for larger screens */}
          {isLargeScreen && (
            <div className="w-full h-[500px] z-0 rounded-lg overflow-hidden shadow-lg border-2 border-gray-200">
              <CustomMap />
            </div>
          )}
        </div>
      </section>
    </Layout >
  );
}

function MobileWhyChooseUsCarousel({ cards }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % cards.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + cards.length) % cards.length);
  };

  // Handle touch events for swipe
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      // Swipe left, show next slide
      nextSlide();
    }

    if (touchEnd - touchStart > 50) {
      // Swipe right, show previous slide
      prevSlide();
    }
  };

  // Auto-advance slides every 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide();
    }, 5000);

    return () => clearTimeout(timer);
  }, [currentSlide]);

  return (
    <div className="block md:hidden py-12 bg-white px-4">
      <h2 className="text-2xl font-bold text-center mb-8 text-[#1b2e60]">Why Choose Us</h2>
      <div
        className="max-w-md mx-auto relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/50 hover:bg-white text-gray-800 w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all duration-300"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
          </svg>
        </button>

        {/* Card display */}
        <div
          className="rounded-lg shadow-lg bg-white overflow-hidden transform transition-all duration-500 ease-in-out hover:shadow-xl"
        >
          <div className="w-full aspect-w-16 aspect-h-9 relative">
            <img
              src={cards[currentSlide].imgSrc}
              alt={cards[currentSlide].title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10"></div>
          </div>

          <div className="p-6">
            <h3 className="text-xl font-semibold text-[#23528c]">
              {cards[currentSlide].title}
            </h3>
            <p className="my-4 text-[#1b2e60] font-semibold text-md">
              {cards[currentSlide].description}
            </p>
            <p className="text-[#4d4d4d] text-sm mb-6">
              {cards[currentSlide].hoverText}
            </p>
            <div className="mt-4">
              <Link
                href={cards[currentSlide].link}
                className="inline-flex items-center text-[#1b2e60] hover:text-[#de5857] transition-colors"
              >
                <span className="text-sm font-medium underline">Further info</span>
                <span className="text-[#de5857] font-bold ml-1">&gt;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Slide indicators */}
        <div className="flex justify-center space-x-2 mt-6">
          {cards.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${currentSlide === index
                ? 'bg-[#de5857] w-6'
                : 'bg-gray-300 hover:bg-gray-400'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateX(10px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}