import { cleanup, renderHook } from '@testing-library/react';
import { getBagItems } from '@farfetch/blackout-redux';
import { mockBagItem, mockInitialState } from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useAddOrUpdateBagItem } from '../..';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addBagItem: jest.fn(() => ({ type: 'add' })),
  updateBagItem: jest.fn(() => ({ type: 'update' })),
  getBagItems: jest.fn(() => [mockBagItem]),
}));

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => mockDispatch,
}));

const getRenderedHook = (state = mockInitialState) => {
  const {
    result: { current },
  } = renderHook(() => useAddOrUpdateBagItem(mockBagItem), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useAddOrUpdateBagItem', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual(expect.any(Function));
  });

  describe('handleAddOrUpdateItem', () => {
    it('should call handleAddOrUpdateItem and add item', async () => {
      getBagItems.mockImplementationOnce(() => []);
      const handleAddOrUpdateItem = getRenderedHook();

      await handleAddOrUpdateItem(mockBagItem);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });

    it('should call handleAddOrUpdateItem and update item', async () => {
      const handleAddOrUpdateItem = getRenderedHook();

      await handleAddOrUpdateItem({ ...mockBagItem, quantity: 6 });

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should update and then add when current merchant has less stock than new quantity', async () => {
      // Mock bag item has quantity 5
      // The respective merchants have 7 and 5 available
      const handleAddOrUpdateItem = getRenderedHook();

      await handleAddOrUpdateItem({
        quantity: 9,
        size: {
          ...mockBagItem.size,
          stock: [
            ...mockBagItem.size.stock,
            {
              merchantId: 213,
              quantity: 5,
            },
          ],
        },
      });

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });
  });
});
