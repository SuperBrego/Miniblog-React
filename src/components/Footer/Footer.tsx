import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
        <h3>Aplicação desenvolvida para aprender React</h3>
        <p>Mini Blog &copy; 2024</p>
    </footer>
  )
}

export default Footer