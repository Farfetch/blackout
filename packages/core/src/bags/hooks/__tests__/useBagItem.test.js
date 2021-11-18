import { HookWrapper } from '../__fixtures__/useBagItem.fixtures';
import { mockBagItem, mockBagItemId } from 'tests/__fixtures__/bags';
import { shallow } from 'enzyme';
import { useBagItem } from '../useBagItem';
import React from 'react';

describe('useBagItem', () => {
  const bagItems = [mockBagItem];
  const bagItem = mockBagItem;
  const addBagItem = jest.fn();
  const deleteBagItem = jest.fn();
  const updateBagItem = jest.fn();

  const wrapper = shallow(
    <HookWrapper
      hook={() =>
        useBagItem(bagItems, bagItem, addBagItem, deleteBagItem, updateBagItem)
      }
    />,
  );

  const {
    hook: { handleQuantityChange, handleSizeChange, handleDeleteBagItem },
  } = wrapper.find('div').props();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should not throw if the product has no sizes (product is a sample)', () => {
    const bagItemWithoutSizes = {
      ...mockBagItem,
      product: { ...mockBagItem.product, sizes: null },
    };
    const wrapperWithoutSizes = shallow(
      <HookWrapper
        hook={() =>
          useBagItem(
            bagItems,
            bagItemWithoutSizes,
            addBagItem,
            deleteBagItem,
            updateBagItem,
          )
        }
      />,
    );

    expect(wrapperWithoutSizes).toBeDefined();
  });

  describe('handleQuantityChange', () => {
    it('should update when quantity is less than before', () => {
      const newQuantity = 3;

      handleQuantityChange(newQuantity);

      expect(updateBagItem).toHaveBeenCalled();
      expect(addBagItem).not.toHaveBeenCalled();
    });

    it('should update when there is enought stock for the current merchant', async () => {
      const newQuantity = 4;

      await handleQuantityChange(newQuantity);

      expect(updateBagItem).toHaveBeenCalled();
      expect(addBagItem).not.toHaveBeenCalled();
    });

    it('should update and then add when current merchant have less stock than new quantity', async () => {
      const newQuantity = 11;

      await handleQuantityChange(newQuantity);

      expect(addBagItem).toHaveBeenCalled();
      expect(updateBagItem).toHaveBeenCalled();
    });
  });

  describe('handleSizeChange', () => {
    it('should only update when actual merchant have the same quantity as the size', async () => {
      // The bag item has quantity 5
      // The new size has one merchant, with quantity 2
      const newSize = 2;

      await handleSizeChange(newSize);

      expect(updateBagItem).toHaveBeenCalled();
      expect(addBagItem).not.toHaveBeenCalled();
    });

    it('should add when actual merchant does not have same size', async () => {
      const newSize = 3;

      await handleSizeChange(newSize);

      expect(addBagItem).toHaveBeenCalled();
    });

    it('should update when actual merchant does not have same size', async () => {
      const newSize = 4;

      await handleSizeChange(newSize);

      expect(updateBagItem).toHaveBeenCalled();
    });

    it('should only update when the merchant only has one quantity', async () => {
      // The bag item has quantity 5
      // The new size has one merchant, with one quantity
      const newSize = 7;

      await handleSizeChange(newSize);

      expect(updateBagItem).toHaveBeenCalled();
      expect(addBagItem).not.toHaveBeenCalled();
    });

    it('should update and add when there is more merchants and more quantity to handle', async () => {
      // The bag item has quantity 5
      // The new size has two merchants
      //   - Quantity 1 for the first merchant
      //   - Quantity 2 - for the second merchant
      const newSize = 8;

      await handleSizeChange(newSize);

      expect(updateBagItem).toHaveBeenCalled();
      expect(addBagItem).toHaveBeenCalled();
    });
  });

  describe('handleDeleteBagItem', () => {
    it('should call handleDeleteBagItem', () => {
      handleDeleteBagItem();

      expect(deleteBagItem).toHaveBeenCalledWith(mockBagItemId, {
        productId: mockBagItem.product.id,
        quantity: mockBagItem.quantity,
        size: mockBagItem.size.id,
      });
    });
  });
});
