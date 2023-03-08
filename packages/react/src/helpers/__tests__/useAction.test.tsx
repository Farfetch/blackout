import { Action } from '../__fixtures__/Action.fixtures.js';
import { fireEvent } from '@testing-library/react';
import { wrap } from '../../../tests/helpers/index.js';
import React from 'react';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('useAction', () => {
  it('should call the action', () => {
    const mockAction = jest.fn();
    const { getByTestId } = wrap(<Action mockAction={mockAction} />).render();

    fireEvent.click(getByTestId('button'));

    expect(mockAction).toHaveBeenCalledTimes(1);
  });
});
