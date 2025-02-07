// pages/Services.js
import Layout from '@components/Layout';
import { FaUserMd, FaStethoscope } from 'react-icons/fa';

export default function Services() {
    return (
        <Layout
            title="Services — Specialist Plus"
            description="Explore the range of professional medical services offered by Specialist Plus, including occupational health and medico-legal assessments."
            keywords="occupational physician, medico-legal services, injury management, specialist consultations"
            ogImage="/services-og-image.jpg">
            <div className="max-w-6xl mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Our Services</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Occupational Physician Services */}
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center space-x-4 mb-4">
                            <FaStethoscope className="text-red-600 text-4xl" />
                            <h2 className="text-2xl font-semibold text-gray-800">Occupational Physician</h2>
                        </div>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Specialised Services</h3>
                        <ul className="list-disc pl-6 space-y-2 text-black mb-4 font-bold">
                            <li>Psychiatry</li>
                            <li>Psychology</li>
                            <li>Injury Management</li>
                        </ul>
                        <h3 className="text-lg font-medium text-gray-700 mb-2">Additional Services</h3>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Return-to-work injuries</li>
                            <li>Work injury management</li>
                            <li>Motor Vehicle accident claims</li>
                            <li>Fit-for-work assessment</li>
                            <li>Health Surveillance</li>
                            <li>Worksite assessments</li>
                            <li>Onsite case conferences</li>
                            <li>DVA assessments</li>
                            <li>TPD assessments</li>
                            <li>Emotional harm</li>
                        </ul>
                    </div>

                    {/* Medico Legal Services */}
                    <div className="bg-white shadow-lg rounded-lg p-6 border border-gray-200">
                        <div className="flex items-center space-x-4 mb-4">
                            <FaUserMd className="text-red-600 text-4xl" />
                            <h2 className="text-2xl font-semibold text-gray-800">Medico Legal</h2>
                        </div>
                        <ul className="list-disc pl-6 space-y-2 text-gray-600">
                            <li>Permanent impairment assessments</li>
                            <li>Independent medical examinations</li>
                            <li>Injury scale value</li>
                            <li>Public Liability Assessment</li>
                            <li>Personal Injury Claims</li>
                        </ul>
                    </div>
                </div>
            </div>
        </Layout>
    );
}