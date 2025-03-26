import React from "react";
import { NavLink } from "react-router-dom";
import "./header.scss";

const Header = () => {
  return (
    <header>
      {/* Logo */}
      <h2>Başvuru Takip</h2>
      {/* Navigation */}
      <nav>
        <NavLink to="/">Başvuru Listesi</NavLink>
        <NavLink to="/create">Başvuru Ekle</NavLink>
      </nav>
    </header>
  );
};

export default Header;
