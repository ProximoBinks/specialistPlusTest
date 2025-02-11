import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Layout from '@components/Layout';
import { doctors } from '../data/doctorsData';

export default function Doctors() {
  const router = useRouter();

  /**
   * If we arrived at /doctors?pos=<number>, scroll to that position
   * after this page has rendered.
   */
  useEffect(() => {
    if (router.query.pos) {
      const scrollPos = parseInt(router.query.pos, 10);
      if (!isNaN(scrollPos)) {
        window.scrollTo({ top: scrollPos, behavior: 'instant' });
      }
    }
  }, [router.query.pos]);

  /**
   * Because we need to store the scroll position at the moment the user
   * clicks a link (rather than at render time), we'll do a custom navigation
   * using router.push instead of a plain <Link>.
   */
  const handleDoctorClick = (doctor) => {
    // Current scroll position
    const scrollPos = window.scrollY || 0;

    // Navigate to the doctor's page, passing along
    // where we came from and the scroll position
    router.push({
      pathname: doctor.profileUrl,
      query: { from: 'doctors', pos: scrollPos },
    });
  };

  return (
    <Layout
      title="Meet Our Doctors — Specialist Plus"
      description="Discover the team of experienced doctors at Specialist Plus, dedicated to providing expert medical care across multiple specialties."
      keywords="doctors, specialist plus providers, medical team, specialist care, healthcare professionals"
      ogImage="/doctors-og-image.jpg"
    >
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">
          Meet Our <span className="text-red-500">Providers</span>
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center"
            >
              {/* Use onClick to capture scroll position */}
              <div
                onClick={() => handleDoctorClick(doctor)}
                className="cursor-pointer"
              >
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="rounded-md object-cover mb-4 hover:opacity-90 transition duration-200"
                />
              </div>

              <h2 className="text-xl font-semibold mb-2">{doctor.name}</h2>
              <p className="text-md text-gray-500">{doctor.title}</p>
              <p className="mt-4 text-gray-600">{doctor.description}</p>

              {/* Button also triggers the same function */}
              <button
                onClick={() => handleDoctorClick(doctor)}
                className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200"
              >
                View Profile
              </button>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}