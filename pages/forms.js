// pages/Forms.js
import Layout from '@components/Layout';
import Link from 'next/link';

export default function Forms() {
  return (
    <Layout
      title="Forms — Specialist Plus"
      description="Download and complete necessary forms for Specialist Plus services, including patient consent and medical documentation."
      keywords="Specialist Plus forms, patient consent form, medical documents, download forms"
      ogImage="/forms-og-image.jpg"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-6 text-center">Forms</h1>
        <div className="bg-white shadow-md rounded-lg p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold mb-4">Available Forms</h2>
          <ul className="divide-y divide-gray-300">
            <li className="py-4">
              <Link
                href="/consent-form"
                className="font-gotham-bold text-lg text-blue-500 font-medium hover:text-blue-800 underline transition-all"
              >
                Consent Form
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Please complete this form to provide your consent for treatment or services.
              </p>
            </li>
            <li className="py-4">
              <Link
                href="/contact/#contact-header"
                className="font-gotham-bold text-lg text-blue-500 font-medium hover:text-blue-800 underline transition-all"
              >
                Contact Form
              </Link>
              <p className="text-sm text-gray-500 mt-1">
                Use this form to get in touch with us for general inquiries or to schedule an appointment.
              </p>
            </li>
          </ul>
        </div>
      </div>
    </Layout>
  );
}