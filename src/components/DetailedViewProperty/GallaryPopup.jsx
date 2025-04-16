import React, { useState } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const GallaryPopup = ({ data ,GallaryView,setGallaryView}) => {
  const [index, setIndex] = useState(0);

  const currentImage = data[index];
  const nextIndex = (index + 1) % data.length;
  const prevIndex = (index + data.length - 1) % data.length;

  const handleClose = () => {
    setIndex(-1);
    setGallaryView(false); // Close the gallery view
  };  const handleMovePrev = () => setIndex(prevIndex);
  const handleMoveNext = () => setIndex(nextIndex);

  return (
    <div >
      
      {!!currentImage && (
        <div className="lightbox-wrapper">
          
          <Lightbox
            mainSrc={currentImage.original}
            mainSrcThumbnail={currentImage.original}
            nextSrc={data[nextIndex].original}
            nextSrcThumbnail={data[nextIndex].original}
            prevSrc={data[prevIndex].original}
            prevSrcThumbnail={data[prevIndex].original}
            onCloseRequest={handleClose}
            onMovePrevRequest={handleMovePrev}
            onMoveNextRequest={handleMoveNext}
          />
        </div>
      )}
    </div>
  );
};

export default GallaryPopup;
