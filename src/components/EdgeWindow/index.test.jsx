import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import EdgeWindow from './index';
import edgeData from '../../../test/fixtures/edgeWindowData';

let addEdgeDataMock;
let closeEdgeWindowMock;
let wrapper;
let utils;

beforeEach(() => {
  addEdgeDataMock = jest.fn();
  closeEdgeWindowMock = jest.fn();
  wrapper = (
    <EdgeWindow
      addEdgeData={addEdgeDataMock}
      closeEdgeWindow={closeEdgeWindowMock}
      edgeWindowData={edgeData}
    />
  );
  utils = render(wrapper);
});

test('should call addEdgeData method with default values', () => {
  const { getByRole } = utils;
  const button = getByRole('button', { name: 'Create' });

  userEvent.click(button);
  expect(addEdgeDataMock).toHaveBeenLastCalledWith(
    edgeData.from,
    edgeData.to,
    1,
    0,
  );
});

test('should call addEdgeData method with alt values', () => {
  const { getByLabelText, getByRole } = utils;
  const capacityInput = getByLabelText('Capacity');
  const flowInput = getByLabelText('Flow');
  const button = getByRole('button', { name: 'Create' });

  userEvent.type(capacityInput, '2');
  userEvent.type(flowInput, '1');
  userEvent.click(button);
  expect(addEdgeDataMock).toHaveBeenLastCalledWith(
    edgeData.from,
    edgeData.to,
    2,
    1,
  );
});
