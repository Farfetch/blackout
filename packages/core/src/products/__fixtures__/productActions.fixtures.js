// @TODO: remove this file in the next version
export const mockPreferedMerchantId = 789;
export const mockSize = {
  id: 25,
  scale: '206',
  stock: [{ merchantId: 10937, quantity: 2 }],
};
export const mockSizePreferedMerchant = {
  id: 26,
  scale: '206',
  stock: [{ merchantId: mockPreferedMerchantId, quantity: 2 }],
};
export const mockProduct = {
  id: 123,
  preferedMerchant: {
    merchantId: mockPreferedMerchantId,
  },
  sizes: [
    mockSize,
    {
      id: 1,
      scale: 1,
      stock: [
        { merchantId: 111, quantity: 2 },
        { merchantId: 222, quantity: 1 },
      ],
    },
    {
      id: 2,
      scale: 2,
      stock: [{ merchantId: 111, quantity: 2 }],
    },
    {
      id: 3,
      scale: 3,
      stock: [{ merchantId: 333, quantity: 2 }],
    },
  ],
};
export const mockQuantity = 2;
export const mockData = {
  product: mockProduct,
  size: mockSize,
  quantity: mockQuantity,
};

export const mockBagItem = {
  id: 1,
  quantity: 1,
  merchant: 111,
  size: {
    id: 2,
    scale: 2,
    stock: [{ merchantId: 111, quantity: 2 }],
  },
  product: mockProduct,
};
