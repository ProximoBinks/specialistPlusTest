import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import { doctors } from '../../data/doctorsData'; // Update the path to the new data file

export default function DoctorProfile({ doctor }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`${doctor.name} — Specialist Plus`} description={`Learn more about ${doctor.name}`}>
      <div className="max-w-7xl mx-auto py-16 px-6 sm:px-8 lg:px-12 xl:max-w-8xl">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/doctors')}
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

            {/* Render the about content with line breaks */}
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
    params: { doctor: doctor.profileUrl.split('/').pop() }, // Extract doctor slug from the URL
  }));

  return {
    paths,
    fallback: true, // Enable fallback to handle new doctors dynamically
  };
}

export async function getStaticProps({ params }) {
  const doctor = doctors.find((doc) => doc.profileUrl.split('/').pop() === params.doctor);

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
