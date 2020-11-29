import * as utils from '../utils';

export const addElement = (element) => ({
  element,
  type: 'ADD_ELEMENT',
});

export const removeLastElement = () => ({
  type: 'REMOVE_LAST_ELEMENT',
});

export const reset = () => ({
  draw: utils.getDefaultDraw(),
  type: 'RESET',
});

export const setEdgeEndNode = (id) => ({
  id,
  type: 'SET_EDGE_END_NODE',
});

export const updateLastElementCoordinates = (coorX, coorY) => ({
  coorX,
  coorY,
  type: 'UPDATE_LAST_ELEMENT_COORDINATES',
});
