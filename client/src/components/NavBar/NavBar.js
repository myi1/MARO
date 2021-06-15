import React from "react";
import "./NavBar.scss";
import logo from "../../assets/logo/logo.png";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav className='nav'>
      <NavLink to='/'>
        <img src={logo} alt='logo' className='nav__logo' />
      </NavLink>
      <div className='nav__link-container'>
        <NavLink
          className='nav__link'
          to='/gallery'
          activeClassName='nav__link--active'>
          Gallery
        </NavLink>
        <NavLink
          className='nav__link'
          to='/favorites'
          activeClassName='nav__link--active'>
          Favorites
        </NavLink>
      </div>
    </nav>
  );
}

export default NavBar;
