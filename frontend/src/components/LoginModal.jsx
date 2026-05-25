import { useEffect, useState } from "react";
import { createUser } from "../api";

function LoginModal({ isOpen, onClose, onLogin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => document.body.classList.remove("modal-open");
  }, [isOpen]);

  if (!isOpen) return null;

  async function handleSubmit(e) {
    e.preventDefault();

    const user = await createUser({
      full_name: fullName,
      email,
      phone,
    });

    localStorage.setItem("currentUser", JSON.stringify(user));

    onLogin(user);
    onClose();
  }

  return (
    <div className="modal-backdrop">
      <div className="login-modal">
        <button className="modal-close" onClick={onClose} type="button">
          ×
        </button>

        <p className="small-kicker modal-kicker">Welcome to ArangaTrip</p>
        <h2>Create your guest profile</h2>
        <p>Enter your details once, then use this profile for room bookings.</p>

        <form onSubmit={handleSubmit}>
          <label>
            Full name
            <input
              type="text"
              placeholder="Ayan Salkhayeva"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </label>

          <label>
            Email
            <input
              type="email"
              placeholder="ayan@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label>
            Phone
            <input
              type="text"
              placeholder="+491234567890"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </label>

          <button className="book-button" type="submit">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginModal;