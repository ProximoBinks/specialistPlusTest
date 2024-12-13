// pages/contact.js
import Layout from '@components/Layout';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export default function Contact() {
  const scrollToContact = () => {
    document.getElementById('contact-header').scrollIntoView({ behavior: 'smooth' });
  };
  return (
    <Layout title="Contact — Specialist Plus" description="Contact Specialist Plus for appointments and enquiries.">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-4">Contact</h1>
        {/* <h2 className="text-2xl text-center text-gray-700 mb-8">Specialist Plus</h2> */}
        <p className="text-center mb-6 text-gray-700">
          For all appointments and enquiries, please call&nbsp;
          <a href="tel:+61884236477" className="text-red-600 font-medium hover:underline">(08) 8423 6477</a>
          &nbsp;or request an appointment online using the form <span className="underline font-bold cursor-pointer" onClick={scrollToContact}>below</span>.
        </p>
        <p className="text-center text-gray-700">
          Our practice staff will reach out to you as soon as possible to discuss your needs.
        </p>
        <p className="text-center text-gray-700 mb-6">
          You can also reach us via fax at:
          <span className="text-gray-900 font-medium"> 08 8311 1755</span>
        </p>
        {/* St Morris Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start">
          {/* Info Section */}
          <div className="border border-gray-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Specialist Plus - St Morris</h3>
            <p>1 A Williams Avenue, St Morris, SA 5068.</p>
            <p className="mt-4 font-semibold">ST MORRIS WORKING HOURS:</p>
            <p>Monday: 7.30am - 3.30pm</p>
            <p>Tuesday to Friday: 7.30am - 4.30pm</p>

            {/* Contact Info */}
            <div className="mt-4">
              <p className="flex items-center space-x-2">
                <FaPhone className="text-red-600" />
                <a href="tel:+61884236477">(08) 8423 6477</a>
              </p>
              <p className="flex items-center space-x-2 mt-2">
                <FaEnvelope className="text-red-600" />
                <a href="mailto:admin@specialistplus.com.au">admin@specialistplus.com.au</a>
              </p>
            </div>

            {/* Driving Directions */}
            <div className="mt-6">
              <a
                href="https://www.google.com/maps/dir//Specialist+Plus+-+St+Morris/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0cb7939e68915:0xf78c5ddd0d188532!2m2!1d138.65407417729955!2d-34.91342997284493"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
              >
                <FaMapMarkerAlt />
                <span>Driving Directions and Location Map</span>
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3271.721817731735!2d138.65407417729955!3d-34.91342997284493!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0cb7939e68915%3A0xf78c5ddd0d188532!2sSpecialist%20Plus%20-%20St%20Morris!5e0!3m2!1sen!2sau!4v1727157327429!5m2!1sen!2sau"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Richmond Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-start">
          {/* Info Section */}
          <div className="border border-gray-300 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Specialist Plus - Richmond</h3>
            <p>129 Marion Road, Richmond, SA 5033.</p>
            <p className="mt-4 font-semibold">RICHMOND WORKING HOURS:</p>
            <p>Tuesday and Thursday: 8.30am - 5.00pm</p>
            <p>Wednesday and Friday: 8.30am - 4.30pm</p>

            {/* Contact Info */}
            <div className="mt-4">
              <p className="flex items-center space-x-2">
                <FaPhone className="text-red-600" />
                <a href="tel:+61884236477">(08) 8423 6477</a>
              </p>
              <p className="flex items-center space-x-2 mt-2">
                <FaEnvelope className="text-red-600" />
                <a href="mailto:admin@specialistplus.com.au">admin@specialistplus.com.au</a>
              </p>
            </div>

            {/* Driving Directions */}
            <div className="mt-6">
              <a
                href="https://www.google.com/maps/dir//Specialist+Plus+-+Richmond/data=!4m6!4m5!1m0!1m2!1m1!1s0x6ab0c5bf38d8d881:0xdfddaf4dc6ed69ef!2m2!1d138.5505827773002!2d-34.93641647283698"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 flex items-center space-x-2"
              >
                <FaMapMarkerAlt />
                <span>Driving Directions and Location Map</span>
              </a>
            </div>
          </div>

          {/* Map Section */}
          <div className="w-full h-full rounded-lg shadow-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3270.8054268032793!2d138.5505827773002!3d-34.93641647283698!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ab0c5bf38d8d881%3A0xdfddaf4dc6ed69ef!2sSpecialist%20Plus%20-%20Richmond!5e0!3m2!1sen!2sau!4v1727157364526!5m2!1sen!2sau"
              width="100%"
              height="400"
              allowFullScreen=""
              loading="eager"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>
        {/* Contact Us Form */}
        <div className="rounded-lg p-8 max-w-lg mx-auto"> {/* removed shadow and bg */}
          <h2 className="text-3xl font-semibold text-center mb-6" id="contact-header">Contact Us</h2>
          <form
            name="contact-form"
            method="POST"
            data-netlify="true"
            netlify-honeypot="bot-field"
            className="space-y-6"
          >
            <input type="hidden" name="form-name" value="contact-form" />
            <p className="hidden">
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </p>

            <div>
              <label className="block text-gray-700">
                First Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="firstName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700">
                Last Name <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="lastName"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700">
                Email <span className="text-red-500">*</span>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700">
                Subject <span className="text-red-500">*</span>
                <input
                  type="text"
                  name="subject"
                  required
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                />
              </label>
            </div>

            <div>
              <label className="block text-gray-700">
                Message <span className="text-red-500">*</span>
                <textarea
                  name="message"
                  required
                  rows="4"
                  className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                ></textarea>
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}
