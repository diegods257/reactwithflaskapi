import React from "react";

export const Navbar = () => (
  <nav className="flex h-24 w-full items-center justify-around bg-sky-500">
    <div className="navbar" style={{ fontWeight: "bold", color: "black" }}>
      Registro de asignaturas
    </div>

    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <div className="nav-link" to="/about">
            About
          </div>
        </li>
      </ul>
    </div>
  </nav>
);
