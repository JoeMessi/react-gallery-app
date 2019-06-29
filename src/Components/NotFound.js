import React from 'react';

// a simple 404 error component displayed only when the user navigate to a non-existing route 
const NotFound = () => {
  return(
    <ul>
      <li className="not-found">
        <h2>404</h2>
        <p>Whoops! Looks like something went wrong</p>
      </li>
    </ul>
  );
}

export default NotFound;
