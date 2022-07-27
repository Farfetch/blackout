import {
  mockMerchantId,
  mockProduct,
  mockProductId,
  mockSizeScaleId,
} from '../products';

export const mockBagItemId = 134;
export const mockProductAggregatorId = 321;

export const mockBagItem = {
  customAttributes: '',
  id: mockBagItemId,
  isAvailable: true,
  merchant: mockMerchantId,
  merchantId: mockMerchantId,
  product: mockProduct,
  productAggregator: null,
  quantity: 5,
  size: {
    id: 23,
    name: '11',
    scale: mockSizeScaleId,
    stock: [
      { merchantId: mockMerchantId, quantity: 7 },
      { merchantId: 213, quantity: 5 },
      { merchantId: 456, quantity: 2 },
    ],
  },
  sizeId: 23,
};

export const mockBagItemEntity = {
  ...mockBagItem,
  product: mockProductId,
};

export const mockIdenticalBagItem = {
  customAttributes: undefined,
  id: 5,
  product: {
    id: mockProductId,
  },
};
