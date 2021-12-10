import { mockBagId } from './bag.fixtures';
import { mockMerchantId, mockProduct, mockProductId } from '../products';
import { mockPromotionEvaluationItemId } from '../promotionEvaluations';

export const mockBagItemId = 134;
export const mockProductAggregatorId = 321;

export const mockBagEntity = {
  id: mockBagId,
  items: [mockBagItemId, 101, 102, 103, 104],
};

export const mockBagItem = {
  id: mockBagItemId,
  customAttributes: '{ a: 1, b: 2, c: { d: 3 } }',
  quantity: 5,
  merchantId: mockMerchantId,
  merchant: mockMerchantId,
  size: {
    id: 23,
    scale: 'IT',
    name: '11',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 7,
      },
    ],
  },
  sizeId: 23,
  isAvailable: true,
  product: mockProduct,
  productAggregator: null,
  promotionDetail: {
    totalDiscountPercentage: 18.18,
    totalDiscountValue: 50.0,
    isProductOffer: false,
    totalDiscountValuePerUnit: 50.0,
    promotionEvaluationItemId: mockPromotionEvaluationItemId,
  },
};

export const mockBagItemEntity = {
  ...mockBagItem,
  product: mockProductId,
};

export const mockIdenticalBagItem = {
  customAttributes: '{ a: 1, b: 2, c: { d: 3 } }',
  id: 5,
  product: {
    id: mockProductId,
  },
};
