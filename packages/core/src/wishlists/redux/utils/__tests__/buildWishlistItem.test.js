import { buildWishlistItem } from '../';
import {
  mockMerchantId,
  mockProduct,
  mockProductId,
  mockSizes,
} from 'tests/__fixtures__/products';

const mockSize = mockSizes[0];

describe('buildWishlistItem()', () => {
  it('should return a valid wishlist item object with merchandId and size', () => {
    expect(buildWishlistItem(mockProduct, mockSize)).toEqual({
      merchantId: mockMerchantId,
      productId: mockProductId,
      quantity: 1,
      scale: mockSize.scale,
      size: mockSize.id,
    });
  });

  it('should return a valid wishlist item object without merchantId, size and scale', () => {
    const mockProduct = {
      brand: 6598,
      name: 'Cotton shirt',
      id: 1234,
    };

    expect(buildWishlistItem(mockProduct)).toEqual({
      merchantId: undefined,
      productId: mockProduct.id,
      quantity: 1,
      scale: undefined,
      size: undefined,
    });
  });

  it('should return a valid wishlist item object with data', () => {
    const mockData = {
      oldSize: { id: 123 },
    };

    expect(
      buildWishlistItem(mockProduct, undefined, undefined, mockData),
    ).toEqual({
      merchantId: undefined,
      productId: mockProductId,
      quantity: 1,
      scale: undefined,
      size: undefined,
      oldSize: { id: 123 },
    });
  });
});
