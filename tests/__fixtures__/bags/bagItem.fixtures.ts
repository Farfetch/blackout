import { mockMerchantId, mockProduct, mockProductId } from '../products';

export const mockBagItemId = 134;

export const mockBagItem = {
  id: mockBagItemId,
  customAttributes: { a: 1, b: 2, c: { d: 3 } },
  quantity: 5,
  merchantId: mockMerchantId,
  merchant: mockMerchantId,
  size: {
    id: 23,
    scale: 'IT',
    name: '11',
    stock: [{ merchantId: mockMerchantId, quantity: 7 }],
  },
  sizeId: 23,
  isAvailable: true,
  product: mockProduct,
};

export const mockBagItemEntity = {
  ...mockBagItem,
  product: mockProductId,
};

export const mockIdenticalBagItem = {
  customAttributes: { a: 1, b: 2, c: { d: 3 } },
  id: 5,
  product: {
    id: mockProductId,
  },
};
