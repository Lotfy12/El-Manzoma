
import { useState } from "react";
import { Link } from "react-router-dom";
import "./navBar.css";

function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLinkClick = () => {
    setMenuOpen(false); // إغلاق القائمة عند النقر على رابط
  };

  return (
    <header>
      <nav className="navbar">
        <div className="navbar-title">مركز 294</div>

        <button
          className="navbar-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          ☰
        </button>

        <ul className={`navbar-links ${menuOpen ? "open" : ""}`}>
          <li>
            <Link to="/" onClick={handleLinkClick}>عنّا</Link>
          </li>
          <li>
            <Link to="/equipments" onClick={handleLinkClick}>معدات</Link>
          </li>
          <li>
            <Link to="/vehicles" onClick={handleLinkClick}>عرض المركبات</Link>
          </li>
          <li>
            <Link to="/faxes" onClick={handleLinkClick}>عرض الفاكسات</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default NavBar;
