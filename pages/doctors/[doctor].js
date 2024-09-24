import { useRouter } from 'next/router';
import Layout from '@components/Layout';
import { doctors } from '../../pages/data/doctorsData'; // Update the path to the new data file

export default function DoctorProfile({ doctor }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <Layout title={`${doctor.name} — Specialist Plus`} description={`Learn more about ${doctor.name}`}>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column (Image) */}
          <div className="flex justify-center">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="rounded-md object-cover min-w-full max-w-xs"
            />
          </div>

          {/* Right Column (Info) */}
          <div className="flex flex-col justify-start">
            <h1 className="text-3xl font-bold mb-4">{doctor.name}</h1>
            <p className="text-lg text-gray-500 mb-2">{doctor.title}</p>

            {/* Render the about content with line breaks */}
            <p
              className="text-md text-gray-700"
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
