// components/Layout.js
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Welcome to my app!" />

      <main className="flex-grow w-full">
        {children}
      </main>

      <Footer />
    </div>
  )
}
