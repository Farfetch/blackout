import { cleanup, renderHook } from '@testing-library/react';
import {
  mockBagItem,
  mockBagItemId,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/bags';
import { mockStore } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { useBagItem } from '../..';
import React from 'react';

jest.mock('@farfetch/blackout-redux', () => ({
  ...jest.requireActual('@farfetch/blackout-redux'),
  addBagItem: jest.fn(() => ({ type: 'add' })),
  removeBagItem: jest.fn(() => ({ type: 'delete' })),
  updateBagItem: jest.fn(() => ({ type: 'update' })),
  getBagItem: jest.fn(() => mockBagItem),
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
  } = renderHook(() => useBagItem(mockBagItemId), {
    wrapper: props => <Provider store={mockStore(state)} {...props} />,
  });

  return current;
};

describe('useBagItem', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly with initial state', () => {
    const current = getRenderedHook();

    expect(current).toStrictEqual({
      bagItem: expect.any(Object),
      deleteBagItem: expect.any(Function),
      error: undefined,
      handleDeleteBagItem: expect.any(Function),
      handleFullUpdate: expect.any(Function),
      handleQuantityChange: expect.any(Function),
      handleSizeChange: expect.any(Function),
      isLoading: undefined,
      updateBagItem: expect.any(Function),
    });
  });

  it('should render in loading state', () => {
    const { isLoading } = getRenderedHook(mockLoadingState);

    expect(isLoading).toBe(
      mockLoadingState.bag.items.item.isLoading[mockBagItemId],
    );
  });

  it('should render in error state', () => {
    const { error } = getRenderedHook(mockErrorState);

    expect(error).toEqual(mockErrorState.bag.items.item.error[mockBagItemId]);
  });

  describe('actions', () => {
    const mockData = {};

    it('should call `delete` action', () => {
      const { deleteBagItem } = getRenderedHook();

      deleteBagItem(mockBagItemId, mockData);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'delete' });
    });

    it('should call `update` action', () => {
      const { updateBagItem } = getRenderedHook();

      updateBagItem(mockBagItemId, mockData);

      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });
  });

  describe('handleQuantityChange', () => {
    it('should update when quantity is less than before', async () => {
      // Mock bag item has qty 5 defined
      const newQuantity = 1;
      const { handleQuantityChange } = getRenderedHook();

      await handleQuantityChange(newQuantity);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should update when there is enough stock for the current merchant', async () => {
      // Mock bag item has quantity 5
      // The respective merchant has 7 qty available
      const newQuantity = 6;
      const { handleQuantityChange } = getRenderedHook();

      await handleQuantityChange(newQuantity);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should update and then add when current merchant have less stock than new quantity', async () => {
      // Mock bag item has quantity 5
      // The respective merchant has 7 qty available
      const newQuantity = 12;
      const { handleQuantityChange } = getRenderedHook();

      await handleQuantityChange(newQuantity);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });
  });

  describe('handleSizeChange', () => {
    it('should only update when actual merchant have the same quantity as the size', async () => {
      // Mock bag item has quantity 5
      // The new size has one merchant, with quantity 2
      const newSize = 2;
      const { handleSizeChange } = getRenderedHook();

      await handleSizeChange(newSize);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should delete the old merchant and add the new size in the respective merchant', async () => {
      // Mock bag item has quantity 5
      // The size id 3 the merchant: { merchantId: 333, quantity: 2 }
      const newSize = 3;
      const { handleSizeChange } = getRenderedHook();

      await handleSizeChange(newSize);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'delete' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });

    it('should update when actual merchant does not have same size', async () => {
      const newSize = 4;
      const { handleSizeChange } = getRenderedHook();

      await handleSizeChange(newSize);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should only update when the merchant only has one quantity', async () => {
      // Mock bag item has quantity 5
      // The new size has one merchant, with one quantity
      const newSize = 7;
      const { handleSizeChange } = getRenderedHook();

      await handleSizeChange(newSize);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should update and add when there are more merchants and more quantity to handle', async () => {
      // Mock bag item has quantity 5
      // The new size has two merchants
      //   - Quantity 1 for the first merchant
      //   - Quantity 2 - for the second merchant
      const newSize = 8;
      const { handleSizeChange } = getRenderedHook();

      await handleSizeChange(newSize);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });
  });

  describe('handleFullUpdate', () => {
    // Size with the id 5 has 3 merchants:
    // 1st - 0 quantity
    // 2nd - 2 quantity
    // 3rd - 4 quantity
    it('should update size and quantity of bag item', async () => {
      const newSize = 5;
      const newQty = 2;
      const { handleFullUpdate } = getRenderedHook();

      await handleFullUpdate(newSize, newQty);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
    });

    it('should update and add the remaining quantity to other merchant', async () => {
      const newSize = 5;
      const newQty = 5;
      const { handleFullUpdate } = getRenderedHook();

      await handleFullUpdate(newSize, newQty);

      expect(mockDispatch).toHaveBeenCalledTimes(2);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'update' });
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'add' });
    });
  });

  describe('handleDeleteBagItem', () => {
    it('should delete a bag item', async () => {
      const { handleDeleteBagItem } = getRenderedHook();

      await handleDeleteBagItem();

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(mockDispatch).toHaveBeenCalledWith({ type: 'delete' });
    });
  });
});
