import '../Footer/footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <p className="footer-container">
        Виконано в{' '}
        <a
          className="link"
          href="https://prometheus.org.ua/"
          target="_blank"
          rel="noreferrer"
        >
          Prometheus
        </a>
        <span> © 2023</span>
      </p>
    </footer>
  );
}
