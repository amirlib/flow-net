import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EdgeWindow from './index';
import edgeData from '../../../test/fixtures/edgeWindowData';

let addEdgeDataMock;
let closeEdgeWindowMock;
let component;

beforeEach(() => {
  addEdgeDataMock = jest.fn();
  closeEdgeWindowMock = jest.fn();
  component = (
    <EdgeWindow
      addEdgeData={addEdgeDataMock}
      closeEdgeWindow={closeEdgeWindowMock}
      edgeWindowData={edgeData}
    />
  );
});

test('should set capacity if valid input', () => {
  render(component);

  const capacity = 2;
  const input = screen.getByLabelText('Capacity');

  fireEvent.change(input, { target: { value: capacity } });
  expect(input.value).toBe(`${capacity}`);
});

test('should not set capacity if invalid input', () => {
  render(component);

  const capacity = 2.5;
  const input = screen.getByLabelText('Capacity');

  fireEvent.change(input, { target: { value: capacity } });
  expect(input.value).toBe('1');
});

test('should set flow if valid input', () => {
  render(component);

  const flow = 2;
  const input = screen.getByLabelText('Flow');

  fireEvent.change(input, { target: { value: flow } });
  expect(input.value).toBe(`${flow}`);
});

test('should not set flow if invalid input', () => {
  render(component);

  const flow = 2.5;
  const input = screen.getByLabelText('Flow');

  fireEvent.change(input, { target: { value: flow } });
  expect(input.value).toBe('0');
});

test('should call addEdgeData method with default values', () => {
  render(component);

  const button = screen.getByRole('button', { name: 'Create' });

  userEvent.click(button);
  expect(addEdgeDataMock).toHaveBeenLastCalledWith(
    edgeData.from,
    edgeData.to,
    1,
    0,
  );
});

test('should call addEdgeData method with alt values', () => {
  render(component);

  const capacityInput = screen.getByLabelText('Capacity');
  const flowInput = screen.getByLabelText('Flow');
  const button = screen.getByRole('button', { name: 'Create' });

  fireEvent.change(capacityInput, { target: { value: 2 } });
  fireEvent.change(flowInput, { target: { value: 1 } });
  userEvent.click(button);
  expect(addEdgeDataMock).toHaveBeenLastCalledWith(
    edgeData.from,
    edgeData.to,
    2,
    1,
  );
});
