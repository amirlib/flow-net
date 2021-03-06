const addEdge = (graph, { from, to }) => {
  graph.addEdge(from, to);

  return graph;
};

const addNode = (graph, id) => {
  graph.addNode(id);

  return graph;
};

const deleteEdge = (graph, { from, to }) => {
  graph.deleteEdge(from, to);

  return graph;
};

const deleteNode = (graph, id) => {
  graph.deleteNode(id);

  return graph;
};

const updateEdge = (
  graph,
  {
    from,
    to,
    capacity,
    flow,
  },
) => {
  const edge = graph.getEdge(from, to);

  edge.changeCapacityTo(capacity);
  edge.changeFlowTo(flow);

  return graph;
};

const graphReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EDGE':
      return addEdge(state.clone(), action);
    case 'ADD_NODE':
      return addNode(state.clone(), action.id);
    case 'DELETE_EDGE':
      return deleteEdge(state.clone(), action);
    case 'DELETE_NODE':
      return deleteNode(state.clone(), action.id);
    case 'RESET':
      return action.graph;
    case 'UPDATE_EDGE':
      return updateEdge(state.clone(), action);
    default:
      return state;
  }
};

export default graphReducer;
