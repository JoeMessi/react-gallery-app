import React from 'react';

// creating a context obj
const GalleryContext = React.createContext();

// storing and exporting Provider and Consumer
export const Provider = GalleryContext.Provider;

export const Consumer = GalleryContext.Consumer;
