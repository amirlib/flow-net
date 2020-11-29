import Gca from 'gca';
import {
  addEdge,
  addEdgeData,
  addNode,
  deleteEdge,
  deleteNode,
  reset,
} from '../../src/actions/graph';

const tool = new Gca();

test('should setup new edge object', () => {
  const from = 0;
  const to = 1;
  const action = addEdge(from, to);

  expect(action).toEqual({
    from,
    to,
    type: 'ADD_EDGE',
  });
});

test('should setup new edge data object', () => {
  const from = 0;
  const to = 1;
  const capacity = 2;
  const flow = 1;
  const action = addEdgeData(from, to, capacity, flow);

  expect(action).toEqual({
    from,
    to,
    capacity,
    flow,
    type: 'ADD_EDGE_DATA',
  });
});

test('should setup new node object', () => {
  const id = 2;
  const action = addNode(id);

  expect(action).toEqual({
    id,
    type: 'ADD_NODE',
  });
});

test('should setup remove edge object', () => {
  const from = 0;
  const to = 1;
  const action = deleteEdge(from, to);

  expect(action).toEqual({
    from,
    to,
    type: 'DELETE_EDGE',
  });
});

test('should setup remove node object', () => {
  const id = 2;
  const action = deleteNode(id);

  expect(action).toEqual({
    id,
    type: 'DELETE_NODE',
  });
});

test('should setup reset object', () => {
  const graph = tool.CreateFlowGraph();
  const action = reset();

  expect(action).toEqual({
    graph,
    type: 'RESET',
  });
});
