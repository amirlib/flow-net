const setEdgeEndNode = (draw, id) => {
  const lastElement = draw[draw.length - 1];

  lastElement.to.id = id;

  return draw;
};

const updateLastElementCoordinates = (draw, { coorX, coorY }) => {
  const lastElement = draw[draw.length - 1];

  switch (lastElement.type) {
    case 'edge':
      lastElement.to.coorX = coorX;
      lastElement.to.coorY = coorY;

      return draw;
    case 'node':
      lastElement.coorX = coorX;
      lastElement.coorY = coorY;

      return draw;
    default:
      return draw;
  }
};

const drawReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ELEMENT':
      return state.concat([action.element]);
    case 'REMOVE_LAST_ELEMENT':
      return state.slice(0, state.length - 1);
    case 'RESET':
      return action.draw;
    case 'SET_EDGE_END_NODE':
      return setEdgeEndNode(Array.from(state), action.id);
    case 'UPDATE_LAST_ELEMENT_COORDINATES':
      return updateLastElementCoordinates(Array.from(state), action);
    default:
      return state;
  }
};

export default drawReducer;
