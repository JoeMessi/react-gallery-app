import React from 'react';
import GalleryItem from './GalleryItem';

const Gallery = (props) => {

  let images = props.data.map(images =>
     <GalleryItem
       url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
       key={images.id}
     />
   );

   return (
     <div className="photo-container">
       <h2>{ (props.data.length === 0 && props.match) ? 'Sorry no match found!' : props.results }</h2>
       <ul>
          { images }
       </ul>
     </div>
   );

}

export default Gallery;
