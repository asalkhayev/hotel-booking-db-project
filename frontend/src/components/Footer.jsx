import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h3>STAYNEST</h3>
        <p>
          A semester database project with a polished booking interface,
          FastAPI backend, and PostgreSQL relational schema.
        </p>
      </div>

      <div className="footer-columns">
        <div>
          <h4>Project</h4>
          <Link to="/">Home</Link>
          <Link to="/hotels">Hotels</Link>
          <Link to="/bookings">Bookings</Link>
        </div>

        <div>
          <h4>Stack</h4>
          <span>React</span>
          <span>FastAPI</span>
          <span>PostgreSQL</span>
        </div>

        <div>
          <h4>Database</h4>
          <span>SQL schema</span>
          <span>DBML diagram</span>
          <span>Indexes & queries</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;