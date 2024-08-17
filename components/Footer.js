// components/Footer.js
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col justify-start xl:items-start items-center h-full">
            <div className="flex flex-row items-center">
              <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-12" />
              <span className="text-2xl font-semibold ml-3">Specialist Plus</span>
            </div>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-gray-900">About Us</a></li>
              <li><a href="#" className="hover:text-gray-900">Services</a></li>
              <li><a href="#" className="hover:text-gray-900">Providers</a></li>
              <li><a href="#" className="hover:text-gray-900">Forms</a></li>
              <li><a href="#" className="hover:text-gray-900">Contact</a></li>
            </ul>
          </div>

          {/* Contact Us & Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            {/* <p className="text-gray-500">1234 Specialist St, Suite 100</p>
            <p className="text-gray-500">City, State, 12345</p> */}
            <p className="text-gray-500 mt-2">Email: admin@specialistplus.com.au</p>
            <p className="text-gray-500">Phone: (08) 8423 6477</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-500 hover:text-gray-900"><FaFacebookF size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-gray-900"><FaLinkedinIn size={20} /></a>
              <a href="#" className="text-gray-500 hover:text-gray-900"><FaInstagram size={20} /></a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <p className="text-center text-gray-500 text-sm">
          &copy; 2024 Specialist Plus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
