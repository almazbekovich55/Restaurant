import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./sellerCarousel.scss";
import arrowRight from "../../../assets/Images/arrowRight.svg";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const SellerCarousels = ({ photos, photoIndex, setPhotoIndex }) => {
  const handleNext = () => {
    if (photoIndex + 2 < photos.length) {
      setPhotoIndex(photoIndex + 2);
    }
  };

  const handlePrev = () => {
    if (photoIndex - 2 >= 0) {
      setPhotoIndex(photoIndex - 2);
    }
  };

  return (
    <div className="carousel">
      <button
        onClick={handlePrev}
        disabled={photoIndex === 0}
        className="arrow-button"
      ></button>

      <div className="carousel-images-wrapper">
        <AnimatePresence mode="wait">
          <motion.div
            key={photoIndex}
            className="carousel-images"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -100, opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            {photos.slice(photoIndex, photoIndex + 2).map((photo) => (
              <div className="image-wrapper" key={photo.id}>
                <Zoom>
                  <img
                    src={photo.image}
                    alt="food"
                    loading="lazy"
                    className="carousel-image"
                  />
                </Zoom>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        onClick={handleNext}
        disabled={photoIndex + 2 >= photos.length}
        className="arrow-button"
      >
        <img src={arrowRight} alt="Next" />
      </button>
    </div>
  );
};

export default SellerCarousels;
