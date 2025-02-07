import { useState, useEffect, useRef } from 'react';
import { FaChevronDown, FaChevronRight } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [openSubDropdown, setOpenSubDropdown] = useState(null);
  const [openMobileSubDropdown, setOpenMobileSubDropdown] = useState(null);

  // Start as `null` so we don't show the banner until we know for sure
  const [showBanner, setShowBanner] = useState(null);

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
        {
          title: 'Rehabilitation Psychologist',
          doctors: [{ name: 'Mr Gilles Hammond', url: '/doctors/gilles-hammond' }],
        },
        {
          title: 'General Dentists',
          doctors: [
            { name: 'Dr Ishita Gupta', url: '/doctors/ishita-gupta' },
            { name: 'Dr Cecilia Yong', url: '/doctors/cecilia-yong' },
          ],
        },
        {
          title: 'General Surgeons',
          doctors: [
            { name: 'Dr Aiden Tieu', url: '/doctors/aiden-tieu' },
            { name: 'Dr Devinder Raju (Colorectal)', url: '/doctors/devinder-raju' },
          ],
        },
        {
          title: 'Consultant Radiologist',
          doctors: [{ name: 'Dr Kristy Yang', url: '/doctors/kristy-yang' }],
        },
        {
          title: 'Medical Practitioner',
          doctors: [{ name: 'Katherine Murray-Smith', url: '/doctors/katherine-murray-smith' }],
        },
      ],
    },
    {
      title: 'Forms',
      url: '/forms',
      subtitles: [{ title: 'Consent Form', url: '/consent-form' }],
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
      setIsOpen(false);
      setOpenDropdown(null);
      setOpenSubDropdown(null);
      setOpenMobileSubDropdown(null);
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

  const closeAllMenus = () => {
    setOpenDropdown(null);
    setOpenSubDropdown(null);
    setOpenMobileSubDropdown(null);
    setIsOpen(false);
  };

  // When user closes the banner, store the time
  const handleCloseBanner = () => {
    localStorage.setItem('bannerClosedAt', Date.now().toString());
    setShowBanner(false);
  };

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
                      className={`ml-1 text-sm text-gray-700 transition-transform duration-200 ${
                        openDropdown === index ? 'rotate-180' : ''
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
                              className={`text-gray-600 transition-transform duration-200 ${
                                openSubDropdown === subIndex ? 'rotate-90' : ''
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

          {/* Call Button */}
          <div className="hidden xl:block">
            <a href="tel:+61884236477">
              <button className="transition-all bg-red-600 text-white px-6 py-3 rounded-3xl hover:bg-red-700 font-bold">
                Call Us
              </button>
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="xl:hidden">
            <Hamburger
              size={20}
              duration={0.8}
              toggled={isOpen}
              toggle={setIsOpen}
              ref={buttonRef}
            />
          </div>
        </div>
      </div>

      {/* Dismissible Banner */}
      {/* Render banner only if showBanner === true (avoid flicker by not rendering when showBanner === null) */}
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

      {isOpen && (
        <div
          ref={menuRef}
          className="xl:hidden bg-white shadow-lg absolute w-full top-16 left-0"
        >
          {links.map((item, index) => (
            <div key={index} className="border-b">
              {/* If item has no subtitles, just a direct link */}
              {item.subtitles.length === 0 ? (
                <Link
                  href={item.url ?? '#'}
                  className="w-full px-6 py-4 block text-gray-700 hover:bg-gray-100"
                  onClick={closeAllMenus}
                >
                  {item.title}
                </Link>
              ) : (
                <>
                  <button
                    className="w-full px-6 py-4 text-left text-gray-700 hover:bg-gray-100 flex justify-between"
                    onClick={() =>
                      setOpenDropdown(index === openDropdown ? null : index)
                    }
                  >
                    {item.title}
                    {item.subtitles.length > 0 && (
                      <FaChevronDown
                        className={`transition-transform ${
                          openDropdown === index ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {openDropdown === index && item.subtitles.length > 0 && (
                    <div className="bg-gray-50">
                      {item.subtitles.map((subtitle, subIndex) => (
                        <div key={subIndex} className="border-t">
                          {/* If sub has no doctors, direct link */}
                          {subtitle.doctors ? (
                            <button
                              className="w-full px-8 py-3 text-left text-gray-700 hover:bg-gray-200 flex justify-between"
                              onClick={() =>
                                setOpenMobileSubDropdown(
                                  subIndex === openMobileSubDropdown
                                    ? null
                                    : subIndex
                                )
                              }
                            >
                              {subtitle.title}
                              {/* Animated arrow for sub-category */}
                              <FaChevronRight
                                className={`text-gray-600 transition-transform duration-200 ${
                                  openMobileSubDropdown === subIndex
                                    ? 'rotate-90'
                                    : ''
                                }`}
                              />
                            </button>
                          ) : (
                            <Link
                              href={subtitle.url ?? '#'}
                              className="block px-8 py-3 text-gray-700 hover:bg-gray-200"
                              onClick={closeAllMenus}
                            >
                              {subtitle.title}
                            </Link>
                          )}

                          {subtitle.doctors &&
                            openMobileSubDropdown === subIndex && (
                              <div className="bg-white">
                                {subtitle.doctors.map((doctor, doctorIndex) => (
                                  <Link
                                    key={doctorIndex}
                                    href={doctor.url ?? '#'}
                                    className="block px-10 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </header>
  );
}
