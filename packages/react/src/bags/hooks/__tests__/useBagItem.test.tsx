import {
  addBagItem as addBagItemAction,
  getBagItem,
  removeBagItem as removeBagItemAction,
  updateBagItem as updateBagItemAction,
} from '@farfetch/blackout-redux/bags';
import { cleanup, fireEvent } from '@testing-library/react';
import {
  mockBagItem,
  mockBagItemId,
  mockErrorState,
  mockInitialState,
  mockLoadingState,
} from 'tests/__fixtures__/bags';
import { mockStore, wrap } from '../../../../tests/helpers';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { useBagItem } from '../..';
import React, { Fragment } from 'react';

jest.mock('@farfetch/blackout-redux/bags', () => ({
  ...jest.requireActual('@farfetch/blackout-redux/bags'),
  addBagItem: jest.fn(() => ({ type: 'add' })),
  removeBagItem: jest.fn(() => ({ type: 'delete' })),
  updateBagItem: jest.fn(() => ({ type: 'update' })),
  getBagItem: jest.fn(() => mockBagItem),
  getBagItems: jest.fn(() => [mockBagItem]),
}));

const booleanToText = boolean => (boolean ? 'yes' : 'no');
/* eslint-disable react/prop-types */
const BagItem = ({
  itemId,
  quantity,
  size,
}: {
  itemId: number;
  quantity?: number;
  size?: number;
}) => {
  const {
    addBagItem,
    deleteBagItem,
    error,
    handleAddOrUpdateItem,
    handleDeleteBagItem,
    handleFullUpdate,
    handleQuantityChange,
    handleSizeChange,
    isLoading,
    updateBagItem,
  } = useBagItem(itemId);

  if (isLoading) {
    return <span data-test="bagItem-loading">{booleanToText(isLoading)}</span>;
  }

  if (error) {
    return <span data-test="bagItem-error">{error}</span>;
  }

  return (
    <Fragment>
      <button data-test="bagItems-addButton" onClick={() => addBagItem({})}>
        add bag item request
      </button>
      <button
        data-test="bagItems-deleteButton"
        onClick={() => deleteBagItem(mockBagItemId)}
      >
        delete bag item request
      </button>
      <button
        data-test="bagItems-updateButton"
        onClick={() => updateBagItem(mockBagItemId, {})}
      >
        update bag item request
      </button>
      <button
        data-test="bagItems-handleAddOrUpdateButton"
        onClick={() => handleAddOrUpdateItem({ quantity })}
      >
        handle add/update bag item
      </button>
      <button
        data-test="bagItems-handleQuantityButton"
        onClick={() => handleQuantityChange(quantity)}
      >
        handle bag item quantity change
      </button>
      <button
        data-test="bagItems-handleSizeButton"
        onClick={() => handleSizeChange(size)}
      >
        handle bag item size change
      </button>
      <button
        data-test="bagItems-handleSizeQuantityButton"
        onClick={() => handleFullUpdate(size, quantity)}
      >
        handle bag item size and quantity change
      </button>
      <button
        data-test="bagItems-handleDeleteButton"
        onClick={handleDeleteBagItem}
      >
        handle delete bag item
      </button>
    </Fragment>
  );
};
/* eslint-enable react/prop-types */

