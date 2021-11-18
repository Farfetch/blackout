import { buildBagItem } from '../';
import { mockBagItem } from 'tests/__fixtures__/bags';

describe('buildBagItem()', () => {
  it('should return a valid bag item object', () => {
    expect(
      buildBagItem({
        product: mockBagItem.product,
        ...mockBagItem,
      }),
    ).toEqual({
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with a default `quantity`', () => {
    const { quantity, ...bagItem } = mockBagItem;

    expect(
      buildBagItem({
        product: mockBagItem.product,
        ...bagItem,
      }),
    ).toEqual({
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productId: mockBagItem.product.id,
      quantity: 1,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });

  it('should return a valid bag item object with default `customAttributes`', () => {
    const { customAttributes, ...bagItem } = mockBagItem;

    expect(
      buildBagItem({
        product: mockBagItem.product,
        ...bagItem,
      }),
    ).toEqual({
      customAttributes: '',
      merchantId: mockBagItem.merchantId,
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
        ...mockBagItem,
      }),
    ).toEqual({
      authCode: mockAuthCode,
      customAttributes: mockBagItem.customAttributes,
      merchantId: mockBagItem.merchantId,
      productId: mockBagItem.product.id,
      quantity: mockBagItem.quantity,
      scale: mockBagItem.size.scale,
      size: mockBagItem.size.id,
    });
  });
});
