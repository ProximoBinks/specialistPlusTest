// pages/_app.js
import '../styles/globals.css';
import 'slick-carousel/slick/slick.css'; // Import slick-carousel CSS
import 'slick-carousel/slick/slick-theme.css'; // Import slick-carousel theme CSS

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
