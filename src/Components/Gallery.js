import React from 'react';
import GalleryItem from './GalleryItem';

const Gallery = (props) => {
  // mapping over the items of the data passed as props to the Gallery component
  // it returns a GalleryItem component for each item mapped
  let images = props.data.map(images =>
     <GalleryItem
       url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
       key={images.id}
     />
   );

   return (
     <div className="photo-container">
       {/* ternary operator that checks if the data object passed as props have items in it */}
       <h2>{ (props.data.length === 0 && props.match) ? 'Sorry no match found!' : props.results }</h2>
       <ul>
          { images }
       </ul>
     </div>
   );

}

export default Gallery;
