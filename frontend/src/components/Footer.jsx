import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <h3>ARANGATRIP</h3>
        <p>
          ArangaTrip is a full-stack hotel booking platform built as a database
          course project with React, FastAPI, and PostgreSQL.
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