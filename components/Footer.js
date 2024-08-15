import styles from './Footer.module.css'

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        <img src="/sp-logo.png" alt="Netlify Logo" className={styles.logo} />
      </footer>
    </>
  )
}
