import { buildBagItem } from '../';
import { mockBagItem, mockProductAggregatorId } from 'tests/__fixtures__/bags';

describe('buildBagItem()', () => {
  it('should return a valid bag item object', () => {
    expect(
      buildBagItem({
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItem.product,
        quantity: mockBagItem.quantity,
        size: mockBagItem.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with a default `quantity`', () => {
    expect(
      buildBagItem({
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItem.product,
        size: mockBagItem.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItem.product.id,
      quantity: 1,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with default `customAttributes`', () => {
    expect(
      buildBagItem({
        merchantId: mockBagItem.merchantId,
        product: mockBagItem.product,
        quantity: mockBagItem.quantity,
        size: mockBagItem.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: '',
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with a custom `authCode`', () => {
    const mockAuthCode = 'foo';

    expect(
      buildBagItem({
        authCode: mockAuthCode,
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItem.product,
        quantity: mockBagItem.quantity,
        size: mockBagItem.size,
      }),
    ).toEqual({
      authCode: mockAuthCode,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: undefined,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with a `productAggregatorId`', () => {
    expect(
      buildBagItem({
        productAggregatorId: mockProductAggregatorId,
        customAttributes: mockBagItem.customAttributes,
        merchantId: mockBagItem.merchantId,
        product: mockBagItem.product,
        quantity: mockBagItem.quantity,
        size: mockBagItem.size,
      }),
    ).toEqual({
      authCode: undefined,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productAggregatorId: mockProductAggregatorId,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });
});
