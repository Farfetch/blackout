import { buildWishlistItem } from '../';
import {
  mockMerchantId,
  mockProduct,
  mockProductId,
  mockProductSizeAdapted,
} from 'tests/__fixtures__/products';

describe('buildWishlistItem()', () => {
  it('should return a valid wishlist item object with merchantId and size', () => {
    expect(
      buildWishlistItem({
        product: mockProduct,
        size: mockProductSizeAdapted,
      }),
    ).toEqual({
      merchantId: mockMerchantId,
      productId: mockProductId,
      quantity: 1,
      scale: mockProductSizeAdapted.scale,
      size: mockProductSizeAdapted.id,
    });
  });

  it('should return a valid wishlist item object without merchantId, size and scale', () => {
    const mockProduct = {
      brand: 6598,
      name: 'Cotton shirt',
      id: 1234,
      sizes: null,
    };

    expect(
      buildWishlistItem({
        product: mockProduct,
      }),
    ).toEqual({
      merchantId: undefined,
      productId: mockProduct.id,
      quantity: 1,
      scale: undefined,
      size: undefined,
    });
  });

  it('should return a valid wishlist item object with data', () => {
    const mockData = {
      id: 123,
      name: 'L',
    };

    expect(
      buildWishlistItem({
        product: mockProduct,
        oldSize: mockData,
      }),
    ).toEqual({
      merchantId: undefined,
      productId: mockProduct.id,
      quantity: 1,
      scale: undefined,
      size: undefined,
      oldSize: { id: 123, name: 'L' },
    });
  });
});
