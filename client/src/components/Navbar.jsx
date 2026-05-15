import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">
        Quiz<span>Master</span>
      </h1>

      <div className="nav-links">
        <a href="/">Home</a>
        <a href="/">About</a>

        <Link to="/login">Login</Link>

        <Link to="/signup">Signup</Link>

        <a href="/">Contact</a>
      </div>
    </nav>
  );
}

export default Navbar;