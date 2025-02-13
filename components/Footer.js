// components/Footer.js
import { FaFacebookF, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t border-gray-300">
      <div className="max-w-[105rem] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Description */}
          <div className="flex flex-col justify-start xl:items-start items-center h-full">
            <Link className="flex flex-row items-center" href="/">
              <img src="/sp-logo.png" alt="Specialist Plus Logo" className="h-12" />
              <span className="text-2xl font-semibold ml-3">Specialist Plus</span>
            </Link>
          </div>
          {/* Quick Links */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="text-gray-500 space-y-2">
              <li>
                <Link href="/about" className="block hover:text-gray-900 transition-all">About Us</Link>
              </li>
              <li>
                <Link href="/services" className="block hover:text-gray-900 transition-all">Services</Link>
              </li>
              <li>
                <Link href="/doctors" className="block hover:text-gray-900 transition-all">Providers</Link>
              </li>
              <li>
                <Link href="/forms" className="block hover:text-gray-900 transition-all">Forms</Link>
              </li>
              <li>
                <Link href="/contact" className="block hover:text-gray-900 transition-all">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Us & Social Icons */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <Link className="text-gray-500 mt-2 hover:text-gray-900 transition-all" href="/contact">Practice Information</Link>
            <a className="text-gray-500 mt-2 hover:text-gray-900 transition-all" href="mailto:admin@specialistplus.com.au">admin@specialistplus.com.au</a>
            <a className="text-gray-500 mt-2 hover:text-gray-900 transition-all" href="tel:+61884236477">(08) 8423 6477</a>
            <div className="flex space-x-4 mt-4">
              {/* Facebook */}
              <a
                href="https://www.facebook.com/p/Specialist-Plus-100083018906533/"
                className="text-gray-500 hover:text-gray-900 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaFacebookF size={20} />
              </a>

              {/* LinkedIn */}
              <a
                href="https://au.linkedin.com/company/specialistplus"
                className="text-gray-500 hover:text-gray-900 transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedinIn size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-100 py-4">
        <p className="text-center text-gray-500 text-sm">
          &copy; {currentYear} Specialist Plus. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
