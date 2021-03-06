import React from 'react';
import { NavLink } from 'react-router-dom';

// a simple navigation component
// used to display our default data we fetched during componentDidMount
const Nav = () => {
  return (
      <nav className="main-nav">
        <ul>
          <li><NavLink to='/cats'>Cats</NavLink></li>
          <li><NavLink to='/dogs'>Dogs</NavLink></li>
          <li><NavLink to='/monkeys'>Monkeys</NavLink></li>
        </ul>
      </nav>
  );
}

export default Nav;
