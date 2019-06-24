import React from 'react';
import { Consumer } from './Context';
import GalleryItem from './GalleryItem';

const Gallery = ({ match }) => {

  return (
    <Consumer>
     {
       value => {
         let tag = match.params.tag;
         value.actions.handleFeatching(tag);

         let images = value.searchImages.map(images =>
           <GalleryItem
             url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
             key={images.id}
           />
         );

         return (
           <div className="photo-container">
             <h2>{ tag }</h2>
             <ul>
                { images }
             </ul>
           </div>
         );
       }
     }
    </Consumer>

  );
}

export default Gallery;
