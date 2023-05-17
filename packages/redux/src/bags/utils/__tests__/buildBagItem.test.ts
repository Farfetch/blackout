import { buildBagItem } from '..//index.js';
import {
  mockBagItem,
  mockBagItemEntity,
  mockBagItemHydrated,
  mockProductAggregatorId,
} from 'tests/__fixtures__/bags/index.mjs';

describe('buildBagItem()', () => {
  it('should return a valid bag item object', () => {
    expect(
      buildBagItem({
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItemHydrated.product,
        quantity: mockBagItem.quantity,
        size: mockBagItemEntity.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItemHydrated.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItemEntity.size.scale,
      size: mockBagItemEntity.size.id,
    });
  });

  it('should return a valid bag item object with a default `quantity`', () => {
    expect(
      buildBagItem({
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItemHydrated.product,
        size: mockBagItemEntity.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItemHydrated.product.id,
      quantity: 1,
      scale: mockBagItemEntity.size.scale,
      size: mockBagItemEntity.size.id,
    });
  });

  it('should return a valid bag item object with default `customAttributes`', () => {
    expect(
      buildBagItem({
        merchantId: mockBagItem.merchantId,
        product: mockBagItemHydrated.product,
        quantity: mockBagItem.quantity,
        size: mockBagItemEntity.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: '',
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItemHydrated.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItemEntity.size.scale,
      size: mockBagItemEntity.size.id,
    });
  });

  it('should return a valid bag item object with a custom `authCode`', () => {
    const mockAuthCode = 'foo';

    expect(
      buildBagItem({
        authCode: mockAuthCode,
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItemHydrated.product,
        quantity: mockBagItem.quantity,
        size: mockBagItemEntity.size,
      }),
    ).toEqual({
      authCode: mockAuthCode,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItemHydrated.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItemEntity.size.scale,
      size: mockBagItemEntity.size.id,
    });
  });

  it('should return a valid bag item object with a `productAggregatorId`', () => {
    expect(
      buildBagItem({
        productAggregatorId: mockProductAggregatorId,
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItemHydrated.product,
        quantity: mockBagItem.quantity,
        size: mockBagItemEntity.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: mockProductAggregatorId,
      productId: mockBagItemHydrated.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItemEntity.size.scale,
      size: mockBagItemEntity.size.id,
    });
  });
});
