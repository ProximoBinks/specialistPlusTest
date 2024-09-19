// components/DoctorsCarousel.js
import Slider from 'react-slick';
import Image from 'next/image';

export default function DoctorsCarousel() {
  // Array of doctor data
  const doctors = [
    {
      id: 1,
      name: 'Dr Poh Yong',
      title: 'Director',
      description: 'Dr Poh Yong oversees the management of the clinic and providers.',
      image: '/doctor1.jpg',
    },
    {
      id: 2,
      name: 'Dr Dion Suyapto',
      title: 'Occupational Physician',
      description: 'Specialist in occupational and environmental medicine.',
      image: '/doctor2.jpg',
    },
    {
      id: 3,
      name: 'Dr Arun Gupta',
      title: 'Consultant Psychiatrist',
      description: 'Special interest in Independent Psychiatric Examinations.',
      image: '/doctor3.jpg',
    },
    {
      id: 4,
      name: 'Dr Joshua Kartika',
      title: 'Occupational Medical Registrar',
      description: 'Registrar in occupational and environmental medicine.',
      image: '/doctor4.jpg',
    },
    {
      id: 5,
      name: 'Dr Bill Papps',
      title: 'Occupational Medical Registrar',
      description: 'Completed Bachelor of Laws and Graduate Diploma in Legal Practice.',
      image: '/doctor5.jpg',
    },
    {
      id: 6,
      name: 'Mr Gilles Hammond',
      title: 'Rehabilitation Psychologist',
      description: 'Expert in trauma and occupational psychology.',
      image: '/doctor6.jpg',
    },
    {
      id: 7,
      name: 'Dr Ishita Gupta',
      title: 'General Dentist',
      description: 'Registered dentist in Australia since 2016.',
      image: '/doctor7.jpg',
    },
    {
      id: 8,
      name: 'Dr Aiden Tieu',
      title: 'General Surgeon',
      description: 'Specialist in open and laparoscopic surgery.',
      image: '/doctor8.jpg',
    },
    {
      id: 9,
      name: 'Dr Cecilia Yong',
      title: 'General Dentist',
      description:
        'Experienced in both clinical dentistry and medico-legal assessments.',
      image: '/doctor9.jpg',
    },
    {
      id: 10,
      name: 'Dr Devinder Raju',
      title: 'Colorectal and General Surgeon',
      description:
        'Specialist in colorectal cancer and inflammatory bowel disease.',
      image: '/doctor10.jpg',
    },
  ];

  // Carousel settings for the doctors section
  const sliderSettings = {
    dots: true, // Keep dots here
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000, // Faster autoplay speed
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          // Removed dots from responsive settings
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          // Removed dots from responsive settings
        },
      },
    ],
  };

  return (
    <section className="py-12 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-8">Meet Our Doctors</h2>
      <div className="max-w-6xl mx-auto">
        <Slider {...sliderSettings}>
          {doctors.map((doctor) => (
            <div key={doctor.id} className="p-4">
              <div className="bg-white p-6 shadow-lg rounded-lg text-center">
                <Image
                  src={doctor.image}
                  alt={doctor.name}
                  width={200}
                  height={200}
                  className="rounded-full mx-auto"
                />
                <h3 className="text-xl font-semibold mt-4">{doctor.name}</h3>
                <p className="text-gray-600">{doctor.title}</p>
                <p className="text-sm">{doctor.description}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
