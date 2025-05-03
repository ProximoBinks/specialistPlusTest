import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronRight, FaPhone, FaTimes } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState(null);

  // Start as `null` so we don't show the banner until we know for sure
  const [showBanner, setShowBanner] = useState(null);

  // Add this for mobile menu animation
  const [menuVisible, setMenuVisible] = useState(false);

  const menuRef = useRef();
  const buttonRef = useRef();

  const links = [
    {
      title: 'About',
      url: '/about',
      subtitles: [
        { title: 'Our Doctors', url: '/doctors' },
        { title: 'Practice Locations', url: '/contact' },
      ],
    },
    { title: 'Services', url: '/services', subtitles: [] },
    {
      title: 'Providers',
      url: '/doctors',
      subtitles: [
        {
          title: 'Medical Director',
          doctors: [{ name: 'Dr Poh Yong', url: '/doctors/poh-yong' }],
        },
        {
          title: 'Occupational Physician',
          doctors: [{ name: 'Dr Dion Suyapto', url: '/doctors/dion-suyapto' }],
        },
        {
          title: 'Pain Medicine Physician',
          doctors: [{ name: 'Dr Mandeep Singh', url: '/doctors/mandeep-singh' }],
        },
        {
          title: 'Consultant Psychiatrist',
          doctors: [{ name: 'Dr Arun Gupta', url: '/doctors/arun-gupta' }],
        },
        {
          title: 'Occupational Medical Registrars',
          doctors: [
            { name: 'Dr Joshua Kartika', url: '/doctors/joshua-kartika' },
            { name: 'Dr Bill Papps', url: '/doctors/bill-papps' },
          ],
        },
        // {
        //   title: 'Rehabilitation Psychologist',
        //   doctors: [{ name: 'Mr Gilles Hammond', url: '/doctors/gilles-hammond' }],
        // },
        {
          title: 'General Dentists',
          doctors: [
            // { name: 'Dr Ishita Gupta', url: '/doctors/ishita-gupta' },
            { name: 'Dr Cecilia Yong', url: '/doctors/cecilia-yong' },
          ],
        },
        {
          title: 'General Surgeons',
          doctors: [
            { name: 'Dr Aiden Tieu', url: '/doctors/aiden-tieu' },
            { name: 'Dr Devinder Raju', url: '/doctors/devinder-raju' },
          ],
        },
        {
          title: 'Consultant Radiologist',
          doctors: [{ name: 'Dr Kristy Yang', url: '/doctors/kristy-yang' }],
        },
        {
          title: 'Medical Practitioner',
          doctors: [{ name: 'Dr Katherine Murray-Smith', url: '/doctors/katherine-murray-smith' }],
        },
      ],
    },
    {
      title: 'Forms',
      url: '/forms',
      subtitles: [{ title: 'Consent Form', url: '/consent-form' }, { title: 'Contact Form', url: '/contact/#contact-header' }],
    },
    { title: 'Contact', url: '/contact', subtitles: [] },
  ];

  const handleMouseEnter = (index) => setOpenDropdown(index);
  const handleMouseLeave = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const handleSubMouseEnter = (index) => setOpenSubDropdown(index);

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      closeMenu();
    }
  };

  // Add smooth animation for closing menu
  const closeMenu = () => {
    setMenuVisible(false);
    // Wait for animation to complete before removing from DOM
    setTimeout(() => {
      setIsOpen(false);
      setOpenDropdown(null);
      setOpenSubDropdown(null);
      setOpenMobileSubDropdown(null);
    }, 300);
  };

  // Handle menu toggle with animation
  const toggleMenu = () => {
    if (isOpen) {
      closeMenu();
    } else {
      setIsOpen(true);
      setTimeout(() => {
        setMenuVisible(true);
      }, 50);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    // Only run localStorage check on client side
    if (typeof window !== 'undefined') {
      const closedAt = localStorage.getItem('bannerClosedAt');
      if (closedAt) {
        const closedTime = parseInt(closedAt, 10);
        const now = Date.now();
        const twentyFourHours = 24 * 60 * 60 * 1000;
        // If it was closed less than 24 hours ago, hide banner
        if (now - closedTime < twentyFourHours) {
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } else {
        // If never closed, show
        setShowBanner(true);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showBanner !== null) {
      window.dispatchEvent(new CustomEvent('bannerStatus', { detail: showBanner }));
    }
  }, [showBanner]);

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setOpenMobileSubDropdown(null);
    setIsOpen(false);
    setMenuVisible(false);
  };

  // When user closes the banner, store the time
  const handleCloseBanner = () => {
    localStorage.setItem('bannerClosedAt', Date.now().toString());
    setShowBanner(false);
  };

  // Add effect to prevent scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
      }
    }

    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
      document.body.style.top = '';
    };
  }, [isOpen]);

  return (
    <header className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 xl:py-4">
        <div className="flex justify-between items-center h-16">
          <Link
            href="/"
            className="flex items-center select-none"
            onClick={closeAllMenus}
          >
            <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold">Specialist Plus</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden xl:flex space-x-20">
            {links.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.url ?? '#'}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                  onClick={closeAllMenus}
                >
                  {item.title}
                  {item.subtitles.length > 0 && (
                    <FaChevronDown
                      className={`ml-1 text-sm text-gray-700 transition-transform duration-200 ${openDropdown === index ? 'rotate-180' : ''
                        }`}
                    />
                  )}
                </Link>

                {/* First Level Dropdown */}
                {item.subtitles.length > 0 && (
                  <div
                    className="absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-80 border border-red-100
                               invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200"
                  >
                    {item.subtitles.map((subtitle, subIndex) => (
                      <div key={subIndex} className="relative group">
                        {/* If subtitle has a direct URL but no doctors, treat it as a link */}
                        {subtitle.doctors ? (
                          <button
                            onMouseEnter={() => handleSubMouseEnter(subIndex)}
                            className="flex justify-between w-full px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                          >
                            {subtitle.title}
                            {/* Animated arrow for sub-category */}
                            <FaChevronRight
                              className={`text-gray-600 transition-transform duration-200 ${openSubDropdown === subIndex ? 'rotate-90' : ''
                                }`}
                            />
                          </button>
                        ) : (
                          <Link
                            href={subtitle.url ?? '#'}
                            className="flex justify-between w-full px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={closeAllMenus}
                          >
                            {subtitle.title}
                          </Link>
                        )}

                        {/* Second Level Dropdown */}
                        {subtitle.doctors && openSubDropdown === subIndex && (
                          <div className="absolute left-full top-0 bg-white shadow-lg rounded-md w-64 border border-gray-200">
                            {subtitle.doctors.map((doctor, doctorIndex) => (
                              <Link
                                key={doctorIndex}
                                href={doctor.url ?? '#'}
                                className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                                onClick={closeAllMenus}
                              >
                                {doctor.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Call Button */}
          <div className="hidden xl:block">
            <a href="tel:+61884236477">
              <button className="transition-all bg-red-600 text-white px-6 py-3 rounded-3xl hover:bg-red-700 font-bold">
                Call Us
              </button>
            </a>
          </div>

          {/* Mobile Header Controls */}
          <div className="xl:hidden flex items-center space-x-4">
            {/* Mobile Menu Toggle */}
            <Hamburger
              size={20}
              duration={0.8}
              toggled={isOpen}
              toggle={toggleMenu}
              ref={buttonRef}
              color="#222"
            />
          </div>
        </div>
      </div>

      {/* Dismissible Banner */}
      {showBanner && (
        <div className="flex items-center bg-[#af97c4] text-white px-4 py-2 mt-2">
          <p className="flex-1 text-center text-sm">
            Please complete the{' '}
            <Link href="/consent-form" className="underline">
              consent form
            </Link>{' '}
            48 hours prior to your appointment
          </p>
          <button
            onClick={handleCloseBanner}
            className="text-white text-lg font-bold"
            aria-label="Close banner"
          >
            X
          </button>
        </div>
      )}

      {/* Fullscreen Mobile Menu with Animation */}
      {isOpen && (
        <div
          ref={menuRef}
          className={`xl:hidden fixed inset-0 bg-white z-50 transition-all duration-300 ease-in-out ${menuVisible ? 'opacity-100' : 'opacity-0'}`}
          style={{ top: '0', paddingTop: '20px' }}
        >
          {/* Mobile Menu Header */}
          <div className="flex justify-between items-center px-6 py-4 border-b border-gray-100">
            <Link
              href="/"
              className="flex items-center select-none"
              onClick={closeAllMenus}
            >
              <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-10 w-10 mr-2" />
              <span className="text-xl font-semibold">Specialist Plus</span>
            </Link>
            <button
              onClick={closeMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <FaTimes className="h-6 w-6 text-gray-800" />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="overflow-y-auto h-[calc(100vh-180px)] p-4">
            {links.map((item, index) => (
              <div key={index} className="py-2">
                {/* If item has no subtitles, just a direct link */}
                {item.subtitles.length === 0 ? (
                  <Link
                    href={item.url ?? '#'}
                    className="w-full py-4 block text-gray-800 text-xl font-medium"
                    onClick={closeAllMenus}
                  >
                    {item.title}
                  </Link>
                ) : (
                  <>
                    <div className="flex justify-between items-center py-3">
                      <Link
                        href={item.url ?? '#'}
                        className="text-gray-800 flex-1 text-xl font-medium"
                        onClick={closeAllMenus}
                      >
                        {item.title}
                      </Link>
                      {item.subtitles.length > 0 && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the Link from being triggered
                            setOpenDropdown(index === openDropdown ? null : index);
                          }}
                          className="p-2"
                          aria-label={`Toggle ${item.title} submenu`}
                        >
                          <FaChevronRight
                            className={`transition-transform duration-300 text-gray-500 ${openDropdown === index ? 'rotate-90 text-red-600' : ''
                              }`}
                          />
                        </button>
                      )}
                    </div>

                    {openDropdown === index && item.subtitles.length > 0 && (
                      <div className="pl-4 overflow-hidden transition-all duration-200 border-l-2 border-gray-100 ml-2 mt-2">
                        {item.subtitles.map((subtitle, subIndex) => (
                          <div key={subIndex} className="py-1">
                            {/* If subtitle has doctors */}
                            {subtitle.doctors ? (
                              <div>
                                <button
                                  className="w-full py-3 text-left text-gray-700 flex justify-between items-center"
                                  onClick={() =>
                                    setOpenMobileSubDropdown(
                                      subIndex === openMobileSubDropdown
                                        ? null
                                        : subIndex
                                    )
                                  }
                                >
                                  <span className="font-medium">{subtitle.title} -</span>
                                  <FaChevronDown
                                    className={`text-gray-500 transition-transform duration-300 mr-2 ${openMobileSubDropdown === subIndex
                                      ? 'rotate-180 text-red-600'
                                      : ''
                                      }`}
                                  />
                                </button>

                                {openMobileSubDropdown === subIndex && (
                                  <div className="border-l-2 border-gray-100 ml-2 pl-4 py-2">
                                    {subtitle.doctors.map((doctor, doctorIndex) => (
                                      <Link
                                        key={doctorIndex}
                                        href={doctor.url ?? '#'}
                                        className="block py-3 text-gray-700 hover:text-red-600 transition-colors mr-9"
                                        onClick={closeAllMenus}
                                      >
                                        <span className="flex items-center justify-between gap-2">
                                          {doctor.name}
                                          <img src="/arrow.png" alt="Arrow Right" className="w-3 h-3" />
                                        </span>
                                      </Link>
                                    ))}
                                  </div>
                                )}
                              </div>
                            ) : (
                              <Link
                                href={subtitle.url ?? '#'}
                                className="block py-3 text-gray-700 hover:text-red-600 transition-colors"
                                onClick={closeAllMenus}
                              >
                                {subtitle.title}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>

          {/* Call Button at bottom of mobile menu */}
          <div className="absolute bottom-8 left-0 right-0 px-6">
            <a
              href="tel:+61884236477"
              className="transition-all bg-red-600 text-white w-full py-4 rounded-lg hover:bg-red-700 font-bold flex items-center justify-center gap-3"
            >
              <div className="text-lg">Call Us</div>
              <FaPhone className="text-white h-5 w-5" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
}