// components/Header.js
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const handleMouseEnter = (index) => {
    setOpenDropdown(index);
  };

  const handleMouseLeave = () => {
    setOpenDropdown(null);
  };

  return (
    <header className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 xl:py-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold">Specialist Plus</span>
          </div>
          <div className="hidden xl:flex space-x-20"> {/* Increased horizontal gap here */}
            {["About", "Services", "Providers", "Forms", "Contacts"].map((item, index) => (
              <div
                key={index}
                className="relative group"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <button className="flex items-center text-gray-700 hover:text-gray-900">
                  {item} 
                  <FaChevronDown
                    className={`ml-1 text-sm transition-transform duration-200 text-gray-700 group-hover:transform group-hover:rotate-180 ${
                      openDropdown === index ? 'transform rotate-180 text-gray-700' : ''
                    }`}
                  />
                </button>
                <div
                  className="absolute top-full left-[-1rem] mt-2 bg-white shadow-lg rounded-md w-48 border border-red-200 invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200"
                  onMouseEnter={() => setOpenDropdown(index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <a href="#" className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100">
                    Dropdown Item 1
                  </a>
                  <a href="#" className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100">
                    Dropdown Item 2
                  </a>
                </div>
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
        <div className="xl:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["About", "Services", "Providers", "Forms", "Contacts"].map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => setOpenDropdown(index === openDropdown ? null : index)}
                  className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item} 
                  <FaChevronDown
                    className={`text-sm ml-1 transition-transform duration-200 ${
                      openDropdown === index ? 'transform rotate-180 text-gray-700' : ''
                    }`}
                  />
                </button>
                {openDropdown === index && (
                  <div className="bg-white shadow-lg rounded-md border border-red-600">
                    <a href="#" className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100">
                      Dropdown Item 1
                    </a>
                    <a href="#" className="block px-6 py-4 text-sm text-gray-700 hover:bg-gray-100">
                      Dropdown Item 2
                    </a>
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
