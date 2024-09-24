import Slider from 'react-slick';
import Image from 'next/image';
import { doctors } from '../data/doctorsData'; // Import the shared doctors data
import Link from 'next/link';

export default function DoctorsCarousel() {
  // Carousel settings for the doctors section
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    customPaging: function (i) {
      return <div className="custom-dot"></div>;
    },
    dotsClass: 'slick-dots custom-dots', // Use a custom class for dots
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
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
              <div className="bg-white p-6 shadow-lg rounded-lg text-center flex flex-col justify-between min-h-[425px]">
                <div className="flex-grow">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    width={200}
                    height={200}
                    className="rounded-md min-w-full mb-4"
                  />
                  <h3 className="text-xl font-semibold mt-4">{doctor.name}</h3>
                  <p className="text-gray-600">{doctor.title}</p>
                  <p className="text-sm">{doctor.description}</p>
                </div>
                <Link href={doctor.profileUrl}>
                  <button className="mt-6 bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700 transition duration-200">
                    View Profile
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
