import Gca from 'gca';
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Tools from './Tools';
import GraphContext from '../../contexts/graph';

const tools = new Gca();
let changeModeMock;
let resetMock;

const isGraphInInitiatedStateMock = () => true;

const renderComponent = (mode = 'none') => {
  const component = (
    <GraphContext.Provider value={{
      graph: tools.CreateFlowGraph(),
      graphDispatch: () => {},
    }}
    >
      <Tools
        changeMode={changeModeMock}
        isGraphInInitiatedState={isGraphInInitiatedStateMock}
        mode={mode}
        reset={resetMock}
      />
    </GraphContext.Provider>
  );

  render(component);
};

const getButtons = (mode = 'none') => {
  renderComponent(mode);

  const nodeButton = screen.getByRole('button', { name: 'Node' });
  const resetButton = screen.getByRole('button', { name: 'Reset' });
  const stopButton = screen.getByRole('button', { name: 'Stop' });
  const undoButton = screen.getByRole('button', { name: 'Undo' });

  return {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  };
};

beforeEach(() => {
  changeModeMock = jest.fn();
  resetMock = jest.fn();
});

test('should handle none mode', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('none');

  expect(nodeButton).toBeEnabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeDisabled();
  expect(undoButton).toBeDisabled();
});

test('should handle new edge click', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('new-edge');

  expect(nodeButton).toBeDisabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeEnabled();
  expect(undoButton).toBeDisabled();
});

test('should handle new node click', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('new-node');

  userEvent.click(nodeButton);
  expect(nodeButton).toBeDisabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeEnabled();
  expect(undoButton).toBeDisabled();
});

test('should handle reset click', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('reset');

  userEvent.click(resetButton);
  expect(nodeButton).toBeEnabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeDisabled();
  expect(undoButton).toBeDisabled();
});

test('should handle stop click', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('stop');

  userEvent.click(stopButton);
  expect(nodeButton).toBeEnabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeDisabled();
  expect(undoButton).toBeDisabled();
});

test('should handle undo click', () => {
  const {
    nodeButton,
    resetButton,
    stopButton,
    undoButton,
  } = getButtons('undo');

  userEvent.click(undoButton);
  expect(nodeButton).toBeEnabled();
  expect(resetButton).toBeDisabled();
  expect(stopButton).toBeDisabled();
  expect(undoButton).toBeDisabled();
});
