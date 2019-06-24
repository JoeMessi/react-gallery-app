import React from 'react';
import { Consumer } from './Context';
import GalleryItem from './GalleryItem';

const Gallery = ({ match }) => {

  return (
    <Consumer>
     {
       value => {

         function mapping(data) {
           return  data.map(images =>
             <GalleryItem
               url={`https://farm${images.farm}.staticflickr.com/${images.server}/${images.id}_${images.secret}.jpg`}
               key={images.id}
             />
           );
         }

         let tag = match.params.tag;
         let images;

         if(tag === 'cats') {
           images = mapping(value.defaultCats);

         }else if(tag === 'dogs') {
           images = mapping(value.defaultDogs);

         }else if(tag === 'monkeys') {
           images = mapping(value.defaultMonkeys);

         }else {
           value.actions.handleFeatching(tag);
           images = mapping(value.searchImages);
         }

         return (
           <div className="photo-container">
             <h2>{ tag }</h2>
             <ul>
                {(value.loading) ? <p>Loading...</p> : images}

             </ul>
           </div>
         );
       }
     }
    </Consumer>

  );
}

export default Gallery;
