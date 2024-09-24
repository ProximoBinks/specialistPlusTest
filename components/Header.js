import { useState, useEffect, useRef } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';
import Link from 'next/link';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const menuRef = useRef();

  const links = [
    {
      title: 'About',
      url: '/about',
      subtitles: [
        { title: 'Our Doctors', url: '/doctors' },
        { title: 'Practice Locations', url: '/contact' },
      ],
    },
    {
      title: 'Services',
      url: '/services',
      subtitles: [

      ],
    },
    {
      title: 'Providers',
      url: '/providers',
      subtitles: [
        { title: 'Partners', url: '/partners' },
        { title: 'Insurance', url: '/insurance' },
      ],
    },
    {
      title: 'Forms',
      subtitles: [{ title: 'Consent Form', url: '/consent-form' }],
    },
    {
      title: 'Contact',
      url: '/contact',
      subtitles: [
        { title: 'Opening Hours', url: '/opening-hours' },
        { title: 'Email Us', url: '/contact' },
      ],
    },
  ];

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    setOpenDropdown(null);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 xl:py-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center select-none" onClick={handleLinkClick}>
            <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold">Specialist Plus</span>
          </Link>
          <div className="hidden xl:flex space-x-20">
            {links.map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link
                  href={item.url || '#'}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  {item.title}
                  {item.subtitles.length > 0 && (
                    <FaChevronDown
                      className={`ml-1 text-sm transition-transform duration-200 text-gray-700 group-hover:transform group-hover:rotate-180 ${
                        openDropdown === index ? 'transform rotate-180 text-gray-700' : ''
                      }`}
                    />
                  )}
                </Link>
                {item.subtitles.length > 0 && (
                  <div
                    className={`absolute top-full left-0 mt-2 bg-white shadow-lg rounded-md w-48 border border-red-100 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 ${
                      openDropdown === index ? 'visible opacity-100' : ''
                    }`}
                  >
                    {item.subtitles.map((subtitle, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subtitle.url || '#'}
                        className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {subtitle.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden xl:block">
            <button className="bg-red-600 text-white px-6 py-3 rounded-3xl hover:bg-red-700 font-bold">
              Call Us
            </button>
          </div>
          <div className="xl:hidden">
            <Hamburger size={20} duration={0.8} toggled={isOpen} toggle={setIsOpen} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div ref={menuRef} className="xl:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((item, index) => (
              <div key={index} className="relative">
                <div className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100">
                  <Link href={item.url || '#'} className="flex items-center" onClick={handleLinkClick}>
                    {item.title}
                  </Link>
                  {item.subtitles.length > 0 && (
                    <FaChevronDown
                      className={`text-sm ml-1 transition-transform duration-200 ${
                        openDropdown === index ? 'transform rotate-180 text-gray-700' : ''
                      }`}
                      onClick={() => setOpenDropdown(index === openDropdown ? null : index)}
                    />
                  )}
                </div>
                {openDropdown === index && item.subtitles.length > 0 && (
                  <div className="bg-white shadow-lg rounded-md">
                    {item.subtitles.map((subtitle, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subtitle.url || '#'}
                        className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={handleLinkClick}
                      >
                        {subtitle.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <button className="w-full bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Call Us
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
