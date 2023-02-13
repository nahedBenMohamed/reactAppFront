import React from 'react';
import usePanAndZoom from './usePanAndZoom/usePanAndZoom';

const PanAndZoomImage = ({ src, position }) => {
  const {
    containerRef,
    onMouseDown,
    onWheel,
    translateX,
    translateY,
    scale,
  } = usePanAndZoom(position);
  return (
    <div
      className="Image-container"
      ref={containerRef}
      onMouseDown={onMouseDown}
      onWheel={onWheel}
    >
      <div
        style={{
          cursor:"grab",
          transition:'.1s',
          transform: `translate(${translateX}px, ${translateY}px) scale(${scale})`,
        }}
      >
        <img
          className="Image-image"
          alt="panable-and-zoomable"
          src={src}
        />
      </div>
    </div>
  );
};

export default PanAndZoomImage;
