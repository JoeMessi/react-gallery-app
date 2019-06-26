import React from 'react';
import SearchForm from './SearchForm';
import Nav from './Nav';

// Header is a simple stateless component, it has the 'SearchForm' component in it
// and it's used to move down props from the App to the SearchForm component
const Header = (props) => {
  return (
    <header>
       <h1>A React Gallery App</h1>
       <SearchForm
         handleFeatching={props.handleFeatching}
         history={props.history} />
       <Nav />
    </header>
  );
}

export default Header;
