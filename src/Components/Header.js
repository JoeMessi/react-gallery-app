import React from 'react';
import SearchForm from './SearchForm';
import Nav from './Nav';


const Header = (props) => {
  return (

      <header>
         <h1>A React Gallery App</h1>
         <SearchForm props={props} />
         <Nav />
      </header>

  );
}

export default Header;
