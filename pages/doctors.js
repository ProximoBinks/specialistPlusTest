import Layout from '@components/Layout';
import Link from 'next/link';
import { doctors } from '../pages/data/doctorsData'; // Update this to import from the new data file

export default function Doctors() {
  return (
    <Layout title="Our Doctors — Specialist Plus" description="Meet the experienced team of doctors at Specialist Plus.">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Meet Our Doctors</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="rounded-md object-cover mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-md text-gray-500">{doctor.title}</p>
              <p className="mt-4 text-gray-600">{doctor.description}</p>
              <Link href={doctor.profileUrl}>
                <button className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200">
                  View Profile
                </button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}
