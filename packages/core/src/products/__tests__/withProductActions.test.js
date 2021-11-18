// @TODO: remove this file in the next version
import {
  mockBagItem,
  mockData,
  mockPreferedMerchantId,
  mockProduct,
  mockQuantity,
  mockSize,
  mockSizePreferedMerchant,
} from '../__fixtures__/productActions.fixtures';
import { shallow } from 'enzyme';
import React from 'react';
import withProductActions from '../withProductActions';

const mockProductId = 123;
const getShallowTree = props => {
  const Component = withProductActions(() => <div>foo-bar</div>);

  return shallow(<Component {...props} />);
};

const mockBagItems = [{ ...mockBagItem }];

describe('withProductActions HOC', () => {
  beforeEach(jest.clearAllMocks);

  describe('custom handlers', () => {
    describe('onAddBagItem handler', () => {
      const addBagItem = jest.fn();
      const updateBagItem = jest.fn();

      describe('with one merchant', () => {
        const mockProps = {
          bagItems: mockBagItems,
          addBagItem,
          updateBagItem,
        };
        const tree = getShallowTree(mockProps);

        it('should add an item to bag', () => {
          tree.props().onAddBagItem(mockData);

          expect(addBagItem).toHaveBeenCalledWith({
            customAttributes: '',
            merchantId: 10937,
            productId: mockProduct.id,
            quantity: mockQuantity,
            scale: mockSize.scale,
            size: mockSize.id,
          });
        });

        it('should add an item to bag with the prefered merchant', () => {
          tree.props().onAddBagItem({
            quantity: 1,
            size: mockSizePreferedMerchant,
            product: {
              ...mockProduct,
              sizes: [mockProduct.sizes[1], mockSizePreferedMerchant],
            },
          });

          expect(addBagItem).toHaveBeenCalledWith({
            customAttributes: '',
            merchantId: mockPreferedMerchantId,
            productId: mockProduct.id,
            quantity: 1,
            scale: mockSizePreferedMerchant.scale,
            size: mockSizePreferedMerchant.id,
          });
        });

        it('should update a bag item if exists', () => {
          tree.props().onAddBagItem({
            product: mockBagItem.product,
            size: mockBagItem.size,
            quantity: 1,
          });

          expect(updateBagItem).toHaveBeenCalledWith(mockBagItem.id, {
            customAttributes: '',
            merchantId: mockBagItem.merchant,
            productId: mockProduct.id,
            quantity: 2,
            oldQuantity: 1,
            oldSize: mockBagItem.size,
            scale: mockBagItem.size.scale,
            size: mockBagItem.size.id,
          });
        });
      });

      describe('with multiple merchants', () => {
        const mockProps = {
          addBagItem,
          updateBagItem,
        };

        it('should add an item to bag twice', async () => {
          const tree = getShallowTree({ ...mockProps, bagItems: [] });

          await tree.props().onAddBagItem({
            product: mockProduct,
            size: mockProduct.sizes[1],
            quantity: 3,
          });

          expect(addBagItem).toHaveBeenCalledTimes(2);
        });

        it('should update and add a bag item', async () => {
          const mockBagItemWithQuantityThree = {
            id: 1,
            quantity: 1,
            merchant: 111,
            size: {
              id: 1,
              scale: 1,
              stock: [
                { merchantId: 111, quantity: 2 },
                { merchantId: 222, quantity: 1 },
              ],
            },
            product: mockProduct,
          };
          const tree = getShallowTree({
            ...mockProps,
            bagItems: [mockBagItemWithQuantityThree],
          });

          await tree.props().onAddBagItem({
            product: mockProduct,
            size: mockProduct.sizes[1],
            quantity: 2,
          });

          expect(updateBagItem).toHaveBeenCalledTimes(1);
          expect(addBagItem).toHaveBeenCalledTimes(1);
        });
      });

      describe('without specifying quantity', () => {
        const mockProps = {
          bagItems: mockBagItems,
          addBagItem,
          updateBagItem,
        };

        it('should add an item to bag with quantity 1', () => {
          const tree = getShallowTree(mockProps);

          tree.props().onAddBagItem({
            ...mockData,
            quantity: undefined,
          });

          expect(addBagItem).toHaveBeenCalledWith({
            customAttributes: '',
            merchantId: mockSize.stock[0].merchantId,
            quantity: 1,
            productId: mockProduct.id,
            scale: mockSize.scale,
            size: mockSize.id,
          });
        });
      });
    });

    describe('onGetProductDetails', () => {
      it('should update bag item with no changes', () => {
        const mockProps = {
          getProductDetails: jest.fn(),
          productId: mockProductId,
        };
        const tree = getShallowTree(mockProps);

        tree.props().onGetProductDetails();

        expect(mockProps.getProductDetails).toHaveBeenCalledWith(mockProductId);
      });

      it('should update bag item with a specific product id', () => {
        const mockSpecificId = 354005;
        const mockProps = {
          getProductDetails: jest.fn(),
          productId: mockSpecificId,
        };
        const tree = getShallowTree(mockProps);

        tree.props().onGetProductDetails(mockSpecificId);

        expect(mockProps.getProductDetails).toHaveBeenCalledWith(
          mockSpecificId,
        );
      });
    });
  });
});
