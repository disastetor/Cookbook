import { Link } from "react-router-dom";
import React from "react";

//Style
import "./Navbar.css";
import { SearchBar } from "./SearchBar";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
  //Destructuring themecontext
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1>Disa's recipe book</h1>
        </Link>
        <SearchBar />
        <Link to="/create">Create recipe</Link>
      </nav>
    </div>
  );
}

export default Navbar;
