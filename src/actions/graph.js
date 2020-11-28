import Gca from 'gca';

const tool = new Gca();

export const addEdge = (from, to) => ({
  from,
  to,
  type: 'ADD_EDGE',
});

export const addEdgeData = (from, to, capacity, flow) => ({
  from,
  to,
  capacity,
  flow,
  type: 'ADD_EDGE_DATA',
});

export const addNode = (id) => ({
  id,
  type: 'ADD_NODE',
});

export const deleteEdge = (from, to) => ({
  from,
  to,
  type: 'DELETE_EDGE',
});

export const deleteNode = (id) => ({
  id,
  type: 'DELETE_NODE',
});

export const reset = () => ({
  graph: tool.CreateFlowGraph(),
  type: 'RESET',
});
