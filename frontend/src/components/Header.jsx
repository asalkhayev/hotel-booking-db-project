import { Link, NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" to="/">
          <span>STAY</span>NEST
        </Link>

        <nav className="main-nav">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/hotels">Hotels</NavLink>
          <NavLink to="/bookings">Bookings</NavLink>
          <NavLink to="/admin">Admin</NavLink>
        </nav>

        <div className="header-actions">
          <button className="ghost-button">Login</button>
          <button className="dark-button">Sign up</button>
        </div>
      </div>
    </header>
  );
}

export default Header;