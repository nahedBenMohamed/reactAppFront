import { useRef, useReducer, useState } from 'react'
import reducer from './reducer'
import { pan, startPan, zoom } from './actions'

const usePanAndZoom = (position) => {
  const [state, dispatch] = useReducer(reducer, {
    translateX: -position.x,
    translateY: -position.y,
    prevMouseX: 0,
    prevMouseY: 0,
    scale: (1,1),
  });

  const containerRef = useRef(null);

  const onMouseMoveInWindow = (event) => {
    event.preventDefault();
    dispatch(pan(event));
  };

  const onMouseUpInWindow = () => {
    window.removeEventListener('mouseup', onMouseUpInWindow);
    window.removeEventListener('mousemove', onMouseMoveInWindow);
  };

  const onMouseDown = (event) => {
    dispatch(startPan(event));
    window.addEventListener('mouseup', onMouseUpInWindow);
    window.addEventListener('mousemove', onMouseMoveInWindow);
  }

  return {
    ...state,
    containerRef,
    onMouseDown
  }
}

export default usePanAndZoom
