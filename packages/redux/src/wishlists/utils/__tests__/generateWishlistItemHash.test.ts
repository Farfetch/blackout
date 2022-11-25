import { generateWishlistItemHash } from '../';
import {
  mockBrandId,
  mockMerchantId,
  mockProduct,
  mockProductId,
  mockProductSizesAdapted,
} from 'tests/__fixtures__/products';

const mockSize = mockProductSizesAdapted[0]!;
const mockFromBuildWishlistItemUtil = {
  merchantId: mockMerchantId,
  productId: mockProductId,
  quantity: 1,
  scale: mockSize.scale,
  size: mockSize.id,
};
const mockFromWishlistItem = {
  id: '1234-5678-9012',
  merchant: mockMerchantId,
  product: {
    ...mockProduct,
    brand: {
      id: mockBrandId,
      name: '',
      description: '',
    },
    categories: [],
  },
  quantity: 1,
  size: mockSize,
};

describe('generateWishlistItemHash()', () => {
  describe('hash creation', () => {
    it('should throw error when product id is missing', () => {
      expect(() =>
        generateWishlistItemHash({
          ...mockFromBuildWishlistItemUtil,
          productId: undefined,
        }),
      ).toThrowErrorMatchingInlineSnapshot('"Item is missing the product id."');
    });

    it('should create a hash for data transformed in the `buildWishlistItem` util', () => {
      expect(
        generateWishlistItemHash(mockFromBuildWishlistItemUtil),
      ).toMatchInlineSnapshot('"11766695!10973!1!117"');
    });

    it('should create a hash, for data transformed in the `buildWishlistItem` util, when there is no size', () => {
      expect(
        generateWishlistItemHash({
          ...mockFromBuildWishlistItemUtil,
          scale: undefined,
          size: undefined,
        }),
      ).toMatchInlineSnapshot('"11766695!!!"');
    });

    it('should create a hash for data directly from a wishlist item', () => {
      expect(
        generateWishlistItemHash(mockFromWishlistItem),
      ).toMatchInlineSnapshot('"11766695!10973!1!117"');
    });

    it('should create a hash, directly from a wishlist item, when there is no size', () => {
      expect(
        generateWishlistItemHash({
          ...mockFromBuildWishlistItemUtil,
          scale: undefined,
          size: undefined,
        }),
      ).toMatchInlineSnapshot('"11766695!!!"');
    });
  });
});
