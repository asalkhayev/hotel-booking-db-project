import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

import LoginModal from "./LoginModal";

function Header() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("currentUser");

    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }
  }, []);

  function handleLogout() {
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
  }

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <Link className="brand" to="/">
            <span>ARANGA</span>Trip
          </Link>

          <nav className="main-nav">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/hotels">Hotels</NavLink>
            <NavLink to="/bookings">Bookings</NavLink>
            <NavLink to="/admin">Admin</NavLink>
          </nav>

          <div className="header-actions">
            {currentUser ? (
              <>
                <span className="user-chip">
                  {currentUser.full_name}
                </span>
                <button className="ghost-button" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <button
                className="ghost-button"
                onClick={() => setIsLoginOpen(true)}
              >
                Login
              </button>
            )}

            <Link className="dark-button" to="/hotels">
              Explore Hotels
            </Link>
          </div>
        </div>
      </header>

      <LoginModal
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={setCurrentUser}
      />
    </>
  );
}

export default Header;