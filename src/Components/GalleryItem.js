import React from 'react';

// simple component that returns a list item with an image element inside of it
const GalleryItem = (props) => {
  return (
    <li>
      <img src={props.url} alt="" />
    </li>
  );
}

export default GalleryItem;
