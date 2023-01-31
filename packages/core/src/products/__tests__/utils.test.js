// @TODO: remove this file in the next version
import { sortStocksByPreferedMerchant } from './../utils';

const mockPreferedMerchantId = 12;
const mockSize = {
  id: 21,
  stock: [
    { merchantId: 124, quantity: 8 },
    { merchantId: mockPreferedMerchantId, quantity: 2 },
    { merchantId: 788, quantity: 8 },
  ],
};

const mockSizeWithoutPreferedMerchant = {
  id: 22,
  stock: [
    { merchantId: 124, quantity: 8 },
    { merchantId: 788, quantity: 8 },
  ],
};

const mockSizeWithStocksWithoutQuantity = {
  id: 23,
  stock: [
    { merchantId: 124, quantity: 8 },
    { merchantId: 788, quantity: 8 },
    { merchantId: 555, quantity: 0 },
    { merchantId: 444, quantity: 0 },
  ],
};

const mockProduct = {
  id: 1234,
  preferedMerchant: {
    merchantId: mockPreferedMerchantId,
  },
  sizes: [
    mockSize,
    mockSizeWithoutPreferedMerchant,
    mockSizeWithStocksWithoutQuantity,
  ],
};

describe('products utils', () => {
  describe('sortStocksByPreferedMerchant()', () => {
    it('should return the sizestocks sorted with the prefered merchant in first place', () => {
      expect(sortStocksByPreferedMerchant(mockProduct, mockSize)).toEqual([
        { merchantId: mockPreferedMerchantId, quantity: 2 },
        { merchantId: 124, quantity: 8 },
        { merchantId: 788, quantity: 8 },
      ]);
    });

    it('should return the same sizestocks received without prefered merchant', () => {
      expect(
        sortStocksByPreferedMerchant(
          mockProduct,
          mockSizeWithoutPreferedMerchant,
        ),
      ).toEqual(mockSizeWithoutPreferedMerchant.stock);
    });

    it('should return only the sizestocks with quantity available', () => {
      expect(
        sortStocksByPreferedMerchant(
          mockProduct,
          mockSizeWithStocksWithoutQuantity,
        ),
      ).toEqual([
        { merchantId: 124, quantity: 8 },
        { merchantId: 788, quantity: 8 },
      ]);
    });
  });
});