describe('useBagItem', () => {
  beforeEach(jest.clearAllMocks);
  afterEach(cleanup);

  it('should return values correctly', () => {
    const wrapper = props => (
      <Provider store={mockStore(mockInitialState)} {...props} />
    );
    const {
      result: { current },
    } = renderHook(() => useBagItem(mockBagItemId), {
      wrapper,
    });

    expect(typeof current.addBagItem).toBe('function');
    expect(typeof current.deleteBagItem).toBe('function');
    expect(typeof current.updateBagItem).toBe('function');
    expect(current.bagItem).toEqual(mockBagItem);
    expect(current.error).toBeUndefined();
    expect(current.isLoading).toBeUndefined();
    expect(typeof current.handleAddOrUpdateItem).toBe('function');
    expect(typeof current.handleQuantityChange).toBe('function');
    expect(typeof current.handleSizeChange).toBe('function');
    expect(typeof current.handleDeleteBagItem).toBe('function');
  });

  it('should render in loading state', () => {
    const { container, getByTestId } = wrap(<BagItem itemId={mockBagItemId} />)
      .withStore(mockLoadingState)
      .render();

    expect(getByTestId('bagItem-loading').textContent).toBe('yes');

    expect(container).toMatchSnapshot();
  });

  it('should render in error state', () => {
    getBagItem.mockReturnValueOnce(null);

    const { container, getByTestId } = wrap(<BagItem itemId={mockBagItemId} />)
      .withStore(mockErrorState)
      .render();

    expect(getByTestId('bagItem-error').textContent).toBe(
      mockErrorState.bag.items.item.error[mockBagItemId],
    );

    expect(container).toMatchSnapshot();
  });

  it('should not throw if the product has no sizes (product is a sample)', () => {
    getBagItem.mockReturnValueOnce({
      ...mockBagItem,
      product: { ...mockBagItem.product, sizes: null },
    });

    expect(() =>
      wrap(<BagItem itemId={mockBagItemId} />)
        .withStore(mockInitialState)
        .render(),
    ).not.toThrow();
  });

  describe('actions', () => {
    it('should call `add` action', () => {
      const { getByTestId } = wrap(<BagItem itemId={mockBagItemId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-addButton'));

      expect(addBagItemAction).toHaveBeenCalledTimes(1);
    });

    it('should call `delete` action', () => {
      const { getByTestId, queryByTestId } = wrap(
        <BagItem itemId={mockBagItemId} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-deleteButton'));

      expect(removeBagItemAction).toHaveBeenCalledTimes(1);
      expect(queryByTestId('bagItems-loading')).toBeNull();
      expect(queryByTestId('bagItems-error')).toBeNull();
    });

    it('should call `update` action', () => {
      const { getByTestId } = wrap(<BagItem itemId={mockBagItemId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-updateButton'));

      expect(updateBagItemAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleAddOrUpdateItem', () => {
    it('should call updateBagItemAction', () => {
      const newQuantity = 1;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} quantity={newQuantity} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleAddOrUpdateButton'));

      // This ensures `handleAddOrUpdateItem` is called. It's logic is
      // already extensively tested within `handleQuantityChange` and
      // `handleSizeChange`
      expect(updateBagItemAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleQuantityChange', () => {
    it('should update when quantity is less than before', () => {
      // Mock bag item has qty 5 defined
      const newQuantity = 1;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} quantity={newQuantity} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleQuantityButton'));

      expect(updateBagItemAction).toHaveBeenCalledTimes(1);
    });

    it('should update when there is enough stock for the current merchant', () => {
      // Mock bag item has qty 5 defined
      const newQuantity = 6;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} quantity={newQuantity} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleQuantityButton'));

      expect(updateBagItemAction).toHaveBeenCalledTimes(1);
    });

    it('should update and then add when current merchant have less stock than new quantity', async () => {
      // Mock bag item has qty 5 defined
      const newQuantity = 15;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} quantity={newQuantity} />,
      )
        .withStore(mockInitialState)
        .render();

      await fireEvent.click(getByTestId('bagItems-handleQuantityButton'));

      expect(addBagItemAction).toHaveBeenCalledTimes(1);
      expect(updateBagItemAction).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSizeChange', () => {
    it('should update and add when actual merchant have same size', async () => {
      const newSize = 2;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} size={newSize} />,
      )
        .withStore(mockInitialState)
        .render();

      await fireEvent.click(getByTestId('bagItems-handleSizeButton'));

      expect(updateBagItemAction).toHaveBeenCalled();
      expect(addBagItemAction).toHaveBeenCalled();
    });

    it('should add when actual merchant does not have same size', async () => {
      const newSize = 3;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} size={newSize} />,
      )
        .withStore(mockInitialState)
        .render();

      await fireEvent.click(getByTestId('bagItems-handleSizeButton'));

      expect(addBagItemAction).toHaveBeenCalled();
    });

    it('should update when actual merchant does not have same size', () => {
      const newSize = 4;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} size={newSize} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleSizeButton'));

      expect(updateBagItemAction).toHaveBeenCalled();
    });
  });

  describe('handleFullUpdate', () => {
    // Size with the id 5 has 3 merchants:
    // 1st - 0 quantity
    // 2nd - 2 quantity
    // 3rd - 4 quantity
    it('should update size and quantity of bag item', () => {
      const newSize = 5;
      const newQty = 2;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} size={newSize} quantity={newQty} />,
      )
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleSizeQuantityButton'));

      expect(updateBagItemAction).toHaveBeenCalled();
    });

    it('should update and add the remaining quantity to other merchant', async () => {
      const newSize = 5;
      const newQty = 5;
      const { getByTestId } = wrap(
        <BagItem itemId={mockBagItemId} size={newSize} quantity={newQty} />,
      )
        .withStore(mockInitialState)
        .render();

      await fireEvent.click(getByTestId('bagItems-handleSizeQuantityButton'));

      expect(updateBagItemAction).toHaveBeenCalled();
      expect(addBagItemAction).toHaveBeenCalled();
    });
  });

  describe('handleDeleteBagItem', () => {
    it('should call handleDeleteBagItem', () => {
      const { getByTestId } = wrap(<BagItem itemId={mockBagItemId} />)
        .withStore(mockInitialState)
        .render();

      fireEvent.click(getByTestId('bagItems-handleDeleteButton'));

      expect(removeBagItemAction).toHaveBeenCalledTimes(1);
    });
  });
});
