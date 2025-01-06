import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const NavBar = () => (
  <nav className="navbar">
    <Link to="/">Библиотека</Link>
    <Link to="/favorites">Избранные</Link>
    <Link to="/logout">Выйти</Link>
  </nav>
);

export default NavBar;
