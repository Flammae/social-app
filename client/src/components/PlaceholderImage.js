import React from "react";

const PlaceholderImage = ({ placeholderSrc, currentSrc, uploadSrc }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${uploadSrc || currentSrc || placeholderSrc})`
      }}
      className="placeholder-image"
    />
  );
};

export default PlaceholderImage;
