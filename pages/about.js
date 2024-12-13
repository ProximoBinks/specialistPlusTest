// pages/about.js
import Layout from '@components/Layout';
import { FaClipboardList, FaBrain, FaStethoscope, FaUserMd } from 'react-icons/fa';

export default function About() {
  return (
    <Layout title="About — Specialist Plus" description="Learn more about Specialist Plus, our mission, and our specialties.">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Introduction Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">About Specialist Plus</h1>
          <p className="text-lg text-gray-600">
            At Specialist Plus, we are committed to delivering exceptional healthcare services with integrity, compassion, and expertise. Our mission is to empower patients and clients by providing tailored solutions that prioritise well-being and recovery.
          </p>
        </div>

        {/* Specialties Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Our Specialties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            {/* Medico Legal */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <FaClipboardList className="text-red-600 text-4xl" />
                <h3 className="text-xl font-semibold text-gray-800">Medico Legal</h3>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Independent medical examinations</li>
                <li>Injury scale value</li>
                <li>Permanent impairment assessments</li>
                <li>Total and permanent disablement</li>
                <li>Department of Veterans' Affairs assessments</li>
              </ul>
            </div>

            {/* Psychology Appointment */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <FaBrain className="text-red-600 text-4xl" />
                <h3 className="text-xl font-semibold text-gray-800">Psychology Appointment</h3>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Psychologist appointments</li>
                <li>Psychiatrist appointments</li>
              </ul>
            </div>

            {/* Specialist Consultations */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <FaStethoscope className="text-red-600 text-4xl" />
                <h3 className="text-xl font-semibold text-gray-800">Specialist Consultations</h3>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Worksite assessments</li>
                <li>Fitness-for-work assessments</li>
                <li>Onsite case conferences</li>
                <li>Injury management and motor vehicle injury appointments</li>
              </ul>
            </div>

            {/* Injury Management */}
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-4">
                <FaUserMd className="text-red-600 text-4xl" />
                <h3 className="text-xl font-semibold text-gray-800">Injury Management</h3>
              </div>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Worksite assessments</li>
                <li>Fitness-for-work assessments</li>
                <li>Onsite case conferences</li>
                <li>Injury management and motor vehicle injury appointments</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Book Appointment Banner */}
        <div className="py-6 text-center rounded-lg">
          <h2 className="md:text-2xl text-xl font-bold text-black mb-6">Schedule Your Appointment Online</h2>
          <a
            href="/contact"
            className="bg-red-600 text-white px-6 py-3 rounded-full font-semibold text-md md:text-lg shadow hover:bg-red-700 transition"
          >
            Book an Appointment
          </a>
        </div>
      </div>
    </Layout>
  );
}
