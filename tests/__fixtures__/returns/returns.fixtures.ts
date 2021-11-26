const returnId = 123;
const returnItemId = 1;
const returnEntity = {
  id: returnId,
  orderId: '8VXRHN',
  merchantId: 10973,
  userId: 29511627,
  items: [returnItemId],
};
const returnItem = {
  id: returnItemId,
  orderItemId: 333,
  reason: 'Item does not fit',
};

export const mockState = {
  returns: {
    error: 'error: not loaded',
    id: returnId,
    isLoading: false,
    returns: {
      error: 'error: not loaded',
      isLoading: false,
    },
    references: {
      error: 'error: not loaded',
      isLoading: false,
    },
    pickupCapabilities: {
      error: 'error: not loaded',
      isLoading: false,
    },
  },
  entities: {
    returnItems: { [returnItemId]: returnItem },
    returns: { [returnId]: returnEntity },
  },
};
