import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import { doctors } from '../../data/doctorsData';

export default function DoctorProfile({ doctor }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  // A helper function for the back button
  const handleBackClick = () => {
    /**
     * If we came from the doctors page (query.from === 'doctors'),
     * then push back to that page with the saved scroll position (query.pos).
     *
     * Otherwise, just go to /doctors normally.
     */
    if (router.query.from === 'doctors' && router.query.pos) {
      router.push({
        pathname: '/doctors',
        query: { pos: router.query.pos },
      });
    } else {
      router.push('/doctors');
    }
  };

  return (
    <Layout
      title={`${doctor.name} — Specialist Plus`}
      description={`Learn more about ${doctor.name}`}
    >
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 xl:max-w-8xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={handleBackClick}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 transition"
          >
            &larr; Back to Doctors
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:gap-12 gap-8">
          {/* Left Column (Image) */}
          <div className="flex justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-lg object-cover w-full max-w-md xl:max-w-lg"
            />
          </div>

          {/* Right Column (Info) */}
          <div className="flex flex-col justify-start xl:text-lg">
            <h1 className="text-4xl font-bold mb-6 xl:text-5xl">{doctor.name}</h1>
            <p className="text-lg text-gray-500 mb-4 xl:mb-6">{doctor.title}</p>

            <p
              className="text-md text-gray-700 xl:text-lg"
              dangerouslySetInnerHTML={{ __html: doctor.about }}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = doctors.map((doctor) => ({
    params: { doctor: doctor.profileUrl.split('/').pop() }, // e.g. "dr-poh-yong"
  }));

  return {
    paths,
    fallback: true,
  };
}

export async function getStaticProps({ params }) {
  const doctor = doctors.find(
    (doc) => doc.profileUrl.split('/').pop() === params.doctor
  );

  if (!doctor) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      doctor,
    },
  };
}
