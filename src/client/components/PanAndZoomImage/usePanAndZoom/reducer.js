import { types } from './actions';

const reducer = (state, action) => {
  switch(action.type) {
    case types.PAN_START:
      return {
        ...state,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };

    case types.PAN:
      const deltaMouseX = action.clientX - state.prevMouseX;
      const deltaMouseY = action.clientY - state.prevMouseY;
      var x = state.translateX + deltaMouseX;
      var y = state.translateY + deltaMouseY;
      if ( x > 0 ) { x = 0 }
      if ( x < (document.body.clientWidth - 2400) ) { x = document.body.clientWidth - 2400}
      if ( y > 0 ) { y = 0 }
      if ( y < (document.body.clientHeight - 1686) ) { y = document.body.clientHeight - 1686}
      return {
        ...state,
        translateX: x,
        translateY: y,
        prevMouseX: action.clientX,
        prevMouseY: action.clientY,
      };

    case types.ZOOM:
      const scaledTranslate = getScaledTranslate(state, action.zoomFactor);
      const mousePositionOnScreen = { x: action.clientX, y: action.clientY };
      const zoomOffset = getZoomOffset(action.containerRect, mousePositionOnScreen, action.zoomFactor);
      return {
        ...state,
        scale: state.scale * action.zoomFactor,
        translateX: scaledTranslate.x + zoomOffset.x,
        translateY: scaledTranslate.y + zoomOffset.y,
      };

    default:
      return state;
  }
};

const getZoomOffset = (containerRect, mousePositionOnScreen, zoomFactor) => {
  const zoomOrigin = {
    x: mousePositionOnScreen.x - containerRect.left,
    y: mousePositionOnScreen.y - containerRect.top,
  }

  const currentDistanceToCenter = {
    x: containerRect.width / 2 - zoomOrigin.x,
    y: containerRect.height / 2 - zoomOrigin.y,
  };

  const scaledDistanceToCenter = {
    x: currentDistanceToCenter.x * zoomFactor,
    y: currentDistanceToCenter.y * zoomFactor,
  }
  const zoomOffset = {
    x: currentDistanceToCenter.x - scaledDistanceToCenter.x,
    y: currentDistanceToCenter.y - scaledDistanceToCenter.y,
  };
  return zoomOffset;
};

const getScaledTranslate = (state, zoomFactor) => ({
  x: state.translateX * zoomFactor,
  y: state.translateY * zoomFactor,
});

export default reducer;
