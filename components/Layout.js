// components/Layout.js
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Layout({ children, title = "Specialist Plus", description = "Comprehensive medical care at Specialist Plus" }) {
  return (
    <div className="w-full min-h-screen flex flex-col">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Header />

      <main className="flex-grow w-full pt-[60px] xl:pt-[95px] z-0"> {/* Added padding-top here */}
        {children}
      </main>

      <Footer />
    </div>
  )
}
