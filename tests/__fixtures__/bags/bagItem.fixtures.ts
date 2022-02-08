import { mockMerchantId, mockProduct, mockProductId } from '../products';

export const mockBagItemId = 134;
export const mockProductAggregatorId = 321;

export const mockBagItem = {
  customAttributes: { a: '1', b: '2', c: '3' },
  id: mockBagItemId,
  isAvailable: true,
  merchant: mockMerchantId,
  merchantId: mockMerchantId,
  product: mockProduct,
  productAggregator: {
    bundleSlug: '/slug',
    id: mockProductAggregatorId,
  },
  quantity: 5,
  size: {
    id: 23,
    name: '11',
    scale: 'IT',
    stock: [
      {
        merchantId: mockMerchantId,
        quantity: 7,
      },
    ],
  },
  sizeId: 23,
};

export const mockBagItemEntity = {
  ...mockBagItem,
  product: mockProductId,
};

export const mockIdenticalBagItem = {
  customAttributes: { a: '1', b: '2', c: '3' },
  id: 5,
  product: {
    id: mockProductId,
  },
};
