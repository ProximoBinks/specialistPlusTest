// components/Header.js
import { useState } from 'react';
import { FaChevronDown } from 'react-icons/fa';
import { Spin as Hamburger } from 'hamburger-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (index) => {
    if (openDropdown === index) {
      setOpenDropdown(null);
    } else {
      setOpenDropdown(index);
    }
  };

  return (
    <header className="bg-white shadow-lg fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-10 w-10 mr-2" />
            <span className="text-xl font-semibold">Specialist Plus</span>
          </div>
          <div className="hidden md:flex space-x-4">
            {["About", "Services", "Providers", "Forms", "Contacts"].map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  {item} <FaChevronDown className="ml-1" />
                </button>
                {openDropdown === index && (
                  <div className="absolute top-full mt-2 bg-white shadow-lg rounded-md w-48">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dropdown Item 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dropdown Item 2
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="hidden md:block">
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
              Call Us
            </button>
          </div>
          <div className="md:hidden">
            <Hamburger size={20} duration={0.8} toggled={isOpen} toggle={setIsOpen} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["About", "Services", "Providers", "Forms", "Contacts"].map((item, index) => (
              <div key={index} className="relative">
                <button
                  onClick={() => toggleDropdown(index)}
                  className="flex justify-between items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  {item} <FaChevronDown />
                </button>
                {openDropdown === index && (
                  <div className="bg-white shadow-lg rounded-md">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Dropdown Item 1
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
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
