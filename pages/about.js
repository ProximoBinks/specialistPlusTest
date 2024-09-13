// pages/about.js
import Layout from '@components/Layout'

export default function About() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">About Us</h1>
        <p className="mb-4">
          Welcome to Specialist Plus! We are dedicated to providing top-notch services to help you achieve your goals. Our team of experts is here to guide you through every step of your journey.
        </p>
        <p className="mb-4">
          Our mission is to deliver excellence in every aspect of our work, ensuring that our clients receive the best possible experience. We believe in building long-lasting relationships with our clients based on trust, integrity, and mutual respect.
        </p>
        <p className="mb-4">
          At Specialist Plus, we offer a wide range of services tailored to meet your specific needs. Whether you're looking for professional development, personal growth, or specialised services, we have something for everyone.
        </p>
        <p className="mb-4">
          Thank you for choosing Specialist Plus. We look forward to working with you and helping you achieve your dreams.
        </p>
      </div>
    </Layout>
  )
}
