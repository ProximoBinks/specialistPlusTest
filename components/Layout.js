// components/Layout.js
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head className="z-50">
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header title="Welcome to my app!" />

      <main className="flex-grow w-full pt-[60px] xl:pt-[100px]"> {/* Added padding-top here */}
        {children}
      </main>

      <Footer />
    </div>
  )
}
