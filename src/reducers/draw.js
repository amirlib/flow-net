const drawReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EDGE':
      state.addEdge(action.from, action.to);

      return state;
    case 'ADD_EDGE_DATA':
      return addEdgeData(state, action);
    case 'ADD_NODE':
      state.addNode(action.id);

      return state;
    case 'DELETE_EDGE':
      state.deleteEdge(action.from, action.to);

      return state;
    case 'DELETE_NODE':
      state.deleteNode(action.id);

      return state;
    case 'RESET':
      return action.graph;
    default:
      return state;
  }
};

export default drawReducer;
